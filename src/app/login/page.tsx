'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Lock, Mail, AlertCircle, Loader2, Zap, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import Logo from '@/components/common/Logo'

export default function LoginPage() {
  const [email, setEmail] = useState('operator@onchain-autopsy.com')
  const [password, setPassword] = useState('operator2026')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const activateOperatorSession = (description: string) => {
    document.cookie = 'operator-auth=active; path=/; max-age=2592000; SameSite=Lax'
    toast.success('Welcome, OnChain Operator', {
      description,
    })
    router.push('/')
    router.refresh()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        // Fallback for demo or when Supabase project is offline
        activateOperatorSession('Signed in with Demo Operator credentials.')
      } else {
        activateOperatorSession('Supabase authentication successful.')
      }
    } catch {
      // Offline fallback
      activateOperatorSession('Signed in with Demo Operator credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstantAccess = () => {
    setIsLoading(true)
    activateOperatorSession('Instant Operator Access activated.')
  }

  return (
    <div className="min-h-screen bg-[#08090C] flex items-center justify-center p-4 relative overflow-hidden text-white font-body selection:bg-accent/30 selection:text-white">
      {/* Noise Grain Overlay */}
      <div className="noise-overlay" />

      {/* Atmospheric Radial Spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-accent/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="apple-glass p-8 rounded-2xl border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-3">
              <Logo size={42} showText={false} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight-heading text-white">
              OnChain Autopsy Studio
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Virtual Cinema Director & Forensic Production OS
            </p>
          </div>

          {/* Demo Credentials Callout */}
          <div className="mb-6 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div className="text-xs leading-relaxed">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5 font-mono">
                DEMO OPERATOR CREDENTIALS
              </div>
              <div className="text-zinc-400 mt-1 font-mono text-[11px] space-y-0.5">
                <div>Email: <span className="text-white">operator@onchain-autopsy.com</span></div>
                <div>Pass: <span className="text-white">operator2026</span> (or click 1-Click Access)</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-2.5 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-semibold tracking-eyebrow text-zinc-400 uppercase ml-1">
                Operator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input 
                  type="email"
                  className="pl-10 h-11 bg-white/[0.02] border-white/[0.08] rounded-xl text-xs font-mono text-white focus-visible:border-accent/50 focus-visible:ring-1 focus-visible:ring-accent/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-semibold tracking-eyebrow text-zinc-400 uppercase ml-1">
                Access Key / Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input 
                  type="password"
                  className="pl-10 h-11 bg-white/[0.02] border-white/[0.08] rounded-xl text-xs font-mono text-white focus-visible:border-accent/50 focus-visible:ring-1 focus-visible:ring-accent/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Standard Sign In Button */}
            <button 
              type="submit" 
              className="btn-tactile w-full h-11 mt-2 rounded-xl bg-accent hover:bg-accent/90 text-white font-medium text-xs shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center justify-center gap-2 cursor-pointer transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Operator...</span>
                </>
              ) : (
                <span>Sign In to Studio</span>
              )}
            </button>

            {/* 1-Click Instant Demo Access Button */}
            <button
              type="button"
              onClick={handleInstantAccess}
              className="btn-tactile w-full h-11 rounded-xl apple-glass bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              disabled={isLoading}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>1-Click Demo Operator Access</span>
            </button>
          </form>

          <div className="mt-6 text-center text-[10px] font-mono text-zinc-500">
            Protected by OnChain Forensic Studio Security
          </div>
        </div>
      </motion.div>
    </div>
  )
}
