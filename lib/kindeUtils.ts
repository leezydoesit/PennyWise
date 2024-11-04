import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function getUserEmail() {
  const { getUser, isAuthenticated } = getKindeServerSession()

  const isAuth = await isAuthenticated()

  if (!isAuth) {
    throw new Error('User is not authenticated')
  }

  const user = await getUser()

  return user?.email
}
