import { NextRequest, NextResponse } from 'next/server'
import { documentaryApp } from '@/lib/agents/graph'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { topic, type } = await req.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // 1. Verify User Session (Optional/Mocked for now)
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

    // 3. Kick off the LangGraph background workflow
    // We execute this asynchronously so the API returns immediately.
    // In a real production app, this would use Inngest, Trigger.dev, or background workers.
    ;(async () => {
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
      } catch (e) {
        console.error(`Workflow failed for ${topic}`, e)
        if (session) {
          await supabase.from('projects').update({ status: 'failed' }).eq('id', projectId)
        }
      }
    })()

    // 4. Return the project ID so the UI can redirect/track it
    return NextResponse.json({ 
      success: true, 
      projectId,
      message: 'Production pipeline launched.'
    })

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
