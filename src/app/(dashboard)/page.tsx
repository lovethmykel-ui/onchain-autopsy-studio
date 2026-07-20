'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Play, Clock, Calendar, Target, Monitor, HardDrive,
  ArrowUpRight, Cpu, TrendingUp, Zap, Database,
  Image, Film, Mic, Music, Volume2, Download,
  ChevronRight, MoreHorizontal
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
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
  { title: 'FTX Collapse', type: 'Documentary', progress: 48, updated: 'Updated 1d ago', thumbnail: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { title: 'Terra Luna Crash', type: 'Documentary', progress: 62, updated: 'Updated 3d ago', thumbnail: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)' },
  { title: 'Bybit Hack', type: 'Investigation', progress: 35, updated: 'Updated 3d ago', thumbnail: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)' },
  { title: 'Pig Butchering Scams', type: 'Documentary', progress: 20, updated: 'Updated 5d ago', thumbnail: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%)' },
]

const agentActivity = [
  { agent: 'Video Director', action: 'Generating 24 scenes with Seedance 1.0', time: '2 mins ago', color: '#EF4444' },
  { agent: 'Image Director', action: 'Generated 142 images with Nano Banana', time: '5 mins ago', color: '#06B6D4' },
  { agent: 'Voice Director', action: 'Generated narration (23:48) with ElevenLabs', time: '8 mins ago', color: '#A855F7' },
  { agent: 'Music Director', action: 'Generated documentary score with Suno', time: '12 mins ago', color: '#D946EF' },
  { agent: 'Sound Design Director', action: 'Generating ambience and SFX', time: '15 mins ago', color: '#14B8A6' },
]

const renderJobs = [
  { scene: 'Scene 45 - Conference Hall', model: 'Seedance 1.0', resolution: '4K', progress: 71 },
  { scene: 'Scene 46 - Ruja Speaking', model: 'Seedance 1.0', resolution: '4K', progress: 52 },
  { scene: 'Scene 47 - Investor Crowd', model: 'Veo 3', resolution: '1080p', progress: 28 },
  { scene: 'Scene 48 - News Report', model: 'Kling 2.0', resolution: '1080p', progress: 0 },
]

const assetCounts = [
  { label: 'Images', count: 2451, icon: Image, color: '#1F6FEB' },
  { label: 'Videos', count: 1248, icon: Film, color: '#EF4444' },
  { label: 'Voices', count: 342, icon: Mic, color: '#A855F7' },
  { label: 'Music', count: 128, icon: Music, color: '#D946EF' },
  { label: 'SFX', count: 982, icon: Volume2, color: '#14B8A6' },
  { label: 'Exports', count: 73, icon: Download, color: '#F59E0B' },
]

const pipelineAgents = AGENTS.map((agent, i) => ({
  ...agent,
  status: i < 6 ? 'completed' as const : i === 6 ? 'running' as const : 'waiting' as const,
}))

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-6"
    >
      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Row 1: Current Project + System Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Current Project Card */}
          <motion.div variants={itemVariants} className="xl:col-span-2 glass-card p-5">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">CURRENT PROJECT</p>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-xl font-bold text-text-primary font-heading">{currentProject.title}</h1>
                  <Badge variant="in-production">{currentProject.status}</Badge>
                </div>
                <p className="text-xs text-text-secondary mb-4 max-w-lg leading-relaxed">
                  {currentProject.description}
                </p>
              </div>
              {/* Thumbnail area */}
              <div className="hidden md:block w-48 h-28 rounded-lg overflow-hidden relative ml-4 shrink-0"
                style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-[10px] font-bold text-white tracking-widest uppercase">ONECOIN</p>
                  <p className="text-[8px] text-white/60 tracking-[0.2em] uppercase">THE BILLION DOLLAR LIE</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-text-muted">Progress</span>
                <span className="text-xs font-bold text-accent">{currentProject.progress}% Complete</span>
              </div>
              <Progress value={currentProject.progress} className="h-2" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-6 text-[11px] text-text-muted">
              <div className="flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5" />
                <span>Type</span>
                <span className="text-text-secondary font-medium">{currentProject.type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Created</span>
                <span className="text-text-secondary font-medium">{currentProject.created}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Updated</span>
                <span className="text-text-secondary font-medium">{currentProject.updated}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Target</span>
                <span className="text-text-secondary font-medium">{currentProject.target}</span>
              </div>
            </div>
          </motion.div>

          {/* System Overview */}
          <motion.div variants={itemVariants} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">SYSTEM OVERVIEW</p>
              <span className="text-[10px] text-accent cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-4">
              <SystemStat
                icon={<div className="status-dot status-dot-active" />}
                label="Agents Online"
                value="13 / 13"
              />
              <SystemStat
                icon={<div className="w-2 h-2 rounded bg-accent" />}
                label="Render Queue"
                value="4"
              />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-text-muted" />
                    <span className="text-xs text-text-secondary">GPU Usage</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary">64%</span>
                </div>
                <Progress value={64} className="h-1.5" indicatorClassName="bg-gradient-to-r from-success to-success" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-text-muted" />
                    <span className="text-xs text-text-secondary">Storage Used</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary">1.2 TB / 5 TB</span>
                </div>
                <Progress value={24} className="h-1.5" indicatorClassName="bg-gradient-to-r from-warning to-warning" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Quick Actions + Recent Projects */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="glass-card p-5">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase mb-4">QUICK ACTIONS</p>
            <div className="grid grid-cols-2 gap-2">
              {WORKFLOW_TYPES.map((wf) => {
                const Icon = wf.icon
                return (
                  <motion.button
                    key={wf.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card-elevated border border-border hover:border-border-hover transition-all duration-200 cursor-pointer text-left group"
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${wf.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: wf.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-text-primary truncate">{wf.name}</p>
                      <p className="text-[10px] text-text-muted truncate">{wf.subtitle}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div variants={itemVariants} className="xl:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">RECENT PROJECTS</p>
              <span className="text-[10px] text-accent cursor-pointer hover:underline">View All</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {recentProjects.map((project) => (
                <motion.div
                  key={project.title}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border overflow-hidden cursor-pointer group hover:border-border-hover transition-all duration-200"
                >
                  <div
                    className="h-24 relative"
                    style={{ background: project.thumbnail }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-3 bg-card-elevated">
                    <p className="text-xs font-medium text-text-primary truncate">{project.title}</p>
                    <p className="text-[10px] text-text-muted mb-2">{project.type}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-accent">{project.progress}%</span>
                      <span className="text-[9px] text-text-muted">{project.updated}</span>
                    </div>
                    <Progress value={project.progress} className="h-1 mt-1.5" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 3: Agent Activity + Render Queue + Asset Library */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Activity */}
          <motion.div variants={itemVariants} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">AGENT ACTIVITY</p>
              <span className="text-[10px] text-accent cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-3">
              {agentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${activity.color}15` }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activity.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-text-primary">{activity.agent}</p>
                    <p className="text-[10px] text-text-muted truncate">{activity.action}</p>
                  </div>
                  <span className="text-[10px] text-text-muted shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Render Queue */}
          <motion.div variants={itemVariants} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">RENDER QUEUE</p>
              <span className="text-[10px] text-accent cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-3">
              {renderJobs.map((job, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-text-primary truncate">{job.scene}</p>
                      <p className="text-[10px] text-text-muted">{job.model} • {job.resolution}</p>
                    </div>
                    <span className={cn(
                      "text-xs font-bold",
                      job.progress > 0 ? "text-accent" : "text-text-muted"
                    )}>
                      {job.progress > 0 ? `${job.progress}%` : 'Pending'}
                    </span>
                  </div>
                  <Progress
                    value={job.progress}
                    className="h-1"
                    indicatorClassName={job.progress === 0 ? 'bg-text-muted' : undefined}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Asset Library */}
          <motion.div variants={itemVariants} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">ASSET LIBRARY</p>
              <span className="text-[10px] text-accent cursor-pointer hover:underline">View All</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {assetCounts.map((asset) => {
                const Icon = asset.icon
                return (
                  <motion.div
                    key={asset.label}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card-elevated border border-border hover:border-border-hover transition-all duration-200 cursor-pointer"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${asset.color}12` }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: asset.color }} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-text-primary">{asset.count.toLocaleString()}</p>
                      <p className="text-[10px] text-text-muted">{asset.label}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Row 4: Usage & Cost Overview */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase mb-4">USAGE & COST OVERVIEW</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <UsageStat
              icon={<Zap className="w-4 h-4 text-accent" />}
              label="Total Credits"
              value="48,730"
              change="+12% this month"
              changeColor="text-success"
            />
            <UsageStat
              icon={<TrendingUp className="w-4 h-4 text-error" />}
              label="Total Cost"
              value="$342.58"
              change="+8% this month"
              changeColor="text-warning"
            />
            <UsageStat
              icon={<Cpu className="w-4 h-4 text-accent" />}
              label="Generations"
              value="1,248"
              change="+15% this month"
              changeColor="text-success"
            />
            <UsageStat
              icon={<Database className="w-4 h-4 text-warning" />}
              label="Storage Used"
              value="1.2 TB"
              subvalue="24% of 5 TB"
              progress={24}
            />
          </div>
        </motion.div>
      </div>

      {/* Right Sidebar: Production Pipeline */}
      <motion.div
        variants={itemVariants}
        className="hidden 2xl:block w-[300px] shrink-0"
      >
        <div className="glass-card p-5 sticky top-[88px]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">PRODUCTION PIPELINE</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-text-primary">OneCoin Documentary</p>
            <Badge variant="in-production" className="text-[9px]">In Progress</Badge>
          </div>

          <div className="space-y-1">
            {pipelineAgents.map((agent) => (
              <div
                key={agent.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150",
                  agent.status === 'running' && "bg-accent-muted",
                )}
              >
                <span className="text-[11px] font-bold text-text-muted w-5">{String(agent.id).padStart(2, '0')}</span>
                <div
                  className={cn(
                    "status-dot",
                    agent.status === 'completed' && "status-dot-active",
                    agent.status === 'running' && "status-dot-processing",
                    agent.status === 'waiting' && "status-dot-waiting",
                  )}
                />
                <span className={cn(
                  "text-xs flex-1 truncate",
                  agent.status === 'running' ? "text-text-primary font-medium" : "text-text-secondary",
                )}>
                  {agent.name}
                </span>
                <span className={cn(
                  "text-[10px] font-medium",
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
            className="w-full mt-4 h-10 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Manage Workflow
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Sub-components ──

function SystemStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-text-secondary">{label}</span>
      </div>
      <span className="text-sm font-bold text-text-primary">{value}</span>
    </div>
  )
}

function UsageStat({
  icon, label, value, change, changeColor, subvalue, progress,
}: {
  icon: React.ReactNode
  label: string
  value: string
  change?: string
  changeColor?: string
  subvalue?: string
  progress?: number
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-card-elevated border border-border">
      <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-text-muted mb-0.5">{label}</p>
        <p className="text-lg font-bold text-text-primary leading-tight">{value}</p>
        {change && (
          <p className={cn("text-[10px] mt-0.5", changeColor)}>{change}</p>
        )}
        {subvalue && (
          <p className="text-[10px] text-text-muted mt-0.5">{subvalue}</p>
        )}
        {progress !== undefined && (
          <Progress value={progress} className="h-1 mt-1.5" indicatorClassName="bg-gradient-to-r from-warning to-warning" />
        )}
      </div>
    </div>
  )
}
