import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Project {
  id: string
  title: string
  topic: string
  status: 'draft' | 'in_production' | 'completed' | 'failed'
  progress: number
  type?: string
  workflow_type?: string
  created_at?: string
  updated_at?: string
}

interface AppState {
  activeProjectId: string | null
  projects: Project[]
  setActiveProject: (id: string) => void
  addProject: (project: Project) => void
  updateProjectProgress: (id: string, progress: number, status?: Project['status']) => void
  removeProject: (id: string) => void
  
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

      removeProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id),
        activeProjectId: state.activeProjectId === id ? null : state.activeProjectId
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
