'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, ArrowRight, ChevronDown, Settings,
  Zap, Rocket, Clock
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { WORKFLOW_TYPES, AGENTS, PROJECT_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const pipelineSteps = [
  'Topic', 'Research', 'Script', 'Storyboard', 'Prompt Gen',
  'Image Gen', 'Video Gen', 'Voice Gen', 'Music Gen',
  'Sound Design', 'Editing', 'QC', 'Publishing', 'Export',
]

export default function WorkflowPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [topic, setTopic] = useState('')
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0])
  const [isLaunching, setIsLaunching] = useState(false)

  const handleLaunch = () => {
    if (!topic.trim()) return
    setIsLaunching(true)
    setTimeout(() => setIsLaunching(false), 3000)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Workflow Engine</h1>
          <p className="text-sm text-text-secondary mt-1">Launch AI-powered documentary production pipelines</p>
        </div>
      </motion.div>

      {/* Topic Input */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-accent" />
          <h2 className="text-base font-semibold text-text-primary">Launch New Production</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">Topic / Prompt</label>
            <Input
              placeholder='e.g. "OneCoin Crypto Fraud", "FTX Collapse", "Pig Butchering Scams"'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">Project Type</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value as typeof projectType)}
              className="w-full h-11 rounded-md bg-card border border-border px-3 text-sm text-text-primary focus:outline-none focus:border-accent/50 cursor-pointer"
            >
              {PROJECT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Workflow Selection */}
      <motion.div variants={itemVariants}>
        <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase mb-3">SELECT WORKFLOW</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKFLOW_TYPES.map((wf) => {
            const Icon = wf.icon
            const isSelected = selectedWorkflow === wf.id
            const agentList = wf.agents.map(id => AGENTS.find(a => a.id === id)?.name || '').filter(Boolean)

            return (
              <motion.div
                key={wf.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedWorkflow(isSelected ? null : wf.id)}
                className={cn(
                  "glass-card p-5 cursor-pointer transition-all duration-200",
                  isSelected && "border-accent/40 accent-glow-strong"
                )}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${wf.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: wf.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">{wf.name}</h3>
                    <p className="text-[10px] text-text-muted">{wf.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="accent" className="text-[9px]">{wf.agents.length} Agents</Badge>
                  <Badge variant="default" className="text-[9px]">{wf.subtitle}</Badge>
                </div>

                {/* Agent pills */}
                <div className="flex items-center gap-1 flex-wrap">
                  {agentList.slice(0, 5).map(name => (
                    <span key={name} className="text-[8px] px-1.5 py-0.5 rounded bg-card-elevated border border-border text-text-muted">{name}</span>
                  ))}
                  {agentList.length > 5 && (
                    <span className="text-[8px] text-text-muted">+{agentList.length - 5} more</span>
                  )}
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleLaunch(); }}
                      disabled={!topic.trim() || isLaunching}
                      className="w-full gap-2"
                    >
                      {isLaunching ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Launching Pipeline...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Launch {wf.name}
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Pipeline Visualization */}
      <motion.div variants={itemVariants} className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-semibold text-text-primary">Full Documentary Pipeline</h2>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={step}>
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-[10px] font-medium whitespace-nowrap shrink-0",
                i < 7 ? "bg-accent-muted text-accent" :
                i === 7 ? "bg-accent text-white" :
                "bg-card-elevated text-text-muted border border-border"
              )}>
                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-bold">
                  {i + 1}
                </span>
                {step}
              </div>
              {i < pipelineSteps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-text-muted shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
