'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import PageTransition from '@/components/layout/PageTransition'
import ProductionPipeline from '@/components/dashboard/ProductionPipeline'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCinemaStudio = pathname.startsWith('/director') || pathname.startsWith('/actor-vault')

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-[#08090C] text-text-primary font-body antialiased selection:bg-accent/30 selection:text-white relative">
        {/* Impeccable Design: Tactile Noise Grain Overlay */}
        <div className="noise-overlay" />

        {/* Dynamic Studio Layout Grid */}
        <div className={
          isCinemaStudio
            ? `grid min-h-screen w-full 
               grid-cols-[1fr] md:grid-cols-[240px_1fr] 
               grid-rows-[60px_1fr] 
               [grid-template-areas:'topbar'_'main'] md:[grid-template-areas:'sidebar_topbar'_'sidebar_main']`
            : `grid min-h-screen w-full 
               grid-cols-[1fr] md:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_260px] 
               grid-rows-[60px_1fr] 
               [grid-template-areas:'topbar'_'main'] md:[grid-template-areas:'sidebar_topbar'_'sidebar_main'] xl:[grid-template-areas:'sidebar_topbar_topbar'_'sidebar_main_rightpanel']`
        }>
          <Sidebar />
          <TopBar />
          
          <main className="[grid-area:main] overflow-y-auto bg-[#08090C] relative">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          
          {!isCinemaStudio && (
            <aside className="hidden xl:block [grid-area:rightpanel] bg-card/50 backdrop-blur-2xl border-l border-border p-4 overflow-y-auto">
              <ProductionPipeline />
            </aside>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
