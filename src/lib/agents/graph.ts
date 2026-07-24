import { StateGraph, START, END, Annotation } from '@langchain/langgraph'
import { generateText } from 'ai'
import { getBestAvailableModel } from '../ai/fallback'

// 1. Define the state for the workflow
export const GraphState = Annotation.Root({
  topic: Annotation<string>(),
  authHeader: Annotation<string>(),
  research: Annotation<string[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  script: Annotation<string>(),
  scenes: Annotation<any[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  status: Annotation<string>(),
})

// 2. Define the Nodes (Agentic tasks)
async function researcherNode(state: typeof GraphState.State) {
  console.log(`[Agent] Researching topic: ${state.topic}`)
  
  // Construct a dummy request to pass headers to the fallback logic
  const dummyReq = new Request('http://localhost', { headers: { authorization: state.authHeader } })
  const { model } = await getBestAvailableModel(dummyReq)

  const { text } = await generateText({
    model,
    system: "You are the Lead Researcher for a high-end documentary production. Research the topic and provide a strict list of 3-5 crucial timeline events or facts. Output ONLY a bulleted list.",
    prompt: `Topic: ${state.topic}`,
  })

  return {
    research: text.split('\n').filter(line => line.trim().length > 0),
    status: 'research_complete'
  }
}

async function scriptwriterNode(state: typeof GraphState.State) {
  console.log(`[Agent] Writing script for: ${state.topic}`)
  
  const dummyReq = new Request('http://localhost', { headers: { authorization: state.authHeader } })
  const { model } = await getBestAvailableModel(dummyReq)

  const { text } = await generateText({
    model,
    system: "You are an elite Screenwriter. Turn the research points into a cinematic script with [NARRATION] and [SCENE NOTES]. Keep it under 200 words for this fast prototype.",
    prompt: `Topic: ${state.topic}\nResearch:\n${state.research.join('\n')}`,
  })

  return {
    script: text,
    status: 'script_complete'
  }
}

async function storyboardNode(state: typeof GraphState.State) {
  console.log(`[Agent] Generating storyboard scenes`)
  return {
    scenes: [
      { id: 1, type: 'B-Roll', description: 'Dark cinematic hacker room' },
      { id: 2, type: 'Interview', description: 'Expert speaking about the event' }
    ],
    status: 'storyboard_complete'
  }
}

// 3. Define the Graph
const workflow = new StateGraph(GraphState)
  .addNode("researcher", researcherNode)
  .addNode("scriptwriter", scriptwriterNode)
  .addNode("storyboarder", storyboardNode)

  // Define the edges
  .addEdge(START, "researcher")
  .addEdge("researcher", "scriptwriter")
  .addEdge("scriptwriter", "storyboarder")
  .addEdge("storyboarder", END)

// 4. Compile the graph
export const documentaryApp = workflow.compile()
