'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Play, Clock, Calendar, Target, Monitor, HardDrive,
  ArrowUpRight, Cpu, TrendingUp, Zap, Database, FolderSearch, Activity,
  Image as ImageIcon, Film, Mic, Music, Volume2, Download,
  ChevronRight, MoreHorizontal, Settings
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/store/useAppStore'
import { AGENTS, WORKFLOW_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

// ── Framer Motion Stagger Variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ── Mock Data ──
const currentProject = null;

const recentProjects: any[] = [];
const agentActivity: any[] = [];
const renderJobs: any[] = [];

const assetCounts = [
  { label: 'Images', count: 0, tab: 'images', icon: ImageIcon, color: '#A855F7' },
  { label: 'Videos', count: 0, tab: 'videos', icon: Film, color: '#E11D48' },
  { label: 'Voices', count: 0, tab: 'voices', icon: Mic, color: '#10B981' },
  { label: 'Music', count: 0, tab: 'music', icon: Music, color: '#F59E0B' },
  { label: 'SFX', count: 0, tab: 'sfx', icon: Volume2, color: '#EF4444' },
  { label: 'Exports', count: 0, tab: 'exports', icon: Download, color: '#F97316' },
]

export default function DashboardPage() {
  const router = useRouter()
  const storeActiveId = useAppStore(state => state.activeProjectId)
  const storeProjects = useAppStore(state => state.projects)
  const setActiveProject = useAppStore(state => state.setActiveProject)
  
  const activeStoreProject = storeProjects.find(p => p.id === storeActiveId)

  const displayProject = activeStoreProject ? {
    title: activeStoreProject.title,
    description: `Generating content for ${activeStoreProject.topic}...`,
    status: activeStoreProject.status === 'in_production' ? 'In Production' : activeStoreProject.status,
    progress: activeStoreProject.progress,
    type: 'Investigation',
    created: 'Just now',
    updated: 'Just now',
    target: 'YouTube / Web'
  } : currentProject;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-3 sm:p-5 flex flex-col gap-4 sm:gap-5 w-full max-w-full overflow-x-hidden"
    >
      {/* ROW 1: Hero Card (OneCoin) & System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Hero Card */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 glass-card rounded-xl hover:border-border-active hover:shadow-[0_0_20px_rgba(225,29,72,0.15)] transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative shadow-2xl"
        >
          {displayProject ? (
            <>
              {/* Left Info Section */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-r from-card via-card/95 to-card/60">
                <div>
                  <div className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase mb-1.5 font-heading">CURRENT PROJECT</div>
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-none font-heading">{displayProject.title}</h2>
                    <span className="bg-[#E11D48]/15 text-[#E11D48] border border-[#E11D48]/30 px-2 py-0.5 text-[8.5px] font-bold font-mono uppercase tracking-wider rounded-md">
                      {displayProject.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed max-w-md mb-4">
                    {displayProject.description}
                  </p>
                  
                  <div className="w-full max-w-sm">
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <Progress value={displayProject.progress} className="h-1.5 bg-[#1B2336] flex-1 mr-3 rounded-full overflow-hidden" indicatorClassName="bg-[#E11D48]" />
                      <span className="text-text-secondary font-semibold font-mono text-[10px] whitespace-nowrap">{displayProject.progress}% Complete</span>
                    </div>
                  </div>
                </div>

                {/* Meta Stats Row (2 cols on mobile, 4 cols on desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[10px] pt-3 border-t border-[#1C2538] mt-3">
                  <div>
                    <div className="text-text-muted text-[8.5px] uppercase tracking-wider font-semibold">Type</div>
                    <div className="text-white font-medium truncate">{displayProject.type}</div>
                  </div>
                  <div>
                    <div className="text-text-muted text-[8.5px] uppercase tracking-wider font-semibold">Created</div>
                    <div className="text-white font-medium truncate">{displayProject.created}</div>
                  </div>
                  <div>
                    <div className="text-text-muted text-[8.5px] uppercase tracking-wider font-semibold">Updated</div>
                    <div className="text-white font-medium truncate">{displayProject.updated}</div>
                  </div>
                  <div>
                    <div className="text-text-muted text-[8.5px] uppercase tracking-wider font-semibold">Target</div>
                    <div className="text-white font-medium truncate">{displayProject.target}</div>
                  </div>
                </div>
              </div>

              {/* Right Poster Banner with Translucent Play Button */}
              <div className="hidden sm:block w-2/5 absolute right-0 top-0 bottom-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent z-10" />
                <div className="w-full h-full bg-[#161B28] opacity-70 flex items-center justify-center">
                  <Film className="w-12 h-12 text-white/20" />
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-accent/40 group-hover:border-accent/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <Play className="w-5 h-5 text-white ml-1.5" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 sm:p-12 flex-1 flex flex-col items-center justify-center text-center">
              <FolderSearch className="w-12 h-12 text-text-muted mb-4" />
              <h2 className="text-xl font-bold text-text-primary mb-2">No Active Project</h2>
              <p className="text-sm text-text-secondary mb-6 max-w-sm">
                Launch a new production pipeline from the Workflow Engine to start generating your documentary.
              </p>
              <Link href="/workflow">
                <Button className="gap-2">
                  <Zap className="w-4 h-4" />
                  Launch New Project
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* System Overview Telemetry */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-xl hover:border-border-active hover:shadow-[0_0_20px_rgba(225,29,72,0.1)] transition-all p-4 sm:p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">SYSTEM OVERVIEW</p>
            <Link href="/agents" className="text-[10px] font-semibold text-[#E11D48] hover:underline cursor-pointer">View All</Link>
          </div>
          
          <div className="space-y-3.5 flex-1 flex flex-col justify-between">
            <SystemRow 
              label="Agents Online" 
              value="13 / 13" 
              color="#10B981" 
              gradientId="greenSpark"
            />
            <SystemRow 
              label="Render Queue" 
              value="4" 
              color="#F59E0B" 
              gradientId="yellowSpark"
            />
            <SystemRow 
              label="GPU Usage" 
              value="64%" 
              color="#E11D48" 
              gradientId="redSpark"
            />
            <SystemRow 
              label="Storage Used" 
              value="1.2 TB" 
              color="#3B82F6" 
              gradientId="blueSpark"
            />
          </div>
        </motion.div>
      </div>

      {/* ROW 2: Quick Actions + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Quick Actions (2 cols on mobile) */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 flex flex-col"
        >
          <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase mb-3 font-heading">QUICK ACTIONS</p>
          <div className="grid grid-cols-2 gap-2.5 flex-1">
            {WORKFLOW_TYPES.map((wf) => {
              const Icon = wf.icon
              return (
                <motion.button
                  key={wf.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/workflow?type=${wf.id}`)}
                  className="flex flex-col gap-1 p-2.5 rounded-lg bg-card-elevated border border-border hover:border-border-active transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: wf.color }} />
                    <span className="text-[11px] font-bold text-white group-hover:text-[#E11D48] transition-colors truncate">{wf.name}</span>
                  </div>
                  <span className="text-[8.5px] text-text-muted leading-tight truncate">{wf.subtitle}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">RECENT PROJECTS</p>
            <MoreHorizontal className="w-4 h-4 text-text-muted cursor-pointer hover:text-white transition-colors" />
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {recentProjects.length > 0 ? (
              recentProjects.map((p) => (
                <div key={p.id} className="glass-card overflow-hidden group cursor-pointer hover:border-border-hover transition-colors">
                  <div className="h-28 sm:h-32 bg-card relative">
                    {p.img ? (
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-card-elevated">
                        <FolderSearch className="w-8 h-8 text-text-muted opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-text-primary text-xs truncate group-hover:text-accent transition-colors">{p.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[9px] text-text-muted">{p.type}</span>
                        <span className="text-[9px] text-text-secondary">{p.progress}%</span>
                      </div>
                      <Progress value={p.progress} className="h-1 mt-1.5 bg-black/40" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center h-28 bg-card-elevated/30 rounded-lg border border-border/50 text-text-muted">
                <FolderSearch className="w-6 h-6 mb-2 opacity-50" />
                <p className="text-xs">No recent projects</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ROW 3: Agent Activity, Render Queue, Asset Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Agent Activity */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="glass-card p-4 sm:p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-text-primary font-heading">Agent Activity</h3>
              </div>
              <Badge variant="accent" className="text-[9px]">Live</Badge>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {agentActivity.length > 0 ? (
                agentActivity.map((activity, i) => {
                  const Icon = activity.icon
                  return (
                    <div key={i} className="flex gap-3 relative">
                      {i !== agentActivity.length - 1 && (
                        <div className="absolute left-[13px] top-8 bottom-[-16px] w-[2px] bg-border/50" />
                      )}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10" style={{ backgroundColor: `${activity.color}15`, border: `1px solid ${activity.color}30` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: activity.color }} />
                      </div>
                      <div className="pt-0.5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-semibold text-text-primary">{activity.agent}</span>
                          <span className="text-[9px] text-text-muted">{activity.time}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary mt-0.5">{activity.action}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-text-muted py-10">
                  <Activity className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs">No active agents</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Render Queue */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">RENDER QUEUE</p>
            <Link href="/render-queue" className="text-[10px] font-semibold text-[#E11D48] hover:underline cursor-pointer">View All</Link>
          </div>
          <div className="space-y-3 flex-1">
            {renderJobs.length > 0 ? (
              renderJobs.map((job, i) => (
                <div key={i} onClick={() => router.push('/render-queue')} className="flex gap-2.5 items-center group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg border border-border overflow-hidden shrink-0">
                    <img src={job.img} alt={job.scene} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-bold text-white group-hover:text-[#E11D48] transition-colors truncate pr-2">{job.scene}</p>
                      <span className="text-[10px] font-bold font-mono text-white">{job.progress > 0 ? `${job.progress}%` : 'Pending'}</span>
                    </div>
                    <p className="text-[8.5px] text-text-muted mb-1">{job.model}</p>
                    <Progress value={job.progress} className="h-1 bg-[#1B2336]" indicatorClassName={job.progress > 0 ? "bg-[#E11D48]" : "bg-transparent"} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-text-muted">
                <Monitor className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs">No active renders</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Asset Library (2 cols on mobile, 3 cols on sm+) */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">ASSET LIBRARY</p>
            <Link href="/asset-library" className="text-[10px] font-semibold text-[#E11D48] hover:underline cursor-pointer">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 flex-1">
            {assetCounts.map((asset, i) => {
              const Icon = asset.icon
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(asset.tab === 'exports' ? '/exports' : `/asset-library?tab=${asset.tab}`)}
                  className="bg-card-elevated border border-border rounded-lg flex flex-col items-center justify-center p-2.5 cursor-pointer hover:border-border-active transition-all group"
                >
                  <Icon className="w-4 h-4 mb-1 transition-transform group-hover:scale-110" style={{ color: asset.color }} />
                  <p className="text-xs font-black font-mono text-white leading-tight group-hover:text-[#E11D48] transition-colors">{asset.count.toLocaleString()}</p>
                  <p className="text-[8px] text-text-muted uppercase font-bold mt-0.5">{asset.label}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* ROW 4: Usage & Cost Overview (2x2 Grid on Mobile, 4 Cols on Desktop) */}
      <motion.div 
        variants={itemVariants} 
        className="glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 grid grid-cols-2 lg:grid-cols-4 gap-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider mb-0.5">Total Credits</p>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base font-extrabold font-mono text-white leading-none">48,730</span>
              <span className="text-[8.5px] text-[#10B981] font-bold font-mono leading-tight">+12%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-[#EF4444]" />
          </div>
          <div>
            <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider mb-0.5">Total Cost</p>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base font-extrabold font-mono text-white leading-none">$342.58</span>
              <span className="text-[8.5px] text-[#10B981] font-bold font-mono leading-tight">-8%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider mb-0.5">Generations</p>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base font-extrabold font-mono text-white leading-none">1,248</span>
              <span className="text-[8.5px] text-[#10B981] font-bold font-mono leading-tight">+15%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#64748B]/15 border border-[#64748B]/30 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4 text-text-muted" />
          </div>
          <div>
            <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider mb-0.5">Storage Used</p>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base font-extrabold font-mono text-white leading-none">1.2 TB</span>
              <span className="text-[8.5px] text-text-muted font-medium">24% of 5 TB</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function SystemRow({ label, value, color, gradientId }: { label: string; value: string; color: string; gradientId: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
        <span className="text-xs font-semibold text-text-secondary">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-black font-mono text-white w-16 text-left">{value}</span>
        <svg width="60" height="20" viewBox="0 0 100 28" fill="none" className="shrink-0 opacity-90">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M0 20 Q20 8 40 16 T70 6 T100 10 L100 28 L0 28 Z" fill={`url(#${gradientId})`} />
          <path d="M0 20 Q20 8 40 16 T70 6 T100 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  )
}
