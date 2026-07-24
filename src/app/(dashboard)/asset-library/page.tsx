'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Filter, Grid, List, Upload,
  Image, Film, Mic, Music, Volume2, Download,
  Clock, Eye, MoreHorizontal, Play
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const gradients = [
  'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 100%)',
  'linear-gradient(135deg, #1a0a0a 0%, #3e1a1a 100%)',
  'linear-gradient(135deg, #0a1a0a 0%, #1a3e1a 100%)',
  'linear-gradient(135deg, #1a1a0a 0%, #3e3e1a 100%)',
  'linear-gradient(135deg, #1a0a1a 0%, #3e1a3e 100%)',
  'linear-gradient(135deg, #0a1a1a 0%, #1a3e3e 100%)',
]

import { useEffect } from 'react'
import { useProjectStore } from '@/lib/store/project'
import { useAssetStore } from '@/lib/store/asset'
import { formatDistanceToNow } from 'date-fns'

const tabs = [
  { id: 'images', label: 'Images', icon: Image, count: 0 },
  { id: 'videos', label: 'Videos', icon: Film, count: 0 },
  { id: 'voices', label: 'Voices', icon: Mic, count: 0 },
  { id: 'music', label: 'Music', icon: Music, count: 0 },
  { id: 'sfx', label: 'SFX', icon: Volume2, count: 0 },
  { id: 'exports', label: 'Exports', icon: Download, count: 0 },
]

export default function AssetLibraryPage() {
  const [activeTab, setActiveTab] = useState('videos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { activeProject } = useProjectStore()
  const { videos, images, audio, fetchVideos, fetchImages, fetchAudio } = useAssetStore()

  useEffect(() => {
    if (activeProject) {
      fetchVideos(activeProject.id)
      fetchImages(activeProject.id)
      fetchAudio(activeProject.id)
    }
  }, [activeProject, fetchVideos, fetchImages, fetchAudio])

  const completedVideos = videos.filter(v => v.status === 'completed')

  const dynamicTabs = tabs.map(t => {
    if (t.id === 'videos') return { ...t, count: completedVideos.length }
    if (t.id === 'images') return { ...t, count: images.length }
    if (t.id === 'voices') return { ...t, count: audio.filter(a => ['narration', 'interview', 'character'].includes(a.type || '')).length }
    if (t.id === 'music') return { ...t, count: audio.filter(a => ['music'].includes((a.type as string) || '')).length }
    if (t.id === 'sfx') return { ...t, count: audio.filter(a => ['sfx'].includes((a.type as string) || '')).length }
    return t
  })

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Asset Library</h1>
          <p className="text-sm text-text-secondary mt-1">Images, videos, voiceovers, music, sound effects, and exports</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Asset
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {dynamicTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  <span className="text-[9px] opacity-60">({tab.count})</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <Input placeholder="Search..." className="pl-8 h-8 text-xs" />
          </div>
          <div className="flex items-center bg-card border border-border rounded-md p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={cn("p-1.5 rounded cursor-pointer transition-colors", viewMode === 'grid' ? 'bg-accent-muted text-accent' : 'text-text-muted')}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn("p-1.5 rounded cursor-pointer transition-colors", viewMode === 'list' ? 'bg-accent-muted text-accent' : 'text-text-muted')}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Images Grid */}
      {(activeTab === 'images') && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3" : "space-y-2"}
        >
          {images.map((img, i) => (
            viewMode === 'grid' ? (
              <motion.div
                key={img.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="rounded-lg border border-border overflow-hidden cursor-pointer group hover:border-border-hover transition-all duration-200"
              >
                <div className="aspect-square relative flex items-center justify-center bg-card">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  {img.url ? (
                    <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: gradients[i % gradients.length] }} />
                  )}
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20">
                    <button className="p-1 rounded bg-black/40 backdrop-blur hover:bg-black/60 transition-colors cursor-pointer" onClick={() => window.open(img.url || '', '_blank')}>
                      <Eye className="w-3 h-3 text-white" />
                    </button>
                    <button className="p-1 rounded bg-black/40 backdrop-blur hover:bg-black/60 transition-colors cursor-pointer" onClick={() => window.open(img.url || '', '_blank')}>
                      <Download className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-2 bg-card-elevated">
                  <p className="text-[10px] font-medium text-text-primary truncate" title={img.prompt}>{img.prompt}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-text-muted">{img.model}</span>
                    <span className="text-[9px] text-text-muted">{formatDistanceToNow(new Date(img.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={img.id}
                variants={itemVariants}
                className="glass-card p-3 flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-md shrink-0 overflow-hidden bg-card">
                  {img.url ? (
                    <img src={img.url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: gradients[i % gradients.length] }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate" title={img.prompt}>{img.prompt}</p>
                  <p className="text-[10px] text-text-muted">{img.model} • {formatDistanceToNow(new Date(img.created_at), { addSuffix: true })}</p>
                </div>
                <Badge variant="accent" className="text-[9px]">{img.type || 'image'}</Badge>
              </motion.div>
            )
          ))}
          {images.length === 0 && (
            <div className="col-span-full glass-card p-12 flex flex-col items-center justify-center">
              <Image className="w-10 h-10 text-text-muted mb-3" />
              <p className="text-sm text-text-secondary mb-1">No images yet.</p>
              <p className="text-xs text-text-muted">Generate images to see them here.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Audio-based tabs */}
      {(['voices', 'music', 'sfx'].includes(activeTab)) && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
          {audio
            .filter(item => {
              if (activeTab === 'voices') return ['narration', 'interview', 'character', 'quote'].includes(item.type || '')
              if (activeTab === 'music') return (item.type as string) === 'music'
              return (item.type as string) === 'sfx'
            })
            .map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="glass-card p-4 flex items-center gap-4 cursor-pointer group hover:border-border-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center shrink-0" onClick={() => item.url && new Audio(item.url).play()}>
                  <Play className="w-4 h-4 text-accent ml-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate" title={item.transcript || ''}>{item.transcript || 'Audio Asset'}</p>
                  <p className="text-[10px] text-text-muted">{item.model}</p>
                </div>
                <span className="text-xs text-text-secondary font-mono">{(item.duration || 0).toFixed(1)}s</span>
                <Badge variant="accent" className="text-[9px]">{item.type || 'audio'}</Badge>
                <span className="text-[10px] text-text-muted min-w-[60px] text-right">{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</span>
                <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer opacity-0 group-hover:opacity-100" onClick={() => window.open(item.url || '', '_blank')}>
                  <Download className="w-3.5 h-3.5 text-text-muted" />
                </button>
              </motion.div>
            ))}
          {audio.filter(item => {
            if (activeTab === 'voices') return ['narration', 'interview', 'character', 'quote'].includes(item.type || '')
            if (activeTab === 'music') return (item.type as string) === 'music'
            return (item.type as string) === 'sfx'
          }).length === 0 && (
            <div className="glass-card p-12 flex flex-col items-center justify-center">
              {activeTab === 'voices' ? <Mic className="w-10 h-10 text-text-muted mb-3" /> : activeTab === 'music' ? <Music className="w-10 h-10 text-text-muted mb-3" /> : <Volume2 className="w-10 h-10 text-text-muted mb-3" />}
              <p className="text-sm text-text-secondary mb-1">No {activeTab} yet.</p>
              <p className="text-xs text-text-muted">Generate {activeTab} to see them here.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Videos / Exports placeholder */}
      {(['videos'].includes(activeTab)) && (
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3" : "space-y-2"}
        >
          {completedVideos.map((video, i) => (
            viewMode === 'grid' ? (
              <motion.div
                key={video.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="rounded-lg border border-border overflow-hidden cursor-pointer group hover:border-border-hover transition-all duration-200"
              >
                <div className="aspect-square relative bg-card flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  
                  {video.url ? (
                    <video src={video.url} className="w-full h-full object-cover" muted loop playsInline onMouseOver={(e) => (e.target as HTMLVideoElement).play()} onMouseOut={(e) => (e.target as HTMLVideoElement).pause()} />
                  ) : (
                    <Film className="w-8 h-8 text-text-muted" />
                  )}

                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20">
                    <button className="p-1 rounded bg-black/40 backdrop-blur hover:bg-black/60 transition-colors cursor-pointer">
                      <Eye className="w-3 h-3 text-white" />
                    </button>
                    <button className="p-1 rounded bg-black/40 backdrop-blur hover:bg-black/60 transition-colors cursor-pointer" onClick={() => window.open(video.url || '', '_blank')}>
                      <Download className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-2 bg-card-elevated">
                  <p className="text-[10px] font-medium text-text-primary truncate" title={video.prompt || ''}>
                    {video.prompt || `Scene ${video.scene_id}`}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-text-muted">{video.model}</span>
                    <span className="text-[9px] text-text-muted">{formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="glass-card p-3 flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-md shrink-0 bg-card flex items-center justify-center overflow-hidden">
                   {video.url ? (
                    <video src={video.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <Film className="w-4 h-4 text-text-muted" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{video.prompt || `Scene ${video.scene_id}`}</p>
                  <p className="text-[10px] text-text-muted">{video.model} • {formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}</p>
                </div>
                <Badge variant="accent" className="text-[9px]">Video</Badge>
              </motion.div>
            )
          ))}
          {completedVideos.length === 0 && (
            <div className="col-span-full glass-card p-12 flex flex-col items-center justify-center">
              <Film className="w-10 h-10 text-text-muted mb-3" />
              <p className="text-sm text-text-secondary mb-1">No completed videos yet.</p>
              <p className="text-xs text-text-muted">Generate videos from the Storyboard Vault.</p>
            </div>
          )}
        </motion.div>
      )}

      {(['exports'].includes(activeTab)) && (
        <div className="glass-card p-12 flex flex-col items-center justify-center">
          <Download className="w-10 h-10 text-text-muted mb-3" />
          <p className="text-sm text-text-secondary mb-1">Export packages</p>
          <p className="text-xs text-text-muted">Run a production pipeline to generate {activeTab}</p>
        </div>
      )}
    </motion.div>
  )
}
