'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Search, Filter, Clock, FolderSearch,
  Play, MoreHorizontal
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const gradients = [
  'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',
  'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
  'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)',
  'linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%)',
  'linear-gradient(135deg, #0a1a0a 0%, #1a3e1a 50%, #0a1a0a 100%)',
]

const mockProjects = [
  { id: '1', title: 'OneCoin Documentary', topic: 'OneCoin', type: 'Crypto Scams', status: 'in_production', progress: 73, workflow: 'Full Documentary', created: 'May 20, 2026', updated: '2 mins ago' },
  { id: '2', title: 'FTX Collapse', topic: 'FTX', type: 'Exchange Collapses', status: 'in_production', progress: 48, workflow: 'Full Documentary', created: 'May 18, 2026', updated: '1 day ago' },
  { id: '3', title: 'Terra Luna Crash', topic: 'Terra Luna', type: 'Exchange Collapses', status: 'in_production', progress: 62, workflow: 'Short Documentary', created: 'May 15, 2026', updated: '3 days ago' },
  { id: '4', title: 'Bybit Hack Investigation', topic: 'Bybit Hack', type: 'Blockchain Investigations', status: 'in_production', progress: 35, workflow: 'Investigation Report', created: 'May 12, 2026', updated: '3 days ago' },
  { id: '5', title: 'Pig Butchering Scams', topic: 'Pig Butchering', type: 'Fraud Investigations', status: 'draft', progress: 20, workflow: 'Full Documentary', created: 'May 10, 2026', updated: '5 days ago' },
  { id: '6', title: 'Mt. Gox Collapse', topic: 'Mt. Gox', type: 'Exchange Collapses', status: 'completed', progress: 100, workflow: 'Script Only', created: 'May 5, 2026', updated: '10 days ago' },
]

const statusVariant = {
  draft: 'draft',
  in_production: 'in-production',
  completed: 'completed',
  failed: 'failed',
} as const

export default function ProjectsPage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Projects</h1>
          <p className="text-sm text-text-secondary mt-1">All documentary and investigation projects</p>
        </div>
        <Button className="gap-2">
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
        {mockProjects.map((project, i) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className="glass-card overflow-hidden cursor-pointer group hover:border-border-hover transition-all duration-200"
          >
            <div className="h-32 relative" style={{ background: gradients[i % gradients.length] }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-sm font-bold text-white mb-0.5">{project.title}</h3>
                <p className="text-[10px] text-white/60">{project.type}</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={statusVariant[project.status as keyof typeof statusVariant] || 'default'}>
                  {project.status === 'in_production' ? 'In Production' :
                   project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <Badge variant="default" className="text-[9px]">{project.workflow}</Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-text-muted">Progress</span>
                <span className="text-xs font-bold text-accent">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-1.5 mb-3" />
              <div className="flex items-center justify-between text-[10px] text-text-muted">
                <span>{project.created}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.updated}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
