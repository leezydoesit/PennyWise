import React from 'react'
import {
  calculate30DayTotals,
  calculateMonthlyTransactionCount,
} from '@/lib/transaction-utils'
import {
  TransactionsData,
  RevTransaction,
  AibTransaction,
} from '@/lib/definitions'

interface BalanceAmount {
  amount: string
  currency: string
}

interface BalanceData {
  balanceAmount: BalanceAmount
  balanceType: string
  referenceDate: string
}

interface DashCardsProps {
  transactionsData: TransactionsData<RevTransaction | AibTransaction>
  balanceData: BalanceData[]
}

export const DashCards: React.FC<DashCardsProps> = ({
  transactionsData,
  balanceData,
}) => {
  const [monthlyTransactionCount, transactionCountChange] =
    calculateMonthlyTransactionCount(transactionsData)
  const [totalSpent, totalChange] = calculate30DayTotals(transactionsData)
  const latestBalance = balanceData.length > 0 ? balanceData[0] : null

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 md:p-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
        <div className="p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
            Available Balance
          </h3>
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
            className="h-4 w-4 text-muted-foreground"
          >
            <line x1="12" x2="12" y1="2" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="p-6 flex-grow">
          <div className="text-2xl font-bold">
            €{latestBalance ? latestBalance.balanceAmount.amount : 'N/A'}
          </div>
          <p className="text-xs text-muted-foreground">
            {latestBalance
              ? `As of ${latestBalance.referenceDate}`
              : 'No balance data available'}
          </p>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
        <div className="p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
            Total Spent (Last 30 Days)
          </h3>
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
            className="h-4 w-4 text-muted-foreground"
          >
            <line x1="12" x2="12" y1="2" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="p-6 flex-grow">
          <div className="text-2xl font-bold">€{totalSpent.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {totalChange >= 0 ? '+' : ''}
            {totalChange.toFixed(1)}% from previous 30 days
          </p>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
        <div className="p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
            Number of Transactions (This Month)
          </h3>
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
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <line x1="2" x2="22" y1="10" y2="10"></line>
          </svg>
        </div>
        <div className="p-6 flex-grow">
          <div className="text-2xl font-bold">{monthlyTransactionCount}</div>
          <p className="text-xs text-muted-foreground">
            {transactionCountChange >= 0 ? '+' : ''}
            {transactionCountChange.toFixed(1)}% from last month
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashCards
