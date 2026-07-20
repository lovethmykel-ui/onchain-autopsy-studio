'use client'

import React from 'react'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import PageTransition from '@/components/layout/PageTransition'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useUIStore } from '@/lib/store/ui'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sidebarCollapsed } = useUIStore()

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <TopBar />
        <main 
          className={cn(
            "pt-16 min-h-screen transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "ml-[64px]" : "ml-[200px]"
          )}
        >
          <div className="p-6">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
