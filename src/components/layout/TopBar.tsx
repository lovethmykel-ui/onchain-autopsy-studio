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
      <header className="[grid-area:topbar] bg-[#0E131F]/95 backdrop-blur-xl border-b border-[#1E2638] flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4 sticky top-0 z-50 h-[60px] shrink-0 w-full max-w-full">
      
      {/* Left Section: Mobile Hamburger + Logo OR Desktop Welcome Text */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-lg bg-[#141C2B] border border-[#1E2638] flex items-center justify-center text-white hover:bg-[#1E283D] active:scale-95 transition-all cursor-pointer"
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
          <div className="text-[10px] text-text-muted">Welcome back,</div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            OnChain Operator 
            <span className="text-[9px] font-bold font-mono text-[#E11D48] bg-[#E11D48]/15 border border-[#E11D48]/30 px-2 py-0.5 rounded">
              Pro Plan
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Search Bar (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-2 bg-[#141C2B] border border-[#1E2638] rounded-lg px-3 py-1.5 w-full max-w-[320px] text-xs transition-colors focus-within:border-[#3B82F6]">
        <Search className="w-4 h-4 text-text-muted shrink-0" />
        <input 
          type="text" 
          placeholder="Search projects, assets, agents..." 
          className="bg-transparent border-none outline-none text-white placeholder:text-text-muted w-full text-xs"
        />
        <span className="ml-auto text-[9px] font-bold text-text-muted bg-[#0E131F] border border-[#1E2638] px-1.5 py-0.5 rounded">
          ⌘K
        </span>
      </div>

      {/* Right Controls: GPU Credits & Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* GPU Credits Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0E1624] border border-[#10B981]/30 px-2 sm:px-2.5 py-1 rounded-lg">
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center shrink-0">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          </div>
          <div>
            <div className="text-[8px] text-text-muted leading-none hidden sm:block">GPU Credits</div>
            <div className="text-[11px] sm:text-xs font-black font-mono text-[#10B981] leading-tight">48,730</div>
          </div>
        </div>

        {/* Bell Notification Icon */}
        <div className="w-8 h-8 rounded-full bg-[#141C2B] border border-[#1E2638] flex items-center justify-center relative cursor-pointer hover:bg-[#1E283D] transition-colors shrink-0">
          <Bell className="w-4 h-4 text-text-primary" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] border-2 border-[#0E131F] animate-pulse" />
        </div>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#141C2B] border border-[#1E2638] flex items-center justify-center overflow-hidden shrink-0 cursor-pointer">
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
              className="fixed top-0 left-0 bottom-0 w-[290px] max-w-[85vw] bg-[#0E131F] border-r border-[#1E2638] z-[60] flex flex-col p-5 overflow-y-auto md:hidden shadow-2xl"
            >
              {/* Header inside Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1E2638] mb-4">
                <Logo size={32} showText={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-[#141C2B] border border-[#1E2638] flex items-center justify-center text-white hover:bg-[#1E283D]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search Bar */}
              <div className="flex items-center gap-2 bg-[#141C2B] border border-[#1E2638] rounded-lg px-3 py-2 text-xs mb-4">
                <Search className="w-4 h-4 text-text-muted shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search studio..." 
                  className="bg-transparent border-none outline-none text-white placeholder:text-text-muted w-full text-xs"
                />
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all',
                    isActive('/') 
                      ? 'bg-[#141C2B] text-white border border-[#E11D48]/40 shadow-[0_0_12px_rgba(225,29,72,0.2)]' 
                      : 'text-text-secondary hover:bg-[#141C2B]/60 hover:text-white'
                  )}
                >
                  <div className={cn("w-4 h-4 shrink-0", isActive('/') ? 'text-[#E11D48]' : 'text-text-muted')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  Dashboard
                </Link>

                {NAV_SECTIONS.map((section) => (
                  <div key={section.title} className="pt-3">
                    <div className="px-3 pb-1.5 text-[9px] font-bold tracking-[1.5px] text-text-muted uppercase">
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
                              'flex items-center gap-3 py-2 px-3 rounded-lg text-xs font-medium transition-all',
                              active 
                                ? 'bg-[#141C2B] text-white border border-[#E11D48]/40 shadow-[0_0_12px_rgba(225,29,72,0.2)] font-semibold' 
                                : 'text-text-secondary hover:bg-[#141C2B]/60 hover:text-white'
                            )}
                          >
                            <div className={cn("w-4 h-4 shrink-0", active ? 'text-[#E11D48]' : 'text-text-muted')}>
                              {item.icon}
                            </div>
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Drawer User Card */}
              <div className="pt-4 border-t border-[#1E2638] mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#141C2B] border border-[#1E2638] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">OnChain Operator</div>
                    <div className="text-[9px] text-text-muted">Pro Plan Member</div>
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
