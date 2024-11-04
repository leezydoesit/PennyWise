// list accounts after requisitions
import { cookies } from 'next/headers'

export const runtime = 'edge'

export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Extract the reqId from the request URL or query parameters
    const url = new URL(req.url)
    const reqId = url.searchParams.get('reqId')

    if (!reqId) {
      return new Response(
        JSON.stringify({ error: 'Missing reqId parameter' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const cookieStore = cookies()
    const authTokenCookie = cookieStore.get('AuthToken')?.value

    const response = await fetch(
      `https://bankaccountdata.gocardless.com/api/v2/requisitions/${reqId}/`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authTokenCookie}`,
        },
      }
    )

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
