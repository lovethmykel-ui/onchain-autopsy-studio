import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectStore } from '@/lib/store/project'
import { PROJECT_TYPES } from '@/lib/constants'

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { createProject, isLoading } = useProjectStore()
  
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [type, setType] = useState<string>(PROJECT_TYPES[0])
  const [workflowType, setWorkflowType] = useState('Full Documentary')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !topic) return
    
    const project = await createProject(title, topic, type, workflowType)
    if (project) {
      setTitle('')
      setTopic('')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card-elevated border border-border-hover rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold text-text-primary">Initialize New Project</h2>
              <button onClick={onClose} className="p-1 rounded-md text-text-muted hover:bg-card-hover transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Project Title</label>
                <Input 
                  placeholder="e.g. The FTX Collapse" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Core Topic</label>
                <Input 
                  placeholder="e.g. Sam Bankman-Fried, FTX, Alameda" 
                  value={topic} 
                  onChange={e => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Project Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROJECT_TYPES.slice(0,4).map(pt => (
                    <div 
                      key={pt} 
                      onClick={() => setType(pt)}
                      className={`px-3 py-2 text-xs rounded-md border cursor-pointer transition-all ${type === pt ? 'border-accent bg-accent/10 text-accent font-medium' : 'border-border text-text-muted hover:border-border-hover hover:text-text-secondary'}`}
                    >
                      {pt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-medium text-text-secondary">Workflow Style</label>
                <div className="flex gap-2">
                  {['Full Documentary', 'Short Investigation', 'Script Only'].map(wt => (
                    <div 
                      key={wt} 
                      onClick={() => setWorkflowType(wt)}
                      className={`px-3 py-1.5 text-[10px] rounded-full border cursor-pointer transition-all ${workflowType === wt ? 'border-accent bg-accent/10 text-accent' : 'border-border text-text-muted hover:border-border-hover'}`}
                    >
                      {wt}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={isLoading || !title || !topic} className="gap-2">
                  {isLoading ? 'Creating...' : (
                    <>
                      <Check className="w-4 h-4" /> Initialize
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
