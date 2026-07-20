'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Filter, Calendar, ChevronRight,
  Globe, AlertTriangle, Shield, Clock, Eye, Download, Link, Database
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useProjectStore } from '@/lib/store/project'
import { useResearchStore } from '@/lib/store/research'
import { useSettingsStore } from '@/lib/store/settings'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function ResearchVaultPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  
  const { activeProject } = useProjectStore()
  const { research, fetchResearch, addResearch } = useResearchStore()
  const { getAllKeys } = useSettingsStore()
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState('')

  React.useEffect(() => {
    if (activeProject) fetchResearch(activeProject.id)
  }, [activeProject, fetchResearch])

  const handleGenerateResearch = async () => {
    if (!activeProject) {
      toast.error('Please select or create a project first.')
      return
    }
    const keys = getAllKeys()

    setIsGenerating(true)
    setGeneratedText('')
    setSelectedReport('generating')

    try {
      const res = await fetch('/api/ai/generate-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${encodeURIComponent(JSON.stringify(keys))}`
        },
        body: JSON.stringify({
          topic: activeProject.topic,
          type: activeProject.type,
        })
      })

      if (!res.ok) throw new Error((await res.json()).error)

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('0:')) {
              const text = JSON.parse(line.slice(2))
              fullText += text
              setGeneratedText(prev => prev + text)
            }
          }
        }
      }

      const supabase = createClient()
      const { data, error } = await supabase.from('research').insert({
        project_id: activeProject.id,
        report: fullText,
        sources: [],
        evidence: [],
        timeline_data: []
      }).select().single()

      if (error) throw error
      if (data) addResearch(data)
      
      toast.success('Research generated successfully!')
      setSelectedReport(data.id)
    } catch (err: any) {
      console.error(err)
      toast.error(err.message)
      setSelectedReport(null)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Research Vault</h1>
          <p className="text-sm text-text-secondary mt-1">Investigation reports, sources, evidence, and timeline data</p>
        </div>
        <Button className="gap-2 shrink-0" onClick={handleGenerateResearch} disabled={isGenerating}>
          <Search className="w-4 h-4" />
          {isGenerating ? 'Investigating...' : 'Start Investigation'}
        </Button>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Reports List */}
        <div className="xl:col-span-2 space-y-4">
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-card/50 border border-border w-full justify-start p-1 h-auto">
              <TabsTrigger value="reports" className="text-xs py-1.5 px-4 data-[state=active]:bg-accent data-[state=active]:text-white">Reports</TabsTrigger>
              <TabsTrigger value="timeline" className="text-xs py-1.5 px-4">Timeline</TabsTrigger>
              <TabsTrigger value="sources" className="text-xs py-1.5 px-4">Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="reports">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 mt-4">
                
                {isGenerating && (
                  <motion.div variants={itemVariants} className="glass-card p-5 border-accent/30 accent-glow">
                    <h3 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
                      <Database className="w-4 h-4 animate-spin" />
                      Investigating {activeProject?.title}...
                    </h3>
                    <div className="bg-card-elevated rounded-md p-3 border border-border h-[150px] overflow-y-auto">
                      <p className="text-[11px] text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {generatedText}
                      </p>
                    </div>
                  </motion.div>
                )}

                {research.map((report) => (
                  <motion.div
                    key={report.id}
                    variants={itemVariants}
                    whileHover={{ y: -1 }}
                    onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                    className={cn(
                      "glass-card p-5 cursor-pointer group",
                      selectedReport === report.id && "border-accent/30 accent-glow"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
                            {activeProject?.title} Research
                          </h3>
                          <Badge variant="success">Complete</Badge>
                        </div>
                        <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                          {report.report?.slice(0, 150)}...
                        </p>
                        <div className="flex items-center gap-5 text-[11px] text-text-muted">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(report.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors shrink-0 mt-1" />
                    </div>
                  </motion.div>
                ))}

                {research.length === 0 && !isGenerating && (
                  <div className="text-center p-12 glass-card">
                    <p className="text-sm text-text-secondary">No research reports available.</p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="timeline">
              <div className="glass-card p-6 mt-4">
                <p className="text-sm text-text-secondary">Timeline data will be extracted from research reports automatically.</p>
              </div>
            </TabsContent>

            <TabsContent value="sources">
              <div className="glass-card p-6 mt-4">
                <p className="text-sm text-text-secondary">Sources and citations will be extracted from research reports automatically.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Report Details Preview */}
        <div className="hidden xl:block">
          <div className="glass-card p-5 h-[calc(100vh-200px)] sticky top-24 overflow-y-auto">
            {selectedReport === 'generating' ? (
              <div className="text-center space-y-4 pt-10">
                <Database className="w-8 h-8 text-accent animate-pulse mx-auto" />
                <h3 className="text-sm font-medium text-text-primary">Generating Report</h3>
                <p className="text-[11px] text-text-muted">The AI Agent is actively investigating...</p>
              </div>
            ) : selectedReport ? (
              (() => {
                const report = research.find(r => r.id === selectedReport)
                if (!report) return null
                return (
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">{activeProject?.title} Research</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <Badge variant="success">Complete</Badge>
                      <span className="text-[11px] text-text-muted">{new Date(report.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-card/50 rounded-lg p-4 border border-border">
                        <h4 className="text-xs font-semibold text-text-primary mb-2 uppercase tracking-wider">Report Output</h4>
                        <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap font-mono">
                          {report.report}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })()
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-50">
                <Search className="w-12 h-12 text-text-muted mb-4" />
                <p className="text-sm font-medium text-text-primary">Select a Report</p>
                <p className="text-xs text-text-secondary mt-1">Click on a research report to view its full details and extracted evidence.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  )
}
