import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { toast } from 'sonner'
import { useSettingsStore } from './settings'

type DbVideo = Database['public']['Tables']['generated_videos']['Row']
type DbImage = Database['public']['Tables']['generated_images']['Row']
type DbAudio = Database['public']['Tables']['generated_audio']['Row']

export interface VideoAsset extends Omit<DbVideo, 'id' | 'created_at'> {
  id: string
  created_at: string
  status?: 'pending' | 'processing' | 'completed' | 'failed'
  provider_job_id?: string
  scene_id?: string
}

export interface ImageAsset extends DbImage {}
export interface AudioAsset extends DbAudio {}

interface AssetStore {
  videos: VideoAsset[]
  images: ImageAsset[]
  audio: AudioAsset[]
  isLoading: boolean
  error: string | null
  
  fetchVideos: (projectId?: string) => Promise<void>
  fetchImages: (projectId?: string) => Promise<void>
  fetchAudio: (projectId?: string) => Promise<void>
  generateVideo: (projectId: string, sceneId: string, prompt: string, model: string) => Promise<void>
  pollProcessingVideos: () => void
}

export const useAssetStore = create<AssetStore>((set, get) => {
  let pollingInterval: NodeJS.Timeout | null = null

  return {
    videos: [],
    images: [],
    audio: [],
    isLoading: false,
    error: null,

    fetchVideos: async (projectId) => {
      set({ isLoading: true, error: null })
      const supabase = createClient()
      
      try {
        let query = supabase.from('generated_videos').select('*').order('created_at', { ascending: false })
        if (projectId) {
          query = query.eq('project_id', projectId)
        }

        const { data, error } = await query

        if (error) throw error
        
        // Combine DB videos (which are all completed) with any transient processing jobs already in state
        const dbVideos: VideoAsset[] = (data || []).map(v => ({ ...v, status: 'completed' as const }))
        
        set(state => {
          const processingJobs = state.videos.filter(v => v.status === 'processing' || v.status === 'pending')
          return { videos: [...processingJobs, ...dbVideos], isLoading: false }
        })
        
        if (get().videos.some(v => v.status === 'processing' || v.status === 'pending')) {
          get().pollProcessingVideos()
        }
      } catch (err: any) {
        console.error('Error fetching videos:', err)
        set({ error: err.message, isLoading: false })
      }
    },

    fetchImages: async (projectId) => {
      set({ isLoading: true, error: null })
      const supabase = createClient()
      try {
        let query = supabase.from('generated_images').select('*').order('created_at', { ascending: false })
        if (projectId) query = query.eq('project_id', projectId)
        const { data, error } = await query
        if (error) throw error
        set({ images: data || [], isLoading: false })
      } catch (err: any) {
        console.error('Error fetching images:', err)
        set({ error: err.message, isLoading: false })
      }
    },

    fetchAudio: async (projectId) => {
      set({ isLoading: true, error: null })
      const supabase = createClient()
      try {
        let query = supabase.from('generated_audio').select('*').order('created_at', { ascending: false })
        if (projectId) query = query.eq('project_id', projectId)
        const { data, error } = await query
        if (error) throw error
        set({ audio: data || [], isLoading: false })
      } catch (err: any) {
        console.error('Error fetching audio:', err)
        set({ error: err.message, isLoading: false })
      }
    },

    generateVideo: async (projectId, sceneId, prompt, model) => {
      const apiKeys = useSettingsStore.getState().apiKeys
      const apiKey = apiKeys[model.toLowerCase()]

      if (!apiKey && model.toLowerCase() === 'luma') {
        toast.error(`Missing API Key for ${model}. Please add it in Settings.`)
        return
      }

      try {
        const tempId = `temp-${Date.now()}`
        const newJob: VideoAsset = {
          id: tempId,
          project_id: projectId,
          prompt,
          url: null,
          model,
          resolution: '1080p',
          fps: 24,
          duration: 5,
          type: 'footage',
          created_at: new Date().toISOString(),
          status: 'pending',
          scene_id: sceneId
        }

        set(state => ({ videos: [newJob, ...state.videos] }))

        // Start generation
        const res = await fetch('/api/ai/generate-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, model, apiKey, projectId, sceneId })
        })

        const json = await res.json()
        if (!res.ok) throw new Error(json.error)

        set(state => ({
          videos: state.videos.map(v => v.id === tempId ? { ...v, provider_job_id: json.jobId, status: 'processing' } : v)
        }))

        toast.success('Video generation started!')
        get().pollProcessingVideos()
      } catch (err: any) {
        console.error('Error starting video gen:', err)
        toast.error('Failed to start video generation: ' + err.message)
      }
    },

    pollProcessingVideos: () => {
      if (pollingInterval) clearInterval(pollingInterval)

      pollingInterval = setInterval(async () => {
        const { videos } = get()
        const processing = videos.filter(v => v.status === 'processing')

        if (processing.length === 0) {
          if (pollingInterval) clearInterval(pollingInterval)
          return
        }

        const supabase = createClient()
        const apiKeys = useSettingsStore.getState().apiKeys

        for (const video of processing) {
          if (!video.provider_job_id) continue

          const apiKey = apiKeys[video.model?.toLowerCase() || 'luma']
          
          try {
            const res = await fetch(`/api/ai/check-video?jobId=${video.provider_job_id}&model=${video.model}&apiKey=${apiKey || ''}`)
            if (!res.ok) continue
            
            const statusJson = await res.json()

            if (statusJson.state === 'completed') {
              // Now that it's completed, insert into DB
              const { data: completedRecord, error } = await supabase
                .from('generated_videos')
                .insert({
                  project_id: video.project_id,
                  prompt: video.prompt,
                  url: statusJson.videoUrl,
                  model: video.model,
                  resolution: '1080p',
                  fps: 24,
                  duration: 5,
                  type: 'footage'
                })
                .select()
                .single()

              if (completedRecord) {
                set(state => ({
                  videos: state.videos.map(v => v.id === video.id ? { ...completedRecord, status: 'completed' as const } : v)
                }))
                toast.success('A video has finished generating!')
              } else {
                console.error('Failed to insert completed video', error)
              }
            } else if (statusJson.state === 'failed') {
              set(state => ({
                videos: state.videos.map(v => v.id === video.id ? { ...v, status: 'failed' as const } : v)
              }))
              toast.error('A video generation failed.')
            }
          } catch (e) {
            console.error('Polling error', e)
          }
        }
      }, 5000)
    }
  }
})
