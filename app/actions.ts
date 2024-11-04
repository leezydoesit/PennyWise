'use server'

import { cookies } from 'next/headers'

export async function getCookies(): Promise<string> {
  try {
    const cookieStore = cookies()
    const authTokenCookie = cookieStore.get('AuthToken')

    if (!authTokenCookie) {
      throw new Error('Cannot find authToken.')
    }

    return authTokenCookie.value
  } catch (error) {
    console.error('Error retrieving cookies:', error)
    throw new Error('Failed to retrieve cookies.')
  }
}

export async function setSecureAuthCookies(
  AuthToken: string,
  AuthRefreshToken: string
) {
  cookies().set({
    name: 'AuthToken',
    value: AuthToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 90 * 60,
    path: '/',
  })

  cookies().set({
    name: 'AuthRefreshToken',
    value: AuthRefreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    path: '/',
  })
}
