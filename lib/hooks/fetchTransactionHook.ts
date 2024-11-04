'use client'
import { useState, useEffect } from 'react'
import {
  AibTransaction,
  baseUrl,
  PtsbTransaction,
  RevTransaction,
  TransactionsData,
} from '@/lib/definitions'

export const useFetchTransactions = (accountNum: string | null) => {
  const [data, setData] = useState<TransactionsData<
    RevTransaction | AibTransaction | PtsbTransaction
  > | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/banking/transactions?accountNum=${accountNum}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }
        const data: TransactionsData<any> = await response.json()
        setData(data)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [accountNum])

  return { data, error, loading }
}
