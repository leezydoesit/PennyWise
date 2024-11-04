import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

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

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    return new Response(error.message || 'Something went wrong!', {
      status: 500,
    })
  }
}
