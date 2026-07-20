'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Settings, User, KeyRound, CreditCard, Bell, Palette, Globe, Shield } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const settingSections = [
  { title: 'Profile', description: 'Manage your account details and preferences', icon: User, href: '/settings/profile', color: '#1F6FEB' },
  { title: 'API Key Vault', description: 'Encrypted storage for all AI provider API keys', icon: KeyRound, href: '/settings/api-vault', color: '#10B981' },
  { title: 'Usage & Billing', description: 'Credits, costs, and subscription management', icon: CreditCard, href: '/settings/usage', color: '#F59E0B' },
  { title: 'Notifications', description: 'Configure alerts for renders, agents, and exports', icon: Bell, href: '#', color: '#A855F7' },
  { title: 'Appearance', description: 'Theme, layout, and display preferences', icon: Palette, href: '#', color: '#EC4899' },
  { title: 'Integrations', description: 'YouTube, cloud storage, and third-party services', icon: Globe, href: '#', color: '#06B6D4' },
  { title: 'Security', description: 'Two-factor authentication and session management', icon: Shield, href: '#', color: '#EF4444' },
]

export default function SettingsPage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-text-primary font-heading">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your account, integrations, and preferences</p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingSections.map((section) => {
          const Icon = section.icon
          return (
            <motion.div key={section.title} variants={itemVariants}>
              <Link href={section.href}>
                <div className="glass-card p-5 cursor-pointer group hover:border-border-hover transition-all duration-200 h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${section.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: section.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{section.title}</h3>
                      <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
