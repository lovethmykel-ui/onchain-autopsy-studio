'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Settings } from 'lucide-react'

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

  return (
    <div className="flex flex-col h-full justify-between p-1">
      <div>
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-[9px] font-bold tracking-[1.5px] text-text-muted uppercase mb-1 font-heading">
            PRODUCTION PIPELINE
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-white tracking-tight">
              OneCoin Documentary
            </div>
            <div className="inline-flex items-center gap-1.5 text-[9px] font-bold text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              In Progress
            </div>
          </div>
        </div>

        {/* 13-Step Vertical Timeline */}
        <div className="flex flex-col space-y-1 mt-3 relative">
          {steps.map((step) => {
            const isCompleted = step.status === 'completed'
            const isActive = step.status === 'active'

            return (
              <div
                key={step.id}
                onClick={() => router.push('/workflow')}
                className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#141F36] border border-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.25)]'
                    : isCompleted
                    ? 'bg-surface hover:bg-card-hover'
                    : 'bg-transparent hover:bg-surface/50'
                }`}
              >
                {/* Step Number Badge & Name */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isCompleted
                        ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                        : isActive
                        ? 'bg-[#2563EB] text-white shadow-[0_0_10px_rgba(37,99,235,0.6)]'
                        : 'bg-card-elevated text-text-muted border border-border'
                    }`}
                  >
                    {String(step.id).padStart(2, '0')}
                  </div>

                  <span
                    className={`text-xs truncate ${
                      isActive
                        ? 'font-bold text-white'
                        : isCompleted
                        ? 'font-medium text-text-primary'
                        : 'font-normal text-text-muted'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 shrink-0 pl-2">
                  <span
                    className={`text-[10px] font-medium ${
                      isCompleted
                        ? 'text-[#10B981]'
                        : isActive
                        ? 'text-[#3B82F6]'
                        : 'text-text-muted'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Waiting'}
                  </span>

                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? 'bg-[#10B981] text-black shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                        : isActive
                        ? 'border-2 border-[#3B82F6] bg-transparent'
                        : 'border border-border bg-transparent'
                    }`}
                  >
                    {isCompleted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Manage Workflow Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push('/workflow')}
        className="w-full mt-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#2563EB] hover:to-[#3B82F6] text-white text-xs font-bold shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Settings className="w-4 h-4" />
        Manage Workflow
      </motion.button>
    </div>
  )
}
