import { cookies } from 'next/headers'

export const runtime = 'edge'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { institutionId } = body

    const cookieStore = cookies()
    const authTokenCookie = cookieStore.get('AuthToken')?.value

    if (!authTokenCookie) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: AuthToken cookie not found' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const redirectUrl =
      process.env.NEXT_PUBLIC_REDIRECT_URL ||
      'http://localhost:3000/integrations/account-setup'

    const userLanguage = 'EN'

    const response = await fetch(
      'https://bankaccountdata.gocardless.com/api/v2/requisitions/',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokenCookie}`,
        },
        body: JSON.stringify({
          redirect: redirectUrl,
          institution_id: institutionId,
          user_language: userLanguage,
        }),
      }
    )

    console.log('authToken: ', authTokenCookie)
    const data = await response.json()
    console.log('data: ', data)

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error account-setup-component requisition request:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'InternalServerError' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
