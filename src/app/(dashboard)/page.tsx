'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  { id: 'proj-ftx', title: 'FTX Collapse', type: 'Documentary', progress: 48, updated: 'Updated 1d ago', img: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=400&h=250' },
  { id: 'proj-terra', title: 'Terra Luna Crash', type: 'Documentary', progress: 62, updated: 'Updated 2d ago', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&q=80&w=400&h=250' },
  { id: 'proj-bybit', title: 'Bybit Hack', type: 'Investigation', progress: 35, updated: 'Updated 3d ago', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=400&h=250' },
  { id: 'proj-scams', title: 'Pig Butchering Scams', type: 'Documentary', progress: 20, updated: 'Updated 5d ago', img: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=400&h=250' },
]

const agentActivity = [
  { agent: 'Video Director', action: 'Generating 24 scenes with Seedance 1.0', time: '2 mins ago', color: '#E11D48', icon: Film },
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
  { label: 'Images', count: 2451, tab: 'images', icon: ImageIcon, color: '#A855F7' },
  { label: 'Videos', count: 1248, tab: 'videos', icon: Film, color: '#E11D48' },
  { label: 'Voices', count: 342, tab: 'voices', icon: Mic, color: '#10B981' },
  { label: 'Music', count: 128, tab: 'music', icon: Music, color: '#F59E0B' },
  { label: 'SFX', count: 982, tab: 'sfx', icon: Volume2, color: '#EF4444' },
  { label: 'Exports', count: 73, tab: 'exports', icon: Download, color: '#F97316' },
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
          className="lg:col-span-2 bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 hover:shadow-[0_0_20px_rgba(225,29,72,0.15)] transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative shadow-2xl"
        >
          {/* Left Info Section */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-r from-[#0E131F] via-[#0E131F]/95 to-[#0E131F]/60">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E131F] via-[#0E131F]/30 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800&h=500" 
              alt="OneCoin Documentary Poster" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4">
              <Link
                href="/storyboard-vault"
                className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-black/80 transition-all shadow-2xl mb-2"
              >
                <Play className="w-5 h-5 text-white ml-0.5 fill-current" />
              </Link>
              <div className="text-center">
                <div className="text-xs font-black tracking-widest text-white uppercase drop-shadow-md font-heading">ONECOIN</div>
                <div className="text-[8px] font-bold tracking-wider text-text-muted uppercase font-heading">THE BILLION DOLLAR LIE</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Overview Telemetry */}
        <motion.div 
          variants={itemVariants} 
          className="bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 hover:shadow-[0_0_20px_rgba(225,29,72,0.1)] transition-all p-4 sm:p-5 flex flex-col justify-between shadow-xl"
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
          className="bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 transition-all p-4 sm:p-5 flex flex-col"
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
                  className="flex flex-col gap-1 p-2.5 rounded-lg bg-[#141C2B] border border-[#1E2638] hover:border-[#E11D48]/50 transition-all text-left group cursor-pointer"
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
          className="lg:col-span-2 bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">RECENT PROJECTS</p>
            <MoreHorizontal className="w-4 h-4 text-text-muted cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
            {recentProjects.map((project) => (
              <motion.div 
                key={project.id} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveProject(project.id)
                  router.push('/projects')
                }}
                className="rounded-lg border border-[#1E2638] overflow-hidden bg-[#141C2B] hover:border-[#E11D48]/50 transition-all group cursor-pointer flex flex-col"
              >
                <div className="h-[90px] relative overflow-hidden bg-black">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141C2B] via-transparent to-transparent" />
                </div>
                <div className="p-2.5 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-[#E11D48] transition-colors truncate">{project.title}</p>
                    <p className="text-[9px] text-text-muted mb-1.5">{project.type}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[9px] mb-1">
                      <span className="font-bold font-mono text-white">{project.progress}%</span>
                      <span className="text-text-muted">{project.updated}</span>
                    </div>
                    <Progress value={project.progress} className="h-1 bg-[#1B2336]" indicatorClassName="bg-[#E11D48]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ROW 3: Agent Activity, Render Queue, Asset Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Agent Activity */}
        <motion.div 
          variants={itemVariants} 
          className="bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">AGENT ACTIVITY</p>
            <Link href="/agents" className="text-[10px] font-semibold text-[#E11D48] hover:underline cursor-pointer">View All</Link>
          </div>
          <div className="space-y-3 flex-1">
            {agentActivity.map((activity, i) => {
              const Icon = activity.icon
              return (
                <div key={i} onClick={() => router.push('/agents')} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#141C2B] border border-[#1E2638] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" style={{ color: activity.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-[#E11D48] transition-colors truncate">{activity.agent}</p>
                      <p className="text-[9px] text-text-muted truncate">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span className="text-[8.5px] text-text-muted">{activity.time}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Render Queue */}
        <motion.div 
          variants={itemVariants} 
          className="bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">RENDER QUEUE</p>
            <Link href="/render-queue" className="text-[10px] font-semibold text-[#E11D48] hover:underline cursor-pointer">View All</Link>
          </div>
          <div className="space-y-3 flex-1">
            {renderJobs.map((job, i) => (
              <div key={i} onClick={() => router.push('/render-queue')} className="flex gap-2.5 items-center group cursor-pointer">
                <div className="w-9 h-9 rounded-lg border border-[#1E2638] overflow-hidden shrink-0">
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
            ))}
          </div>
        </motion.div>

        {/* Asset Library (2 cols on mobile, 3 cols on sm+) */}
        <motion.div 
          variants={itemVariants} 
          className="bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 transition-all p-4 sm:p-5 flex flex-col"
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
                  className="bg-[#141C2B] border border-[#1E2638] rounded-lg flex flex-col items-center justify-center p-2.5 cursor-pointer hover:border-[#E11D48]/50 transition-all group"
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
        className="bg-[#0E131F] rounded-xl border border-[#1E2638] hover:border-[#E11D48]/40 transition-all p-4 sm:p-5 grid grid-cols-2 lg:grid-cols-4 gap-4 shadow-xl"
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
