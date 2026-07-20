'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Download, FileVideo, FileText, FileType, Archive, Clock, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const formatIcons: Record<string, React.ReactNode> = {
  MP4: <FileVideo className="w-5 h-5 text-accent" />,
  MOV: <FileVideo className="w-5 h-5 text-success" />,
  SRT: <FileType className="w-5 h-5 text-warning" />,
  TXT: <FileText className="w-5 h-5 text-text-secondary" />,
  PDF: <FileText className="w-5 h-5 text-error" />,
  ZIP: <Archive className="w-5 h-5 text-purple-400" />,
}

const mockExports = [
  { id: '1', name: 'OneCoin_Documentary_Final.mp4', format: 'MP4', size: '2.4 GB', project: 'OneCoin Documentary', resolution: '4K', status: 'completed', created: '2 hours ago' },
  { id: '2', name: 'OneCoin_Documentary_1080p.mp4', format: 'MP4', size: '890 MB', project: 'OneCoin Documentary', resolution: '1080p', status: 'completed', created: '2 hours ago' },
  { id: '3', name: 'OneCoin_Subtitles.srt', format: 'SRT', size: '48 KB', project: 'OneCoin Documentary', resolution: '—', status: 'completed', created: '2 hours ago' },
  { id: '4', name: 'OneCoin_Research_Report.pdf', format: 'PDF', size: '3.2 MB', project: 'OneCoin Documentary', resolution: '—', status: 'completed', created: '3 hours ago' },
  { id: '5', name: 'OneCoin_Full_Project.zip', format: 'ZIP', size: '4.8 GB', project: 'OneCoin Documentary', resolution: '—', status: 'processing', created: 'In progress...' },
  { id: '6', name: 'FTX_Collapse_Script.txt', format: 'TXT', size: '128 KB', project: 'FTX Collapse', resolution: '—', status: 'completed', created: '1 day ago' },
]

export default function ExportsPage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Exports</h1>
          <p className="text-sm text-text-secondary mt-1">Download completed documentary packages and assets</p>
        </div>
        <div className="flex items-center gap-2">
          {['MP4', 'MOV', 'SRT', 'TXT', 'PDF', 'ZIP'].map(fmt => (
            <Badge key={fmt} variant="default" className="text-[9px] cursor-pointer hover:border-border-hover">{fmt}</Badge>
          ))}
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
        {mockExports.map((exp) => (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            className="glass-card p-4 flex items-center gap-4 group hover:border-border-hover transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-card-elevated flex items-center justify-center shrink-0">
              {formatIcons[exp.format]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">{exp.name}</p>
              <div className="flex items-center gap-3 text-[10px] text-text-muted mt-0.5">
                <span>{exp.project}</span>
                {exp.resolution !== '—' && <span>{exp.resolution}</span>}
                <span>{exp.size}</span>
              </div>
            </div>
            <Badge variant={exp.status === 'completed' ? 'success' : 'accent'} className="text-[9px]">
              {exp.status === 'completed' ? 'Ready' : 'Processing'}
            </Badge>
            <span className="text-[10px] text-text-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />{exp.created}
            </span>
            {exp.status === 'completed' && (
              <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
