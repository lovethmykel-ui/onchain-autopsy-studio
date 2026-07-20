'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_SECTIONS } from '@/lib/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-surface border-r border-border z-[40] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-[72px] shrink-0 mt-2">
        <Image 
          src="/logo.png" 
          alt="OnChain Autopsy Studio" 
          width={180} 
          height={48} 
          className="object-contain"
          priority
        />
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
    </aside>
  )
}
