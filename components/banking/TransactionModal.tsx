import React from 'react'
import {
  TransactionsData,
  RevTransaction,
  AibTransaction,
  PtsbTransaction,
} from '@/lib/definitions'

interface TransactionModalProps {
  transactionsData: TransactionsData<
    RevTransaction | AibTransaction | PtsbTransaction
  >
  onClose: () => void
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  transactionsData,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-red-500 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h3 className="text-2xl font-semibold mb-4">All Transactions</h3>
        <div className="h-[400px] overflow-auto">
          <div className="grid gap-4">
            {transactionsData.transactions.booked.map((transaction) => {
              const isRev = 'transactionId' in transaction
              const isAib = 'remittanceInformationUnstructured' in transaction
              const isPtsb =
                'remittanceInformationUnstructured' in transaction &&
                'valueDate' in transaction

              let description = 'No description'
              if (isRev) {
                const revTransaction = transaction as RevTransaction
                description =
                  revTransaction.remittanceInformationUnstructuredArray
                    ? revTransaction.remittanceInformationUnstructuredArray.join(
                        ', '
                      )
                    : 'No description'
              } else if (isAib) {
                description =
                  (transaction as AibTransaction)
                    .remittanceInformationUnstructured || 'No description'
              } else if (isPtsb) {
                description =
                  (transaction as PtsbTransaction)
                    .remittanceInformationUnstructured || 'No description'
              }

              return (
                <div
                  key={
                    isRev
                      ? transaction.transactionId
                      : transaction.internalTransactionId
                  }
                  className="grid grid-cols-[1fr_2fr_1fr] items-center gap-4 rounded-md bg-muted/20 px-4 py-3"
                >
                  <div className="text-sm text-muted-foreground">
                    {new Date(transaction.bookingDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm">{description}</div>
                  <div
                    className={`text-sm font-medium text-right ${
                      parseFloat(transaction.transactionAmount.amount) < 0
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {parseFloat(transaction.transactionAmount.amount) < 0
                      ? `-€${Math.abs(parseFloat(transaction.transactionAmount.amount)).toFixed(2)}`
                      : `+€${parseFloat(transaction.transactionAmount.amount).toFixed(2)}`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
