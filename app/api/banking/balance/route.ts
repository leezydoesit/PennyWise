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
    // Extract the accountNum from the request URL or query parameters
    const url = new URL(req.url)
    const accountNum = url.searchParams.get('accountNum')

    if (!accountNum) {
      return new Response(
        JSON.stringify({ error: 'Missing accountNum parameter' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const cookieStore = cookies()
    const authTokenCookie = cookieStore.get('AuthToken')?.value

    if (!authTokenCookie) {
      return new Response(JSON.stringify({ error: 'Missing Auth Token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Construct the API URL with the hardcoded start date and today's date
    const apiUrl = `https://bankaccountdata.gocardless.com/api/v2/accounts/${accountNum}/balances/`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authTokenCookie}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return new Response(
        JSON.stringify({ error: 'Failed to fetch data', details: errorText }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error) // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
