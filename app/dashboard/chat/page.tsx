'use client'

import { useChat } from 'ai/react'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFetchTransactions } from '@/lib/hooks/fetchTransactionHook'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer'
import Image from 'next/image'
import WaitingScreen from '@/components/account-setup-component/waiting-screen'
import { DashHeader } from '@/components/dashboard/dash-header'

function ChatContent() {
  const ref = useRef<HTMLDivElement>(null)
  const [isChatReady, setIsChatReady] = useState(false)
  const searchParams = useSearchParams()
  const accountNum = searchParams.get('accountNum')

  const {
    data: transactionsData,
    error: transactionsError,
    loading: transactionsLoading,
  } = useFetchTransactions(accountNum)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'system',
        content: ` 
          You are PennyWise, an advanced AI assistant specialized in financial insights and analysis. Your primary role is to analyze transaction data and provide insightful, data-driven interpretations. Always maintain a professional tone and never break character. Do not provide direct financial advice or make explicit recommendations.
          When responding, follow these principles:
          1. **Adherence to Role**: Provide observations, trends, and considerations based on data. Avoid actionable guidance like "You should..." or "It is best to...".
          2. **Analytical Precision**: Deliver detailed, data-driven breakdowns and analyses. Ensure all insights are well-supported by the provided information.
          3. **Proactive Analysis**: If no specific questions are asked, offer a general overview and detailed analysis of the data. Include summaries of total spending, top categories, and income versus expenditures.
          4. **Avoid Hypotheticals**: Focus strictly on the provided data. Avoid speculation unless directly asked for comparisons or scenario analyses, and stay grounded in general financial principles.
          5. **Professional and Trustworthy**: Maintain a confident, knowledgeable tone. Your responses should reflect a deep understanding of financial data.
          Always aim to provide clear, valuable insights, helping users understand their financial situation based on the data. 
          `,
      },
      {
        id: 'transaction-data',
        role: 'system',
        content: JSON.stringify(transactionsData),
      },
    ],
  })

  useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [messages])

  useEffect(() => {
    if (transactionsData && !transactionsLoading && !isChatReady) {
      setIsChatReady(true)
      append({
        id: 'initial-greeting',
        role: 'user',
        content: 'Hello PennyWise!',
      })
    }
  }, [transactionsData, transactionsLoading, isChatReady, append])

  if (transactionsLoading) {
    return <WaitingScreen statusMessage="PennyWise is getting ready..." />
  }

  if (transactionsError) {
    return <div>Error: {transactionsError.message}</div>
  }

  return (
    <>
      {accountNum && <DashHeader accountNum={accountNum} />}

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div
          className="w-full max-w-screen-xl bg-white rounded-lg shadow-lg flex flex-col"
          style={{ height: '80vh' }}
        >
          <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
            <h1 className="text-xl font-bold">Chat to your Wallet!</h1>
          </header>

          <div
            className="flex-1 overflow-auto p-6"
            ref={ref}
            style={{ maxHeight: 'calc(80vh - 120px)' }}
          >
            <div className="space-y-4">
              {messages
                .filter((m) => m.role !== 'system')
                .map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {m.role === 'assistant' ? (
                      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 border">
                        <Image
                          className="aspect-square h-full w-full"
                          src="/placeholder-user.jpg"
                          alt="PennyWise"
                          width={50}
                          height={50}
                        />
                      </span>
                    ) : null}
                    <div className="grid gap-1">
                      <div
                        className={`font-bold ${m.role === 'user' ? 'text-right' : ''}`}
                      >
                        {m.role === 'user' ? 'You' : 'PennyWise'}
                      </div>
                      <div
                        className={`prose p-3 rounded-md ${m.role === 'user' ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}
                      >
                        <MarkdownRenderer content={m.content} />
                      </div>
                    </div>
                    {m.role === 'user' ? (
                      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 border">
                        <Image
                          className="aspect-square h-full w-full"
                          src="/placeholder-user.jpg"
                          alt="User"
                          width={50}
                          height={50}
                        />
                      </span>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-background border-t px-6 py-4">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                className="flex w-full bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
                placeholder="Type your message..."
                name="message"
                id="message"
                rows={1}
                value={input}
                onChange={handleInputChange}
              ></textarea>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 absolute w-8 h-8 top-3 right-3"
                type="submit"
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
                <span className="sr-only">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <WaitingScreen statusMessage="Loading PennyWise Advisor Chat..." />
      }
    >
      <ChatContent />
    </Suspense>
  )
}
