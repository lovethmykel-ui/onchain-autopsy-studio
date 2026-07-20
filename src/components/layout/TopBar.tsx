'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Cpu, ChevronDown, Command } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useUIStore } from '@/lib/store/ui'
import { cn } from '@/lib/utils'

export default function TopBar() {
  const { sidebarCollapsed } = useUIStore()

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-border z-[50] flex items-center justify-between px-6 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "left-[64px]" : "left-[200px]"
      )}
    >
      {/* Left - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-text-secondary transition-colors" />
          <input
            type="text"
            placeholder="Search projects, assets, agents..."
            className="w-full h-9 bg-background/50 border border-border rounded-md pl-9 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-active transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-medium text-text-muted">
              <Command className="w-3 h-3" />
              <span>K</span>
            </kbd>
          </div>
        </div>
      </div>

      {/* Right - Profile & Actions */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
          <Cpu className="w-3.5 h-3.5 text-success" />
          <div className="flex flex-col">
            <span className="text-[9px] text-success/80 uppercase font-bold tracking-wider leading-tight">GPU Credits</span>
            <span className="text-xs font-bold text-success leading-tight">48,730</span>
          </div>
        </div>

        <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-card-elevated text-text-muted hover:text-text-primary transition-colors cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-error rounded-full ring-2 ring-surface" />
        </button>

        <div className="flex items-center gap-3 cursor-pointer group">
          <Avatar className="w-8 h-8 border border-border group-hover:border-border-active transition-colors">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <AvatarFallback>OO</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] font-medium text-text-primary leading-tight">OnChain Operator</span>
            <span className="text-[10px] text-text-muted leading-tight">Studio Admin</span>
          </div>
          <ChevronDown className="hidden sm:block w-3 h-3 text-text-muted group-hover:text-text-secondary transition-colors" />
        </div>
      </div>
    </header>
  )
}
