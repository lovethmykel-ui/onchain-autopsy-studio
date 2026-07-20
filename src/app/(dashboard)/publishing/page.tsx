'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  MonitorPlay as Youtube, Type, AlignLeft, Hash, BookOpen,
  Image as ImageIcon, Sparkles, Copy, Download, RefreshCw
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const mockPublishing = {
  titles: [
    'OneCoin: The $4 Billion Crypto Fraud That Fooled The World',
    'How One Woman Stole $4 Billion with a Fake Cryptocurrency | OneCoin Documentary',
    'The Crypto Queen Who Vanished: OneCoin Investigation',
  ],
  description: `In 2014, Ruja Ignatova launched OneCoin — promising it would be the "Bitcoin killer." Within three years, she amassed over $4 billion from investors across 175 countries. But there was one problem: OneCoin had no blockchain.

This documentary traces the rise and fall of the world's biggest cryptocurrency fraud, from Ruja's charismatic presentations to her mysterious disappearance in 2017.

Featuring court documents, victim testimonies, and blockchain analysis.`,
  tags: ['OneCoin', 'crypto fraud', 'cryptocurrency scam', 'Ruja Ignatova', 'blockchain documentary', 'crypto queen', 'ponzi scheme', 'financial crime', 'documentary', 'investigation'],
  chapters: [
    { time: '00:00', title: 'Introduction' },
    { time: '02:15', title: 'The Rise of OneCoin' },
    { time: '08:30', title: 'The Fake Blockchain' },
    { time: '15:45', title: 'Global Expansion' },
    { time: '22:00', title: 'Warning Signs' },
    { time: '30:15', title: 'Ruja Disappears' },
    { time: '38:40', title: 'Law Enforcement Action' },
    { time: '45:20', title: 'Trial and Conviction' },
    { time: '52:00', title: 'Where Is Ruja Now?' },
    { time: '57:30', title: 'Lessons Learned' },
  ],
  thumbnailConcepts: [
    'Ruja Ignatova silhouette against crumbling OneCoin logo, dark red/black color scheme',
    'Split screen: OneCoin arena event vs. empty courtroom, high contrast',
    'Shattered gold coin with "OneCoin" text, money flying into darkness',
  ],
}

export default function PublishingPage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Publishing Center</h1>
          <p className="text-sm text-text-secondary mt-1">YouTube SEO, descriptions, tags, chapters, and thumbnail concepts</p>
        </div>
        <Button className="gap-2">
          <Sparkles className="w-4 h-4" />
          Regenerate All
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Titles */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-text-primary">SEO Titles</h2>
            <Badge variant="accent" className="text-[9px]">{mockPublishing.titles.length} options</Badge>
          </div>
          <div className="space-y-2">
            {mockPublishing.titles.map((title, i) => (
              <div key={i} className="p-3 rounded-md bg-card-elevated border border-border flex items-start gap-3 group hover:border-border-hover transition-colors">
                <span className="text-[10px] font-bold text-accent mt-0.5">#{i + 1}</span>
                <p className="text-xs text-text-primary flex-1">{title}</p>
                <button className="p-1 rounded hover:bg-card-hover transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                  <Copy className="w-3 h-3 text-text-muted" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-text-primary">Tags</h2>
            <Badge variant="accent" className="text-[9px]">{mockPublishing.tags.length} tags</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockPublishing.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-card-elevated border border-border text-[11px] text-text-secondary hover:border-accent/30 hover:text-accent transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="mt-3 text-[10px] text-accent hover:underline cursor-pointer flex items-center gap-1">
            <Copy className="w-3 h-3" /> Copy all tags
          </button>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold text-text-primary">Description</h2>
            </div>
            <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer">
              <Copy className="w-3.5 h-3.5 text-text-muted" />
            </button>
          </div>
          <div className="p-4 rounded-md bg-card-elevated border border-border">
            <p className="text-xs text-text-secondary whitespace-pre-line leading-relaxed">{mockPublishing.description}</p>
          </div>
        </motion.div>

        {/* Chapters */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold text-text-primary">Chapters</h2>
              <Badge variant="accent" className="text-[9px]">{mockPublishing.chapters.length} chapters</Badge>
            </div>
            <button className="p-1.5 rounded hover:bg-card-hover transition-colors cursor-pointer">
              <Copy className="w-3.5 h-3.5 text-text-muted" />
            </button>
          </div>
          <div className="space-y-1">
            {mockPublishing.chapters.map((chapter, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-card-elevated transition-colors">
                <span className="text-[11px] font-mono text-accent w-12">{chapter.time}</span>
                <span className="text-xs text-text-primary">{chapter.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Thumbnail Concepts */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-text-primary">Thumbnail Concepts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {mockPublishing.thumbnailConcepts.map((concept, i) => (
              <div key={i} className="p-4 rounded-lg bg-card-elevated border border-border hover:border-border-hover transition-colors">
                <div className="aspect-video rounded bg-gradient-to-br from-card to-surface mb-3 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-text-muted" />
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{concept}</p>
                <Button variant="ghost" size="sm" className="mt-2 gap-1.5 text-[10px]">
                  <Sparkles className="w-3 h-3" />
                  Generate Thumbnail
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
