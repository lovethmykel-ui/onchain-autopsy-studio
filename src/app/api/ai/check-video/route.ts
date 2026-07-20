import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const jobId = searchParams.get('jobId')
    const apiKey = searchParams.get('apiKey')
    const model = searchParams.get('model') || 'luma'

    if (!jobId) {
      return NextResponse.json({ error: 'Missing jobId' }, { status: 400 })
    }

    if (jobId.startsWith('mock-job-')) {
      // For mock jobs, just return completed with a placeholder video after a delay
      // In a real app we would check the DB for the mocked status, but we can just return completed.
      return NextResponse.json({
        state: 'completed',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      })
    }

    if (model.toLowerCase() === 'luma') {
      if (!apiKey) {
        return NextResponse.json({ error: 'Missing API Key' }, { status: 400 })
      }

      const response = await fetch(`https://api.lumalabs.ai/dream-machine/v1/generations/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Luma API Error')
      }

      return NextResponse.json({
        state: data.state, // 'pending', 'processing', 'completed', 'failed'
        videoUrl: data.assets?.video || null,
        progress: data.state === 'completed' ? 100 : 50 // Luma doesn't give granular progress
      })
    }

    return NextResponse.json({ error: 'Unsupported model' }, { status: 400 })
  } catch (error: any) {
    console.error('Error checking video status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check status.' },
      { status: 500 }
    )
  }
}
