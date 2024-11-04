import { useEffect, useState } from 'react'
import { baseUrl } from '@/lib/definitions'

interface BalanceAmount {
  amount: string // The balance amount as a string
  currency: string // The currency of the amount
}

interface Balance {
  balanceAmount: BalanceAmount // The amount and currency
  balanceType: string // The type of the balance (e.g., available, booked, etc.)
  referenceDate: string // The date the balance was last updated
}

interface BalanceResponse {
  balances: Balance[] // An array of balance objects
}
export const useFetchBalance = (accountNum: string | null) => {
  const [data, setData] = useState<Balance[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!accountNum) return

    const fetchBalance = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${baseUrl}/api/banking/balance?accountNum=${accountNum}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch balance')
        }
        const result: BalanceResponse = await response.json()
        setData(result.balances)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [accountNum])

  return { data, error, loading }
}
