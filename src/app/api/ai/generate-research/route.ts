import { streamText } from 'ai'
import { getBestAvailableModel } from '@/lib/ai/fallback'
import { NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { topic, type } = await req.json()
    
    const { model, provider } = await getBestAvailableModel(req)

    const systemPrompt = `You are a world-class Blockchain Investigator and Research Analyst.
Your task is to produce a deep-dive forensic research report on "${topic}".
Context: This is for a documentary of type: ${type}.

Format your response exactly as follows:
## Executive Summary
(Brief overview)

## Timeline of Events
(Chronological breakdown)

## Key Entities & Wallets
(Important figures, organizations, and known wallet addresses)

## Fraud Patterns & Red Flags
(Analysis of what went wrong or how it operated)

## Sources & Evidence Trail
(Where to look for on-chain proof or public statements)

Be extremely detailed, objective, and analytical.`

    const result = streamText({
      model: model,
      system: systemPrompt,
      prompt: `Generate the full research report now.`,
      temperature: 0.5,
    })

    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error('Error generating research:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate research.' },
      { status: 500 }
    )
  }
}
