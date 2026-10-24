'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Film, 
  Activity, 
  Mic, 
  Music, 
  Scissors, 
  SkipBack, 
  SkipForward,
  Layers,
  Sparkles
} from 'lucide-react'
import { StoryboardScene } from '@/types/database'

interface MultiTrackTimelineProps {
  scenes: StoryboardScene[]
  activeSceneIndex: number
  onSelectScene: (index: number) => void
}

export function MultiTrackTimeline({
  scenes,
  activeSceneIndex,
  onSelectScene
}: MultiTrackTimelineProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playheadPercent, setPlayheadPercent] = useState(12)
  const tracksContainerRef = useRef<HTMLDivElement | null>(null)

  const totalDuration = scenes.reduce((acc, s) => acc + (s.duration || 5), 0) || 30

  // Smooth playback loop
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setPlayheadPercent(prev => {
        if (prev >= 100) {
          setIsPlaying(false)
          return 0
        }
        return prev + (100 / (totalDuration * 20))
      })
    }, 50)
    return () => clearInterval(interval)
  }, [isPlaying, totalDuration])

  // Scrub handler for click & drag
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tracksContainerRef.current) return
    const rect = tracksContainerRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
    setPlayheadPercent(percent)

    // Calculate corresponding scene index
    const sceneIdx = Math.min(scenes.length - 1, Math.floor((percent / 100) * scenes.length))
    if (sceneIdx !== activeSceneIndex) {
      onSelectScene(sceneIdx)
    }
  }

  // Calculate timecode string e.g. 00:01:24:18
  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const frames = Math.floor((seconds % 1) * 24)
    return `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`
  }

  return (
    <div className="apple-glass rounded-2xl p-5 shadow-2xl space-y-4">
      {/* Timeline Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3.5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="segmented-control">
            <button
              onClick={() => {
                const prevIdx = Math.max(0, activeSceneIndex - 1)
                onSelectScene(prevIdx)
                setPlayheadPercent((prevIdx / scenes.length) * 100 + 4)
              }}
              className="btn-tactile p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
              title="Previous Shot"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-tactile px-3.5 py-1.5 rounded-lg bg-accent text-white font-bold flex items-center gap-1.5 text-xs hover:bg-accent-hover transition-colors shadow-sm"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => {
                const nextIdx = Math.min(scenes.length - 1, activeSceneIndex + 1)
                onSelectScene(nextIdx)
                setPlayheadPercent((nextIdx / scenes.length) * 100 + 4)
              }}
              className="btn-tactile p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
              title="Next Shot"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="font-mono text-xs tracking-wider text-cyan-400 font-bold bg-black/50 px-3 py-1.5 rounded-xl border border-white/8 tabular-nums">
            {formatTimecode((playheadPercent / 100) * totalDuration)}
          </div>
          <span className="text-[11px] font-mono text-text-muted">/ {formatTimecode(totalDuration)}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-text-secondary font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>24.000 FPS</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-text-muted">4-TRACK NLE FORENSICS</span>
        </div>
      </div>

      {/* Multi-Track Canvas Area */}
      <div className="space-y-2 relative select-none">
        
        {/* Interactive Top Ruler with Tick Marks */}
        <div 
          onClick={handleScrub}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-32 shrink-0 text-[10px] font-mono text-text-muted text-right pr-2">
            TIMECODE
          </div>
          <div className="flex-1 h-5 bg-black/40 rounded-lg border border-white/5 relative overflow-hidden flex items-center px-2">
            {/* Ruler Ticks */}
            <div className="w-full flex justify-between text-[8px] font-mono text-white/30 pointer-events-none">
              <span>00:00</span>
              <span>00:05</span>
              <span>00:10</span>
              <span>00:15</span>
              <span>00:20</span>
              <span>00:25</span>
              <span>00:30</span>
            </div>
            {/* Playhead Marker on Ruler */}
            <div 
              style={{ left: `${playheadPercent}%` }}
              className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-accent rounded-sm shadow-[0_0_8px_#E11D48] flex items-center justify-center transition-[left] duration-75"
            >
              <div className="w-1 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Tracks Container with Playhead Scrubber Layer */}
        <div 
          ref={tracksContainerRef}
          onClick={handleScrub}
          className="space-y-2 relative cursor-pointer"
        >
          {/* Vertical Playhead Needle */}
          <div 
            style={{ left: `calc(136px + (100% - 136px) * (${playheadPercent} / 100))` }}
            className="absolute top-0 bottom-0 w-[2px] bg-accent z-30 pointer-events-none shadow-[0_0_12px_#E11D48] transition-[left] duration-75"
          >
            <div className="absolute -top-1.5 -left-1 w-2.5 h-2.5 bg-accent rotate-45 rounded-sm" />
          </div>

          {/* Track 1: Cinema Video & Camera Shots */}
          <div className="flex items-center gap-3">
            <div className="w-32 shrink-0 flex items-center gap-2 text-xs font-mono text-white font-medium">
              <Film className="w-3.5 h-3.5 text-accent" />
              <span>V1: OPTICS</span>
            </div>
            <div className="flex-1 flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 overflow-hidden">
              {scenes.map((scene, i) => {
                const isSelected = activeSceneIndex === i
                return (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectScene(i)
                      setPlayheadPercent((i / scenes.length) * 100 + 4)
                    }}
                    className={`btn-tactile flex-1 py-2.5 px-2 rounded-lg text-left transition-all relative overflow-hidden border ${
                      isSelected
                        ? 'bg-accent/25 border-accent text-white shadow-md'
                        : 'bg-white/[0.03] border-white/5 hover:border-white/15 text-text-muted hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold truncate">#{i + 1} {scene.shot_type || 'Shot'}</div>
                    <div className="text-[9px] text-text-secondary truncate">{scene.camera_body || 'ARRI'} • {scene.focal_length || 35}mm</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Track 2: Forensic HUD & Visual Evidence */}
          <div className="flex items-center gap-3">
            <div className="w-32 shrink-0 flex items-center gap-2 text-xs font-mono text-cyan-400 font-medium">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>V2: HUD</span>
            </div>
            <div className="flex-1 flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 overflow-hidden">
              {scenes.map((scene, i) => (
                <div
                  key={i}
                  className="flex-1 py-1 px-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-[9px] font-mono text-cyan-300 truncate"
                >
                  {scene.hud_overlay || 'PEEL CHAIN OVERLAY'}
                </div>
              ))}
            </div>
          </div>

          {/* Track 3: Voiceover / Narration Teleprompter */}
          <div className="flex items-center gap-3">
            <div className="w-32 shrink-0 flex items-center gap-2 text-xs font-mono text-yellow-400 font-medium">
              <Mic className="w-3.5 h-3.5 text-yellow-400" />
              <span>A1: VOICE</span>
            </div>
            <div className="flex-1 flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 overflow-hidden">
              {scenes.map((scene, i) => (
                <div
                  key={i}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-yellow-950/20 border border-yellow-500/20 text-[9px] font-mono text-yellow-300 truncate italic"
                >
                  "{scene.narration_excerpt || 'The blockchain remembers every signature...'}"
                </div>
              ))}
            </div>
          </div>

          {/* Track 4: Sound Design & Cinematic Score */}
          <div className="flex items-center gap-3">
            <div className="w-32 shrink-0 flex items-center gap-2 text-xs font-mono text-purple-400 font-medium">
              <Music className="w-3.5 h-3.5 text-purple-400" />
              <span>A2: SCORE</span>
            </div>
            <div className="flex-1 flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 overflow-hidden">
              {scenes.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 py-1 px-2 rounded-lg bg-purple-950/20 border border-purple-500/20 flex items-center gap-1 text-[9px] font-mono text-purple-300"
                >
                  <div className="flex gap-0.5 items-end h-2.5">
                    <span className="w-0.5 h-1.5 bg-purple-400" />
                    <span className="w-0.5 h-2.5 bg-purple-400" />
                    <span className="w-0.5 h-1 bg-purple-400" />
                    <span className="w-0.5 h-2 bg-purple-400" />
                  </div>
                  <span className="truncate">Forensic Drone</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
