'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => copyToClipboard(code)}
        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter language={language} style={tomorrow}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}