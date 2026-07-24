import { NextRequest, NextResponse } from 'next/server'
import { documentaryApp } from '@/lib/agents/graph'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { topic, type, agentConfigs } = await req.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // 1. Validate API keys from the Authorization header
    const authHeader = req.headers.get('authorization')
    let hasLLMKey = false
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const keys = JSON.parse(decodeURIComponent(authHeader.split(' ')[1]))
        if (keys.openai || keys.gemini || keys.claude || keys.openrouter || keys['nvidia-llm']) {
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
    
    // 2. Create a project record in Supabase (if connected)
    let projectId = 'mock-id-' + Date.now()
    if (session) {
      // Upsert user into public.users to satisfy foreign key constraint using service role key
      const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      await supabaseAdmin.from('users').upsert({
        id: session.user.id,
        email: session.user.email || 'unknown@example.com',
      }, { onConflict: 'id' })

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
        
      if (error) {
        console.warn('Supabase project insert failed, falling back to mock ID. Error:', error.message)
      } else if (data) {
        projectId = data.id
      }
    }

    // 4. Kick off the LangGraph workflow with streaming
    const stream = await documentaryApp.stream({
      topic: topic,
      authHeader: authHeader || '',
      agentConfigs: agentConfigs || {},
      status: 'started'
    })
    
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        // Send initial connection event with projectId
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'init', projectId })}\n\n`))
        
        try {
          for await (const chunk of stream) {
            // chunk is usually { [nodeName]: state }
            const nodeName = Object.keys(chunk)[0]
            if (nodeName) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'node_update', node: nodeName })}\n\n`))
            }
          }
          
          // Update Supabase project status to completed
          if (session) {
            await supabase
              .from('projects')
              .update({ status: 'completed', progress: 100 })
              .eq('id', projectId)
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'complete', projectId })}\n\n`))
          controller.close()
        } catch (e: any) {
          console.error(`Workflow streaming failed for ${topic}`, e)
          if (session) {
            await supabase.from('projects').update({ status: 'failed' }).eq('id', projectId)
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: e.message || 'Pipeline execution failed.' })}\n\n`))
          controller.close()
        }
      }
    })

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    })

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
