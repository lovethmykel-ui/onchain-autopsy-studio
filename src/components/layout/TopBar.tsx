'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Bell, Zap } from 'lucide-react'
import Logo from '@/components/common/Logo'
import { NAV_SECTIONS } from '@/components/layout/Sidebar'
import { cn } from '@/lib/utils'

export default function TopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="[grid-area:topbar] bg-[#08090C]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4 sticky top-0 z-50 h-[60px] shrink-0 w-full max-w-full">
      
      {/* Left Section: Mobile Hamburger + Logo OR Desktop Welcome Text */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn-tactile md:hidden w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white hover:bg-white/[0.06] cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>

        {/* Mobile Brand Logo */}
        <div className="md:hidden">
          <Logo size={28} showText={true} />
        </div>

        {/* Desktop Welcome Title */}
        <div className="leading-tight shrink-0 hidden md:block">
          <div className="text-[10px] font-mono text-zinc-500">SYSTEM READY</div>
          <div className="text-sm font-semibold text-white tracking-tight-heading flex items-center gap-2">
            <span>OnChain Operator</span>
            <span className="text-[9px] font-bold font-mono text-accent bg-accent/15 border border-accent/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.15)]">
              PRO
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Search Bar (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-2 bg-white/[0.02] border border-white/[0.08] rounded-xl px-3 py-1.5 w-full max-w-[320px] text-xs transition-all focus-within:border-accent/50 focus-within:bg-white/[0.04]">
        <Search className="w-4 h-4 text-zinc-500 shrink-0" />
        <input 
          type="text" 
          placeholder="Search telemetry, actors, evidence..." 
          className="bg-transparent border-none outline-none text-white placeholder:text-zinc-600 w-full text-xs font-mono"
        />
        <span className="ml-auto text-[9px] font-mono font-bold text-zinc-500 bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 rounded">
          ⌘K
        </span>
      </div>

      {/* Right Controls: Director Launch & GPU Credits & Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Higgsfield Virtual Cinema Director Quick Launch */}
        <Link
          href="/director"
          className="btn-tactile hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl apple-glass bg-accent/15 hover:bg-accent/25 border border-accent/35 text-accent font-mono text-xs font-semibold transition-all shadow-[0_0_20px_rgba(225,29,72,0.18)] group"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>VIRTUAL CINEMA</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-white font-mono">
            HIGGSFIELD
          </span>
        </Link>

        {/* NVIDIA NIM Free Key Status */}
        <Link
          href="/director"
          className="btn-tactile hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs hover:bg-emerald-500/20 transition-all shadow-[0_0_12px_rgba(16,185,129,0.12)]"
          title="Powered by build.nvidia.com Free Key"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>NVIDIA NIM</span>
        </Link>

        {/* GPU Credits Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 apple-glass bg-white/[0.02] border border-white/[0.08] px-2.5 sm:px-3 py-1 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="text-[8px] font-mono text-zinc-500 leading-none hidden sm:block">GPU CREDITS</div>
            <div className="text-[11px] sm:text-xs font-mono font-bold text-emerald-400 leading-tight tabular-nums">48,730</div>
          </div>
        </div>

        {/* Bell Notification Icon */}
        <div className="btn-tactile w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center relative cursor-pointer hover:bg-white/[0.06] transition-colors shrink-0">
          <Bell className="w-4 h-4 text-zinc-300" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent border-2 border-[#08090C] animate-pulse" />
        </div>

        {/* User Profile Avatar */}
        <div className="btn-tactile w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.1] flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:border-accent/40 transition-colors">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      </header>

      {/* ── MOBILE SLIDE-OVER NAVIGATION DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 md:hidden"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 left-0 bottom-0 w-[290px] max-w-[85vw] bg-[#08090C]/95 backdrop-blur-2xl border-r border-white/[0.08] z-[60] flex flex-col p-5 overflow-y-auto md:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                <Logo size={32} showText={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-tactile w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white hover:bg-white/[0.06]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.08] rounded-xl px-3 py-2 text-xs mb-4">
                <Search className="w-4 h-4 text-zinc-500 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search studio..." 
                  className="bg-transparent border-none outline-none text-white placeholder:text-zinc-600 w-full text-xs font-mono"
                />
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'btn-tactile flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive('/') 
                      ? 'apple-glass bg-accent/15 text-white border border-accent/30 shadow-[0_0_15px_rgba(225,29,72,0.2)] font-semibold' 
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  )}
                >
                  <div className={cn("w-4 h-4 shrink-0", isActive('/') ? 'text-accent' : 'text-zinc-500')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <span>Dashboard</span>
                </Link>

                {NAV_SECTIONS.map((section) => (
                  <div key={section.title} className="pt-3">
                    <div className="px-3 pb-1.5 text-[9px] font-mono font-semibold tracking-eyebrow text-zinc-500 uppercase">
                      {section.title}
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      {section.items.map((item) => {
                        const active = isActive(item.href)
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              'btn-tactile flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200',
                              active 
                                ? 'apple-glass bg-accent/15 text-white border border-accent/30 shadow-[0_0_15px_rgba(225,29,72,0.2)] font-semibold' 
                                : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                            )}
                          >
                            <div className={cn("w-4 h-4 shrink-0", active ? 'text-accent' : 'text-zinc-500')}>
                              {item.icon}
                            </div>
                            <span>{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Mobile Footer / User */}
              <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">OnChain Operator</div>
                    <div className="text-[9px] font-mono text-zinc-500">PRO PLAN</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
