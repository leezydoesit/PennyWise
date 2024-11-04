import { cookies } from 'next/headers'
import { DecodedJWT } from '@/lib/definitions'
import jwtDecode from 'jwt-decode'

export function fetchAndDecode() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const decodedJWT = decodeJWT(accessToken)

  if (decodedJWT) {
    return decodedJWT
  } else {
    throw new Error('Invalid JWT token')
  }
}

// Decode JWT token
function decodeJWT(token: string | undefined): DecodedJWT | null {
  if (!token) {
    throw new Error('No token..')
  }
  try {
    return jwtDecode<DecodedJWT>(token)
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}
