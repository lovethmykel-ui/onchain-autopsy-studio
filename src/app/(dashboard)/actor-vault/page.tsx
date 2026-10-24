'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  ShieldAlert, 
  Copy, 
  Check, 
  Plus, 
  Sparkles, 
  Eye, 
  Layers, 
  Fingerprint,
  Sliders,
  Camera
} from 'lucide-react'
import { DEFAULT_ACTOR_PROFILES, buildActorPrompt } from '@/lib/cinema/actors'
import { ActorProfile } from '@/types/database'
import { toast } from 'sonner'

export default function ActorVaultPage() {
  const [actors, setActors] = useState<ActorProfile[]>(DEFAULT_ACTOR_PROFILES)
  const [selectedActor, setSelectedActor] = useState<ActorProfile>(DEFAULT_ACTOR_PROFILES[0])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyPrompt = (actor: ActorProfile) => {
    const prompt = buildActorPrompt(actor)
    navigator.clipboard.writeText(prompt)
    setCopiedId(actor.id)
    toast.success('Character Consistency Token Copied', {
      description: `FaceID & Seed #${actor.seedId} copied to clipboard.`
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl apple-glass shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 font-mono text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <Fingerprint className="w-3.5 h-3.5" />
              CHARACTER CONTINUITY // SEED VAULT
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight-heading">
            Actor & Suspect Consistency Vault
          </h1>
          <p className="text-xs md:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Eliminate AI face-drift between scenes. Lock suspect identities, wardrobe, facial embeddings, and lighting profiles across every camera angle.
          </p>
        </div>

        <button 
          onClick={() => {
            const newActor: ActorProfile = {
              id: `custom_${Date.now()}`,
              name: 'New Suspect Dossier',
              role: 'Suspect / Founder',
              seedId: Math.floor(10000000 + Math.random() * 90000000),
              faceEmbeddingPrompt: 'Mysterious figure in dark modern attire, sharp focused gaze, neutral expression',
              wardrobe: 'Dark bespoke tailored wool blazer, crisp open-collar shirt',
              keyVisualFeatures: 'Tense composure, analytical posture',
              lightingProfile: 'Cinematic low-key rim lighting, 4000K neutral key'
            }
            setActors([newActor, ...actors])
            setSelectedActor(newActor)
            toast.success('New Character Profile Created')
          }}
          className="btn-tactile px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-lg shadow-accent/20 border border-accent/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Dossier</span>
        </button>
      </div>

      {/* Main Vault Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Actors List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-text-muted flex items-center justify-between px-1">
            <span className="tracking-wider uppercase text-[10px]">REGISTERED DOSSIERS ({actors.length})</span>
            <span className="text-emerald-400 font-bold text-[10px]">FACE-LOCK ACTIVE</span>
          </div>

          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {actors.map((actor) => {
              const isSelected = selectedActor.id === actor.id
              return (
                <div
                  key={actor.id}
                  onClick={() => setSelectedActor(actor)}
                  className={`btn-tactile p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'apple-glass border-yellow-400/60 shadow-lg shadow-yellow-950/30 ring-1 ring-yellow-400/40'
                      : 'bg-white/[0.02] border-white/8 hover:bg-white/[0.06] hover:border-white/15 text-text-muted'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {actor.name}
                      </h4>
                      <span className="text-[10px] font-mono text-yellow-400/90 bg-yellow-400/10 px-2 py-0.5 rounded mt-1 inline-block border border-yellow-400/20">
                        {actor.role}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-mono text-text-muted block uppercase tracking-wider">SEED ID</span>
                      <span className="text-xs font-mono font-bold text-white tabular-nums">#{actor.seedId}</span>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {actor.faceEmbeddingPrompt}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Selected Dossier Deep Dive (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 apple-glass rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/8">
            <div>
              <span className="text-[10px] font-mono text-yellow-400 tracking-wider uppercase">CHARACTER DOSSIER</span>
              <h2 className="text-xl font-bold font-heading text-white">{selectedActor.name}</h2>
            </div>

            <button
              onClick={() => handleCopyPrompt(selectedActor)}
              className="btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-mono font-medium transition-all"
            >
              {copiedId === selectedActor.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === selectedActor.id ? 'Copied' : 'Copy Consistency Token'}</span>
            </button>
          </div>

          {/* Dossier Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">
                Face Embedding & Facial Morphology Prompt
              </label>
              <textarea
                rows={3}
                value={selectedActor.faceEmbeddingPrompt}
                onChange={(e) => {
                  const updated = { ...selectedActor, faceEmbeddingPrompt: e.target.value }
                  setSelectedActor(updated)
                  setActors(actors.map(a => a.id === updated.id ? updated : a))
                }}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white leading-relaxed font-mono focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">
                Locked Wardrobe Specification
              </label>
              <input
                type="text"
                value={selectedActor.wardrobe}
                onChange={(e) => {
                  const updated = { ...selectedActor, wardrobe: e.target.value }
                  setSelectedActor(updated)
                  setActors(actors.map(a => a.id === updated.id ? updated : a))
                }}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">
                  Micro-Visual Quirks
                </label>
                <textarea
                  rows={2}
                  value={selectedActor.keyVisualFeatures}
                  onChange={(e) => {
                    const updated = { ...selectedActor, keyVisualFeatures: e.target.value }
                    setSelectedActor(updated)
                    setActors(actors.map(a => a.id === updated.id ? updated : a))
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">
                  Consistent Lighting Profile
                </label>
                <textarea
                  rows={2}
                  value={selectedActor.lightingProfile}
                  onChange={(e) => {
                    const updated = { ...selectedActor, lightingProfile: e.target.value }
                    setSelectedActor(updated)
                    setActors(actors.map(a => a.id === updated.id ? updated : a))
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Generated Continuity Block */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-yellow-400/80 mb-1">
                INJECTABLE SEED CONTINUITY TOKEN:
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-white/5 font-mono text-[11px] text-text-secondary leading-relaxed select-all break-all">
                {buildActorPrompt(selectedActor)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
