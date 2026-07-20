'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, KeyRound, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Access granted.')
        router.push('/')
        router.refresh()
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Registration successful! Please check your email.')
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black p-4">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-white tracking-tight">OnChain Autopsy</h1>
            <p className="text-sm text-neutral-400 mt-2 text-center">
              Authenticate to access the AI Documentary Studio
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">Email Address</label>
              <Input 
                type="email" 
                placeholder="investigator@onchain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-cyan-500/50"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">Passphrase</label>
              <Input 
                type="password" 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus:border-cyan-500/50"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-neutral-200 transition-colors"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Initialize Session
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 transition-colors"
              >
                Request Access
              </Button>
            </div>
          </form>

        </div>
        
        <p className="text-center text-xs text-neutral-500 mt-6">
          Authorized personnel only. End-to-end encrypted session.
        </p>
      </motion.div>
    </div>
  )
}
