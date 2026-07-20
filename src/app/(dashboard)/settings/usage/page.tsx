'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Cpu, Database, DollarSign, CreditCard, BarChart3, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

const usageBreakdown = [
  { category: 'LLM (Research, Scripts)', usage: 12400, cost: 4.82, percentage: 12 },
  { category: 'Image Generation', usage: 2451, cost: 42.50, percentage: 35 },
  { category: 'Video Generation', usage: 1248, cost: 186.20, percentage: 28 },
  { category: 'Voice Synthesis', usage: 342, cost: 28.40, percentage: 12 },
  { category: 'Music Generation', usage: 128, cost: 45.60, percentage: 8 },
  { category: 'Sound Effects', usage: 982, cost: 35.06, percentage: 5 },
]

export default function UsagePage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-heading">Usage & Billing</h1>
          <p className="text-sm text-text-secondary mt-1">Monitor credits, costs, and subscription details</p>
        </div>
        <Button className="gap-2">
          <CreditCard className="w-4 h-4" />
          Manage Subscription
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Zap className="w-5 h-5 text-accent" />} label="Credits Remaining" value="48,730" subtext="of 60,000 monthly" progress={81} />
        <StatCard icon={<DollarSign className="w-5 h-5 text-warning" />} label="Total Spent" value="$342.58" subtext="This billing cycle" />
        <StatCard icon={<BarChart3 className="w-5 h-5 text-success" />} label="Generations" value="5,551" subtext="+15% from last month" />
        <StatCard icon={<Database className="w-5 h-5 text-error" />} label="Storage" value="1.2 TB" subtext="of 5 TB" progress={24} />
      </motion.div>

      {/* Breakdown */}
      <motion.div variants={itemVariants} className="glass-card p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">Cost Breakdown by Category</h2>
        <div className="space-y-4">
          {usageBreakdown.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-text-secondary">{item.category}</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-text-muted">{item.usage.toLocaleString()} uses</span>
                  <span className="font-bold text-text-primary">${item.cost.toFixed(2)}</span>
                </div>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div variants={itemVariants} className="glass-card p-5 border-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-text-primary">Pro Plan</h3>
                <Badge variant="accent">Active</Badge>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">60,000 credits/month • 5 TB storage • All agents</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-text-primary">$49<span className="text-xs text-text-muted font-normal">/month</span></p>
            <p className="text-[10px] text-text-muted flex items-center gap-1"><Calendar className="w-3 h-3" />Renews Jun 20, 2026</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ icon, label, value, subtext, progress }: {
  icon: React.ReactNode; label: string; value: string; subtext: string; progress?: number
}) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-card-elevated flex items-center justify-center">{icon}</div>
        <div>
          <p className="text-[10px] text-text-muted">{label}</p>
          <p className="text-xl font-bold text-text-primary">{value}</p>
        </div>
      </div>
      <p className="text-[10px] text-text-muted">{subtext}</p>
      {progress !== undefined && <Progress value={progress} className="h-1 mt-2" />}
    </div>
  )
}
