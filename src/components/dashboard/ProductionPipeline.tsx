'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Settings, Sparkles } from 'lucide-react'
import { useProjectStore } from '@/lib/store/project'

const steps = [
  { id: 1, name: 'Blockchain Investigator', status: 'completed' },
  { id: 2, name: 'Research Director', status: 'completed' },
  { id: 3, name: 'Screenwriter', status: 'completed' },
  { id: 4, name: 'Storyboard Director', status: 'completed' },
  { id: 5, name: 'Prompt Engineer', status: 'completed' },
  { id: 6, name: 'Image Director', status: 'completed' },
  { id: 7, name: 'Video Director', status: 'active' },
  { id: 8, name: 'Voice Director', status: 'waiting' },
  { id: 9, name: 'Music Director', status: 'waiting' },
  { id: 10, name: 'Sound Design Director', status: 'waiting' },
  { id: 11, name: 'Editor Agent', status: 'waiting' },
  { id: 12, name: 'Quality Control', status: 'waiting' },
  { id: 13, name: 'YouTube Director', status: 'waiting' },
]

export default function ProductionPipeline() {
  const router = useRouter()
  const { activeProject } = useProjectStore()

  // Derive steps based on project progress (mock logic for visual feedback)
  const progress = activeProject?.progress || 0
  const isStarted = activeProject?.status === 'in_production' || activeProject?.status === 'completed'
  const isComplete = activeProject?.status === 'completed'

  const activeStepId = isComplete ? 14 : isStarted ? Math.floor(progress / (100 / 13)) + 1 : 7

  const dynamicSteps = steps.map(step => ({
    ...step,
    status: isComplete || step.id < activeStepId ? 'completed' : step.id === activeStepId ? 'active' : 'waiting'
  }))

  return (
    <div className="flex flex-col h-full justify-between p-1">
      <div>
        {/* Header */}
        <div className="mb-4 pb-3 border-b border-white/[0.06]">
          <div className="text-[10px] font-mono font-semibold tracking-eyebrow text-zinc-400 uppercase mb-1">
            Production Pipeline
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-semibold text-white tracking-tight-heading truncate">
              {activeProject ? activeProject.title : "Silk Road Autopsy"}
            </div>
            <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Step {activeStepId}/13</span>
            </div>
          </div>
        </div>

        {/* 13-Step Vertical Timeline */}
        <div className="flex flex-col space-y-1.5 mt-2 relative">
          {dynamicSteps.map((step) => {
            const isCompleted = step.status === 'completed'
            const isActive = step.status === 'active'

            return (
              <div
                key={step.id}
                onClick={() => router.push('/workflow')}
                className={`btn-tactile flex items-center justify-between p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'apple-glass bg-accent/10 border-accent/40 shadow-[0_0_20px_rgba(225,29,72,0.2)]'
                    : isCompleted
                    ? 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08]'
                    : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]'
                }`}
              >
                {/* Step Number Badge & Name */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : isActive
                        ? 'bg-accent text-white shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                        : 'bg-white/[0.04] text-zinc-500 border border-white/[0.06]'
                    }`}
                  >
                    {String(step.id).padStart(2, '0')}
                  </div>

                  <span
                    className={`text-xs truncate ${
                      isActive
                        ? 'font-semibold text-white'
                        : isCompleted
                        ? 'font-medium text-zinc-300'
                        : 'font-normal text-zinc-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 shrink-0 pl-2">
                  <span
                    className={`text-[9px] font-mono ${
                      isCompleted
                        ? 'text-emerald-400'
                        : isActive
                        ? 'text-accent font-semibold'
                        : 'text-zinc-600'
                    }`}
                  >
                    {isCompleted ? 'Done' : isActive ? 'Active' : 'Queue'}
                  </span>

                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isActive
                        ? 'border-2 border-accent bg-transparent'
                        : 'border border-white/10 bg-transparent'
                    }`}
                  >
                    {isCompleted && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
                    {isActive && <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Manage Workflow Button */}
      <button
        onClick={() => router.push('/workflow')}
        className="btn-tactile w-full mt-4 py-2.5 rounded-xl apple-glass bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent hover:text-white text-xs font-semibold shadow-[0_0_20px_rgba(225,29,72,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Manage Agent Pipeline</span>
      </button>
    </div>
  )
}
