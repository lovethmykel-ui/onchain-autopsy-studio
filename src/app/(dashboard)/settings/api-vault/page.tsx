'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  KeyRound, Plus, Eye, EyeOff, Trash2, RefreshCw,
  CheckCircle, XCircle, ExternalLink, Shield, Clock
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API_PROVIDERS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

// Mock configured providers
const configuredProviders = new Set(['openai', 'elevenlabs', 'flux', 'seedance', 'suno'])

const categoryIcons: Record<string, string> = {
  LLM: '🧠',
  Image: '🖼️',
  Video: '🎬',
  Voice: '🎙️',
  Music: '🎵',
  SFX: '🔊',
}

export default function ApiVaultPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [showKey, setShowKey] = useState(false)

  const groupedProviders = API_PROVIDERS.reduce((acc, provider) => {
    if (!acc[provider.category]) acc[provider.category] = []
    acc[provider.category].push(provider)
    return acc
  }, {} as Record<string, typeof API_PROVIDERS[number][]>)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold text-text-primary font-heading">API Key Vault</h1>
          </div>
          <p className="text-sm text-text-secondary">Encrypted server-side storage. Keys are never exposed to the frontend.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="gap-1.5">
            <CheckCircle className="w-3 h-3" />
            {configuredProviders.size} Configured
          </Badge>
          <Badge variant="default" className="gap-1.5">
            {API_PROVIDERS.length - configuredProviders.size} Remaining
          </Badge>
        </div>
      </motion.div>

      {/* Security Notice */}
      <motion.div variants={itemVariants} className="glass-card p-4 border-accent/20 flex items-start gap-3">
        <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-text-primary mb-1">AES-256-GCM Encryption</p>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            All API keys are encrypted with AES-256-GCM before storage. Keys are decrypted server-side only when making API calls.
            Masked previews show the last 4 characters only. Full keys are never transmitted to the browser.
          </p>
        </div>
      </motion.div>

      {/* Provider Groups */}
      {Object.entries(groupedProviders).map(([category, providers]) => (
        <motion.div key={category} variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">{categoryIcons[category]}</span>
            <h2 className="text-sm font-semibold text-text-primary">{category} Providers</h2>
            <Badge variant="accent" className="text-[9px]">{providers.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {providers.map((provider) => {
              const isConfigured = configuredProviders.has(provider.id)
              return (
                <motion.div
                  key={provider.id}
                  whileHover={{ y: -2 }}
                  className={cn(
                    "glass-card p-4 cursor-pointer group transition-all duration-200",
                    isConfigured && "border-success/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: provider.color || '#333' }}
                      >
                        {provider.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-primary">{provider.name}</p>
                        <p className="text-[10px] text-text-muted">{provider.category}</p>
                      </div>
                    </div>
                    {isConfigured ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    ) : (
                      <XCircle className="w-4 h-4 text-text-muted" />
                    )}
                  </div>

                  {isConfigured ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-card-elevated rounded px-2 py-1 border border-border">
                          <span className="text-[10px] font-mono text-text-muted">••••••••••••sk-4f2a</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-text-muted">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Validated 2h ago</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 rounded hover:bg-card-hover cursor-pointer" title="Validate">
                            <RefreshCw className="w-3 h-3 text-text-muted hover:text-accent" />
                          </button>
                          <button className="p-1 rounded hover:bg-card-hover cursor-pointer" title="Delete">
                            <Trash2 className="w-3 h-3 text-text-muted hover:text-error" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 text-[10px]"
                      onClick={() => {
                        setSelectedProvider(provider.id)
                        setShowAddModal(true)
                      }}
                    >
                      <Plus className="w-3 h-3" />
                      Add API Key
                    </Button>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Add Key Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass-card-elevated p-6 border border-border-hover"
          >
            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="w-5 h-5 text-accent" />
              <h3 className="text-base font-semibold text-text-primary">Add API Key</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Your key will be encrypted with AES-256-GCM and stored securely. It will never be exposed to the frontend.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">Provider</label>
                <Input value={API_PROVIDERS.find(p => p.id === selectedProvider)?.name || ''} disabled />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">API Key</label>
                <div className="relative">
                  <Input
                    type={showKey ? 'text' : 'password'}
                    placeholder="sk-..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showKey ? <EyeOff className="w-4 h-4 text-text-muted" /> : <Eye className="w-4 h-4 text-text-muted" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button className="flex-1 gap-2">
                <Shield className="w-4 h-4" />
                Encrypt & Save
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
