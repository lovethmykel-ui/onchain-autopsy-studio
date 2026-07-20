// ============================================
// OnChain Autopsy Studio — Application Constants
// ============================================

import {
  Search, FileText, Film, Layout, Image, Play,
  Bot, Clapperboard, Mic, Music, Volume2, Scissors,
  Shield, MonitorPlay as Youtube, LayoutDashboard, FolderSearch,
  BookOpen, Layers, Library, ListVideo, Workflow,
  Megaphone, Download, KeyRound, CreditCard, Settings,
  type LucideIcon,
} from 'lucide-react'

// ── Navigation ──
export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  section?: string
}

export const NAV_SECTIONS = [
  {
    title: 'PRODUCTION',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
      { label: 'Projects', href: '/projects', icon: FolderSearch },
      { label: 'Research Vault', href: '/research-vault', icon: Search },
      { label: 'Script Vault', href: '/script-vault', icon: BookOpen },
      { label: 'Storyboard Vault', href: '/storyboard-vault', icon: Layers },
      { label: 'Asset Library', href: '/asset-library', icon: Library },
    ],
  },
  {
    title: 'GENERATION',
    items: [
      { label: 'AI Agents', href: '/agents', icon: Bot },
      { label: 'Render Queue', href: '/render-queue', icon: ListVideo },
      { label: 'Workflow Engine', href: '/workflow', icon: Workflow },
    ],
  },
  {
    title: 'AUDIO',
    items: [
      { label: 'Voice Library', href: '/asset-library?tab=voices', icon: Mic },
      { label: 'Music Library', href: '/asset-library?tab=music', icon: Music },
      { label: 'SFX Library', href: '/asset-library?tab=sfx', icon: Volume2 },
    ],
  },
  {
    title: 'PUBLISHING',
    items: [
      { label: 'Publishing Center', href: '/publishing', icon: Megaphone },
      { label: 'Exports', href: '/exports', icon: Download },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'API Key Vault', href: '/settings/api-vault', icon: KeyRound },
      { label: 'Usage & Billing', href: '/settings/usage', icon: CreditCard },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

// ── Agent Definitions ──
export interface AgentDefinition {
  id: number
  name: string
  role: string
  description: string
  icon: LucideIcon
  color: string
  inputs: string[]
  outputs: string[]
  supportedModels?: string[]
  estimatedDuration: string
}

export const AGENTS: AgentDefinition[] = [
  {
    id: 1,
    name: 'Blockchain Investigator',
    role: 'Research',
    description: 'Research crypto scams, hacks, exchanges, protocols, wallets and blockchain incidents.',
    icon: Search,
    color: '#1F6FEB',
    inputs: ['Topic/Prompt'],
    outputs: ['Timeline', 'Key Events', 'Wallet Analysis', 'Fraud Patterns', 'Evidence Report'],
    estimatedDuration: '2-5 min',
  },
  {
    id: 2,
    name: 'Research Director',
    role: 'Structure',
    description: 'Transform investigation results into documentary structure.',
    icon: FileText,
    color: '#8B5CF6',
    inputs: ['Investigation Report'],
    outputs: ['Acts', 'Chapters', 'Narrative Flow', 'Story Arc'],
    estimatedDuration: '1-3 min',
  },
  {
    id: 3,
    name: 'Screenwriter',
    role: 'Script',
    description: 'Create professional documentary scripts with narration, scene notes, and visual directions.',
    icon: BookOpen,
    color: '#EC4899',
    inputs: ['Documentary Structure'],
    outputs: ['15 Min Script', '30 Min Script', '60 Min Script'],
    estimatedDuration: '3-8 min',
  },
  {
    id: 4,
    name: 'Storyboard Director',
    role: 'Visual Planning',
    description: 'Convert scripts into 100-500 detailed storyboard scenes.',
    icon: Layout,
    color: '#F59E0B',
    inputs: ['Documentary Script'],
    outputs: ['Storyboard Scenes', 'Shot Lists', 'Camera Instructions'],
    estimatedDuration: '2-5 min',
  },
  {
    id: 5,
    name: 'Prompt Engineer',
    role: 'AI Prompts',
    description: 'Convert storyboard scenes into optimized prompts for image and video generation models.',
    icon: Clapperboard,
    color: '#10B981',
    inputs: ['Storyboard Scenes'],
    outputs: ['Image Prompts', 'Video Prompts'],
    supportedModels: ['Seedance', 'Veo 3', 'Kling', 'Hailuo', 'Nano Banana', 'Flux', 'Recraft', 'Ideogram'],
    estimatedDuration: '1-3 min',
  },
  {
    id: 6,
    name: 'Image Director',
    role: 'Image Generation',
    description: 'Generate character cards, locations, reenactments, objects, props, and environments.',
    icon: Image,
    color: '#06B6D4',
    inputs: ['Image Prompts'],
    outputs: ['Character Cards', 'Locations', 'Historical Reenactments', 'Props', 'Environments'],
    supportedModels: ['Nano Banana', 'Flux', 'Ideogram', 'Recraft'],
    estimatedDuration: '5-15 min',
  },
  {
    id: 7,
    name: 'Video Director',
    role: 'Video Generation',
    description: 'Generate B-roll, documentary footage, reenactments, establishing shots, and transitions.',
    icon: Film,
    color: '#EF4444',
    inputs: ['Video Prompts', 'Generated Images'],
    outputs: ['B-roll', 'Documentary Footage', 'Reenactments', 'Establishing Shots', 'Transitions'],
    supportedModels: ['Seedance', 'Veo 3', 'Kling', 'Hailuo', 'Runway', 'Luma'],
    estimatedDuration: '10-30 min',
  },
  {
    id: 8,
    name: 'Voice Director',
    role: 'Voice Generation',
    description: 'Generate narration, interview voices, character voices, and quotes.',
    icon: Mic,
    color: '#A855F7',
    inputs: ['Documentary Script'],
    outputs: ['Narration', 'Interview Voices', 'Character Voices', 'Quotes'],
    supportedModels: ['ElevenLabs', 'Cartesia'],
    estimatedDuration: '3-8 min',
  },
  {
    id: 9,
    name: 'Music Director',
    role: 'Music Generation',
    description: 'Generate documentary, suspense, investigation, victory, and emotional music.',
    icon: Music,
    color: '#D946EF',
    inputs: ['Documentary Structure', 'Scene Moods'],
    outputs: ['Documentary Music', 'Suspense Music', 'Investigation Music', 'Victory Music', 'Emotional Music'],
    supportedModels: ['Suno', 'Udio'],
    estimatedDuration: '3-8 min',
  },
  {
    id: 10,
    name: 'Sound Design Director',
    role: 'SFX Generation',
    description: 'Generate ambience, environmental sounds, and technology audio effects.',
    icon: Volume2,
    color: '#14B8A6',
    inputs: ['Storyboard Scenes', 'Scene Locations'],
    outputs: ['Crowd Ambience', 'Conference Ambience', 'Office Ambience', 'Technology Ambience', 'Blockchain Sounds'],
    supportedModels: ['ElevenLabs SFX', 'Veo Audio'],
    estimatedDuration: '2-5 min',
  },
  {
    id: 11,
    name: 'Editor Agent',
    role: 'Post-Production',
    description: 'Arrange scenes, sync narration, place music and SFX, generate subtitles, create chapters.',
    icon: Scissors,
    color: '#F97316',
    inputs: ['All Generated Assets'],
    outputs: ['Documentary Draft', 'Subtitles', 'Chapters', 'Transitions'],
    estimatedDuration: '5-15 min',
  },
  {
    id: 12,
    name: 'Quality Control',
    role: 'QA',
    description: 'Evaluate historical accuracy, visual quality, audio quality, narrative quality, and continuity.',
    icon: Shield,
    color: '#22C55E',
    inputs: ['Documentary Draft'],
    outputs: ['Quality Report', 'Improvement Suggestions', 'Overall Score'],
    estimatedDuration: '2-5 min',
  },
  {
    id: 13,
    name: 'YouTube Director',
    role: 'Publishing',
    description: 'Generate SEO titles, descriptions, tags, chapters, and thumbnail concepts.',
    icon: Youtube,
    color: '#DC2626',
    inputs: ['Final Documentary', 'Research Report'],
    outputs: ['SEO Titles', 'Descriptions', 'Tags', 'Chapters', 'Thumbnail Concepts'],
    estimatedDuration: '1-3 min',
  },
]

// ── Project Types ──
export const PROJECT_TYPES = [
  'Crypto Scams',
  'Exchange Collapses',
  'Blockchain Investigations',
  'Finance Documentaries',
  'Technology Documentaries',
  'Cybercrime Cases',
  'Fraud Investigations',
  'Business Stories',
  'AI Stories',
  'Custom Topics',
] as const

export type ProjectType = typeof PROJECT_TYPES[number]

// ── Workflow Types ──
export const WORKFLOW_TYPES = [
  {
    id: 'full-documentary',
    name: 'Create Documentary',
    description: 'Full AI Production',
    subtitle: '5-15 Min Video',
    agents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    icon: Play,
    color: '#1F6FEB',
  },
  {
    id: 'short-documentary',
    name: 'Create Short',
    description: 'AI Short Film',
    subtitle: '5-15 Min Video',
    agents: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13],
    icon: Film,
    color: '#8B5CF6',
  },
  {
    id: 'script-only',
    name: 'Script Only',
    description: 'AI Script Writer',
    subtitle: 'Documentary Script',
    agents: [1, 2, 3],
    icon: FileText,
    color: '#EC4899',
  },
  {
    id: 'storyboard-only',
    name: 'Storyboard Only',
    description: 'Scene Breakdown',
    subtitle: 'Visual Planning',
    agents: [1, 2, 3, 4],
    icon: Layout,
    color: '#F59E0B',
  },
  {
    id: 'research-report',
    name: 'Research Report',
    description: 'Investigation Report',
    subtitle: 'Deep Analysis',
    agents: [1, 2],
    icon: Search,
    color: '#10B981',
  },
  {
    id: 'youtube-short',
    name: 'YouTube Short',
    description: 'Vertical Short Video',
    subtitle: '60s Format',
    agents: [1, 2, 3, 5, 6, 7, 8, 13],
    icon: Youtube,
    color: '#DC2626',
  },
] as const

// ── API Providers ──
export const API_PROVIDERS = [
  { id: 'openai', name: 'OpenAI', category: 'LLM', color: '#10A37F' },
  { id: 'gemini', name: 'Google Gemini', category: 'LLM', color: '#4285F4' },
  { id: 'claude', name: 'Claude', category: 'LLM', color: '#D97706' },
  { id: 'nano-banana', name: 'Nano Banana', category: 'Image', color: '#FFD700' },
  { id: 'flux', name: 'Flux', category: 'Image', color: '#7C3AED' },
  { id: 'ideogram', name: 'Ideogram', category: 'Image', color: '#06B6D4' },
  { id: 'recraft', name: 'Recraft', category: 'Image', color: '#F43F5E' },
  { id: 'seedance', name: 'Seedance', category: 'Video', color: '#10B981' },
  { id: 'veo3', name: 'Veo 3', category: 'Video', color: '#4285F4' },
  { id: 'kling', name: 'Kling', category: 'Video', color: '#8B5CF6' },
  { id: 'hailuo', name: 'Hailuo', category: 'Video', color: '#F59E0B' },
  { id: 'runway', name: 'Runway', category: 'Video', color: '#1F6FEB' },
  { id: 'luma', name: 'Luma', category: 'Video', color: '#EC4899' },
  { id: 'elevenlabs', name: 'ElevenLabs', category: 'Voice', color: '#000000' },
  { id: 'cartesia', name: 'Cartesia', category: 'Voice', color: '#6366F1' },
  { id: 'suno', name: 'Suno', category: 'Music', color: '#EF4444' },
  { id: 'udio', name: 'Udio', category: 'Music', color: '#14B8A6' },
  { id: 'elevenlabs-sfx', name: 'ElevenLabs SFX', category: 'SFX', color: '#333333' },
  { id: 'veo-audio', name: 'Veo Audio', category: 'SFX', color: '#4285F4' },
] as const

// ── Export Formats ──
export const EXPORT_FORMATS = ['MP4', 'MOV', 'SRT', 'TXT', 'PDF', 'ZIP'] as const

// ── Resolution Options ──
export const RESOLUTIONS = [
  { label: '1080p', value: '1920x1080' },
  { label: '1440p', value: '2560x1440' },
  { label: '4K', value: '3840x2160' },
] as const

export const FRAME_RATES = ['24fps', '30fps', '60fps'] as const
