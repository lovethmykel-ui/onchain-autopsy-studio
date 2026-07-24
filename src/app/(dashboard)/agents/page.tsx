'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, ChevronRight, Activity, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AGENTS } from '@/lib/constants'
import { cn } from '@/lib/utils'

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
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
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
                    <Badge variant={
                      status === 'completed' ? 'success' :
                      status === 'running' ? 'in-production' :
                      'default'
                    } className="text-[9px]">
                      {status === 'completed' ? 'Completed' : status === 'running' ? 'Running' : 'Waiting'}
                    </Badge>
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
                    <span className="ml-auto">{metrics.lastRun}</span>
                  </div>

                  {/* Supported Models */}
                  {agent.supportedModels && (
                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      {agent.supportedModels.slice(0, 4).map(model => (
                        <span key={model} className="text-[9px] px-1.5 py-0.5 rounded bg-card-elevated border border-border text-text-muted">
                          {model}
                        </span>
                      ))}
                      {agent.supportedModels.length > 4 && (
                        <span className="text-[9px] text-text-muted">+{agent.supportedModels.length - 4} more</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
