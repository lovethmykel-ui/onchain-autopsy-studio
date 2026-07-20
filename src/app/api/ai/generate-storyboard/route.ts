import { generateObject } from 'ai'
import { getBestAvailableModel } from '@/lib/ai/fallback'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { script, topic } = await req.json()
    
    if (!script) {
      return NextResponse.json({ error: 'Missing script content' }, { status: 400 })
    }

    const { model } = await getBestAvailableModel(req)

    const systemPrompt = `You are a world-class Cinematic Director and Storyboard Artist.
Your task is to break down the provided documentary script about "${topic || 'a documentary'}" into a structured shot list and storyboard.

Generate a JSON array of scenes. For each scene, provide:
- sceneNumber: The chronological scene number
- visualDescription: A highly vivid description of what we see on screen.
- shotType: e.g. "Wide Shot", "Medium Shot", "Close-up", "Aerial", etc.
- cameraMovement: e.g. "Slow Pan Right", "Static", "Dolly In", "Tracking Left", etc.
- lighting: e.g. "Low Key", "Natural", "Cinematic", "Neon", etc.
- location: The setting of the scene.
- mood: e.g. "Suspenseful", "Dramatic", "Tense", etc.
- duration: Estimated duration in seconds (integer between 3 and 10).`

    const result = await generateObject({
      model: model as any, // Cast to any to avoid type mismatch with generateObject if needed, though ai SDK should support it.
      system: systemPrompt,
      prompt: `Here is the script to convert into a storyboard:\n\n${script}`,
      schema: z.object({
        scenes: z.array(z.object({
          sceneNumber: z.number(),
          visualDescription: z.string(),
          shotType: z.string(),
          cameraMovement: z.string(),
          lighting: z.string(),
          location: z.string(),
          mood: z.string(),
          duration: z.number()
        }))
      })
    })

    return NextResponse.json({ scenes: result.object.scenes })
  } catch (error: any) {
    console.error('Error generating storyboard:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate storyboard.' },
      { status: 500 }
    )
  }
}
