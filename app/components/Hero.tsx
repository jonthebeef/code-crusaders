'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'
import { sendGTMEvent } from '@next/third-parties/google'

const lexend = Lexend({ subsets: ['latin'] })

const Hero: React.FC = () => {
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
      console.log('API Response:', data)

      if (response.ok) {
        setSubmitMessage('Thank you for your interest! We\'ll be in touch soon.')
        sendGTMEvent({ event: 'form_submission', type: 'hero_email' })
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
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row items-stretch lg:justify-between">
          <div className="lg:w-1/2 xl:w-[45%] mb-8 lg:mb-0 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${lexend.className} text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
            >
              Epic Coding Adventures for 9-11 year olds this half term!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg mb-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
            >
              Ready to transform screen time into dream time? 💡 With Code Crusaders, your pre-teen will embark on an exciting journey to learn to code for kids through fun coding tutorials. They&apos;ll build their very own games while mastering JavaScript - the superhero language of the web! It&apos;s not just coding, it&apos;s creating their future, one line at a time! 🌟
            </motion.p>
          </div>
          <div className="lg:w-1/2 xl:w-[45%] flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#F2F2F2] text-[#333333] p-6 sm:p-8 rounded-lg border-4 border-[#333333] w-full max-w-md"
            >
              <h3 className={`${lexend.className} text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-[#9B51E0] to-[#F2994A] bg-clip-text text-transparent`}>
                Get a FREE coding tutorial
              </h3>
              <p className={`${lexend.className} mb-4 font-bold`}>Keep the kids engaged for hours this half term, plus:</p>
              <ul className="list-disc list-inside mb-6">
                <li>Limited 10% off on half and full year course subscriptions</li>
                <li>Advance notice of our official launch</li>
              </ul>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Your email for awesome updates!" 
                  className="w-full p-2 border rounded text-[#333333] border-[#4C9AFF]" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="gdpr_consent" 
                    className="mt-1 mr-2" 
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    required 
                  />
                  <label htmlFor="gdpr_consent" className="text-sm">I consent to receive marketing emails and agree to the privacy policy.</label>
                </div>
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="terms_consent" 
                    className="mt-1 mr-2" 
                    checked={termsConsent}
                    onChange={(e) => setTermsConsent(e.target.checked)}
                    required 
                  />
                  <label htmlFor="terms_consent" className="text-sm">I agree to the terms and conditions.</label>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`${lexend.className} w-full bg-[#F2C94C] text-[#333333] font-bold py-2 px-4 rounded hover:bg-[#F2994A] hover:text-white transition-colors duration-300`}
                  onClick={() => sendGTMEvent({ event: 'button_click', type: 'get_free_tutorial' })}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Tutorial'}
                </motion.button>
                {submitMessage && (
                  <p className={`text-sm ${submitMessage.includes('error') ? 'text-red-500' : 'text-green-500'}`} role="alert">
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

export default Hero