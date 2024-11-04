import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function requestToken(clientId: string, clientSecret: string) {
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  }

  const body = JSON.stringify({
    secret_id: clientId,
    secret_key: clientSecret,
  })

  const url = 'https://bankaccountdata.gocardless.com/api/v2/token/new/'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`)
    }

    return await response.json()
  } catch (error: any) {
    throw new Error(`RequestToken failed: ${error.message}`)
  }
}

export async function getOAuthToken() {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const body = new URLSearchParams({
    audience: 'https://pennywiseapp.kinde.com/api',
    grant_type: 'client_credentials',
    client_id: `${process.env.KINDE_CLIENT_ID}`,
    client_secret: `${process.env.KINDE_CLIENT_SECRET}`,
  })

  const url = 'https://pennywiseapp.kinde.com/oauth2/token'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`)
    }

    return await response.json()
  } catch (error: any) {
    throw new Error(`GetOAuthToken failed: ${error.message}`)
  }
}

export async function getValidInstitutions(accessToken: string) {
  const url =
    'https://bankaccountdata.gocardless.com/api/v2/institutions/?country=IE'

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`)
    }

    return await response.json()
  } catch (error: any) {
    throw new Error(`GetValidInstitutions failed: ${error.message}`)
  }
}
