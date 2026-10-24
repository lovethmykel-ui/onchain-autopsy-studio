'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Play, Clock, Calendar, Target, Monitor, HardDrive,
  ArrowUpRight, Cpu, TrendingUp, Zap, Database, FolderSearch, Activity,
  Image as ImageIcon, Film, Mic, Music, Volume2, Download,
  ChevronRight, MoreHorizontal, Settings, Camera
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

// ── Authentic Studio Forensics Sample Data ──
const defaultCurrentProject = {
  title: 'Bybit $84.2M Peel Chain Heist',
  description: 'DeepSeek R1 smart contract autopsy and multi-hop Tornado Cash forensic documentary.',
  status: 'In Production',
  progress: 74,
  type: 'Forensic Documentary',
  created: 'Today, 14:20',
  updated: '3m ago',
  target: 'Netflix / YouTube 4K'
};

const recentProjects = [
  { id: '1', title: 'Terra Luna Death Spiral', type: 'Algorithm Collapse', progress: 100, img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=300' },
  { id: '2', title: 'Ronin Bridge Lazarus Hack', type: 'State Heist', progress: 85, img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=300' },
  { id: '3', title: 'Squid Game SQUID Rugpull', type: 'Honeypot Scam', progress: 45, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300' },
  { id: '4', title: 'Euler Finance Flash Loan', type: 'Protocol Exploit', progress: 92, img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300' }
];

const agentActivity = [
  { agent: 'AI Co-Director', time: '1m ago', action: 'Synthesized 6-scene storyboard for Bybit peel chain sequence', icon: Film, color: '#E11D48' },
  { agent: 'Optical Rig Engine', time: '4m ago', action: 'Configured ARRI Alexa 35 with 35mm Master Anamorphic at f/2.0', icon: Camera, color: '#06B6D4' },
  { agent: 'DeepSeek R1 Tracer', time: '8m ago', action: 'De-anonymized 14 Tornado Cash hops to offshore deposit address', icon: Cpu, color: '#8B5CF6' },
  { agent: 'Actor Seed Vault', time: '12m ago', action: 'Locked facial consistency profile for Lazarus Hacker (Seed #99482014)', icon: Target, color: '#F59E0B' }
];

const renderJobs = [
  { scene: 'Scene 01: Flash Loan Infiltration', model: 'NVIDIA Cosmos / WAN 2.1', progress: 82, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=120' },
  { scene: 'Scene 02: Peel Chain Dispersal', model: 'ARRI Alexa 35 4K Raw', progress: 34, img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120' }
];

const assetCounts = [
  { label: 'Optics Rigs', count: 18, tab: 'optics', icon: Camera, color: '#06B6D4' },
  { label: 'Videos', count: 42, tab: 'videos', icon: Film, color: '#E11D48' },
  { label: 'Actors Vault', count: 6, tab: 'actors', icon: Target, color: '#F59E0B' },
  { label: 'Voices (TTS)', count: 24, tab: 'voices', icon: Mic, color: '#10B981' },
  { label: 'Forensic Scores', count: 15, tab: 'music', icon: Music, color: '#8B5CF6' },
  { label: 'Master Exports', count: 8, tab: 'exports', icon: Download, color: '#F97316' },
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
    type: 'Forensic Documentary',
    created: 'Just now',
    updated: 'Just now',
    target: 'Netflix / YouTube'
  } : defaultCurrentProject;

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
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-r from-card via-[#0A0D15]/90 to-card/70">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-accent/15 text-accent border border-accent/30 px-2.5 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider rounded-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    VIRTUAL CINEMA DIRECTOR (HIGGSFIELD RIVAL)
                  </span>
                  <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider rounded-md">
                    NVIDIA NIM FREE KEY READY
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight font-heading">
                  Direct Netflix-Grade On-Chain Documentaries
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary max-w-xl leading-relaxed">
                  Engineered with physical camera optics (ARRI Alexa 35, RED 8K, IMAX 70mm), 50+ camera trajectory presets, suspect face-lock seed vaults, and 3D peel-chain forensics powered by build.nvidia.com.
                </p>
              </div>

              <div className="pt-5 flex flex-wrap items-center gap-3">
                <Link href="/director">
                  <Button className="gap-2 bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25">
                    <Zap className="w-4 h-4 fill-current" />
                    Launch Virtual Cinema Director
                  </Button>
                </Link>
                <Link href="/actor-vault">
                  <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 text-text-secondary hover:text-white">
                    <Target className="w-4 h-4 text-yellow-400" />
                    Suspect Seed Vault
                  </Button>
                </Link>
              </div>
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
            {recentProjects.map((p) => (
              <div key={p.id} onClick={() => router.push('/director')} className="glass-card rounded-xl overflow-hidden group cursor-pointer hover:border-accent/40 hover:shadow-lg transition-all btn-tactile">
                <div className="h-28 sm:h-32 bg-card relative">
                  {p.img ? (
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-card-elevated">
                      <FolderSearch className="w-8 h-8 text-text-muted opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-xs truncate group-hover:text-accent transition-colors">{p.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[9px] text-text-muted font-mono">{p.type}</span>
                      <span className="text-[9px] text-emerald-400 font-mono font-bold">{p.progress}%</span>
                    </div>
                    <Progress value={p.progress} className="h-1 mt-1.5 bg-black/60" indicatorClassName="bg-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ROW 3: Agent Activity, Render Queue, Asset Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Agent Activity */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 flex flex-col h-full"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-bold text-white font-heading tracking-wider uppercase">Agent Activity</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
            {agentActivity.map((activity, i) => {
              const Icon = activity.icon
              return (
                <div key={i} className="flex gap-3 relative group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 z-10 bg-white/5 border border-white/10 group-hover:border-accent/40 transition-colors">
                    <Icon className="w-3.5 h-3.5" style={{ color: activity.color }} />
                  </div>
                  <div className="pt-0.5 flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-white truncate">{activity.agent}</span>
                      <span className="text-[9px] font-mono text-text-muted shrink-0">{activity.time}</span>
                    </div>
                    <p className="text-[11px] text-text-secondary mt-0.5 leading-snug line-clamp-2">{activity.action}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Render Queue */}
        <motion.div 
          variants={itemVariants} 
          className="glass-card rounded-xl hover:border-border-active transition-all p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[2px] text-text-muted uppercase font-heading">RENDER QUEUE</p>
            <Link href="/director" className="text-[10px] font-mono font-semibold text-accent hover:underline cursor-pointer">View Studio</Link>
          </div>
          <div className="space-y-3 flex-1">
            {renderJobs.map((job, i) => (
              <div key={i} onClick={() => router.push('/director')} className="flex gap-2.5 items-center p-2 rounded-lg bg-card-elevated/40 border border-white/5 hover:border-accent/30 group cursor-pointer transition-all btn-tactile">
                <div className="w-10 h-10 rounded-lg border border-white/10 overflow-hidden shrink-0">
                  <img src={job.img} alt={job.scene} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-bold text-white group-hover:text-accent transition-colors truncate pr-2">{job.scene}</p>
                    <span className="text-[10px] font-bold font-mono text-emerald-400">{job.progress}%</span>
                  </div>
                  <p className="text-[9px] text-text-muted mb-1 font-mono">{job.model}</p>
                  <Progress value={job.progress} className="h-1 bg-black/60" indicatorClassName="bg-accent" />
                </div>
              </div>
            ))}
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
