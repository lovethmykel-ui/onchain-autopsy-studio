'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Play, Clock, Calendar, Target, Monitor, HardDrive,
  ArrowUpRight, Cpu, TrendingUp, Zap, Database,
  Image as ImageIcon, Film, Mic, Music, Volume2, Download,
  ChevronRight, MoreHorizontal, Settings
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/store/useAppStore'
import { AGENTS, WORKFLOW_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

// ── Animation variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ── Mock Data ──
const currentProject = {
  title: 'OneCoin Documentary',
  description: 'A deep investigative documentary on the rise and fall of OneCoin, the $4B+ crypto fraud that fooled the world.',
  status: 'In Production' as const,
  progress: 73,
  type: 'Documentary (60 Min)',
  created: 'May 20, 2026',
  updated: '2 mins ago',
  target: 'YouTube / Web',
}

const recentProjects = [
  { title: 'FTX Collapse', type: 'Documentary', progress: 48, updated: 'Updated 1d ago', img: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=400&h=200' },
  { title: 'Terra Luna Crash', type: 'Documentary', progress: 62, updated: 'Updated 2d ago', img: 'https://images.unsplash.com/photo-1621504450181-5d156fd61176?auto=format&fit=crop&q=80&w=400&h=200' },
  { title: 'Bybit Hack', type: 'Investigation', progress: 35, updated: 'Updated 3d ago', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=400&h=200' },
  { title: 'Pig Butchering Scams', type: 'Documentary', progress: 20, updated: 'Updated 5d ago', img: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=400&h=200' },
]

const agentActivity = [
  { agent: 'Video Director', action: 'Generating 24 scenes with Seedance 1.0', time: '2 mins ago', color: '#3B82F6', icon: Film },
  { agent: 'Image Director', action: 'Generated 142 images with Nano Banana', time: '5 mins ago', color: '#A855F7', icon: ImageIcon },
  { agent: 'Voice Director', action: 'Generated narration (23:48) with ElevenLabs', time: '8 mins ago', color: '#10B981', icon: Mic },
  { agent: 'Music Director', action: 'Generated documentary score with Suno', time: '12 mins ago', color: '#F59E0B', icon: Music },
  { agent: 'Sound Design Director', action: 'Generating ambience and SFX', time: '15 mins ago', color: '#EF4444', icon: Volume2 },
]

const renderJobs = [
  { scene: 'Scene 45 - Conference Hall', model: 'Seedance 1.0 • 4K', progress: 71, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100&h=100' },
  { scene: 'Scene 46 - Ruja Speaking', model: 'Seedance 1.0 • 4K', progress: 52, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100' },
  { scene: 'Scene 47 - Investor Crowd', model: 'Veo 3 • 1080p', progress: 28, img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=100&h=100' },
  { scene: 'Scene 48 - News Report', model: 'Kling 2.0 • 1080p', progress: 0, img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=100&h=100' },
]

const assetCounts = [
  { label: 'Images', count: 2451, icon: ImageIcon, color: '#A855F7' },
  { label: 'Videos', count: 1248, icon: Film, color: '#3B82F6' },
  { label: 'Voices', count: 342, icon: Mic, color: '#10B981' },
  { label: 'Music', count: 128, icon: Music, color: '#F59E0B' },
  { label: 'SFX', count: 982, icon: Volume2, color: '#EF4444' },
  { label: 'Exports', count: 73, icon: Download, color: '#F97316' },
]

const pipelineAgents = AGENTS.map((agent, i) => ({
  ...agent,
  status: i < 6 ? 'completed' as const : i === 6 ? 'running' as const : 'waiting' as const,
}))

export default function DashboardPage() {
  const storeActiveId = useAppStore(state => state.activeProjectId)
  const storeProjects = useAppStore(state => state.projects)
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
      className="flex flex-col xl:flex-row gap-6 w-full"
    >
      {/* ── Main Content Area ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        
        {/* ROW 1: Current Project & System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Current Project */}
          <motion.div variants={itemVariants} className="lg:col-span-2 glass-card flex flex-col sm:flex-row overflow-hidden relative">
            {/* Left Info */}
            <div className="p-6 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-r from-card to-card/40">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase mb-4">CURRENT PROJECT</p>
                <div className="flex items-start gap-4 mb-3">
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary tracking-tight leading-none">{displayProject.title}</h2>
                  <Badge variant="accent" className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20 px-2 py-0.5 text-[9px] uppercase tracking-wider rounded shrink-0">
                    {displayProject.status}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed max-w-sm mb-6">
                  {displayProject.description}
                </p>
                
                <div className="w-full max-w-sm">
                  <Progress value={displayProject.progress} className="h-1 bg-white/5 mb-2" indicatorClassName="bg-accent" />
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-text-muted uppercase tracking-wider">Production Progress</span>
                    <span className="text-text-primary font-bold">{displayProject.progress}% Complete</span>
                  </div>
                </div>
              </div>

              {/* Meta Stats at bottom */}
              <div className="flex flex-wrap items-center gap-6 text-[10px] text-text-muted mt-8">
                <div className="flex flex-col gap-1">
                  <span className="uppercase tracking-wider">Type</span>
                  <span className="text-text-primary font-medium">{displayProject.type}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="uppercase tracking-wider">Created</span>
                  <span className="text-text-primary font-medium">{displayProject.created}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="uppercase tracking-wider">Updated</span>
                  <span className="text-text-primary font-medium">{displayProject.updated}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="uppercase tracking-wider">Target</span>
                  <span className="text-text-primary font-medium">{displayProject.target}</span>
                </div>
              </div>
            </div>

            {/* Right Image Banner */}
            <div className="hidden sm:block w-2/5 absolute right-0 top-0 bottom-0">
              <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=400" 
                alt="OneCoin" 
                className="w-full h-full object-cover object-center opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Overview */}
          <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase">SYSTEM OVERVIEW</p>
              <a href="#" className="text-[10px] text-accent hover:underline">View All</a>
            </div>
            <div className="space-y-5 flex-1 flex flex-col justify-between">
              
              <SystemRow 
                label="Agents Online" 
                value="13 / 13" 
                color="#10B981" 
                sparkline="M0 20 Q10 15 20 18 T40 10 T60 15 T80 5 T100 0" 
              />
              
              <SystemRow 
                label="Render Queue" 
                value="4" 
                color="#F59E0B" 
                sparkline="M0 10 Q20 10 30 15 T50 5 T70 15 T90 5 T100 10" 
              />
              
              <SystemRow 
                label="GPU Usage" 
                value="64%" 
                color="#8B5CF6" 
                sparkline="M0 15 Q10 5 20 10 T40 20 T60 10 T80 20 T100 5" 
              />
              
              <SystemRow 
                label="Storage Used" 
                value="1.2 TB / 5 TB" 
                color="#3B82F6" 
                sparkline="M0 20 L20 18 L40 15 L60 18 L80 10 L100 5" 
              />

            </div>
          </motion.div>
        </div>

        {/* ROW 2: Quick Actions + Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="glass-card p-6">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase mb-5">QUICK ACTIONS</p>
            <div className="grid grid-cols-2 gap-3">
              {WORKFLOW_TYPES.map((wf) => {
                const Icon = wf.icon
                return (
                  <motion.button
                    key={wf.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col gap-2 p-3 rounded-md bg-card-elevated border border-border hover:border-border-hover transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: wf.color }} />
                      <span className="text-[11px] font-medium text-text-primary leading-tight group-hover:text-accent transition-colors">{wf.name}</span>
                    </div>
                    <span className="text-[9px] text-text-muted leading-tight">{wf.subtitle}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase">RECENT PROJECTS</p>
              <MoreHorizontal className="w-4 h-4 text-text-muted cursor-pointer hover:text-text-primary transition-colors" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
              {recentProjects.map((project) => (
                <div key={project.title} className="rounded-md border border-border overflow-hidden bg-card-elevated hover:border-border-hover transition-colors group cursor-pointer flex flex-col">
                  <div className="h-[88px] relative overflow-hidden">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80" />
                  </div>
                  <div className="p-3 pt-2 flex flex-col flex-1">
                    <p className="text-xs font-semibold text-text-primary truncate">{project.title}</p>
                    <p className="text-[9px] text-text-muted mb-2">{project.type}</p>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center text-[9px] mb-1.5">
                        <span className="font-bold text-accent">{project.progress}%</span>
                        <span className="text-text-muted">{project.updated}</span>
                      </div>
                      <Progress value={project.progress} className="h-1 bg-white/5" indicatorClassName="bg-accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ROW 3: Activity + Queue + Assets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent Activity */}
          <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase">AGENT ACTIVITY</p>
              <a href="#" className="text-[10px] text-accent hover:underline">View All</a>
            </div>
            <div className="space-y-4 flex-1">
              {agentActivity.map((activity, i) => {
                const Icon = activity.icon
                return (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded bg-card-elevated border border-border flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" style={{ color: activity.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-text-primary group-hover:text-accent transition-colors truncate">{activity.agent}</p>
                        <p className="text-[10px] text-text-muted truncate">{activity.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pl-2">
                      <span className="text-[9px] text-text-muted">{activity.time}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Render Queue */}
          <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase">RENDER QUEUE</p>
              <a href="#" className="text-[10px] text-accent hover:underline">View All</a>
            </div>
            <div className="space-y-4 flex-1">
              {renderJobs.map((job, i) => (
                <div key={i} className="flex gap-3 items-center group cursor-pointer">
                  <div className="w-10 h-10 rounded border border-border overflow-hidden shrink-0">
                    <img src={job.img} alt={job.scene} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-[11px] font-medium text-text-primary truncate pr-2">{job.scene}</p>
                      <span className="text-[10px] font-bold text-text-primary">{job.progress > 0 ? `${job.progress}%` : 'Pending'}</span>
                    </div>
                    <p className="text-[9px] text-text-muted mb-1.5">{job.model}</p>
                    <Progress value={job.progress} className="h-0.5 bg-white/5" indicatorClassName={job.progress > 0 ? "bg-text-primary" : "bg-transparent"} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Asset Library */}
          <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase">ASSET LIBRARY</p>
              <a href="#" className="text-[10px] text-accent hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {assetCounts.map((asset, i) => {
                const Icon = asset.icon
                return (
                  <div key={i} className="bg-card-elevated border border-border rounded-md flex flex-col items-center justify-center p-3 cursor-pointer hover:border-border-hover transition-colors">
                    <Icon className="w-5 h-5 mb-2" style={{ color: asset.color }} />
                    <p className="text-sm font-bold text-text-primary leading-tight">{asset.count.toLocaleString()}</p>
                    <p className="text-[9px] text-text-muted uppercase mt-0.5">{asset.label}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ROW 4: Usage & Cost Overview (Full Width of Content Area) */}
        <motion.div variants={itemVariants} className="glass-card p-6 flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4 min-w-[160px]">
            <div className="w-10 h-10 rounded-full bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Total Credits</p>
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-text-primary leading-none">48,730</span>
                <span className="text-[10px] text-success font-medium leading-tight">+12% this month</span>
              </div>
            </div>
          </div>
          
          <div className="w-px h-10 bg-border shrink-0" />
          
          <div className="flex items-center gap-4 min-w-[160px]">
            <div className="w-10 h-10 rounded-full bg-error/10 border border-error/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-error" />
            </div>
            <div>
              <p className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Total Cost</p>
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-text-primary leading-none">$342.58</span>
                <span className="text-[10px] text-success font-medium leading-tight">-8% this month</span>
              </div>
            </div>
          </div>

          <div className="w-px h-10 bg-border shrink-0" />

          <div className="flex items-center gap-4 min-w-[160px]">
            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Generations</p>
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-text-primary leading-none">1,248</span>
                <span className="text-[10px] text-success font-medium leading-tight">+15% this month</span>
              </div>
            </div>
          </div>

          <div className="w-px h-10 bg-border shrink-0" />

          <div className="flex items-center gap-4 min-w-[160px] flex-1">
            <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
              <Database className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Storage Used</p>
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-text-primary leading-none">1.2 TB</span>
                <span className="text-[10px] text-text-muted font-medium leading-tight ml-2">24% of 5 TB</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Right Sidebar: Production Pipeline ── */}
      <motion.div
        variants={itemVariants}
        className="hidden xl:flex w-[280px] shrink-0 flex-col gap-6"
      >
        <div className="glass-card flex-1 flex flex-col p-6 sticky top-[88px] h-[calc(100vh-112px)] overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted uppercase">PRODUCTION PIPELINE</p>
          </div>
          
          <div className="flex items-center justify-between mb-8 shrink-0">
            <p className="text-sm font-semibold text-text-primary">OneCoin Documentary</p>
            <Badge variant="accent" className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider rounded shrink-0">
              In Progress
            </Badge>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1 pr-2">
            {pipelineAgents.map((agent, i) => (
              <div
                key={agent.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-150",
                  agent.status === 'running' && "bg-white/[0.03] border border-white/5",
                )}
              >
                <div className="flex items-center gap-3 w-8 shrink-0">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                      agent.status === 'completed' && "border-success bg-success",
                      agent.status === 'running' && "border-accent bg-transparent animate-pulse",
                      agent.status === 'waiting' && "border-border bg-transparent",
                    )}
                  >
                    {agent.status === 'completed' && <Play className="w-2 h-2 text-surface fill-current ml-0.5" />}
                    {agent.status === 'running' && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </div>
                  <span className="text-[9px] font-bold text-text-muted">{String(i + 1).padStart(2, '0')}</span>
                </div>
                
                <span className={cn(
                  "text-[11px] flex-1 truncate",
                  agent.status === 'running' ? "text-text-primary font-medium" : "text-text-secondary",
                )}>
                  {agent.name}
                </span>
                
                <span className={cn(
                  "text-[9px] font-medium",
                  agent.status === 'completed' && "text-success",
                  agent.status === 'running' && "text-accent",
                  agent.status === 'waiting' && "text-text-muted",
                )}>
                  {agent.status === 'completed' ? 'Completed' : agent.status === 'running' ? 'In Progress' : 'Waiting'}
                </span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full mt-6 h-10 rounded-md bg-accent hover:bg-accent-hover text-white text-[13px] font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Settings className="w-4 h-4" />
            Manage Workflow
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Sub-components ──

function SystemRow({ label, value, color, sparkline }: { label: string; value: string; color: string; sparkline: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }} />
        <span className="text-[11px] text-text-secondary">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-text-primary w-16 text-left">{value}</span>
        <svg width="60" height="20" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
          <path d={sparkline} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </div>
  )
}
