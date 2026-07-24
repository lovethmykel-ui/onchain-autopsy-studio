import { createOpenAI } from '@ai-sdk/openai'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getBestAvailableModel(req: Request, requestedModel?: string) {
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

  // 3. Resolve requested model if available
  if (requestedModel) {
    if (requestedModel.includes('gpt-') || requestedModel.includes('o1-')) {
      if (clientOpenAiKey) return { model: createOpenAI({ apiKey: clientOpenAiKey })(requestedModel), provider: 'openai' }
    } else if (requestedModel.includes('claude-')) {
      if (clientAnthropicKey) {
        return { 
          model: createOpenAI({ baseURL: 'https://api.anthropic.com/v1', apiKey: clientAnthropicKey })(requestedModel), 
          provider: 'anthropic' 
        }
      }
    } else if (requestedModel.includes('gemini-')) {
       // Assuming gemini uses openai compatible or falls back to something else, not implemented fully in this snippet, but let's just let it fall through or we can add openrouter
       if (clientOpenRouterKey) {
          return { model: createOpenAI({ baseURL: 'https://openrouter.ai/api/v1', apiKey: clientOpenRouterKey })(`google/${requestedModel}`), provider: 'openrouter' }
       }
    } else if (requestedModel.includes('llama')) {
       if (clientNvidiaKey) {
         return { model: createOpenAI({ baseURL: 'https://integrate.api.nvidia.com/v1', apiKey: clientNvidiaKey })(requestedModel), provider: 'nvidia' }
       }
       if (clientOpenRouterKey) {
         return { model: createOpenAI({ baseURL: 'https://openrouter.ai/api/v1', apiKey: clientOpenRouterKey })(`meta-llama/${requestedModel}`), provider: 'openrouter' }
       }
    }
  }

  // 4. Default fallbacks if requestedModel wasn't handled or no specific keys for it
  if (clientOpenAiKey) {
    const openai = createOpenAI({ apiKey: clientOpenAiKey })
    return { model: openai(requestedModel || 'gpt-4o'), provider: 'openai' }
  }

  if (clientOpenRouterKey) {
    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: clientOpenRouterKey,
    })
    return { model: openrouter(requestedModel || 'meta-llama/llama-3-8b-instruct:free'), provider: 'openrouter' }
  }

  if (clientGithubKey) {
    const github = createOpenAI({
      baseURL: 'https://models.inference.ai.azure.com',
      apiKey: clientGithubKey,
    })
    return { model: github(requestedModel || 'gpt-4o'), provider: 'github' }
  }

  if (clientAnthropicKey) {
    const anthropicProxy = createOpenAI({
      baseURL: 'https://api.anthropic.com/v1',
      apiKey: clientAnthropicKey,
    })
    return { model: anthropicProxy(requestedModel || 'claude-3-5-sonnet-20240620'), provider: 'anthropic' }
  }

  if (clientNvidiaKey) {
    const nvidia = createOpenAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: clientNvidiaKey,
    })
    return { model: nvidia(requestedModel || 'meta/llama-3.1-70b-instruct'), provider: 'nvidia' }
  }

  throw new Error('No API keys configured. Please add an API key in the API Vault settings.')
}
