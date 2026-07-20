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
import { useProjectStore } from '@/lib/store/project'
import { useScriptStore } from '@/lib/store/script'
import { useSettingsStore } from '@/lib/store/settings'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

// Removed static mockScripts

const durationColors: Record<string, string> = {
  '15min': '#10B981',
  '30min': '#F59E0B',
  '60min': '#1F6FEB',
}

export default function ScriptVaultPage() {
  const [selectedScript, setSelectedScript] = useState<string | null>(null)
  const { activeProject } = useProjectStore()
  const { scripts, fetchScripts, addScript } = useScriptStore()
  const { getAllKeys } = useSettingsStore()
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState('')

  React.useEffect(() => {
    if (activeProject) {
      fetchScripts(activeProject.id)
    }
  }, [activeProject, fetchScripts])

  const handleGenerateScript = async () => {
    if (!activeProject) {
      toast.error('Please select or create a project first.')
      return
    }

    const keys = getAllKeys()

    setIsGenerating(true)
    setGeneratedText('')
    setSelectedScript('generating')

    try {
      const res = await fetch('/api/ai/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${encodeURIComponent(JSON.stringify(keys))}`
        },
        body: JSON.stringify({
          topic: activeProject.topic,
          type: activeProject.type,
          targetPlatform: activeProject.target_platform,
          durationTarget: activeProject.duration_target || '15min'
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to generate')
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          // The ai sdk streams chunks typically starting with '0:'
          const lines = chunk.split('\\n')
          for (const line of lines) {
            if (line.startsWith('0:')) {
              const text = JSON.parse(line.slice(2))
              fullText += text
              setGeneratedText(prev => prev + text)
            }
          }
        }
      }

      // Save to Supabase
      const supabase = createClient()
      const { data, error } = await supabase.from('scripts').insert({
        project_id: activeProject.id,
        duration_type: (activeProject.duration_target || '15min') as any,
        narration: fullText,
        scene_notes: '',
        visual_directions: ''
      }).select().single()

      if (error) throw error
      if (data) addScript(data)
      
      toast.success('Script generated successfully!')
      setSelectedScript(data.id)
    } catch (err: any) {
      console.error(err)
      toast.error(err.message)
      setSelectedScript(null)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Script Vault</h1>
          <p className="text-sm text-text-secondary mt-1">Documentary narrations, voiceover scripts, and scene notes</p>
        </div>
        <Button className="gap-2" onClick={handleGenerateScript} disabled={isGenerating}>
          <Plus className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Generate Script'}
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
        {isGenerating && (
          <motion.div variants={itemVariants} className="glass-card p-5 border-accent/30 accent-glow">
            <h3 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 animate-spin" />
              Writing Script for {activeProject?.title}...
            </h3>
            <div className="bg-card-elevated rounded-md p-3 border border-border h-[150px] overflow-y-auto">
              <p className="text-[11px] text-text-secondary leading-relaxed whitespace-pre-wrap">
                {generatedText}
              </p>
            </div>
          </motion.div>
        )}

        {scripts.map((script) => (
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
                    {activeProject?.title || 'Unknown Project'} - {script.duration_type}
                  </h3>
                </div>
                <p className="text-[10px] text-text-muted">Generated {new Date(script.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  className="text-[9px]"
                  style={{
                    backgroundColor: `${durationColors[script.duration_type] || durationColors['15min']}15`,
                    color: durationColors[script.duration_type] || durationColors['15min'],
                    borderColor: `${durationColors[script.duration_type] || durationColors['15min']}30`,
                  }}
                >
                  {script.duration_type}
                </Badge>
                <Badge variant="success">Complete</Badge>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-card-elevated rounded-md p-3 mb-3 border border-border">
              <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3 italic">
                &ldquo;{script.narration?.slice(0, 200)}...&rdquo;
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] text-text-muted">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{script.narration?.split(' ').length || 0} words</span>
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
        {scripts.length === 0 && !isGenerating && (
          <div className="col-span-1 lg:col-span-2 text-center p-12 glass-card">
            <p className="text-sm text-text-secondary">No scripts generated yet for this project.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
