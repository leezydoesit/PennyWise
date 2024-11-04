import OpenAI from 'openai'

export const runtime = 'edge'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' })

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response('Missing OpenAI API Key.', { status: 400 })
    }

    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages,
    })

    let responseData: string[] = []

    // Iterate over the response stream
    for await (const chunk of response) {
      // Extract content from the choices array in each chunk
      chunk.choices.forEach((choice) => {
        if (choice && choice.delta && choice.delta.content) {
          responseData.push(choice.delta.content)
        }
      })
    }

    // Join all parts into a single string and split into insights
    const fullResponse = responseData.join('')

    // Split the full response by newline or any other delimiter you use to separate insights
    const insights = fullResponse
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line) // Remove empty lines

    const formattedInsights = insights.map((insight) => {
      const [title, ...description] = insight.split(':')
      return { title: title.trim(), description: description.join(':').trim() }
    })

    // Return the formatted insights
    return new Response(JSON.stringify(formattedInsights), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error occurred:', error)
    return new Response(error.message || 'Something went wrong!', {
      status: 500,
    })
  }
}
