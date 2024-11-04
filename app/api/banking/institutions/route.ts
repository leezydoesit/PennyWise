import { getValidInstitutions } from '@/lib/token-utils'
import { getCookies } from '@/app/actions'

export const runtime = 'edge'

export async function GET() {
  try {
    const authToken = await getCookies()
    const institutionList = await getValidInstitutions(authToken)
    return new Response(JSON.stringify({ message: institutionList }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error in GET handler:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
