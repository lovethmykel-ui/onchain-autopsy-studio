'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Plus, Filter, Calendar, ChevronRight,
  FileText, Globe, Scale, Link2, AlertTriangle,
  Clock, ExternalLink, Star, Shield
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const mockReports = [
  {
    id: '1',
    title: 'OneCoin: The $4 Billion Crypto Fraud',
    topic: 'OneCoin',
    status: 'completed',
    sources: 47,
    evidence: 23,
    credibility: 94,
    created: '2026-05-20',
    summary: 'Comprehensive investigation into the OneCoin Ponzi scheme, covering the rise of Ruja Ignatova, the fake blockchain, and the global reach of the fraud.',
  },
  {
    id: '2',
    title: 'FTX Collapse: Inside the Fall of Sam Bankman-Fried',
    topic: 'FTX',
    status: 'completed',
    sources: 62,
    evidence: 35,
    credibility: 97,
    created: '2026-05-18',
    summary: 'Deep dive into the FTX exchange collapse, Alameda Research, and the criminal trial of SBF.',
  },
  {
    id: '3',
    title: 'Terra Luna Crash: Algorithmic Stablecoin Failure',
    topic: 'Terra Luna',
    status: 'in_progress',
    sources: 38,
    evidence: 18,
    credibility: 91,
    created: '2026-05-15',
    summary: 'Analysis of the UST de-peg event, the Luna Foundation Guard, and Do Kwon\'s role.',
  },
]

const mockTimeline = [
  { date: '2014', title: 'OneCoin Founded', description: 'Ruja Ignatova and Sebastian Greenwood establish OneCoin Ltd in Bulgaria.', category: 'founding' },
  { date: '2015', title: 'Rapid Global Expansion', description: 'OneCoin spreads across 175 countries through MLM network.', category: 'growth' },
  { date: '2016', title: 'Peak Revenue', description: 'OneCoin generates over $4 billion in revenue globally.', category: 'peak' },
  { date: '2017 Oct', title: 'Ruja Disappears', description: 'Ruja Ignatova boards a flight to Athens and vanishes.', category: 'critical' },
  { date: '2019', title: 'DOJ Indictments', description: 'US Department of Justice files charges against multiple OneCoin leaders.', category: 'legal' },
  { date: '2023', title: 'Europol Most Wanted', description: 'Ruja Ignatova placed on Europol\'s Most Wanted list.', category: 'legal' },
]

const mockSources = [
  { title: 'BBC Investigation: The Missing Cryptoqueen', url: 'bbc.co.uk', type: 'article', credibility: 98 },
  { title: 'DOJ Press Release: OneCoin Indictment', url: 'justice.gov', type: 'legal', credibility: 100 },
  { title: 'Bloomberg: Inside OneCoin\'s Rise and Fall', url: 'bloomberg.com', type: 'article', credibility: 96 },
  { title: 'SEC Filing: Cease and Desist Order', url: 'sec.gov', type: 'legal', credibility: 100 },
  { title: 'CoinDesk: OneCoin Timeline', url: 'coindesk.com', type: 'article', credibility: 92 },
  { title: 'Court Documents: Sebastian Greenwood Guilty Plea', url: 'pacer.gov', type: 'legal', credibility: 100 },
]

export default function ResearchVaultPage() {
  const [activeTab, setActiveTab] = useState('reports')

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Research Vault</h1>
          <p className="text-sm text-text-secondary mt-1">Investigation reports, sources, evidence, and timeline data</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Research
        </Button>
      </motion.div>

      {/* Search & Filter */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search reports, sources, evidence..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </Button>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 mt-4">
            {mockReports.map((report) => (
              <motion.div
                key={report.id}
                variants={itemVariants}
                whileHover={{ y: -1 }}
                className="glass-card p-5 cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
                        {report.title}
                      </h3>
                      <Badge variant={report.status === 'completed' ? 'success' : 'accent'}>
                        {report.status === 'completed' ? 'Complete' : 'In Progress'}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-secondary mb-3 line-clamp-2">{report.summary}</p>
                    <div className="flex items-center gap-5 text-[11px] text-text-muted">
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{report.sources} Sources</span>
                      <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{report.evidence} Evidence</span>
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{report.credibility}% Credibility</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{report.created}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="sources">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2 mt-4">
            {mockSources.map((source, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-card p-4 flex items-center gap-4 cursor-pointer group hover:border-border-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-card-elevated border border-border flex items-center justify-center shrink-0">
                  {source.type === 'legal' ? <Scale className="w-4 h-4 text-warning" /> : <FileText className="w-4 h-4 text-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate group-hover:text-accent transition-colors">{source.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Link2 className="w-3 h-3 text-text-muted" />
                    <span className="text-[10px] text-text-muted">{source.url}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={source.type === 'legal' ? 'warning' : 'accent'} className="text-[9px]">{source.type}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-success" />
                    <span className="text-[10px] font-bold text-success">{source.credibility}%</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="evidence">
          <div className="mt-4 glass-card p-8 flex flex-col items-center justify-center min-h-[300px]">
            <AlertTriangle className="w-10 h-10 text-text-muted mb-3" />
            <p className="text-sm text-text-secondary mb-1">Evidence items from research reports</p>
            <p className="text-xs text-text-muted">Run a research investigation to populate evidence</p>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-4 relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-4">
              {mockTimeline.map((event, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-4 relative"
                >
                  <div className={cn(
                    "w-[14px] h-[14px] rounded-full border-2 shrink-0 mt-1 z-10",
                    event.category === 'critical' ? "border-error bg-error/20" :
                    event.category === 'legal' ? "border-warning bg-warning/20" :
                    event.category === 'peak' ? "border-success bg-success/20" :
                    "border-accent bg-accent/20"
                  )} style={{ marginLeft: '17px' }} />
                  <div className="glass-card p-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-accent">{event.date}</span>
                      <Badge variant={
                        event.category === 'critical' ? 'error' :
                        event.category === 'legal' ? 'warning' :
                        'accent'
                      } className="text-[9px]">{event.category}</Badge>
                    </div>
                    <p className="text-xs font-semibold text-text-primary mb-1">{event.title}</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
