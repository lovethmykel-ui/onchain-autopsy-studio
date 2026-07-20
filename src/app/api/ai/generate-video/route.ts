import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt, model, apiKey, projectId, sceneId } = await req.json()
    
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    if (!apiKey) {
      return NextResponse.json({ error: `Missing API Key for ${model}. Please add it in the API Vault.` }, { status: 400 })
    }

    let generationId = ''

    if (model.toLowerCase() === 'luma') {
      const response = await fetch('https://api.lumalabs.ai/dream-machine/v1/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          aspect_ratio: '16:9'
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Luma API Error')
      }

      generationId = data.id
    } else {
      // Fallback/Mock for other providers we haven't strictly integrated yet
      // To simulate a real API returning a Job ID
      generationId = `mock-job-${Date.now()}`
    }

    return NextResponse.json({ 
      jobId: generationId,
      status: 'processing'
    })
  } catch (error: any) {
    console.error('Error starting video generation:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to start video generation.' },
      { status: 500 }
    )
  }
}
