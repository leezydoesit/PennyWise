import React, { lazy, Suspense } from 'react'
import { useFetchTransactions } from '@/lib/hooks/fetchTransactionHook'
import { useFetchBalance } from '@/lib/hooks/fetchBalanceHook'
import { useFetchInsights } from '@/lib/hooks/fetchInsightsHook'
import WaitingScreen from '@/components/account-setup-component/waiting-screen'
import {
  isAibTransaction,
  isPtsbTransaction,
  isRevTransaction,
} from '@/lib/TypeChecker'
import {
  AibTransaction,
  PtsbTransaction,
  RevTransaction,
  TransactionsData,
} from '@/lib/definitions'

const DashCards = lazy(() => import('@/components/dashboard/dash-cards'))
const DashMiddle = lazy(() => import('@/components/dashboard/dash-middle'))
const DashAi = lazy(() => import('@/components/dashboard/dash-ai'))

interface TransactionsLoaderProps {
  accountNum: string
}

export const TransactionsLoader: React.FC<TransactionsLoaderProps> = ({
  accountNum,
}) => {
  const {
    data: transactionsData,
    error: transactionsError,
    loading: transactionsLoading,
  } = useFetchTransactions(accountNum)
  const {
    data: balanceData,
    error: balanceError,
    loading: balanceLoading,
  } = useFetchBalance(accountNum)
  const {
    insights,
    loading: insightsLoading,
    error: insightsError,
  } = useFetchInsights(transactionsData)

  if (transactionsLoading || balanceLoading || insightsLoading) {
    return <WaitingScreen statusMessage="Loading data..." />
  }

  if (transactionsError || balanceError || insightsError) {
    return (
      <div className="p-4 text-red-600">
        <h2 className="text-lg font-semibold">An error occurred</h2>
        <p>
          {transactionsError?.message || balanceError?.message || insightsError}
        </p>
        <p>
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    )
  }

  if (!transactionsData || !balanceData) {
    return <div>No data available</div>
  }

  const isRevData = transactionsData.transactions.booked.every(isRevTransaction)
  const isAibData =
    !isRevData && transactionsData.transactions.booked.every(isAibTransaction)
  const isPtsbData =
    !isRevData &&
    !isAibData &&
    transactionsData.transactions.booked.every(isPtsbTransaction)

  return (
    <>
      {isRevData && (
        <Suspense
          fallback={<WaitingScreen statusMessage="Loading transactions..." />}
        >
          <DashCards
            transactionsData={
              transactionsData as TransactionsData<RevTransaction>
            }
            balanceData={balanceData}
          />
          <DashMiddle
            transactionsData={
              transactionsData as TransactionsData<RevTransaction>
            }
          />
        </Suspense>
      )}
      {!isRevData && isAibData && (
        <Suspense
          fallback={<WaitingScreen statusMessage="Loading transactions..." />}
        >
          <DashCards
            transactionsData={
              transactionsData as TransactionsData<AibTransaction>
            }
            balanceData={balanceData}
          />
          <DashMiddle
            transactionsData={
              transactionsData as TransactionsData<AibTransaction>
            }
          />
        </Suspense>
      )}
      {!isRevData && !isAibData && isPtsbData && (
        <Suspense
          fallback={<WaitingScreen statusMessage="Loading transactions..." />}
        >
          <DashCards
            transactionsData={
              transactionsData as TransactionsData<PtsbTransaction>
            }
            balanceData={balanceData}
          />
          <DashMiddle
            transactionsData={
              transactionsData as TransactionsData<PtsbTransaction>
            }
          />
        </Suspense>
      )}
      <Suspense
        fallback={<WaitingScreen statusMessage="Loading AI insights..." />}
      >
        <DashAi insights={insights} />
      </Suspense>
    </>
  )
}

export default TransactionsLoader
