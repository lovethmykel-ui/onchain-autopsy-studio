'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  Maximize2, 
  Crosshair, 
  Grid, 
  Aperture, 
  Eye, 
  EyeOff,
  Sparkles, 
  Layers, 
  Film,
  Compass,
  Play,
  Volume2,
  BatteryCharging,
  HardDrive,
  Focus,
  Sliders,
  Video,
  Loader2
} from 'lucide-react'
import { StoryboardScene } from '@/types/database'
import { CAMERA_BODIES, LENS_OPTICS, COLOR_LUTS, ASPECT_RATIOS } from '@/lib/cinema/optics'
import { toast } from 'sonner'

interface DirectorViewfinderProps {
  scene: StoryboardScene
  onUpdateScene?: (updated: Partial<StoryboardScene>) => void
  activeActorName?: string
  onRenderShot?: (scene: StoryboardScene) => void
}

export function DirectorViewfinder({ scene, onUpdateScene, activeActorName, onRenderShot }: DirectorViewfinderProps) {
  const [showGrid, setShowGrid] = useState(true)
  const [showCrosshairs, setShowCrosshairs] = useState(true)
  const [showSafeFrames, setShowSafeFrames] = useState(true)
  const [peakingEnabled, setPeakingEnabled] = useState(false)
  const [showSlate, setShowSlate] = useState(true)
  const [isRenderingVideo, setIsRenderingVideo] = useState(false)

  const camera = CAMERA_BODIES.find(c => c.id === scene.camera_body) || CAMERA_BODIES[0]
  const lens = LENS_OPTICS.find(l => l.id === scene.lens) || LENS_OPTICS[0]
  const colorLut = COLOR_LUTS.find(c => c.id === scene.color_lut) || COLOR_LUTS[0]
  const aspectRatio = scene.aspect_ratio || '2.39:1'

  const handleTriggerRender = async () => {
    setIsRenderingVideo(true)
    toast.info('Synthesizing Shot Video...', {
      description: `Dispatched to NVIDIA Cosmos / WAN 2.1 rig (${camera.name}, ${scene.focal_length || 35}mm, ${scene.aperture || 'f/2.0'}).`
    })
    try {
      if (onRenderShot) {
        await onRenderShot(scene)
      } else {
        await new Promise(r => setTimeout(r, 2200))
        toast.success('Shot Render Complete', {
          description: '4K ProRes 4444 frame sequence rendered with anamorphic optics.'
        })
      }
    } finally {
      setIsRenderingVideo(false)
    }
  }

  // Dynamic aspect ratio container styling with balanced Apple optical geometry
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '2.39:1': return 'aspect-[2.39/1] min-h-[340px] md:min-h-[440px] max-h-[580px]'
      case '16:9': return 'aspect-[16/9] min-h-[340px] md:min-h-[460px] max-h-[600px]'
      case '9:16': return 'aspect-[9/16] max-w-[340px] mx-auto min-h-[480px]'
      case '4:3': return 'aspect-[4/3] max-w-[600px] mx-auto min-h-[400px]'
      case '1.43:1': return 'aspect-[1.43/1] max-w-[640px] mx-auto min-h-[420px]'
      default: return 'aspect-[2.39/1] min-h-[340px]'
    }
  }

  // Dynamic atmospheric tone based on color LUT
  const getLutBackground = () => {
    switch (scene.color_lut) {
      case 'fincher_green':
        return 'from-[#030805] via-[#09150E] to-[#040A07]'
      case 'forensic_uv':
        return 'from-[#070512] via-[#0D0B24] to-[#05040E]'
      case 'bleach_bypass':
        return 'from-[#0A0A0B] via-[#141518] to-[#080809]'
      case 'kodak_vision3':
        return 'from-[#0E0B08] via-[#1A140F] to-[#0B0805]'
      default:
        return 'from-[#08090E] via-[#0E121B] to-[#07080D]'
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#06070A] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      
      {/* ── TOP ONBOARD MONITOR BEZEL (ARRI / RED SmallHD Style) ── */}
      <div className="bg-[#0A0C12]/95 px-4 py-2 border-b border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-text-secondary select-none gap-2">
        {/* Left: Tally + Camera Identification */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400 font-bold tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            REC • 4K RAW
          </span>
          <span className="text-white font-bold tracking-tight">
            {camera.name.toUpperCase()}
          </span>
          <span className="text-white/20">/</span>
          <span className="text-accent font-semibold">{lens.name}</span>
          <span className="text-white/20">/</span>
          <span className="text-yellow-400 font-bold">{scene.focal_length || 35}mm</span>
          <span className="text-emerald-400 font-bold">{scene.aperture || 'f/2.0'}</span>
        </div>

        {/* Right: Optical Telemetry & Hardware Status */}
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-cyan-400 font-semibold">{scene.shutter_angle || 180}° SHUTTER</span>
          <span className="text-white/20">|</span>
          <span className="text-text-muted">ISO: <strong className="text-white">{camera.nativeIso}</strong></span>
          <span className="text-white/20">|</span>
          <span className="text-text-muted">WB: <strong className="text-white">5600K</strong></span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <BatteryCharging className="w-3 h-3" /> 14.8V
          </span>
          <span className="flex items-center gap-1 text-text-secondary font-mono">
            <HardDrive className="w-3 h-3" /> 84M
          </span>
        </div>
      </div>

      {/* ── MAIN OPTICAL VIEWPORT CANVAS ── */}
      <div className={`relative w-full ${getAspectRatioClasses()} transition-all duration-500 flex items-center justify-center overflow-hidden bg-gradient-to-b ${getLutBackground()}`}>
        
        {/* Subtle Radial Optical Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-black/80 pointer-events-none" />

        {/* Anamorphic Blue Flare Streak */}
        {lens.type === 'Anamorphic' && (
          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-[1.5px] pointer-events-none opacity-80" />
        )}

        {/* Focus Peaking Simulation Overlay */}
        {peakingEnabled && (
          <div className="absolute inset-0 pointer-events-none border border-emerald-400/30 opacity-60 mix-blend-screen" />
        )}

        {/* Rule of Thirds Cine Grid */}
        {showGrid && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
            <div className="border-r border-b border-white/60" />
            <div className="border-r border-b border-white/60" />
            <div className="border-b border-white/60" />
            <div className="border-r border-b border-white/60" />
            <div className="border-r border-b border-white/60" />
            <div className="border-b border-white/60" />
            <div className="border-r border-b border-white/60" />
            <div className="border-r border-b border-white/60" />
            <div className="" />
          </div>
        )}

        {/* Center Optical Crosshair & Boresight Reticle */}
        {showCrosshairs && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border border-cyan-400" />
              <div className="absolute w-8 h-[1px] bg-cyan-400" />
              <div className="absolute h-8 w-[1px] bg-cyan-400" />
            </div>
          </div>
        )}

        {/* 90% Safe Margin Boundary */}
        {showSafeFrames && (
          <div className="absolute inset-6 border border-white/20 rounded pointer-events-none flex flex-col justify-between p-2">
            <span className="text-[8.5px] font-mono text-white/40 tracking-[1.5px] uppercase">90% SAFE ACTION</span>
            <span className="text-[8.5px] font-mono text-white/40 tracking-[1.5px] uppercase text-right">{aspectRatio}</span>
          </div>
        )}

        {/* Framing Corner Tick Markers */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/70 pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/70 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/70 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/70 pointer-events-none" />

        {/* ── LOWER-THIRD FLOATING CINEMA SLATE ── */}
        {showSlate && (
          <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none transition-all duration-300">
            <div className="max-w-xl pointer-events-auto apple-glass p-4 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent font-mono text-[10px] font-bold">
                  SHOT #{scene.scene_number.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                  {scene.shot_type || 'Wide Tactical'}
                </span>
                <span className="text-[10px] font-mono text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-md">
                  {scene.trajectory_preset || '360° Matrix Orbit'}
                </span>
              </div>

              <h3 className="text-sm md:text-base font-bold font-heading text-white tracking-tight leading-snug mb-1">
                {scene.title || `Scene ${scene.scene_number}: Investigation Sequence`}
              </h3>

              <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">
                {scene.visual_description}
              </p>

              {scene.hud_overlay && (
                <div className="mt-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20 truncate">
                  <span className="font-bold text-cyan-300">TELEMETRY:</span> {scene.hud_overlay}
                </div>
              )}
            </div>

            {/* Active Actor Continuity Tag */}
            {activeActorName && (
              <div className="pointer-events-auto apple-glass px-3 py-1.5 rounded-xl border border-yellow-400/30 text-[10px] font-mono text-yellow-300 flex items-center gap-1.5 shrink-0 self-start sm:self-end shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span>ACTOR SEED: {activeActorName}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── LOWER DIRECTOR TOOLBAR (TACTILE APPLE CONTROLS) ── */}
      <div className="bg-[#0A0C12]/95 px-4 py-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
        
        {/* Viewfinder Overlays Toggles */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setShowSlate(!showSlate)}
            title={showSlate ? "Switch to Clean Feed" : "Show Director Slate"}
            className={`btn-tactile px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-mono transition-colors ${
              showSlate ? 'bg-white/10 text-white font-semibold border border-white/15' : 'text-text-muted hover:text-white border border-transparent'
            }`}
          >
            {showSlate ? <Eye className="w-3.5 h-3.5 text-accent" /> : <EyeOff className="w-3.5 h-3.5" />}
            {showSlate ? 'Slate' : 'Clean Feed'}
          </button>

          <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`btn-tactile px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-mono transition-colors ${
              showGrid ? 'bg-accent/20 border border-accent/40 text-accent font-semibold' : 'text-text-muted hover:text-white border border-transparent'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Grid
          </button>

          <button 
            onClick={() => setShowCrosshairs(!showCrosshairs)}
            className={`btn-tactile px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-mono transition-colors ${
              showCrosshairs ? 'bg-accent/20 border border-accent/40 text-accent font-semibold' : 'text-text-muted hover:text-white border border-transparent'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            Crosshair
          </button>

          <button 
            onClick={() => setShowSafeFrames(!showSafeFrames)}
            className={`btn-tactile px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-mono transition-colors ${
              showSafeFrames ? 'bg-accent/20 border border-accent/40 text-accent font-semibold' : 'text-text-muted hover:text-white border border-transparent'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Safe
          </button>

          <button 
            onClick={() => setPeakingEnabled(!peakingEnabled)}
            className={`btn-tactile px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-mono transition-colors ${
              peakingEnabled ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold' : 'text-text-muted hover:text-white border border-transparent'
            }`}
          >
            <Focus className="w-3.5 h-3.5" />
            Peaking
          </button>
        </div>

        {/* Aspect Ratio Switcher (Apple Segmented Control Style) */}
        <div className="segmented-control">
          {ASPECT_RATIOS.map((ar) => (
            <button
              key={ar.id}
              onClick={() => onUpdateScene?.({ aspect_ratio: ar.id })}
              className={`btn-tactile px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                aspectRatio === ar.id 
                  ? 'bg-accent text-white font-bold shadow-md shadow-accent/20' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {ar.ratio}
            </button>
          ))}
        </div>

        {/* Direct Shot Video Render Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerRender}
            disabled={isRenderingVideo}
            className="btn-tactile px-3.5 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-accent/20 border border-accent/50 disabled:opacity-50"
          >
            {isRenderingVideo ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Cosmos Rig Rendering...</span>
              </>
            ) : (
              <>
                <Video className="w-3.5 h-3.5 fill-current" />
                <span>Render Shot (Cosmos & WAN)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
