'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Search, Filter, Clock, FileText, Mic,
  ChevronRight, BookOpen, Eye, Download, Copy
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const mockScripts = [
  {
    id: '1', title: 'OneCoin: The Billion Dollar Lie', duration: '60min', project: 'OneCoin Documentary',
    status: 'completed', words: 8420, scenes: 42, created: '2026-05-20',
    excerpt: 'In 2014, a charismatic Bulgarian-German woman named Ruja Ignatova stood before thousands of cheering supporters in Sofia, Bulgaria. She promised them a revolution — a cryptocurrency that would overtake Bitcoin and change the world...',
  },
  {
    id: '2', title: 'OneCoin: Condensed Version', duration: '30min', project: 'OneCoin Documentary',
    status: 'completed', words: 4210, scenes: 24, created: '2026-05-20',
    excerpt: 'What if everything you believed about a new digital currency was a lie? That\'s the story of OneCoin — the biggest cryptocurrency fraud in history...',
  },
  {
    id: '3', title: 'FTX: Castle of Cards', duration: '60min', project: 'FTX Collapse',
    status: 'in_progress', words: 6100, scenes: 36, created: '2026-05-18',
    excerpt: 'Sam Bankman-Fried was the golden boy of crypto. A MIT graduate who built a multi-billion dollar empire before the age of 30...',
  },
  {
    id: '4', title: 'OneCoin: YouTube Short', duration: '15min', project: 'OneCoin Documentary',
    status: 'completed', words: 2100, scenes: 12, created: '2026-05-19',
    excerpt: 'She was the crypto queen. She promised billions a better future. Then she vanished...',
  },
]

const durationColors: Record<string, string> = {
  '15min': '#10B981',
  '30min': '#F59E0B',
  '60min': '#1F6FEB',
}

export default function ScriptVaultPage() {
  const [selectedScript, setSelectedScript] = useState<string | null>(null)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Script Vault</h1>
          <p className="text-sm text-text-secondary mt-1">Documentary narrations, voiceover scripts, and scene notes</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Generate Script
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search scripts..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </Button>
      </motion.div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockScripts.map((script) => (
          <motion.div
            key={script.id}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedScript(selectedScript === script.id ? null : script.id)}
            className={cn(
              "glass-card p-5 cursor-pointer group transition-all duration-200",
              selectedScript === script.id && "border-accent/30 accent-glow"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
                    {script.title}
                  </h3>
                </div>
                <p className="text-[10px] text-text-muted">{script.project}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  className="text-[9px]"
                  style={{
                    backgroundColor: `${durationColors[script.duration]}15`,
                    color: durationColors[script.duration],
                    borderColor: `${durationColors[script.duration]}30`,
                  }}
                >
                  {script.duration}
                </Badge>
                <Badge variant={script.status === 'completed' ? 'success' : 'accent'}>
                  {script.status === 'completed' ? 'Complete' : 'Writing'}
                </Badge>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-card-elevated rounded-md p-3 mb-3 border border-border">
              <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3 italic">
                &ldquo;{script.excerpt}&rdquo;
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] text-text-muted">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{script.words.toLocaleString()} words</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{script.scenes} scenes</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{script.created}</span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer">
                  <Eye className="w-3.5 h-3.5 text-text-muted" />
                </button>
                <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer">
                  <Copy className="w-3.5 h-3.5 text-text-muted" />
                </button>
                <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer">
                  <Download className="w-3.5 h-3.5 text-text-muted" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
