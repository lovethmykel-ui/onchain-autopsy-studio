'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Filter, Grid, List,
  Camera, Sun, MapPin, Palette, Eye,
  ChevronRight, X, Maximize2
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const shotTypes = ['Wide Shot', 'Medium Shot', 'Close-up', 'Extreme Close-up', 'Over-the-shoulder', 'Aerial', 'POV', 'Tracking']
const moods = ['Suspenseful', 'Dramatic', 'Tense', 'Hopeful', 'Dark', 'Neutral', 'Energetic', 'Melancholic']

const gradients = [
  'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)',
  'linear-gradient(135deg, #1a0a0a 0%, #3e1a1a 50%, #1a0a0a 100%)',
  'linear-gradient(135deg, #0a1a0a 0%, #1a3e1a 50%, #0a1a0a 100%)',
  'linear-gradient(135deg, #1a1a0a 0%, #3e3e1a 50%, #1a1a0a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  'linear-gradient(135deg, #0a1a1a 0%, #1a3e3e 50%, #0a1a1a 100%)',
]

import { useEffect } from 'react'
import { useProjectStore } from '@/lib/store/project'
import { useScriptStore } from '@/lib/store/script'
import { useStoryboardStore } from '@/lib/store/storyboard'
import { useAssetStore } from '@/lib/store/asset'
import { useRouter } from 'next/navigation'

export default function StoryboardVaultPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedScene, setSelectedScene] = useState<any>(null)
  const [selectedModel, setSelectedModel] = useState<string>('Luma')
  const router = useRouter()

  const { activeProject } = useProjectStore()
  const { scripts, fetchScripts } = useScriptStore()
  const { storyboards, fetchStoryboards, generateStoryboard, isGenerating } = useStoryboardStore()
  const { generateVideo } = useAssetStore()

  useEffect(() => {
    if (activeProject) {
      fetchScripts(activeProject.id)
      fetchStoryboards(activeProject.id)
    }
  }, [activeProject, fetchScripts, fetchStoryboards])

  const activeStoryboard = storyboards[0]
  const scenes = activeStoryboard?.scenes ? (activeStoryboard.scenes as any[]) : []
  
  const handleGenerate = async () => {
    if (!activeProject) return
    const script = scripts[0]
    if (!script) {
      // Need a script first
      router.push('/script-vault')
      return
    }
    await generateStoryboard(activeProject.id, script.id, script.narration || '', activeProject.topic)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Storyboard Vault</h1>
          <p className="text-sm text-text-secondary mt-1">Generated scenes, shot lists, and camera instructions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-card border border-border rounded-md p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={cn("p-1.5 rounded cursor-pointer transition-colors", viewMode === 'grid' ? 'bg-accent-muted text-accent' : 'text-text-muted hover:text-text-secondary')}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn("p-1.5 rounded cursor-pointer transition-colors", viewMode === 'list' ? 'bg-accent-muted text-accent' : 'text-text-muted hover:text-text-secondary')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating || !activeProject} className="gap-2">
            <Plus className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate Storyboard'}
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search scenes..." className="pl-10" />
        </div>
        <Badge variant="accent">{scenes.length} Scenes</Badge>
      </motion.div>

      {/* Grid View */}
      {scenes.length === 0 && !isGenerating && (
        <div className="py-12 text-center border border-dashed border-border rounded-lg">
          <p className="text-text-muted mb-4">No storyboard generated for this project yet.</p>
          <Button variant="outline" onClick={handleGenerate}>Generate Storyboard</Button>
        </div>
      )}
      
      {viewMode === 'grid' && scenes.length > 0 ? (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => setSelectedScene({...scene, gradient: gradients[i % gradients.length]})}
              className="rounded-lg border border-border overflow-hidden cursor-pointer group hover:border-border-hover transition-all duration-200"
            >
              <div className="h-32 relative" style={{ background: gradients[i % gradients.length] }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[9px] font-bold text-white">
                  Scene {scene.sceneNumber}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                    <Maximize2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-[9px] text-white/80 line-clamp-2">{scene.visualDescription}</p>
                </div>
              </div>
              <div className="p-2.5 bg-card-elevated space-y-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/10 text-accent">{scene.shotType}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-card text-text-muted">{scene.duration}s</span>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-text-muted">
                  <Camera className="w-3 h-3" />
                  <span className="truncate">{scene.cameraMovement}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : scenes.length > 0 ? (
        /* List View */
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              onClick={() => setSelectedScene({...scene, gradient: gradients[i % gradients.length]})}
              className="glass-card p-4 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-24 h-16 rounded-md shrink-0 relative overflow-hidden" style={{ background: gradients[i % gradients.length] }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white/80">#{scene.sceneNumber}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text-primary truncate mb-1">{scene.visualDescription}</p>
                <div className="flex items-center gap-3 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1"><Camera className="w-3 h-3" />{scene.shotType}</span>
                  <span className="flex items-center gap-1"><Sun className="w-3 h-3" />{scene.lighting}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{scene.location}</span>
                  <span className="flex items-center gap-1"><Palette className="w-3 h-3" />{scene.mood}</span>
                </div>
              </div>
              <Badge variant="accent" className="text-[9px] shrink-0">{scene.duration}s</Badge>
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors shrink-0" />
            </motion.div>
          ))}
        </motion.div>
      ) : null}

      {/* Scene Detail Modal */}
      <AnimatePresence>
        {selectedScene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setSelectedScene(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl glass-card-elevated border border-border-hover overflow-hidden"
            >
              <div className="h-48 relative" style={{ background: selectedScene.gradient }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white">
                  Scene {selectedScene.sceneNumber}
                </div>
                <button
                  onClick={() => setSelectedScene(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="p-6 -mt-6 relative">
                <h3 className="text-lg font-bold text-text-primary mb-3">Visual Description</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{selectedScene.visualDescription}</p>
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem icon={<Camera className="w-4 h-4" />} label="Shot Type" value={selectedScene.shotType} />
                  <DetailItem icon={<Eye className="w-4 h-4" />} label="Camera" value={selectedScene.cameraMovement} />
                  <DetailItem icon={<Sun className="w-4 h-4" />} label="Lighting" value={selectedScene.lighting} />
                  <DetailItem icon={<MapPin className="w-4 h-4" />} label="Location" value={selectedScene.location} />
                  <DetailItem icon={<Palette className="w-4 h-4" />} label="Mood" value={selectedScene.mood} />
                  <DetailItem icon={<Eye className="w-4 h-4" />} label="Duration" value={`${selectedScene.duration} seconds`} />
                </div>
                
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">Model:</span>
                    <select 
                      className="bg-card border border-border rounded text-xs px-2 py-1 text-text-primary"
                      value={selectedModel}
                      onChange={e => setSelectedModel(e.target.value)}
                    >
                      <option value="Luma">Luma Dream Machine</option>
                      <option value="Runway">Runway Gen-3</option>
                    </select>
                  </div>
                  <Button 
                    className="gap-2" 
                    onClick={() => {
                      if (!activeProject) return
                      // trigger generate video
                      generateVideo(
                        activeProject.id, 
                        selectedScene.sceneNumber.toString(), 
                        selectedScene.visualDescription, 
                        selectedModel
                      )
                      setSelectedScene(null)
                      router.push('/render-queue')
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Render Scene to Video
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border">
      <div className="text-text-muted">{icon}</div>
      <div>
        <p className="text-[10px] text-text-muted">{label}</p>
        <p className="text-xs font-medium text-text-primary">{value}</p>
      </div>
    </div>
  )
}
