import { institutionItemType } from '@/lib/definitions'

export const institutionsData: institutionItemType[] = [
  {
    id: 'AIB_AIBKIE2DXXX',
    name: 'Allied Irish Banks',
    bic: 'AIBKIE2DXXX',
    transaction_total_days: '730',
    countries: ['IE'],
    logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/IE/PNG/aib.png',
  },
  {
    id: 'PERMANENT_TSB_IPBSIE2D',
    name: 'Permanent TSB',
    bic: 'IPBSIE2D',
    transaction_total_days: '89',
    countries: ['IE'],
    logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/IE/PNG/permanenttsb.png',
  },
  {
    id: 'REVOLUT_REVOLT21',
    name: 'Revolut',
    bic: 'REVOLT21XXX',
    transaction_total_days: '730',
    countries: ['IE'],
    logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png',
  },
]
