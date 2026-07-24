'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Search, Filter, Clock, FolderSearch,
  Play, MoreHorizontal, Trash2
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { PROJECT_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const gradients = [
  'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',
  'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
  'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)',
  'linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%)',
  'linear-gradient(135deg, #0a1a0a 0%, #1a3e1a 50%, #0a1a0a 100%)',
]

import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { CreateProjectModal } from '@/components/projects/CreateProjectModal'
import { formatDistanceToNow } from 'date-fns'

const statusVariant = {
  draft: 'draft',
  in_production: 'in-production',
  completed: 'completed',
  failed: 'failed',
} as const

export default function ProjectsPage() {
  const projects = useAppStore(state => state.projects)
  const setActiveProject = useAppStore(state => state.setActiveProject)
  const removeProject = useAppStore(state => state.removeProject)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLoading = false

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Projects</h1>
          <p className="text-sm text-text-secondary mt-1">All documentary and investigation projects</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </Button>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center border border-dashed border-border rounded-lg">
            <p className="text-text-muted mb-4">No projects yet. Create your first documentary project.</p>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>Initialize Project</Button>
          </div>
        )}
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            onClick={() => setActiveProject(project.id)}
            className="glass-card overflow-hidden cursor-pointer group hover:border-border-hover transition-all duration-200"
          >
            <div className="h-32 relative" style={{ background: gradients[i % gradients.length] }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-sm font-bold text-white mb-0.5">{project.title}</h3>
                <p className="text-[10px] text-white/60">Investigation</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <div 
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    // If you want to preview
                  }}
                >
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
                <div 
                  className="w-8 h-8 rounded-full bg-red-500/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-red-500/40 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeProject(project.id)
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-200" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={statusVariant[project.status as keyof typeof statusVariant] || 'default'}>
                  {project.status === 'in_production' ? 'In Production' :
                   project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <Badge variant="default" className="text-[9px]">Standard</Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-text-muted">Progress</span>
                <span className="text-xs font-bold text-accent">{project.progress || 0}%</span>
              </div>
              <Progress value={project.progress || 0} className="h-1.5 mb-3" />
              <div className="flex items-center justify-between text-[10px] text-text-muted mt-2">
                <span>{project.created_at ? new Date(project.created_at).toLocaleDateString() : 'Just now'}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.updated_at ? formatDistanceToNow(new Date(project.updated_at), { addSuffix: true }) : 'Just now'}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  )
}
