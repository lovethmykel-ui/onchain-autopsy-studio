'use client'

import React, { useState } from 'react'
import { 
  Camera, 
  Aperture as ApertureIcon, 
  Eye, 
  Sliders, 
  Copy, 
  Check, 
  Sparkles,
  Palette,
  Timer
} from 'lucide-react'
import { StoryboardScene, CameraBodyId, LensOpticId, ColorLutId } from '@/types/database'
import { 
  CAMERA_BODIES, 
  LENS_OPTICS, 
  FOCAL_LENGTHS, 
  APERTURES, 
  SHUTTER_ANGLES, 
  COLOR_LUTS,
  buildHiggsfieldPrompt 
} from '@/lib/cinema/optics'
import { toast } from 'sonner'

interface CameraRigControlsProps {
  scene: StoryboardScene
  onChange: (updated: Partial<StoryboardScene>) => void
}

export function CameraRigControls({ scene, onChange }: CameraRigControlsProps) {
  const [copied, setCopied] = useState(false)

  const currentCamera = CAMERA_BODIES.find(c => c.id === scene.camera_body) || CAMERA_BODIES[0]
  const currentLens = LENS_OPTICS.find(l => l.id === scene.lens) || LENS_OPTICS[0]
  const currentFocal = scene.focal_length || 35
  const currentAperture = scene.aperture || 'f/2.0'
  const currentShutter = scene.shutter_angle || 180
  const currentLut = COLOR_LUTS.find(c => c.id === scene.color_lut) || COLOR_LUTS[0]

  const fullPrompt = buildHiggsfieldPrompt(scene)

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt)
    setCopied(true)
    toast.success('Higgsfield Prompt Copied', {
      description: 'Optical physics & camera rig tokens copied to clipboard.'
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5 apple-glass rounded-2xl p-5 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent/15 border border-accent/25 text-accent shadow-sm">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading text-white tracking-tight">
              Optical Physics Rig
            </h4>
            <p className="text-[11px] text-text-secondary">
              Virtual sensor chemistry, anamorphic glass, and $f$-stops.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyPrompt}
          className="btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-accent" />}
          <span className="font-mono text-[11px]">{copied ? 'Copied' : 'Copy Prompt'}</span>
        </button>
      </div>

      {/* Row 1: Camera Body & Lens Optics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Camera Body */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-eyebrow flex items-center gap-1.5">
            <Camera className="w-3 h-3 text-accent" />
            Sensor Body
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CAMERA_BODIES.map((cam) => {
              const active = (scene.camera_body || CAMERA_BODIES[0].id) === cam.id
              return (
                <button
                  key={cam.id}
                  onClick={() => onChange({ camera_body: cam.id })}
                  className={`btn-tactile p-2.5 rounded-xl text-left border transition-all relative overflow-hidden ${
                    active
                      ? 'bg-accent/15 border-accent text-white shadow-[0_0_15px_rgba(225,29,72,0.2)] ring-1 ring-accent/30'
                      : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.07] hover:border-white/15 text-text-muted hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight truncate">{cam.name}</div>
                  <div className="text-[10px] text-text-secondary truncate mt-0.5 font-mono">{cam.sensor}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Lens Optic */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-eyebrow flex items-center gap-1.5">
            <Eye className="w-3 h-3 text-accent" />
            Optic Glass
          </label>
          <div className="grid grid-cols-2 gap-2">
            {LENS_OPTICS.map((lens) => {
              const active = (scene.lens || LENS_OPTICS[0].id) === lens.id
              return (
                <button
                  key={lens.id}
                  onClick={() => onChange({ lens: lens.id })}
                  className={`btn-tactile p-2.5 rounded-xl text-left border transition-all relative overflow-hidden ${
                    active
                      ? 'bg-accent/15 border-accent text-white shadow-[0_0_15px_rgba(225,29,72,0.2)] ring-1 ring-accent/30'
                      : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.07] hover:border-white/15 text-text-muted hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight truncate">{lens.name}</div>
                  <div className="text-[10px] text-accent/80 truncate mt-0.5 font-mono">{lens.type}</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Focal Length & Apertures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Focal Length */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-text-muted uppercase tracking-eyebrow flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-text-secondary" />
              Focal Length
            </label>
            <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded-md bg-white/10 border border-white/15 tabular-nums">
              {currentFocal}mm
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/40 border border-white/8">
            {FOCAL_LENGTHS.map((f) => (
              <button
                key={f.mm}
                onClick={() => onChange({ focal_length: f.mm })}
                className={`btn-tactile flex-1 py-1 px-2 rounded-lg text-xs font-mono transition-all text-center tabular-nums ${
                  currentFocal === f.mm
                    ? 'bg-white/20 text-white font-bold shadow-sm'
                    : 'text-text-muted hover:text-white'
                }`}
                title={f.use}
              >
                {f.mm}
              </button>
            ))}
          </div>
        </div>

        {/* Aperture (f-stop) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-text-muted uppercase tracking-eyebrow flex items-center gap-1.5">
              <ApertureIcon className="w-3 h-3 text-text-secondary" />
              Aperture ($f$-stop)
            </label>
            <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 tabular-nums">
              {currentAperture}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/40 border border-white/8">
            {APERTURES.map((a) => (
              <button
                key={a.value}
                onClick={() => onChange({ aperture: a.value })}
                className={`btn-tactile flex-1 py-1 px-1.5 rounded-lg text-xs font-mono transition-all text-center ${
                  currentAperture === a.value
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold shadow-sm'
                    : 'text-text-muted hover:text-white'
                }`}
                title={a.dof}
              >
                {a.value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Shutter Angle & Color LUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Shutter Angle */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-eyebrow flex items-center gap-1.5">
            <Timer className="w-3 h-3 text-text-secondary" />
            Shutter Angle
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/8">
            {SHUTTER_ANGLES.map((s) => (
              <button
                key={s.angle}
                onClick={() => onChange({ shutter_angle: s.angle })}
                className={`btn-tactile py-1 px-1.5 rounded-lg text-center text-xs font-mono transition-all ${
                  currentShutter === s.angle
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                    : 'text-text-muted hover:text-white'
                }`}
                title={s.feel}
              >
                {s.angle}°
              </button>
            ))}
          </div>
        </div>

        {/* Color LUT Science */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-eyebrow flex items-center gap-1.5">
            <Palette className="w-3 h-3 text-text-secondary" />
            Color LUT Grade
          </label>
          <select
            value={scene.color_lut || COLOR_LUTS[0].id}
            onChange={(e) => onChange({ color_lut: e.target.value as ColorLutId })}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent font-mono transition-all cursor-pointer"
          >
            {COLOR_LUTS.map((lut) => (
              <option key={lut.id} value={lut.id} className="bg-neutral-900">
                {lut.name} — {lut.style}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Synthesized Prompt Preview */}
      <div className="pt-2">
        <div className="text-[10px] font-mono text-text-muted mb-1.5 flex items-center justify-between">
          <span className="uppercase tracking-wider">SYNTHESIZED HIGGSFIELD CINEMA TOKENS:</span>
          <span className="text-accent text-[9px] font-bold">NVIDIA COSMOS & WAN 2.1</span>
        </div>
        <div className="bg-black/60 p-3 rounded-xl border border-white/8 text-[11px] font-mono text-text-secondary leading-relaxed break-all select-all font-light">
          {fullPrompt}
        </div>
      </div>
    </div>
  )
}
