import { useState, useEffect } from 'react'
import {
  TransactionsData,
  RevTransaction,
  AibTransaction,
  PtsbTransaction,
  baseUrl,
} from '@/lib/definitions'

type Transaction = RevTransaction | AibTransaction | PtsbTransaction

interface Insight {
  title: string
  description: string
}

export const useFetchInsights = (
  transactionsData: TransactionsData<Transaction> | null
) => {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!transactionsData) return

    const fetchInsights = async () => {
      setLoading(true)
      setError(null)

      try {
        const messages = [
          {
            role: 'system',
            content:
              "You are PennyWise, an AI assistant specialized in providing financial insights based on transaction data. Your goal is to analyze the given data and generate insightful recommendations for the user. Avoid providing direct financial advice or recommendations that require specific actions. Focus on general trends, observations, and suggestions for better financial management. For each insight, provide a 'title' and a corresponding 'insight' description. Ensure that each title is clear and concise, followed by a descriptive analysis labeled as 'insight'. Provide exactly three insights.",
          },
          {
            role: 'user',
            content: `Here is the recent transaction data: ${JSON.stringify(transactionsData)}. Please provide exactly three insights based on this data, clearly labeled with 'title' and 'insight'.`,
          },
        ]

        const response = await fetch(`${baseUrl}/api/insights`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch insights')
        }

        const data = await response.json()

        // Combine title and description pairs
        const combinedInsights = []
        for (let i = 0; i < data.length; i += 2) {
          if (data[i] && data[i + 1]) {
            combinedInsights.push({
              title: data[i].description.replace(/[^a-zA-Z0-9\s]/g, ''), // Remove special characters
              description: data[i + 1].description.replace(
                /[^a-zA-Z0-9\s.]/g,
                ''
              ), // Remove special characters
            })
          }
        }

        setInsights(combinedInsights)
      } catch (err: any) {
        console.error('Failed to fetch insights:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [transactionsData])

  return { insights, loading, error }
}
