export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export type BankAuthTokenResponse = {
  access: string
  access_expires: number
  refresh: string
  refresh_expires: number
}

export type institutionItemType = {
  id: string
  name: string
  bic: string
  transaction_total_days: string
  countries: string[]
  logo: string
}
export type UserData = {
  id: string
  email: string | null
  kindeUserId: string
}

export type CredentialData = {
  secretId: FormDataEntryValue
  secretKey: string
  user: string
}
export interface DecodedJWT {
  aud: any[]
  azp: string
  email: string
  exp: number
  iat: number
  iss: string
  jti: string
  orgCode: string
  permissions: any[]
  scp: string[]
  sub: string
}

export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  message: string
}

export type ContactFormErrors = {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
}
interface CreditorAccount {
  bban?: string
}

interface DebtorAccount {
  bban?: string
}

// Common Transaction Interface
export interface BaseTransaction {
  bookingDate: string
  bookingDateTime: string
  transactionAmount: {
    amount: string
    currency: string
  }
  creditorName?: string
  debtorName?: string
  proprietaryBankTransactionCode?: string
  internalTransactionId: string
}

// RevTransaction extends BaseTransaction
export interface RevTransaction extends BaseTransaction {
  transactionId: string
  valueDate: string
  valueDateTime: string
  remittanceInformationUnstructuredArray: string[]
  creditorAccount?: {
    iban: string
  }
  debtorAccount?: {
    iban: string
  }
}

// AibTransaction extends BaseTransaction
export interface AibTransaction extends BaseTransaction {
  remittanceInformationUnstructured: string
  merchantCategoryCode?: string
  entryReference?: string
  creditorAccount?: CreditorAccount
  debtorAccount?: DebtorAccount
  additionalInformation?: string
}

// New PtsbTransaction extends BaseTransaction
export interface PtsbTransaction extends BaseTransaction {
  valueDate: string
  valueDateTime: string
  remittanceInformationUnstructured: string
  additionalInformation?: string
  transactionId?: string // May be optional, not always present
}

// Common TransactionsData interface
export interface TransactionsData<T extends BaseTransaction> {
  transactions: {
    booked: T[]
  }
}
