import { getOAuthToken } from '@/lib/token-utils'
export async function GET() {
  try {
    const data = await getOAuthToken()

    if (data != null) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      return new Response(JSON.stringify({ error: 'No data received' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Bad Request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
