'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_SECTIONS } from '@/lib/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Zap, Sparkles } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-surface border-r border-border z-[40] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.15em] text-text-primary font-heading uppercase leading-tight">
            ONCHAIN
          </span>
          <span className="text-[9px] font-medium tracking-[0.2em] text-text-muted uppercase leading-tight">
            AUTOPSY STUDIO
          </span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'sidebar-item group relative',
                        active && 'sidebar-item-active'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-accent-muted rounded-md"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 relative z-10 transition-colors duration-150',
                          active ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'
                        )}
                      />
                      <span className="relative z-10 truncate">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Upgrade Card */}
      <div className="p-4 border-t border-border shrink-0">
        <div className="rounded-lg bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-text-primary">Upgrade to Studio Max</span>
          </div>
          <p className="text-[11px] text-text-muted mb-3 leading-relaxed">
            Unlock 4K exports, priority rendering, more credits, and advanced features.
          </p>
          <button className="w-full h-8 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer">
            <Zap className="w-3.5 h-3.5" />
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  )
}
