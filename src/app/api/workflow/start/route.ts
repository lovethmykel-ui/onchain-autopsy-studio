import { NextRequest, NextResponse } from 'next/server'
import { documentaryApp } from '@/lib/agents/graph'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { topic, type } = await req.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // 1. Validate API keys from the Authorization header
    const authHeader = req.headers.get('authorization')
    let hasLLMKey = false
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const keys = JSON.parse(decodeURIComponent(authHeader.split(' ')[1]))
        if (keys.openai || keys.gemini || keys.claude || keys.openrouter) {
          hasLLMKey = true
        }
      } catch (e) {
        // Fallback for raw string
        if (authHeader.split(' ')[1]) hasLLMKey = true
      }
    }

    if (!hasLLMKey) {
      return NextResponse.json({ error: 'No LLM API keys configured. Please add an API key in the API Vault.' }, { status: 401 })
    }

    // 2. Verify User Session (Optional/Mocked for now)
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    // In production, require auth:
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // 2. Create a project record in Supabase (if connected)
    let projectId = 'mock-id-' + Date.now()
    if (session) {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: session.user.id,
          title: topic,
          topic: topic,
          type: type || 'Standard Investigation',
          status: 'in_production',
          progress: 5
        })
        .select('id')
        .single()
        
      if (data) projectId = data.id
    }

    // 4. Kick off the LangGraph workflow synchronously
    try {
      console.log(`Starting graph execution for project: ${projectId}`)
      const finalState = await documentaryApp.invoke({
        topic: topic,
        status: 'started'
      })
      
      console.log(`Workflow completed for ${topic}. Final status:`, finalState.status)
      
      // Update Supabase project status to completed
      if (session) {
        await supabase
          .from('projects')
          .update({ status: 'completed', progress: 100 })
          .eq('id', projectId)
      }

      // Return success
      return NextResponse.json({ 
        success: true, 
        projectId,
        message: 'Production pipeline completed successfully.'
      })

    } catch (e: any) {
      console.error(`Workflow failed for ${topic}`, e)
      if (session) {
        await supabase.from('projects').update({ status: 'failed' }).eq('id', projectId)
      }
      return NextResponse.json({ error: e.message || 'Pipeline execution failed.' }, { status: 500 })
    }

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
