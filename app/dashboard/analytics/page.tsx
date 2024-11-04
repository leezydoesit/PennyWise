'use client' // Ensure this is a client-side component

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFetchTransactions } from '@/lib/hooks/fetchTransactionHook'
import WaitingScreen from '@/components/account-setup-component/waiting-screen'
import PieChartComponent from '@/components/charts/PieChart'
import CumulativeAreaChart from '@/components/charts/CumulativeAreaChart'
import BarChartComponent from '@/components/charts/BarChart'
import { DashHeader } from '@/components/dashboard/dash-header'

// Component for handling search params and data fetching
function AnalyticsContent() {
  const searchParams = useSearchParams()
  const accountNum = searchParams.get('accountNum')

  const {
    data: transactionsData,
    error: transactionsError,
    loading: transactionsLoading,
  } = useFetchTransactions(accountNum)

  if (transactionsLoading) {
    return <WaitingScreen statusMessage="PennyWise is getting ready..." />
  }

  if (transactionsError) {
    return <div>Error: {transactionsError.message}</div>
  }

  return (
    <>
      {accountNum && <DashHeader accountNum={accountNum} />}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1 min-w-[300px]">
          {transactionsData && (
            <Suspense
              fallback={<WaitingScreen statusMessage="Loading Pie Chart..." />}
            >
              <PieChartComponent transactionsData={transactionsData} />
            </Suspense>
          )}
        </div>
        <div className="flex-1 min-w-[300px]">
          {transactionsData && (
            <Suspense
              fallback={<WaitingScreen statusMessage="Loading Area Chart..." />}
            >
              <CumulativeAreaChart transactionsData={transactionsData} />
            </Suspense>
          )}
        </div>
      </div>
      {transactionsData && (
        <Suspense
          fallback={<WaitingScreen statusMessage="Loading Bar Chart..." />}
        >
          <BarChartComponent transactionsData={transactionsData} />
        </Suspense>
      )}
    </>
  )
}

// Main export default page component
export default function Page() {
  return (
    <Suspense fallback={<WaitingScreen statusMessage="Loading Analytics..." />}>
      <AnalyticsContent />
    </Suspense>
  )
}
