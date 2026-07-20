// ============================================
// OnChain Autopsy Studio — Database Types
// ============================================

export type AgentStatus = 'idle' | 'running' | 'completed' | 'failed' | 'waiting'
export type ProjectStatus = 'draft' | 'in_production' | 'completed' | 'failed' | 'archived'
export type RenderJobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
export type ExportFormat = 'mp4' | 'mov' | 'srt' | 'txt' | 'pdf' | 'zip'

export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  plan: 'free' | 'pro' | 'studio_max'
  credits: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  topic: string
  type: string
  status: ProjectStatus
  progress: number
  thumbnail_url: string | null
  workflow_type: string
  target_platform: string
  duration_target: string | null
  created_at: string
  updated_at: string
}

export interface Research {
  id: string
  project_id: string
  report: string
  sources: Source[]
  evidence: Evidence[]
  timeline_data: TimelineEvent[]
  created_at: string
  updated_at: string
}

export interface Source {
  title: string
  url: string
  type: 'article' | 'paper' | 'video' | 'social' | 'blockchain' | 'legal'
  credibility: number
}

export interface Evidence {
  description: string
  type: string
  date: string
  significance: 'high' | 'medium' | 'low'
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
  category: string
}

export interface Script {
  id: string
  project_id: string
  duration_type: '15min' | '30min' | '60min'
  narration: string
  scene_notes: string
  visual_directions: string
  broll_suggestions: string[]
  created_at: string
  updated_at: string
}

export interface Storyboard {
  id: string
  project_id: string
  scenes: StoryboardScene[]
  total_scenes: number
  created_at: string
  updated_at: string
}

export interface StoryboardScene {
  scene_number: number
  shot_type: string
  camera_movement: string
  lighting: string
  location: string
  mood: string
  visual_description: string
  prompt?: string
  duration: number
}

export interface GeneratedImage {
  id: string
  project_id: string
  prompt: string
  url: string
  model: string
  type: 'character' | 'location' | 'reenactment' | 'object' | 'prop' | 'environment'
  metadata: Record<string, unknown>
  created_at: string
}

export interface GeneratedVideo {
  id: string
  project_id: string
  prompt: string
  url: string
  model: string
  resolution: string
  fps: number
  duration: number
  type: 'broll' | 'footage' | 'reenactment' | 'establishing' | 'transition'
  created_at: string
}

export interface GeneratedAudio {
  id: string
  project_id: string
  type: 'narration' | 'interview' | 'character' | 'quote'
  url: string
  model: string
  voice_id: string | null
  duration: number
  transcript: string
  created_at: string
}

export interface GeneratedMusic {
  id: string
  project_id: string
  genre: string
  mood: string
  url: string
  model: string
  duration: number
  created_at: string
}

export interface GeneratedSFX {
  id: string
  project_id: string
  type: string
  url: string
  model: string
  duration: number
  created_at: string
}

export interface Export {
  id: string
  project_id: string
  format: ExportFormat
  url: string
  size: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
}

export interface ApiKey {
  id: string
  user_id: string
  provider: string
  encrypted_key: string
  last_validated: string | null
  is_valid: boolean
  usage_count: number
  created_at: string
  updated_at: string
}

export interface RenderJob {
  id: string
  project_id: string
  type: string
  status: RenderJobStatus
  progress: number
  model: string
  resolution: string
  fps: number | null
  scene_name: string | null
  error_message: string | null
  started_at: string | null
  completed_at: string | null
  created_at: string
}

export interface AgentLog {
  id: string
  project_id: string
  agent_name: string
  agent_number: number
  status: AgentStatus
  output: string | null
  tokens_used: number
  cost: number
  started_at: string
  completed_at: string | null
  created_at: string
}

// ── Pipeline Types ──
export interface PipelineState {
  projectId: string
  topic: string
  workflowType: string
  currentAgent: number
  agents: PipelineAgentState[]
  status: 'idle' | 'running' | 'completed' | 'failed'
  startedAt: string | null
  completedAt: string | null
  totalProgress: number
}

export interface PipelineAgentState {
  agentId: number
  name: string
  status: AgentStatus
  progress: number
  output: string | null
  startedAt: string | null
  completedAt: string | null
}

// ── Dashboard Stats ──
export interface DashboardStats {
  totalCredits: number
  totalCost: number
  totalGenerations: number
  storageUsed: number
  storageTotal: number
  agentsOnline: number
  renderQueueCount: number
  gpuUsage: number
}
