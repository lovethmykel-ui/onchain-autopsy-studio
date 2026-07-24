'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, ChevronRight, Activity, Settings, X, Save } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AGENTS, API_PROVIDERS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import { useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const agentStatuses = [
  'waiting', 'waiting', 'waiting', 'waiting', 'waiting',
  'waiting', 'waiting', 'waiting', 'waiting', 'waiting',
  'waiting', 'waiting', 'waiting',
]

const agentMetrics = [
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
  { tokensUsed: 0, cost: 0, duration: '—', lastRun: 'Never' },
]

export default function AgentsPage() {
  const agentConfigs = useAppStore(state => state.agentConfigs)
  const setAgentConfig = useAppStore(state => state.setAgentConfig)
  
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null)
  const [tempConfig, setTempConfig] = useState<{ model?: string, systemPrompt?: string }>({})

  const handleOpenConfig = (id: number) => {
    setSelectedAgentId(id)
    setTempConfig(agentConfigs[id] || {})
  }

  const handleSaveConfig = () => {
    if (selectedAgentId !== null) {
      setAgentConfig(selectedAgentId, tempConfig)
      setSelectedAgentId(null)
    }
  }

  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId)
  
  // For dropdowns:
  const getAgentModels = (agent: typeof AGENTS[0]) => {
    if (agent.supportedModels) return agent.supportedModels.map(m => ({ id: m, name: m }))
    if (agent.role === 'Research' || agent.role === 'Structure' || agent.role === 'Script' || agent.role === 'Publishing') {
      return API_PROVIDERS.filter(p => p.category === 'LLM').map(p => ({ id: p.id, name: p.name }))
    }
    return []
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 relative">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">AI Agents</h1>
          <p className="text-sm text-text-secondary mt-1">13 specialized AI agents powering the documentary pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="gap-1.5">
            <div className="status-dot status-dot-active" />
            13/13 Online
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-3.5 h-3.5" />
            Configure
          </Button>
        </div>
      </motion.div>

      {/* Agent Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {AGENTS.map((agent, i) => {
          const status = agentStatuses[i]
          const metrics = agentMetrics[i]
          const Icon = agent.icon

          return (
            <motion.div
              key={agent.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className={cn(
                "glass-card p-5 cursor-pointer group transition-all duration-200",
                status === 'running' && "border-accent/30 accent-glow"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${agent.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: agent.color }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-text-muted">AGENT {String(agent.id).padStart(2, '0')}</span>
                      <h3 className="text-sm font-semibold text-text-primary">{agent.name}</h3>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenConfig(agent.id)
                      }}
                    >
                      <Settings className="w-3.5 h-3.5 text-text-muted hover:text-white" />
                    </Button>
                  </div>
                  <p className="text-[11px] text-text-secondary mb-3">{agent.description}</p>

                  {/* Progress bar for running agent */}
                  {status === 'running' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-text-muted">Processing...</span>
                        <span className="text-[10px] font-bold text-accent">64%</span>
                      </div>
                      <Progress value={64} className="h-1.5" />
                    </div>
                  )}

                  {/* Metrics */}
                  <div className="flex items-center gap-4 text-[10px] text-text-muted">
                    {metrics.tokensUsed > 0 && (
                      <span>Tokens: {metrics.tokensUsed.toLocaleString()}</span>
                    )}
                    {metrics.cost > 0 && (
                      <span>Cost: ${metrics.cost.toFixed(2)}</span>
                    )}
                    <span>{metrics.duration !== '—' ? `Duration: ${metrics.duration}` : ''}</span>
                  </div>

                  {/* Configured State */}
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                    {agentConfigs[agent.id]?.model ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/20 border border-accent/30 text-accent font-medium">
                        Model: {agentConfigs[agent.id].model}
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-card-elevated border border-border text-text-muted">
                        Default Model
                      </span>
                    )}
                    
                    {agentConfigs[agent.id]?.systemPrompt && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-success/20 border border-success/30 text-success font-medium">
                        Custom Instructions
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedAgentId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-6 shadow-2xl flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${selectedAgent.color}15` }}>
                    <selectedAgent.icon className="w-5 h-5" style={{ color: selectedAgent.color }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white leading-tight">{selectedAgent.name}</h2>
                    <p className="text-xs text-text-secondary">{selectedAgent.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedAgentId(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Assigned Model</label>
                  <select 
                    className="w-full h-10 bg-black/40 border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:border-accent"
                    value={tempConfig.model || ''}
                    onChange={(e) => setTempConfig(prev => ({ ...prev, model: e.target.value }))}
                  >
                    <option value="">Default (Auto-select)</option>
                    {getAgentModels(selectedAgent).map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">System Prompt Instructions</label>
                  <textarea 
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-accent resize-none placeholder:text-white/20"
                    placeholder={`Provide specialized instructions for the ${selectedAgent.name}...`}
                    value={tempConfig.systemPrompt || ''}
                    onChange={(e) => setTempConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                  />
                  <p className="text-[10px] text-text-secondary">These instructions will be appended to the agent's core personality prompt.</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setSelectedAgentId(null)}>Cancel</Button>
                <Button className="bg-accent hover:bg-accent-hover text-white gap-2" onClick={handleSaveConfig}>
                  <Save className="w-4 h-4" />
                  Save Configuration
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
