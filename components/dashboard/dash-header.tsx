'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TransactionsLoaderProps {
  accountNum: string
}

export const DashHeader: React.FC<TransactionsLoaderProps> = ({
  accountNum,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    // Determine the active page based on the current path
    if (pathname.includes('analytics')) {
      setActivePage('analytics')
    } else if (pathname.includes('chat')) {
      setActivePage('chat')
    } else {
      setActivePage('overview')
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="top-0 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center">
        <button
          className="md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </div>
      <div className="flex-grow flex justify-center">
        <nav
          className={`fixed inset-0 top-16 flex flex-col items-center justify-center gap-6 bg-white text-lg font-medium transition-transform transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:relative md:flex-row md:bg-transparent md:translate-x-0 md:top-0 md:gap-5 md:text-sm lg:gap-6`}
        >
          <a
            className={`${
              activePage === 'overview'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } transition-colors hover:text-foreground`}
            href={`/dashboard?accountNum=${accountNum}`}
          >
            Overview
          </a>
          <a
            className={`${
              activePage === 'analytics'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } transition-colors hover:text-foreground`}
            href={`/dashboard/analytics?accountNum=${accountNum}`}
          >
            Analytics
          </a>
          <Link
            className={`${
              activePage === 'chat'
                ? 'text-foreground'
                : 'text-muted-foreground'
            } transition-colors hover:text-foreground`}
            href={`/dashboard/chat?accountNum=${accountNum}`}
          >
            Advisor
          </Link>
        </nav>
      </div>
      <div className="hidden md:block">
        {/* Placeholder for alignment purposes */}
      </div>
    </header>
  )
}
