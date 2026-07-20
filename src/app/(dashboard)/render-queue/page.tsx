'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock, CheckCircle, XCircle, AlertCircle, RefreshCw,
  Pause, Play, Trash2, Film, Monitor
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

import { useEffect } from 'react'
import { useProjectStore } from '@/lib/store/project'
import { useAssetStore } from '@/lib/store/asset'
import { formatDistanceToNow } from 'date-fns'

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-text-muted', bg: 'bg-card' },
  processing: { label: 'Processing', icon: RefreshCw, color: 'text-accent', bg: 'bg-accent-muted' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-success', bg: 'bg-success-muted' },
  failed: { label: 'Failed', icon: XCircle, color: 'text-error', bg: 'bg-error-muted' },
}

export default function RenderQueuePage() {
  const [activeTab, setActiveTab] = useState('all')
  const { activeProject } = useProjectStore()
  const { videos, fetchVideos, isLoading } = useAssetStore()

  useEffect(() => {
    if (activeProject) {
      fetchVideos(activeProject.id)
    }
  }, [activeProject, fetchVideos])

  const filteredJobs = activeTab === 'all'
    ? videos
    : videos.filter(j => j.status === activeTab)

  const counts = {
    all: videos.length,
    pending: videos.filter(j => j.status === 'pending').length,
    processing: videos.filter(j => j.status === 'processing').length,
    completed: videos.filter(j => j.status === 'completed').length,
    failed: videos.filter(j => j.status === 'failed').length,
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Render Queue</h1>
          <p className="text-sm text-text-secondary mt-1">Monitor and manage video generation jobs</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Pause className="w-3.5 h-3.5" />
            Pause All
          </Button>
          <Button size="sm" className="gap-2">
            <Play className="w-3.5 h-3.5" />
            Resume All
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon
          const count = counts[key as keyof typeof counts]
          return (
            <div key={key} className="glass-card p-4 flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bg)}>
                <Icon className={cn("w-5 h-5", config.color)} />
              </div>
              <div>
                <p className="text-xl font-bold text-text-primary">{count}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">{config.label}</p>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({counts.processing})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({counts.completed})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({counts.failed})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2 mt-4">
            {filteredJobs.map((job) => {
              const config = statusConfig[job.status as keyof typeof statusConfig]
              const StatusIcon = config.icon
              return (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className={cn(
                    "glass-card p-4 flex items-center gap-4",
                    job.status === 'processing' && "border-accent/20"
                  )}
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                    <StatusIcon className={cn("w-5 h-5", config.color, job.status === 'processing' && 'animate-spin')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-medium text-text-primary">Scene {job.scene_id}</p>
                      <Badge variant={job.status === 'completed' ? 'success' : job.status === 'failed' ? 'error' : 'accent'} className="text-[9px]">
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-text-muted">
                      <span className="flex items-center gap-1"><Film className="w-3 h-3" />{job.model}</span>
                      <span className="flex items-center gap-1"><Monitor className="w-3 h-3" />{'1080p'}</span>
                      <span>{'24fps'}</span>
                      <span>{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                    </div>
                    {job.status === 'failed' && (
                      <p className="text-[10px] text-error mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />Failed to generate
                      </p>
                    )}
                    {job.status === 'processing' && (
                      <Progress value={50} className="h-1 mt-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {job.status === 'processing' && (
                      <span className="text-sm font-bold text-accent">50%</span>
                    )}
                    <div className="flex items-center gap-1">
                      {job.status === 'failed' && (
                        <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer" title="Retry">
                          <RefreshCw className="w-3.5 h-3.5 text-text-muted hover:text-accent" />
                        </button>
                      )}
                      {job.status === 'pending' && (
                        <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer" title="Cancel">
                          <Trash2 className="w-3.5 h-3.5 text-text-muted hover:text-error" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
