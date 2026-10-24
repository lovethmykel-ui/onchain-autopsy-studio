'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, RotateCw, Move, Video, Navigation, Orbit, Zap } from 'lucide-react'
import { CAMERA_TRAJECTORIES } from '@/lib/cinema/trajectories'
import { CameraTrajectory } from '@/types/database'

interface TrajectoryGizmoProps {
  currentPresetId?: string
  onSelectTrajectory: (trajectory: CameraTrajectory) => void
}

export function TrajectoryGizmo({ currentPresetId, onSelectTrajectory }: TrajectoryGizmoProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'Cinematic Orbit', 'Dolly & Push', 'FPV & Drone', 'Handheld & Staccato', 'Forensic Crane']

  const filtered = selectedCategory === 'All'
    ? CAMERA_TRAJECTORIES
    : CAMERA_TRAJECTORIES.filter(t => t.category === selectedCategory)

  const activeTrajectory = CAMERA_TRAJECTORIES.find(t => t.id === currentPresetId) || CAMERA_TRAJECTORIES[0]

  return (
    <div className="apple-glass rounded-2xl p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 shadow-sm">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading text-white tracking-tight">
              Camera Trajectories & 3D Motion
            </h4>
            <p className="text-[11px] text-text-secondary">
              50+ optical vector coordinates with sub-millimeter curves.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>{activeTrajectory.name}</span>
        </div>
      </div>

      {/* 3D Vector Coordinate Dashboard */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-black/50 p-2.5 rounded-xl border border-white/8 font-mono text-[11px]">
        <div className="bg-white/[0.03] p-2 rounded-lg text-center border border-white/5">
          <span className="text-text-muted block text-[9px] uppercase tracking-wider">OFFSET X</span>
          <span className="text-cyan-400 font-bold tabular-nums">{activeTrajectory.vector.x}m</span>
        </div>
        <div className="bg-white/[0.03] p-2 rounded-lg text-center border border-white/5">
          <span className="text-text-muted block text-[9px] uppercase tracking-wider">OFFSET Y</span>
          <span className="text-cyan-400 font-bold tabular-nums">{activeTrajectory.vector.y}m</span>
        </div>
        <div className="bg-white/[0.03] p-2 rounded-lg text-center border border-white/5">
          <span className="text-text-muted block text-[9px] uppercase tracking-wider">OFFSET Z</span>
          <span className="text-cyan-400 font-bold tabular-nums">{activeTrajectory.vector.z}m</span>
        </div>
        <div className="bg-white/[0.03] p-2 rounded-lg text-center border border-white/5">
          <span className="text-text-muted block text-[9px] uppercase tracking-wider">PITCH</span>
          <span className="text-white font-bold tabular-nums">{activeTrajectory.vector.pitch}°</span>
        </div>
        <div className="bg-white/[0.03] p-2 rounded-lg text-center border border-white/5">
          <span className="text-text-muted block text-[9px] uppercase tracking-wider">YAW</span>
          <span className="text-white font-bold tabular-nums">{activeTrajectory.vector.yaw}°</span>
        </div>
        <div className="bg-white/[0.03] p-2 rounded-lg text-center border border-white/5">
          <span className="text-text-muted block text-[9px] uppercase tracking-wider">SPEED</span>
          <span className="text-emerald-400 font-bold tabular-nums">{activeTrajectory.speedMultiplier}x</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/40 border border-white/8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn-tactile px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                : 'text-text-muted hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trajectory Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
        {filtered.map((traj) => {
          const isSelected = activeTrajectory.id === traj.id
          return (
            <button
              key={traj.id}
              onClick={() => onSelectTrajectory(traj)}
              className={`btn-tactile p-3 rounded-xl text-left border transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500/70 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-500/40'
                  : 'bg-white/[0.02] border-white/8 hover:bg-white/[0.06] hover:border-white/15 text-text-muted hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {traj.name}
                </span>
                <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                  {traj.speedMultiplier}x
                </span>
              </div>
              <p className="text-[11px] text-text-secondary leading-snug line-clamp-2">
                {traj.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
