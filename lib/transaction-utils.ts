import { TransactionsData, BaseTransaction } from '@/lib/definitions'
import { isAfter, isBefore, subDays } from 'date-fns'

export const calculate30DayTotals = <T extends BaseTransaction>(
  data: TransactionsData<T>
): [number, number] => {
  const transactions = data.transactions.booked

  const today = new Date()

  const startDateCurrent = subDays(today, 30)
  const endDateCurrent = today

  const startDatePrevious = subDays(today, 60)
  const endDatePrevious = startDateCurrent

  const current30DayTransactions = transactions.filter(
    (transaction) =>
      isAfter(new Date(transaction.bookingDate), startDateCurrent) &&
      isBefore(new Date(transaction.bookingDate), endDateCurrent)
  )

  const previous30DayTransactions = transactions.filter(
    (transaction) =>
      isAfter(new Date(transaction.bookingDate), startDatePrevious) &&
      isBefore(new Date(transaction.bookingDate), endDatePrevious)
  )

  const calculateTotal = (transactions: T[]): number => {
    return transactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.transactionAmount.amount)
      return amount < 0 ? total + Math.abs(amount) : total
    }, 0)
  }

  const currentTotal = calculateTotal(current30DayTransactions)
  const previousTotal = calculateTotal(previous30DayTransactions)

  const percentageChange =
    previousTotal !== 0
      ? ((currentTotal - previousTotal) / previousTotal) * 100
      : 0

  return [currentTotal, percentageChange]
}

/**
 * Groups transactions by month based on the booking date.
 */
export const groupTransactionsByMonth = <T extends BaseTransaction>(
  transactions: T[]
): Record<string, T[]> => {
  return transactions.reduce<Record<string, T[]>>((acc, transaction) => {
    const month = transaction.bookingDate.slice(0, 7) // Extract 'yyyy-MM' format
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(transaction)
    return acc
  }, {})
}

/**
 * Calculates the total number of transactions for the current month and the percentage change
 * in the number of transactions compared to the previous month.
 */
export const calculateMonthlyTransactionCount = <T extends BaseTransaction>(
  data: TransactionsData<T>
): [number, number] => {
  const transactions = data.transactions.booked
  const groupedByMonth = groupTransactionsByMonth(transactions)

  const months = Object.keys(groupedByMonth).sort()
  const numMonths = months.length
  if (numMonths === 0) return [0, 0]

  const currentMonthCount = groupedByMonth[months[numMonths - 1]].length

  let previousMonthCount = 0
  if (numMonths > 1) {
    previousMonthCount = groupedByMonth[months[numMonths - 2]].length
  }

  const percentageChange =
    previousMonthCount !== 0
      ? ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100
      : 0

  return [currentMonthCount, percentageChange]
}
