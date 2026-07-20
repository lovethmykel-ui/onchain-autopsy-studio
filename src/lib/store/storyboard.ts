import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { toast } from 'sonner'

type Storyboard = Database['public']['Tables']['storyboards']['Row']

interface StoryboardStore {
  storyboards: Storyboard[]
  isLoading: boolean
  isGenerating: boolean
  error: string | null
  
  fetchStoryboards: (projectId: string) => Promise<void>
  generateStoryboard: (projectId: string, scriptId: string, scriptText: string, topic: string) => Promise<Storyboard | null>
}

export const useStoryboardStore = create<StoryboardStore>((set, get) => ({
  storyboards: [],
  isLoading: false,
  isGenerating: false,
  error: null,

  fetchStoryboards: async (projectId) => {
    set({ isLoading: true, error: null })
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase
        .from('storyboards')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      set({ storyboards: data || [], isLoading: false })
    } catch (err: any) {
      console.error('Error fetching storyboards:', err)
      set({ error: err.message, isLoading: false })
      toast.error('Failed to load storyboards: ' + err.message)
    }
  },

  generateStoryboard: async (projectId, scriptId, scriptText, topic) => {
    set({ isGenerating: true, error: null })
    const supabase = createClient()
    
    try {
      const { data: authData } = await supabase.auth.getUser()
      const userId = authData.user?.id

      if (!userId) {
        throw new Error('You must be logged in to generate a storyboard.')
      }

      // First call the AI API
      const res = await fetch('/api/ai/generate-storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: scriptText, topic })
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to generate storyboard from AI')
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('storyboards')
        .insert({
          user_id: userId,
          project_id: projectId,
          script_id: scriptId,
          scenes: json.scenes,
          status: 'completed',
        })
        .select()
        .single()

      if (error) throw error

      set((state) => ({ 
        storyboards: [data, ...state.storyboards],
        isGenerating: false 
      }))
      
      toast.success('Storyboard generated successfully!')
      return data
    } catch (err: any) {
      console.error('Error generating storyboard:', err)
      set({ error: err.message, isGenerating: false })
      toast.error('Failed to generate storyboard: ' + err.message)
      return null
    }
  }
}))
