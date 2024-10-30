import React from 'react'

interface InlineCodeProps {
  children: React.ReactNode
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
      {children}
    </code>
  )
}