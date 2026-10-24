// ==============================================================================
// NVIDIA NIM Client & Co-Director Orchestrator (build.nvidia.com)
// ==============================================================================

export interface NvidiaModelDescriptor {
  id: string
  name: string
  provider: string
  tier: 'Flagship Fast' | 'Deep Reasoning' | 'Frontier Scale' | 'NVIDIA Physical AI' | 'Frontier Multilingual'
  contextWindow: string
  recommendedFor: string
  isRecommended?: boolean
}

export const NVIDIA_NIM_MODELS: NvidiaModelDescriptor[] = [
  {
    id: 'nvidia/llama-3.1-nemotron-70b-instruct',
    name: 'Llama 3.1 Nemotron 70B',
    provider: 'NVIDIA',
    tier: 'NVIDIA Physical AI',
    contextWindow: '128K',
    recommendedFor: 'Optical camera rig specifications, Hollywood lighting, and structured screenplay output',
    isRecommended: true
  },
  {
    id: 'deepseek-ai/deepseek-r1',
    name: 'DeepSeek R1 (Reasoning)',
    provider: 'DeepSeek / NVIDIA NIM',
    tier: 'Deep Reasoning',
    contextWindow: '64K',
    recommendedFor: 'Forensic mathematical audit, peel-chain tracing, smart contract exploit dissection',
    isRecommended: true
  },
  {
    id: 'meta/llama-3.1-70b-instruct',
    name: 'Llama 3.1 70B Instruct',
    provider: 'Meta / NVIDIA NIM',
    tier: 'Flagship Fast',
    contextWindow: '128K',
    recommendedFor: 'Director pacing, Vox-style voiceover narration, and rapid storyboard generation'
  },
  {
    id: 'meta/llama-3.1-405b-instruct',
    name: 'Llama 3.1 405B Instruct',
    provider: 'Meta / NVIDIA NIM',
    tier: 'Frontier Scale',
    contextWindow: '128K',
    recommendedFor: 'Complex multi-chapter documentary world-building and high-level structural arcs'
  },
  {
    id: 'mistralai/mistral-large-2-instruct',
    name: 'Mistral Large 2 (123B)',
    provider: 'Mistral AI / NVIDIA NIM',
    tier: 'Frontier Multilingual',
    contextWindow: '128K',
    recommendedFor: 'Global cross-border regulatory analysis and multi-lingual voiceover scripts'
  }
]

export const NVIDIA_API_BASE = 'https://integrate.api.nvidia.com/v1'

export function resolveNvidiaKey(explicitKey?: string | null): string | null {
  if (explicitKey && explicitKey.trim().length > 0 && !explicitKey.includes('your-')) {
    return explicitKey.trim()
  }
  const envKey = process.env.NVIDIA_API_KEY
  if (envKey && envKey.trim().length > 0 && !envKey.includes('your-')) {
    return envKey.trim()
  }
  return null
}

export async function pingNvidiaNim(apiKey: string): Promise<{ success: boolean; latencyMs: number; error?: string }> {
  const start = Date.now()
  try {
    const res = await fetch(`${NVIDIA_API_BASE}/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    })
    const latencyMs = Date.now() - start
    if (!res.ok) {
      const errText = await res.text()
      return { success: false, latencyMs, error: `NVIDIA NIM responded with ${res.status}: ${errText}` }
    }
    return { success: true, latencyMs }
  } catch (err: any) {
    return { success: false, latencyMs: Date.now() - start, error: err.message || 'Network connection failed' }
  }
}

export async function callNvidiaChatCompletion(params: {
  apiKey: string
  model?: string
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>
  temperature?: number
  max_tokens?: number
  top_p?: number
}): Promise<string> {
  const candidateModels = [
    params.model || 'nvidia/llama-3.1-nemotron-70b-instruct',
    'nvidia/llama-3.1-nemotron-70b-instruct',
    'deepseek-ai/deepseek-r1',
    'meta/llama-3.1-70b-instruct',
    'mistralai/mistral-large-2-instruct'
  ]
  // Remove duplicates while maintaining order
  const uniqueModels = Array.from(new Set(candidateModels))

  let lastError: Error | null = null

  for (const modelToTry of uniqueModels) {
    try {
      const res = await fetch(`${NVIDIA_API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${params.apiKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: modelToTry,
          messages: params.messages,
          temperature: params.temperature ?? 0.6,
          top_p: params.top_p ?? 0.9,
          max_tokens: params.max_tokens ?? 4096
        })
      })

      if (res.ok) {
        const data = await res.json()
        const content = data.choices?.[0]?.message?.content
        if (content) {
          return content
        }
      } else {
        const errBody = await res.text()
        console.warn(`NVIDIA model ${modelToTry} returned status ${res.status}:`, errBody)
        lastError = new Error(`NVIDIA NIM API Error (${res.status}): ${errBody}`)
      }
    } catch (err: any) {
      lastError = err
    }
  }

  throw lastError || new Error('All NVIDIA NIM models failed to respond.')
}
