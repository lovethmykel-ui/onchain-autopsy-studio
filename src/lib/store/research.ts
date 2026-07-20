import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'

type Research = Database['public']['Tables']['research']['Row']

interface ResearchStore {
  research: Research[]
  isLoading: boolean
  error: string | null
  
  fetchResearch: (projectId: string) => Promise<void>
  addResearch: (r: Research) => void
}

export const useResearchStore = create<ResearchStore>((set) => ({
  research: [],
  isLoading: false,
  error: null,

  fetchResearch: async (projectId) => {
    set({ isLoading: true, error: null })
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase
        .from('research')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      set({ research: data || [], isLoading: false })
    } catch (err: any) {
      console.error('Error fetching research:', err)
      set({ error: err.message, isLoading: false })
    }
  },

  addResearch: (r) => set((state) => ({ research: [r, ...state.research] })),
}))
