import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { toast } from 'sonner'

type Project = Database['public']['Tables']['projects']['Row']

interface ProjectStore {
  activeProject: Project | null
  projects: Project[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setActiveProject: (project: Project | null) => void
  fetchProjects: () => Promise<void>
  createProject: (title: string, topic: string, type: string, workflowType: string) => Promise<Project | null>
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  activeProject: null,
  projects: [],
  isLoading: false,
  error: null,

  setActiveProject: (project) => set({ activeProject: project }),

  fetchProjects: async () => {
    set({ isLoading: true, error: null })
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      
      set({ projects: data || [], isLoading: false })
      
      // If we have projects but no active one, set the first as active
      if (data && data.length > 0 && !get().activeProject) {
        set({ activeProject: data[0] })
      }
    } catch (err: any) {
      console.error('Error fetching projects:', err)
      set({ error: err.message, isLoading: false })
      toast.error('Failed to load projects: ' + err.message)
    }
  },

  createProject: async (title, topic, type, workflowType) => {
    set({ isLoading: true, error: null })
    const supabase = createClient()
    
    try {
      // Get current user (if auth is setup) or use a dummy UUID if RLS allows
      const { data: authData } = await supabase.auth.getUser()
      const userId = authData.user?.id

      if (!userId) {
        throw new Error('You must be logged in to create a project.')
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: userId,
          title,
          topic,
          type,
          workflow_type: workflowType,
          status: 'draft',
        })
        .select()
        .single()

      if (error) throw error

      set((state) => ({ 
        projects: [data, ...state.projects],
        activeProject: data,
        isLoading: false 
      }))
      
      return data
    } catch (err: any) {
      console.error('Error creating project:', err)
      set({ error: err.message, isLoading: false })
      toast.error('Failed to create project: ' + err.message)
      return null
    }
  }
}))
