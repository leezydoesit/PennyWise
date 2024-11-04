// components/account-setup-component/waiting-screen.tsx
import React from 'react'

interface WaitingScreenProps {
  statusMessage: string
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({ statusMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-background">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-400 rounded-full animate-spin">
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
          className="w-6 h-6 text-blue"
        >
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
          <path d="M21 3v5h-5"></path>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
          <path d="M8 16H3v5"></path>
        </svg>
      </div>
      <p className="text-lg font-medium text-black">{statusMessage}</p>
    </div>
  )
}

export default WaitingScreen
