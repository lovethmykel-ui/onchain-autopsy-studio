'use client'

import React from 'react'
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
  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-[#080B11] text-text-primary font-body antialiased">
        {/* Strict 3-Panel Layout Grid */}
        <div className="grid min-h-screen max-w-[1680px] mx-auto 
          grid-cols-[1fr] md:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_240px] 
          grid-rows-[60px_1fr] 
          [grid-template-areas:'topbar'_'main'] md:[grid-template-areas:'sidebar_topbar'_'sidebar_main'] xl:[grid-template-areas:'sidebar_topbar_topbar'_'sidebar_main_rightpanel']"
        >
          <Sidebar />
          <TopBar />
          
          <main className="[grid-area:main] overflow-y-auto bg-[#080B11]">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          
          <aside className="hidden xl:block [grid-area:rightpanel] bg-background/90 backdrop-blur-xl border-l border-border p-4 overflow-y-auto">
             <ProductionPipeline />
          </aside>
        </div>
      </div>
    </TooltipProvider>
  )
}
