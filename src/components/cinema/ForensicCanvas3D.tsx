'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Activity, ShieldAlert, Cpu, Layers, Maximize2, RefreshCw } from 'lucide-react'

interface ForensicCanvas3DProps {
  txHash?: string
  stolenAmount?: string
  mixerHops?: number
  peelContracts?: number
}

interface Node {
  id: string
  label: string
  type: 'exploit' | 'peel' | 'mixer' | 'cex' | 'victim'
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export function ForensicCanvas3D({
  txHash = '0x7f9a12b489c72e1180de4561a89c89a01e45778819238475a901827498129034',
  stolenAmount = '$84,219,450.12',
  mixerHops = 14,
  peelContracts = 1420
}: ForensicCanvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    // Set high-DPI canvas dimensions
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Generate Forensic Graph Nodes
    const nodes: Node[] = [
      { id: '1', label: 'Exploit Contract (Reentrancy)', type: 'exploit', x: width * 0.15, y: height * 0.5, vx: 0.1, vy: 0.1, radius: 14, color: '#EF4444' },
      { id: '2', label: 'Liquidity Pool (Aave/Curve)', type: 'victim', x: width * 0.15, y: height * 0.2, vx: -0.1, vy: 0.05, radius: 10, color: '#F59E0B' },
      { id: '3', label: 'Primary Attacker Hot Wallet', type: 'exploit', x: width * 0.35, y: height * 0.45, vx: 0.05, vy: -0.1, radius: 12, color: '#EF4444' },
      { id: '4', label: 'Peel Intermediary #01', type: 'peel', x: width * 0.55, y: height * 0.25, vx: 0.08, vy: 0.08, radius: 8, color: '#06B6D4' },
      { id: '5', label: 'Peel Intermediary #02', type: 'peel', x: width * 0.55, y: height * 0.5, vx: -0.05, vy: 0.06, radius: 8, color: '#06B6D4' },
      { id: '6', label: 'Peel Intermediary #03', type: 'peel', x: width * 0.55, y: height * 0.75, vx: 0.06, vy: -0.05, radius: 8, color: '#06B6D4' },
      { id: '7', label: 'Tornado Cash Pool (100 ETH)', type: 'mixer', x: width * 0.75, y: height * 0.35, vx: -0.04, vy: 0.04, radius: 16, color: '#A855F7' },
      { id: '8', label: 'Railgun Privacy Shield', type: 'mixer', x: width * 0.75, y: height * 0.65, vx: 0.05, vy: -0.04, radius: 14, color: '#8B5CF6' },
      { id: '9', label: 'Offshore CEX Deposit Tag', type: 'cex', x: width * 0.9, y: height * 0.5, vx: -0.08, vy: 0.02, radius: 11, color: '#10B981' }
    ]

    const edges = [
      { from: 1, to: 0 },
      { from: 0, to: 2 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 6 },
      { from: 5, to: 7 },
      { from: 6, to: 8 },
      { from: 7, to: 8 }
    ]

    // Floating particles along edges
    const particles = Array.from({ length: 45 }, () => ({
      edgeIndex: Math.floor(Math.random() * edges.length),
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.008,
      size: 1.5 + Math.random() * 2
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 40
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Update and draw Edges
      edges.forEach((edge) => {
        const source = nodes[edge.from]
        const target = nodes[edge.to]
        if (!source || !target) return

        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // Draw and animate particles
      particles.forEach((p) => {
        p.progress += p.speed
        if (p.progress > 1) p.progress = 0

        const edge = edges[p.edgeIndex]
        const source = nodes[edge.from]
        const target = nodes[edge.to]
        if (!source || !target) return

        const px = source.x + (target.x - source.x) * p.progress
        const py = source.y + (target.y - source.y) * p.progress

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = '#22D3EE'
        ctx.shadowColor = '#06B6D4'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Update & Draw Nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Gentle boundary bounce
        if (node.x < 30 || node.x > width - 30) node.vx *= -1
        if (node.y < 30 || node.y > height - 30) node.vy *= -1

        // Outer glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2)
        ctx.fillStyle = node.color + '18'
        ctx.fill()

        // Inner core
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.shadowColor = node.color
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0

        // Node Label
        ctx.font = '10px monospace'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
        ctx.textAlign = 'center'
        ctx.fillText(node.label, node.x, node.y + node.radius + 14)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative rounded-xl overflow-hidden border border-border/80 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
      {/* HUD Telemetry Topbar */}
      <div className="bg-black/90 px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            3D PEEL CHAIN AUTOPSY
          </span>
          <span className="text-white">DRAINED: <strong className="text-red-400">{stolenAmount}</strong></span>
          <span className="text-text-muted">|</span>
          <span>MIXER HOPS: <strong className="text-purple-400">{mixerHops}</strong></span>
          <span className="text-text-muted">|</span>
          <span>INTERMEDIARY CONTRACTS: <strong className="text-cyan-400">{peelContracts}</strong></span>
        </div>

        <div className="flex items-center gap-2 text-text-muted text-[11px]">
          <span>ROOT TX:</span>
          <span className="text-cyan-300 font-mono underline cursor-pointer">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
        </div>
      </div>

      {/* Dynamic WebGL / Canvas Viewport */}
      <div className="relative w-full h-[320px] bg-gradient-to-b from-black via-[#080B11] to-black">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Live HUD Watermark */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none">
          ONCHAIN FORENSICS ENGINE // GRAPH MATRIX V4.2
        </div>

        <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-mono text-cyan-400/80 bg-black/60 px-2 py-1 rounded border border-white/10">
          <Cpu className="w-3 h-3 animate-spin" />
          <span>DEEPSEEK R1 GRAPH TRACING ACTIVE</span>
        </div>
      </div>
    </div>
  )
}
