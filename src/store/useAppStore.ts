import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Project {
  id: string
  title: string
  topic: string
  status: 'draft' | 'in_production' | 'completed' | 'failed'
  progress: number
}

interface AppState {
  activeProjectId: string | null
  projects: Project[]
  setActiveProject: (id: string) => void
  addProject: (project: Project) => void
  updateProjectProgress: (id: string, progress: number, status?: Project['status']) => void
  
  // UI State
  isCommandPaletteOpen: boolean
  setCommandPaletteOpen: (isOpen: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeProjectId: null,
      projects: [],
      
      setActiveProject: (id) => set({ activeProjectId: id }),
      
      addProject: (project) => set((state) => ({ 
        projects: [project, ...state.projects],
        activeProjectId: project.id 
      })),
      
      updateProjectProgress: (id, progress, status) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === id 
            ? { ...p, progress, ...(status ? { status } : {}) }
            : p
        )
      })),

      // UI State
      isCommandPaletteOpen: false,
      setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen })
    }),
    {
      name: 'onchain-autopsy-storage', // unique name for localStorage
    }
  )
)
