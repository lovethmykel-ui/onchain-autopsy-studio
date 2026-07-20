import { streamText } from 'ai'
import { getBestAvailableModel } from '@/lib/ai/fallback'
import { NextResponse } from 'next/server'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { topic, type, targetPlatform, durationTarget } = await req.json()
    
    const { model, provider } = await getBestAvailableModel(req)

    const systemPrompt = `You are an elite Documentary Screenwriter and Director.
Your task is to write a highly engaging, professional documentary script about "${topic}".
Project Type: ${type}
Target Platform: ${targetPlatform}
Duration Target: ${durationTarget}

Format the output strictly as a structured script with the following sections:
- NARRATION: The words spoken by the voiceover.
- SCENE NOTES: The visual context of the scene.
- VISUAL DIRECTIONS: Specific camera movements or graphic overlays.
- B-ROLL SUGGESTIONS: Ideas for stock footage or generated video.

Make it captivating, well-researched, and perfectly paced for a $1,000,000 production value documentary.`

    const result = streamText({
      model: model,
      system: systemPrompt,
      prompt: `Write the complete script for this documentary following the structure guidelines.`,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error('Error generating script:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate script.' },
      { status: 500 }
    )
  }
}
