import Link from 'next/link'
import buttonStyle from '@/app/styles/button.module.css'
import HeaderNavLinks from '@/data/HeaderNavLinks'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

async function isAuthenticated() {
  const { isAuthenticated: isAuth } = getKindeServerSession()

  return await isAuth()
}

export default async function Header() {
  return (
    <header className="bg-gray-50 shadow h-16 flex text-black items-center border-b border-gray-300 tracking-tighter">
      <div className="container mx-auto px-4 flex justify-between items-cente mb-2r">
        <Link
          className="flex items-center gap-2 text-lg mr-8 font-bold"
          href="/"
        >
          PennyWise
        </Link>
        <nav className="flex justify-center flex-2">
          <ul className="flex space-x-4 ">
            {HeaderNavLinks.map((link, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Link
                  className="text-m font-medium hover:underline hover:font-bold hover:scale-105"
                  href={link.href}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex space-x-4">
          {(await isAuthenticated()) ? (
            <LogoutLink className={buttonStyle.button}>Log out</LogoutLink>
          ) : (
            <>
              <LoginLink className={buttonStyle.button}>Sign in</LoginLink>
              <RegisterLink className={buttonStyle.button}>
                Sign up
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
