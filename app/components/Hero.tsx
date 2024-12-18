'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'
import Link from 'next/link'

const lexend = Lexend({ subsets: ['latin'] })

export default function Hero({ trackFormSubmission }: { trackFormSubmission: (formType: string) => void }) {
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [termsConsent, setTermsConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    if (!marketingConsent || !termsConsent) {
      setSubmitMessage('Please agree to the privacy policy and terms and conditions.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, marketingConsent, termsConsent }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Thank you for your interest! We\'ll be in touch soon.')
        trackFormSubmission('hero_email')
        if (typeof window.trackFBEvent !== 'undefined') {
          window.trackFBEvent('CompleteRegistration', { content_name: 'Hero Email Signup' });
        }
        setEmail('')
        setMarketingConsent(false)
        setTermsConsent(false)
      } else {
        setSubmitMessage(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      console.error('Fetch Error:', error)
      setSubmitMessage('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="home" className="relative bg-gradient-to-br from-[#9B51E0] via-[#4C9AFF] to-[#27AE60] text-white">
      <div className="container mx-auto px-4 pt-10 pb-16 sm:pt-20 sm:pb-32">
        <div className="flex flex-col lg:flex-row items-stretch lg:justify-between">
          <div className="lg:w-1/2 xl:w-[45%] mb-4 lg:mb-0 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${lexend.className} text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
            >
              Turn Screen Time into Dream Time! 👀
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${lexend.className} text-lg sm:text-xl lg:text-2xl font-semibold mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
            >
              Sign up now, and we'll send you a free game tutorial. 
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${lexend.className} text-base sm:text-lg mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
            >
              Engage your 9-11 year old with game making tutorials that spark creativity and keeps them absorbed for up to 2 hours. Ideal for introducing them to making for the web – a fun, safe way to explore the basics of coding by building something they love to play!
            </motion.p>
          </div>
          <div className="lg:w-1/2 xl:w-[45%] flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#F2F2F2] text-[#333333] p-6 sm:p-8 rounded-lg border-4 border-[#333333] w-full max-w-md"
            >
              <h3 className={`${lexend.className} text-xl sm:text-2xl font-bold mb-4`}>
                <span className="bg-gradient-to-r from-[#9B51E0] to-[#F2994A] bg-clip-text text-transparent">
                  Sign up, and get a FREE game coding tutorial
                </span>
                <span className="text-[#333333]"> 🎉</span>
              </h3>
              <p className={`${lexend.className} mb-4 font-bold`}>A perfect weekend activity to keep the kids quiet, plus:</p>
              <ul className={`${lexend.className} list-disc list-inside mb-6`}>
                <li><strong>10% Discount</strong> on annual subscriptions </li>
                <li><strong>Be the First to Know</strong> about our launch!</li>
                <li><strong>Amazing gift idea</strong> - nothing to throw away</li>
              </ul>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full p-2 border rounded text-[#333333] border-[#4C9AFF]" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <div className="flex items-start space-x-3">
                  <div className="relative flex items-center h-6 w-6">
                    <input 
                      type="checkbox" 
                      id="marketing_consent" 
                      className="appearance-none h-6 w-6 border-2 border-[#4C9AFF] rounded-md checked:bg-[#4C9AFF] checked:border-transparent focus:outline-none cursor-pointer transition-all duration-200 ease-in-out"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      required 
                    />
                    <svg className="absolute w-4 h-4 pointer-events-none text-white left-1 top-1" viewBox="0 0 20 20" fill="currentColor" style={{ display: marketingConsent ? 'block' : 'none' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <label htmlFor="marketing_consent" className={`${lexend.className} text-sm flex-1`}>
                    I consent to receive marketing emails. See our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="relative flex items-center h-6 w-6">
                    <input 
                      type="checkbox" 
                      id="terms_consent" 
                      className="appearance-none h-6 w-6 border-2 border-[#4C9AFF] rounded-md checked:bg-[#4C9AFF] checked:border-transparent focus:outline-none cursor-pointer transition-all duration-200 ease-in-out"
                      checked={termsConsent}
                      onChange={(e) => setTermsConsent(e.target.checked)}
                      required 
                    />
                    <svg className="absolute w-4 h-4 pointer-events-none text-white left-1 top-1" viewBox="0 0 20 20" fill="currentColor" style={{ display: termsConsent ? 'block' : 'none' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <label htmlFor="terms_consent" className={`${lexend.className} text-sm flex-1`}>
                    I agree to the <Link href="/terms-and-conditions" className="text-blue-600 hover:underline">Terms and Conditions</Link>.
                  </label>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`${lexend.className} w-full bg-[#F2C94C] text-[#333333] font-bold py-2 px-4 rounded hover:bg-[#F2994A] hover:text-white transition-colors duration-300`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Tutorial'}
                </motion.button>
                {submitMessage && (
                  <p className={`${lexend.className} text-sm ${submitMessage.includes('error') ? 'text-red-500' : 'text-green-500'}`} role="alert">
                    {submitMessage}
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[120px] overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full h-auto" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            d="M0,120 
               C30,119,60,118,90,114
               C120,110,150,103,180,98
               C210,93,240,90,270,92
               C300,94,330,101,360,105
               C390,109,420,110,450,108
               C480,106,510,101,540,97
               C570,93,600,90,630,92
               C660,94,690,101,720,105
               C750,109,780,110,810,108
               C840,106,870,101,900,97
               C930,93,960,90,990,92
               C1020,94,1050,101,1080,105
               C1110,109,1140,110,1170,108
               C1200,106,1230,101,1260,97
               C1290,93,1320,90,1350,92
               C1380,94,1410,101,1440,105
               L1440,120 L0,120 Z" 
            fill="#F3F4F6"
          />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F3F4F6]"></div>
      </div>
    </section>
  )
}