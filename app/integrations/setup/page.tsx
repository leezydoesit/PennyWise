'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/components/loading-component'
import { setSecureAuthCookies } from '@/app/actions'
import { baseUrl } from '@/lib/definitions'

export default function SetupPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        // Fetching authentication data from API
        const response = await fetch(`${baseUrl}/api/banking/auth`)
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        // Ensure the necessary authentication data is present
        const { authToken, authRefreshToken } = data.message || {}
        if (authToken && authRefreshToken) {
          // Set secure authentication cookies
          await setSecureAuthCookies(authToken, authRefreshToken)

          // Redirect to the next page
          router.push('/integrations/bank-selection')
        } else {
          throw new Error('Invalid authentication data')
        }
      } catch (err: any) {
        console.error('Error fetching auth data:', err)
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchAuthData()
  }, [router])

  if (loading) {
    return <LoadingComponent />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return null // If there's no error and not loading, return nothing as the component will handle redirect
}
