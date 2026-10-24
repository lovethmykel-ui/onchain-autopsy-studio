'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Clapperboard, 
  Sparkles, 
  Cpu, 
  Layers, 
  Camera, 
  Sliders, 
  Compass, 
  Activity, 
  Check, 
  Zap, 
  Play, 
  Key, 
  ExternalLink,
  ShieldAlert,
  Loader2,
  RefreshCw,
  FolderOpen
} from 'lucide-react'
import { DirectorViewfinder } from '@/components/cinema/DirectorViewfinder'
import { CameraRigControls } from '@/components/cinema/CameraRigControls'
import { TrajectoryGizmo } from '@/components/cinema/TrajectoryGizmo'
import { ForensicCanvas3D } from '@/components/cinema/ForensicCanvas3D'
import { MultiTrackTimeline } from '@/components/cinema/MultiTrackTimeline'
import { DEFAULT_ACTOR_PROFILES } from '@/lib/cinema/actors'
import { NVIDIA_NIM_MODELS } from '@/lib/nvidia/client'
import { StoryboardScene, CameraTrajectory } from '@/types/database'
import { toast } from 'sonner'

export default function VirtualCinemaDirectorPage() {
  const [topic, setTopic] = useState('Bybit $84.2M Flash Loan Peel Chain Exploit')
  const [selectedModel, setSelectedModel] = useState(NVIDIA_NIM_MODELS[0].id)
  const [nvidiaApiKey, setNvidiaApiKey] = useState('')
  const [isDirecting, setIsDirecting] = useState(false)
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)
  const [selectedActorId, setSelectedActorId] = useState(DEFAULT_ACTOR_PROFILES[0].id)
  const [scenes, setScenes] = useState<StoryboardScene[]>([])
  const [connectionStatus, setConnectionStatus] = useState<{ connected: boolean; latency?: number } | null>(null)

  // Quick investigation presets
  const presets = [
    { title: 'Bybit Peel Chain ($84.2M)', query: 'Bybit $84.2M Flash Loan Peel Chain Exploit with 14-hop Tornado Cash dispersal' },
    { title: 'Terra Luna Death Spiral ($40B)', query: 'Terra Luna algorithmic stablecoin depeg and Anchor Protocol insolvency autopsy' },
    { title: 'Squid Game Rugpull ($3.38M)', query: 'Squid Game SQUID token honeypot anti-dump contract and Binance Bridge laundering' },
    { title: 'Ronin Bridge Lazarus Heist ($620M)', query: 'Axie Infinity Ronin Network 5-of-9 validator private key breach by Lazarus Group' }
  ]

  // Initialize with initial director storyboard
  useEffect(() => {
    handleDirectSequence(presets[0].query)
  }, [])

  const handleDirectSequence = async (targetTopic: string) => {
    setIsDirecting(true)
    try {
      const res = await fetch('/api/nvidia/director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: targetTopic,
          model: selectedModel,
          apiKey: nvidiaApiKey
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to direct sequence')

      setScenes(data.scenes || [])
      setActiveSceneIndex(0)
      toast.success('Cinematic Storyboard Directed', {
        description: `Generated ${data.scenes?.length || 6} scenes via ${data.provider}`
      })
    } catch (err: any) {
      toast.error('Directing Error', { description: err.message })
    } finally {
      setIsDirecting(false)
    }
  }

  const handleUpdateCurrentScene = (updated: Partial<StoryboardScene>) => {
    setScenes(prev => {
      const copy = [...prev]
      if (copy[activeSceneIndex]) {
        copy[activeSceneIndex] = { ...copy[activeSceneIndex], ...updated }
      }
      return copy
    })
  }

  const handleSelectTrajectory = (traj: CameraTrajectory) => {
    handleUpdateCurrentScene({
      trajectory_preset: traj.id,
      camera_movement: traj.description
    })
    toast.success(`Trajectory Selected: ${traj.name}`)
  }

  const testConnection = async () => {
    try {
      const res = await fetch('/api/nvidia/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: nvidiaApiKey })
      })
      const data = await res.json()
      setConnectionStatus({ connected: data.connected, latency: data.latencyMs })
      if (data.connected) {
        toast.success(`NVIDIA NIM Connected (${data.latencyMs}ms)`, {
          description: 'Live Llama 3.3 and DeepSeek R1 models available.'
        })
      } else {
        toast.info('NVIDIA NIM Standby Mode', {
          description: data.error || 'Running in high-performance local standby mode.'
        })
      }
    } catch {
      setConnectionStatus({ connected: false })
    }
  }

  const handleRenderShot = async (targetScene: StoryboardScene) => {
    try {
      const res = await fetch('/api/ai/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: targetScene.visual_description,
          model: 'nvidia-cosmos',
          apiKey: nvidiaApiKey
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch render')
      toast.success('Shot Render Dispatched', {
        description: `Job ID: ${data.jobId} • Output: ${data.colorSpace} (${data.resolution})`
      })
    } catch (err: any) {
      toast.error('Render Error', { description: err.message })
    }
  }

  const activeScene = scenes[activeSceneIndex] || {
    scene_number: 1,
    shot_type: 'Wide Tactical',
    camera_movement: '360° Matrix Orbit',
    lighting: 'Volumetric cyan haze',
    location: 'Swiss Datacenter',
    mood: 'Tense',
    visual_description: 'Loading scene data...',
    duration: 5
  }

  const activeActor = DEFAULT_ACTOR_PROFILES.find(a => a.id === selectedActorId)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Higgsfield & NVIDIA Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl apple-glass shadow-2xl relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent font-mono text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <Clapperboard className="w-3.5 h-3.5" />
              HIGGSFIELD CINEMA RIVAL // V4.0
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              NVIDIA NIM ENGINE (build.nvidia.com)
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight-heading">
            Virtual Cinema Director & Optical Physics Studio
          </h1>
          <p className="text-xs md:text-sm text-text-secondary max-w-3xl leading-relaxed">
            Full physical camera bodies (ARRI/RED/IMAX), anamorphic glass, optical $f$-stops, 50+ camera trajectory presets, suspect face-lock, and Vox-style onchain forensics.
          </p>
        </div>

        {/* Free NVIDIA API Key Credentials Card */}
        <div className="z-10 flex flex-col gap-2 bg-black/60 p-3.5 rounded-xl border border-white/10 min-w-[280px]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted flex items-center gap-1 text-[11px]">
              <Key className="w-3.5 h-3.5 text-accent" />
              NVIDIA API KEY:
            </span>
            <a 
              href="https://build.nvidia.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-accent hover:underline flex items-center gap-1 text-[10px] font-bold"
            >
              Get Free Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="nvapi-..."
              value={nvidiaApiKey}
              onChange={(e) => setNvidiaApiKey(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
            />
            <button
              onClick={testConnection}
              className="btn-tactile px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-white shrink-0 transition-colors"
            >
              Test
            </button>
          </div>
        </div>
      </div>

      {/* AI Co-Director Topic & Presets Bar */}
      <div className="apple-glass rounded-2xl p-5 shadow-2xl space-y-3.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter any crypto heist, rugpull, smart contract exploit, or documentary topic..."
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all font-body"
            />
          </div>

          {/* Model Selector */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl px-3 py-3 text-xs font-mono text-white focus:outline-none focus:border-accent transition-all cursor-pointer"
          >
            {NVIDIA_NIM_MODELS.map((m) => (
              <option key={m.id} value={m.id} className="bg-neutral-900">
                {m.name} ({m.tier})
              </option>
            ))}
          </select>

          <button
            onClick={() => handleDirectSequence(topic)}
            disabled={isDirecting}
            className="btn-tactile px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/25 border border-accent/50 disabled:opacity-50"
          >
            {isDirecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Directing with NVIDIA NIM...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Direct Sequence</span>
              </>
            )}
          </button>
        </div>

        {/* Investigation Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
          <span className="text-text-muted font-mono text-[10px] uppercase tracking-wider">QUICK PRESETS:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTopic(p.query)
                handleDirectSequence(p.query)
              }}
              className="btn-tactile px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 text-text-secondary hover:text-white transition-all text-xs"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Director Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Viewfinder & Timeline (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Optical Viewfinder */}
          <DirectorViewfinder
            scene={activeScene}
            onUpdateScene={handleUpdateCurrentScene}
            activeActorName={activeActor?.name}
            onRenderShot={handleRenderShot}
          />

          {/* Multi-Track Interactive NLE Timeline */}
          <MultiTrackTimeline
            scenes={scenes}
            activeSceneIndex={activeSceneIndex}
            onSelectScene={(idx) => setActiveSceneIndex(idx)}
          />

          {/* 3D Forensic Canvas / Peel Chain */}
          <ForensicCanvas3D
            stolenAmount={activeScene.hud_overlay?.split('|')[1]?.trim() || '$84,219,450.12'}
            mixerHops={14}
            peelContracts={1420}
          />
        </div>

        {/* Right Column: Optics Rig Controls & Trajectories (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Actor & Suspect Consistency Seed Vault Bar */}
          <div className="apple-glass rounded-2xl p-4 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
                Actor & Suspect Seed Vault (Face-Lock)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                FACE-LOCK ACTIVE
              </span>
            </div>

            <select
              value={selectedActorId}
              onChange={(e) => setSelectedActorId(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-accent transition-all cursor-pointer"
            >
              {DEFAULT_ACTOR_PROFILES.map((actor) => (
                <option key={actor.id} value={actor.id} className="bg-neutral-900">
                  {actor.name} [{actor.role}] — Seed: #{actor.seedId}
                </option>
              ))}
            </select>

            {activeActor && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-text-secondary leading-snug">
                <span className="text-yellow-400 font-semibold">{activeActor.name}:</span> {activeActor.wardrobe}. {activeActor.keyVisualFeatures}.
              </div>
            )}
          </div>

          {/* Optical Physics Rig (Camera Body, Glass, Aperture, Shutter) */}
          <CameraRigControls
            scene={activeScene}
            onChange={handleUpdateCurrentScene}
          />

          {/* Camera Trajectories & 3D Motion */}
          <TrajectoryGizmo
            currentPresetId={activeScene.trajectory_preset}
            onSelectTrajectory={handleSelectTrajectory}
          />
        </div>

      </div>
    </div>
  )
}
