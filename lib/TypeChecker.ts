import {
  RevTransaction,
  AibTransaction,
  PtsbTransaction,
} from '@/lib/definitions'

export function isRevTransaction(
  transaction: any
): transaction is RevTransaction {
  return (
    transaction &&
    'transactionId' in transaction &&
    Array.isArray(transaction.remittanceInformationUnstructuredArray)
  )
}

export function isAibTransaction(
  transaction: any
): transaction is AibTransaction {
  return (
    transaction &&
    'remittanceInformationUnstructured' in transaction &&
    typeof transaction.remittanceInformationUnstructured === 'string'
  )
}

export function isPtsbTransaction(
  transaction: any
): transaction is PtsbTransaction {
  return (
    transaction &&
    'remittanceInformationUnstructured' in transaction &&
    typeof transaction.remittanceInformationUnstructured === 'string' &&
    'valueDate' in transaction &&
    'valueDateTime' in transaction &&
    typeof transaction.valueDate === 'string' &&
    typeof transaction.valueDateTime === 'string'
  )
}

export function getMerchantName(
  transaction: RevTransaction | AibTransaction | PtsbTransaction
): string {
  if (isRevTransaction(transaction)) {
    return transaction.creditorName || transaction.debtorName || 'Unknown'
  } else if (isAibTransaction(transaction)) {
    return (
      transaction.creditorName ||
      transaction.debtorName ||
      transaction.remittanceInformationUnstructured ||
      'Unknown'
    )
  } else if (isPtsbTransaction(transaction)) {
    return transaction.remittanceInformationUnstructured || 'Unknown'
  }
  return 'Unknown'
}
