import InstitutionItem from '@/components/banking/InstitutionItem'
import { institutionItemType } from '@/lib/definitions'
import { institutionsData } from '@/data/supported-banks'

export default function BankSelection() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl mx-auto border border-gray-200 rounded-lg dark:border-gray-800">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Select Your Bank</h2>
        </div>

        {institutionsData.map((institution: institutionItemType) => (
          <InstitutionItem key={institution.id} institution={institution} />
        ))}
      </div>
    </div>
  )
}
