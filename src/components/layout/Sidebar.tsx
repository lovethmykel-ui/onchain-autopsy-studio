'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_SECTIONS } from '@/lib/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { useUIStore } from '@/lib/store/ui'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-surface border-r border-border z-[40] flex flex-col transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-[64px]" : "w-[200px]"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 h-[72px] shrink-0 mt-2", sidebarCollapsed ? "px-2 justify-center" : "px-5")}>
        <div className="relative w-full h-8">
          <Image 
            src="/logo.png" 
            alt="OnChain Autopsy Studio" 
            fill
            className={cn("object-contain", sidebarCollapsed ? "object-center scale-[1.5]" : "object-left")}
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              {!sidebarCollapsed && (
                <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.15em] text-text-muted uppercase">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center h-9 rounded-md text-[13px] font-medium transition-colors',
                        active ? 'text-accent' : 'text-text-muted hover:text-text-primary hover:bg-white/[0.02]',
                        sidebarCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
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
                      {!sidebarCollapsed && (
                        <span className="relative z-10 truncate">{item.label}</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-border shrink-0">
        <button
          onClick={toggleSidebar}
          className={cn(
            "w-full h-10 flex items-center rounded-md hover:bg-card-elevated text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer",
            sidebarCollapsed ? "justify-center" : "justify-between px-3"
          )}
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {!sidebarCollapsed && <span className="text-xs font-medium">Collapse</span>}
          {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  )
}
