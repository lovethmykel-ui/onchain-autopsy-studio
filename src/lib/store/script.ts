import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'

type Script = Database['public']['Tables']['scripts']['Row']

interface ScriptStore {
  scripts: Script[]
  isLoading: boolean
  error: string | null
  
  fetchScripts: (projectId: string) => Promise<void>
  addScript: (script: Script) => void
}

export const useScriptStore = create<ScriptStore>((set) => ({
  scripts: [],
  isLoading: false,
  error: null,

  fetchScripts: async (projectId) => {
    set({ isLoading: true, error: null })
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      set({ scripts: data || [], isLoading: false })
    } catch (err: any) {
      console.error('Error fetching scripts:', err)
      set({ error: err.message, isLoading: false })
    }
  },

  addScript: (script) => set((state) => ({ scripts: [script, ...state.scripts] })),
}))
