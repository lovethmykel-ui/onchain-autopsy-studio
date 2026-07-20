'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Cpu, ChevronDown, Command } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function TopBar() {
  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-border z-[50] flex items-center justify-between px-6">
      {/* Left - Welcome */}
      <div className="flex items-center gap-3">
        <div>
          <p className="text-[11px] text-text-muted">Welcome back,</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">OnChain Operator</span>
            <Badge variant="accent" className="text-[9px] px-1.5 py-0">Pro Plan</Badge>
          </div>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-text-secondary transition-colors" />
          <input
            type="text"
            placeholder="Search projects, assets, agents..."
            className="w-full h-9 pl-10 pr-16 rounded-lg bg-card border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-card-elevated rounded px-1.5 py-0.5 border border-border">
            <Command className="w-3 h-3 text-text-muted" />
            <span className="text-[10px] text-text-muted font-medium">K</span>
          </div>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* GPU Credits */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border cursor-pointer hover:border-border-hover transition-colors"
        >
          <Cpu className="w-4 h-4 text-accent" />
          <div className="flex flex-col">
            <span className="text-[9px] text-text-muted leading-tight">GPU Credits</span>
            <span className="text-xs font-bold text-accent leading-tight">48,730</span>
          </div>
        </motion.div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center hover:border-border-hover transition-colors cursor-pointer">
          <Bell className="w-4 h-4 text-text-secondary" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-2 pl-3 border-l border-border cursor-pointer group">
          <Avatar className="w-8 h-8 border border-border">
            <AvatarImage src="" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-medium text-text-primary leading-tight">OnChain Operator</span>
            <span className="text-[10px] text-text-muted leading-tight">Studio Admin</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-text-secondary transition-colors" />
        </div>
      </div>
    </header>
  )
}
