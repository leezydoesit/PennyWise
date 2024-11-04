import React, { useState } from 'react'
import {
  TransactionsData,
  RevTransaction,
  AibTransaction,
} from '@/lib/definitions'
import TransactionModal from '@/components/banking/TransactionModal'
import { subYears } from 'date-fns'
import { getMerchantName } from '@/lib/TypeChecker'

type DashMiddleProps = {
  transactionsData: TransactionsData<RevTransaction | AibTransaction>
}

export const DashMiddle: React.FC<DashMiddleProps> = ({ transactionsData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Define the start date for the past year
  const oneYearAgo = subYears(new Date(), 1)

  // Filter transactions to include only those within the past year
  const recentTransactions = transactionsData.transactions.booked.filter(
    (transaction) =>
      new Date(transaction.bookingDateTime || transaction.bookingDate) >=
      oneYearAgo
  )

  // Sort transactions by bookingDateTime or bookingDate in descending order
  const sortedTransactions = [...recentTransactions].sort(
    (a, b) =>
      new Date(b.bookingDateTime || b.bookingDate).getTime() -
      new Date(a.bookingDateTime || a.bookingDate).getTime()
  )

  // Get the latest 5 transactions with identifiable places (creditor or debtor)
  const transactionList = sortedTransactions
    .filter((transaction) => getMerchantName(transaction) !== 'Unknown') // Use getMerchantName to filter out unknown places
    .slice(0, 5) // Limit to the first 5 transactions

  // Calculate spending statistics
  const placeSpendMap: Record<string, number> = {}
  const placeCountMap: Record<string, number> = {}

  // Iterate through all recent transactions to calculate total spending and count per place
  recentTransactions.forEach((transaction) => {
    const placeName = getMerchantName(transaction)
    if (placeName !== 'Unknown') {
      const amount = Math.abs(parseFloat(transaction.transactionAmount.amount))

      // Initialize the maps if the placeName hasn't been encountered yet
      if (!placeSpendMap[placeName]) {
        placeSpendMap[placeName] = 0
        placeCountMap[placeName] = 0
      }

      // Accumulate the total spending and count per place
      placeSpendMap[placeName] += amount
      placeCountMap[placeName] += 1
    }
  })

  // Convert the placeSpendMap into an array of [placeName, totalAmount, count] and sort
  const sortedPlaces = Object.entries(placeSpendMap)
    .map(([place, totalAmount]) => ({
      place,
      totalAmount,
      count: placeCountMap[place],
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 7) // Take top 7 places

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm xl:col-span-2">
        <div className="space-y-1.5 p-6 flex flex-row items-center">
          <div className="grid gap-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Transactions
            </h3>
            <p className="text-sm text-muted-foreground">
              Recent transactions from your store.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 ml-auto gap-1"
            onClick={handleOpenModal}
          >
            View All
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
              className="h-4 w-4"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {transactionList.map((transaction) => {
                  const transactionId =
                    'transactionId' in transaction
                      ? transaction.transactionId
                      : transaction.internalTransactionId
                  const merchantName = getMerchantName(transaction)
                  const transactionDate =
                    transaction.bookingDate || transaction.bookingDateTime
                  const transactionCode =
                    transaction.proprietaryBankTransactionCode || 'Unknown'

                  return (
                    <tr
                      key={transactionId}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <div className="font-medium">{merchantName}</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          {new Date(transactionDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4 align-middle">{transactionCode}</td>
                      <td className="p-4 align-middle text-right">
                        €
                        {parseFloat(
                          transaction.transactionAmount.amount
                        ).toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Places You Spend the Most
            </h3>
          </div>
          <div className="p-6 grid gap-8">
            {sortedPlaces.map(({ place, totalAmount, count }) => (
              <div key={place} className="flex items-center gap-4">
                <span className="relative shrink-0 overflow-hidden rounded-full hidden h-9 w-9 sm:flex">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    {place[0]}
                  </span>
                </span>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{place}</p>
                  <p className="text-xs text-muted-foreground">
                    Transactions: {count}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  €{totalAmount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TransactionModal
          transactionsData={transactionsData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default DashMiddle
