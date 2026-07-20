import { StateGraph, START, END, Annotation } from '@langchain/langgraph'

// 1. Define the state for the workflow
export const GraphState = Annotation.Root({
  topic: Annotation<string>(),
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
  // In reality, you'd use Vercel AI SDK or LangChain LLMs here
  return {
    research: [`Found 5 primary sources on ${state.topic}`, `Extracted key timeline events.`],
    status: 'research_complete'
  }
}

async function scriptwriterNode(state: typeof GraphState.State) {
  console.log(`[Agent] Writing script for: ${state.topic}`)
  return {
    script: `Narrator: The story of ${state.topic} is one of unprecedented scale...`,
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
