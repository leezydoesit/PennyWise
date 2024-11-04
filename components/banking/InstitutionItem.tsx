'use client'

import { baseUrl, institutionItemType } from '@/lib/definitions'
import Image from 'next/image'
export default function InstitutionItem({
  institution,
}: {
  institution: institutionItemType
}) {
  const handleClick = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/banking/requisitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ institutionId: institution.id }),
      })

      const data = await response.json()
      console.error(data)

      if (response.ok) {
        if (data.link) {
          window.location.href = data.link // Redirect to the requisition link
        } else {
          console.error('Requisition link not found.')
        }
      } else {
        console.error('Failed to create requisition link:', data.error)
      }
    } catch (error) {
      console.error('Error creating requisition link:', error)
    }
  }
  return (
    <div className="grid p-2">
      <div
        className="p-2 flex group items-center hover:bg-gray-100/50 rounded-xl gap-4 dark:hover:bg-gray-800/50 cursor-pointer"
        onClick={handleClick}
      >
        <Image
          className="object-contain aspect-video rounded-lg w-12 h-12"
          src={institution.logo}
          width="48"
          height="48"
          alt="Bank Logo"
        />
        <div>
          <div className="font-medium">{institution.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            BIC: {institution.bic}
          </div>
        </div>
      </div>
    </div>
  )
}
