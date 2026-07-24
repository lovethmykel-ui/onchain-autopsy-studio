'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, ArrowRight, Settings,
  Zap, Rocket, Layers, Camera, Wand2, Activity
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAppStore } from '@/store/useAppStore'
import { useSettingsStore } from '@/lib/store/settings'
import { WORKFLOW_TYPES, PROJECT_TYPES, DOCUMENTARY_STYLES } from '@/lib/constants'
import { cn } from '@/lib/utils'

// ── Framer Motion Stagger Variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const pipelineNodes = [
  { id: 'src', label: 'Source Material', type: 'input', icon: Layers },
  { id: 'script', label: 'Scripting Engine', type: 'process', icon: Wand2 },
  { id: 'visuals', label: 'Visual Generation', type: 'process', icon: Camera },
  { id: 'audio', label: 'Audio Synthesis', type: 'process', icon: Activity },
  { id: 'render', label: 'Final Render', type: 'output', icon: Play },
]

export default function WorkflowPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [topic, setTopic] = useState('')
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0])
  const [documentaryStyle, setDocumentaryStyle] = useState<string>(DOCUMENTARY_STYLES[0])
  const [isLaunching, setIsLaunching] = useState(false)
  const [activeNode, setActiveNode] = useState('script')

  const router = useRouter()
  const addProject = useAppStore((state) => state.addProject)
  const { apiKeys } = useSettingsStore()

  const handleLaunch = async () => {
    if (!topic.trim()) return

    const hasLLMKey = apiKeys['openai'] || apiKeys['gemini'] || apiKeys['claude'] || apiKeys['openrouter'] || apiKeys['nvidia-llm']
    if (!hasLLMKey) {
      toast.error('No LLM API keys configured. Please add an API key in the API Vault first.')
      return
    }

    setIsLaunching(true)
    
    try {
      const res = await fetch('/api/workflow/start', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${encodeURIComponent(JSON.stringify(apiKeys))}`
        },
        body: JSON.stringify({ topic, type: projectType, style: documentaryStyle })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        toast.success('Production pipeline initialized!')
        addProject({
          id: data.projectId,
          title: topic,
          topic: topic,
          status: 'in_production',
          progress: 5
        })
        router.push('/')
      } else {
        toast.error(data.error || 'Failed to launch pipeline.')
      }
    } catch (error) {
      toast.error('Network error. Failed to start workflow.')
    } finally {
      setIsLaunching(false)
    }
  }

  const activeWfData = WORKFLOW_TYPES.find(w => w.id === selectedWorkflow)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="h-[calc(100vh-100px)] flex gap-4 w-full">
      
      {/* LEFT PANEL: Production Settings */}
      <motion.div variants={itemVariants} className="w-[320px] shrink-0 flex flex-col gap-4">
        <div className="glass-card p-5 rounded-xl flex flex-col h-full border-border">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <Settings className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase font-heading">Production Setup</h2>
          </div>

          <div className="space-y-5 flex-1 overflow-y-auto scrollbar-hide pr-1">
            <div>
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em] mb-2 block">Topic / Brief</label>
              <Input
                placeholder='e.g. "The Fall of FTX"'
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="h-10 bg-background/50 border-border focus:border-accent/50 text-xs"
              />
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em] mb-2 block">Project Type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full h-10 rounded-md bg-background/50 border border-border px-3 text-xs text-text-primary focus:outline-none focus:border-accent/50 cursor-pointer appearance-none"
              >
                {PROJECT_TYPES.map(type => (
                  <option key={type} value={type} className="bg-card">{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em] mb-2 block">Cinematic Style</label>
              <select
                value={documentaryStyle}
                onChange={(e) => setDocumentaryStyle(e.target.value)}
                className="w-full h-10 rounded-md bg-background/50 border border-border px-3 text-xs text-text-primary focus:outline-none focus:border-accent/50 cursor-pointer appearance-none"
              >
                {DOCUMENTARY_STYLES.map(style => (
                  <option key={style} value={style} className="bg-card">{style}</option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em] mb-3 block">Pipeline Preset</label>
              <div className="space-y-2">
                {WORKFLOW_TYPES.map((wf) => (
                  <div
                    key={wf.id}
                    onClick={() => setSelectedWorkflow(wf.id)}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all duration-200 group flex items-center gap-3",
                      selectedWorkflow === wf.id ? "bg-accent/10 border-accent/50" : "bg-background/40 border-border hover:border-border-active"
                    )}
                  >
                    <div className="w-8 h-8 rounded bg-card-elevated flex items-center justify-center shrink-0 border border-border">
                      <wf.icon className="w-4 h-4" style={{ color: selectedWorkflow === wf.id ? wf.color : '#71717A' }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-accent transition-colors">{wf.name}</div>
                      <div className="text-[9px] text-text-muted">{wf.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CENTER PANEL: Canvas Workspace */}
      <motion.div variants={itemVariants} className="flex-1 glass-card rounded-xl border-border flex flex-col relative overflow-hidden">
        {/* Top toolbar */}
        <div className="h-12 border-b border-border bg-card-elevated/50 flex items-center justify-between px-4">
          <div className="text-xs font-semibold text-text-secondary">Node Graph</div>
          <div className="flex gap-2">
            <span className="text-[10px] text-text-muted px-2 py-1 rounded bg-background/50 border border-border">Zoom: 100%</span>
          </div>
        </div>
        
        {/* Node Canvas Area */}
        <div className="flex-1 bg-[#050505] relative flex items-center justify-center p-8 overflow-hidden" style={{ backgroundImage: 'radial-gradient(#1E1E1E 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          
          <div className="flex items-center gap-4">
            {pipelineNodes.map((node, i) => {
              const Icon = node.icon
              const isActive = activeNode === node.id
              return (
                <React.Fragment key={node.id}>
                  <div 
                    onClick={() => setActiveNode(node.id)}
                    className={cn(
                      "flex flex-col items-center gap-3 cursor-pointer group transition-all",
                      isActive ? "scale-110" : "opacity-60 hover:opacity-100 hover:scale-105"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl relative z-10",
                      isActive ? "bg-card-elevated border-accent shadow-[0_0_30px_rgba(225,29,72,0.2)]" : "bg-card border-border shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    )}>
                      <Icon className={cn("w-6 h-6 transition-colors", isActive ? "text-accent" : "text-text-muted")} />
                    </div>
                    <div className={cn("text-[10px] font-bold uppercase tracking-wider font-mono", isActive ? "text-white" : "text-text-muted")}>
                      {node.label}
                    </div>
                  </div>
                  {i < pipelineNodes.length - 1 && (
                    <div className="w-12 h-0.5 bg-border relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-border" />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* Bottom Timeline/Status */}
        <div className="h-16 border-t border-border bg-card-elevated/50 flex items-center justify-between px-6">
           <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
             <span className="text-xs text-text-secondary font-mono">Engine Idle</span>
           </div>
           
           <Button
              onClick={handleLaunch}
              disabled={!topic.trim() || !selectedWorkflow || isLaunching}
              className="gap-2 bg-accent hover:bg-accent-hover text-white shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all h-9 px-6 rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              {isLaunching ? 'Initializing Sequence...' : 'Initialize Generation'}
            </Button>
        </div>
      </motion.div>

      {/* RIGHT PANEL: Properties Inspector */}
      <motion.div variants={itemVariants} className="w-[280px] shrink-0 glass-card p-5 rounded-xl border-border flex flex-col">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
          <Activity className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase font-heading">Inspector</h2>
        </div>

        {activeWfData ? (
           <div className="space-y-6">
             <div>
               <h3 className="text-xs font-bold text-white mb-1">{activeWfData.name}</h3>
               <p className="text-[10px] text-text-muted leading-relaxed">{activeWfData.description}</p>
             </div>
             
             <div className="space-y-3">
                <div className="text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] border-b border-border pb-1">Assigned Agents</div>
                <div className="space-y-2">
                  {activeWfData.agents.map((agentId) => (
                    <div key={agentId} className="flex items-center gap-2 bg-background/50 border border-border p-2 rounded text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-text-secondary font-mono text-[10px]">{agentId}</span>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="space-y-3">
                <div className="text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] border-b border-border pb-1">Node Properties</div>
                <div className="bg-background/50 border border-border p-3 rounded space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-muted">Target Node:</span>
                    <span className="text-white font-mono">{activeNode.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-muted">Status:</span>
                    <span className="text-success font-mono">Ready</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-muted">Compute:</span>
                    <span className="text-white font-mono">Auto</span>
                  </div>
                </div>
             </div>
           </div>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-center opacity-50">
            <Settings className="w-8 h-8 text-text-muted mb-3" />
            <p className="text-[10px] text-text-muted max-w-[150px]">Select a pipeline preset to view properties</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

