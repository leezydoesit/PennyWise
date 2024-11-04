// 'use server'
import { BankAuthTokenResponse } from '@/lib/definitions'
import { requestToken } from '@/lib/token-utils'

export async function GET() {
  try {
    const secretId = process.env.SECRET_ID
    const secretKey = process.env.SECRET_KEY

    // Ensure the required credentials are available
    if (!secretId || !secretKey) {
      throw new Error('Client credentials are missing')
    }

    // Request an auth token using the decrypted credentials
    const response: BankAuthTokenResponse = await requestToken(
      secretId,
      secretKey
    )

    // Ensure the response contains the required tokens
    if (!response.access || !response.refresh) {
      throw new Error('Failed to retrieve tokens')
    }

    // Construct the response object with the token information
    const messageObj = {
      authToken: response.access,
      authTokenExpiry: response.access_expires,
      authRefreshToken: response.refresh,
      authRefreshTokenExpiry: response.refresh_expires,
    }

    // Send the response with the token information
    return new Response(JSON.stringify({ message: messageObj }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error in GET handler:', error)
    return new Response(JSON.stringify({ error: 'InternalServerError' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
