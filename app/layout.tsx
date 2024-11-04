import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PennyWise',
  description: 'AI Powered Budgeting Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Start of the HTML document
    <html lang="en">
      {/* Set the body class to apply the Inter font */}
      <body className={inter.className}>
        {/* Include the Header component */}
        <Header />

        {/* Render the child components within the layout */}
        {children}

        {/* Include the Footer component */}
        <Footer />
      </body>
    </html>
    // End of the HTML document
  )
}
