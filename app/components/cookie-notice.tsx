"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

type GtagConsentMode = {
  ad_storage: 'granted' | 'denied'
  analytics_storage: 'granted' | 'denied'
  functionality_storage: 'granted' | 'denied'  // for Meta Pixel
}

type CustomWindow = Window & typeof globalThis & {
  gtag: (
    command: string,
    action: string,
    params?: {
      event_category?: string
      event_label?: string
      value?: number
    } | GtagConsentMode
  ) => void
  enableMailchimp?: () => void
  fbq?: (
    action: string,
    event: string,
    params?: Record<string, unknown>
  ) => void  // Add this line for Meta Pixel
}

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted')
    if (!hasAcceptedCookies) {
      setIsVisible(true)
    } else {
      enableCookies()
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsVisible(false)
    enableCookies()
  }

  const enableCookies = () => {
    const customWindow = window as CustomWindow
    if (typeof customWindow.gtag === 'function') {
      const consentMode: GtagConsentMode = {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted'  // Add this line for Meta Pixel
      }
      customWindow.gtag('consent', 'update', consentMode)
    }
    if (typeof customWindow.enableMailchimp === 'function') {
      customWindow.enableMailchimp()
    }
    if (typeof customWindow.fbq === 'function') {
      customWindow.fbq('consent', 'grant')  // Add this line for Meta Pixel
    }
  }

  if (!isMounted || !isVisible) return null

  return (
    <div 
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      className="fixed bottom-4 left-4 right-4 md:max-w-sm md:left-auto md:right-4 z-50 font-lexend"
    >
      <div className="bg-[#333333] text-white shadow-md rounded-2xl overflow-hidden border-2 border-black">
        <div className="p-4 relative">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-2 p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close cookie notice"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="pr-6">
            <h2 
              id="cookie-title"
              className="text-lg font-bold flex items-center gap-2 mb-2"
            >
              <span role="img" aria-label="Cookie">🍪</span>
              Cookie Quest!
            </h2>
            <p 
              id="cookie-description"
              className="text-sm leading-snug mb-3"
            >
              Our magical cookies power up your Code Crusaders experience with analytics, personalization, and social media features. Accept to level up your journey!
            </p>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleAccept}
              className="bg-[#FFD700] text-[#333333] font-bold py-2 px-4 rounded-full text-sm shadow-md transition-all hover:bg-[#FFC000] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#333333]"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}