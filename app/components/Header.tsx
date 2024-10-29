'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Lexend } from 'next/font/google'
import { sendGTMEvent } from '@next/third-parties/google'

const lexend = Lexend({ subsets: ['latin'] })

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    sendGTMEvent({ event: 'menu_toggle', state: isMenuOpen ? 'closed' : 'opened' })
  }

  const navItems = ['Home', 'Features', 'Game Demo', 'About']

  return (
    <header className="bg-soft-gray text-dark-charcoal shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-5">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/greenlogo.png"
              alt="Code Crusaders Logo"
              width={160}
              height={55}
              className="w-40 h-auto"
              priority
            />
          </Link>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-dark-charcoal hover:text-vibrant-purple">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
          <ul className={`${lexend.className} lg:flex lg:space-x-8 ${isMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 right-0 bg-soft-gray lg:bg-transparent shadow-md lg:shadow-none`}>
            {navItems.map((item) => (
              <li key={item} className="py-2 lg:py-0">
                <Link 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="block px-4 lg:px-0 text-dark-charcoal hover:text-vibrant-purple transition-colors duration-300" 
                  onClick={() => {
                    setIsMenuOpen(false)
                    sendGTMEvent({ event: 'nav_click', item: item.toLowerCase().replace(' ', '_') })
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}