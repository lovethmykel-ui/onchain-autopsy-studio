import { NextResponse } from 'next/server'
import { pingNvidiaNim, resolveNvidiaKey, NVIDIA_NIM_MODELS } from '@/lib/nvidia/client'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const apiKey = resolveNvidiaKey(body.apiKey)

    if (!apiKey) {
      return NextResponse.json({
        connected: false,
        models: NVIDIA_NIM_MODELS,
        error: 'No NVIDIA API key found. Enter your free API key from build.nvidia.com or add NVIDIA_API_KEY to .env.local.'
      })
    }

    const ping = await pingNvidiaNim(apiKey)
    return NextResponse.json({
      connected: ping.success,
      latencyMs: ping.latencyMs,
      models: NVIDIA_NIM_MODELS,
      error: ping.error
    })
  } catch (error: any) {
    return NextResponse.json(
      { connected: false, error: error.message || 'Internal error checking NVIDIA NIM health' },
      { status: 500 }
    )
  }
}
