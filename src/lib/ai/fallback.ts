import { createOpenAI } from '@ai-sdk/openai'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getBestAvailableModel(req: Request) {
  // 1. Get keys from client headers
  const authHeader = req.headers.get('authorization')
  let clientOpenAiKey = null
  let clientAnthropicKey = null
  let clientOpenRouterKey = null
  let clientGithubKey = null
  let clientNvidiaKey = null

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const keys = JSON.parse(decodeURIComponent(authHeader.split(' ')[1]))
      clientOpenAiKey = keys.openai
      clientAnthropicKey = keys.anthropic
      clientOpenRouterKey = keys.openrouter
      clientGithubKey = keys.github
      clientNvidiaKey = keys['nvidia-llm']
    } catch {
      // Fallback if they just sent a raw string
      clientOpenAiKey = authHeader.split(' ')[1]
    }
  }

  // 2. Check user session for "master email"
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {} // Read-only here
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const isMasterUser = user?.email === 'mickel.lucky@gmail.com'

  // If master user, inject server-side env keys if available (for free testing)
  if (isMasterUser) {
    if (!clientOpenAiKey && process.env.OPENAI_API_KEY) clientOpenAiKey = process.env.OPENAI_API_KEY
    if (!clientOpenRouterKey && process.env.OPENROUTER_API_KEY) clientOpenRouterKey = process.env.OPENROUTER_API_KEY
    if (!clientGithubKey && process.env.GITHUB_TOKEN) clientGithubKey = process.env.GITHUB_TOKEN
  }

  if (clientOpenAiKey) {
    const openai = createOpenAI({ apiKey: clientOpenAiKey })
    return { model: openai('gpt-4o'), provider: 'openai' }
  }

  if (clientOpenRouterKey) {
    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: clientOpenRouterKey,
    })
    // Use a high-quality free model on OpenRouter as fallback
    return { model: openrouter('meta-llama/llama-3-8b-instruct:free'), provider: 'openrouter' }
  }

  if (clientGithubKey) {
    const github = createOpenAI({
      baseURL: 'https://models.inference.ai.azure.com',
      apiKey: clientGithubKey,
    })
    // GitHub Models free tier
    return { model: github('gpt-4o'), provider: 'github' }
  }

  if (clientAnthropicKey) {
    // We would use @ai-sdk/anthropic here, but mapping to openai compatible API for simplicity
    const anthropicProxy = createOpenAI({
      baseURL: 'https://api.anthropic.com/v1',
      apiKey: clientAnthropicKey,
    })
    return { model: anthropicProxy('claude-3-5-sonnet-20240620'), provider: 'anthropic' }
  }

  if (clientNvidiaKey) {
    const nvidia = createOpenAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: clientNvidiaKey,
    })
    return { model: nvidia('meta/llama-3.1-70b-instruct'), provider: 'nvidia' }
  }

  throw new Error('No API keys configured. Please add an API key in the API Vault settings.')
}
