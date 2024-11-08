'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lexend } from 'next/font/google'
import { sendGTMEvent } from '@next/third-parties/google'
import Link from 'next/link'

const lexend = Lexend({ subsets: ['latin'] })

const Features: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const features = [
    { icon: '🎮', title: 'Level Up Your Screen Time!', description: 'Game-making made easy! Kids dive into game creation, solve puzzles, and tackle coding challenges with tutorials that keep them hooked and learning.' },
    { icon: '🌍', title: 'A Digital-Only Adventure', description: 'No piles of boxes like other subscriptions! Fresh coding adventures arrive monthly in your inbox - all the fun, none of the clutter, and perfect for curious minds.' },
    { icon: '🚀', title: 'Skills for Tomorrow', description: 'Get ahead with coding skills! Kids spark curiosity and build problem-solving superpowers by learning JavaScript - the language of the web - giving them a head start on skills they will use in the future.' },
  ]

  return (
    <section className={`${lexend.className} bg-[#F3F4F6] pt-16 pb-24 relative`}>
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#F3F4F6]"></path>
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#F3F4F6]"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Meet Code Crusaders: Game Coding Adventures for Kids
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Looking for a gift that won&apos;t just get shoved under the bed? 🎁 Code Crusaders is a brilliant way to keep kids happily entertained on-screen while picking up valuable skills! No boxes to pile up, no mess – just hours of creative, educational fun that makes coding accessible and exciting. Perfect for grandparents, aunts, uncles, or anyone looking for a gift that really stands out for pre-teens! 🎉
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
              onClick={() => 
                sendGTMEvent({ event: 'feature_click', feature: feature.title })
              }
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-xl mb-6 text-gray-800">Ready to start the adventure? Sign up for your free coding tutorial!</p>
          <button 
            className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:opacity-90 transition-opacity duration-200 shadow-lg"
            onClick={() => {
              setIsModalOpen(true)
              sendGTMEvent({ event: 'cta_click', action: 'get_started' })
            }}
          >
            Get Free Tutorial
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
        setSubmitMessage('Thank you for your interest! We\'ll be in touch soon with your free tutorial.')
        sendGTMEvent({ event: 'form_submission', formType: 'modal_signup' })
        if (typeof window.trackFBEvent !== 'undefined') {
          window.trackFBEvent('CompleteRegistration', { content_name: 'Modal Email Signup' });
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white rounded-lg p-8 max-w-md w-full m-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className={`${lexend.className} text-2xl font-bold mb-4 text-gray-800 pr-8`}>Get Your Free Game Coding Tutorial</h2>
        <p className={`${lexend.className} mb-6 text-gray-600`}>
          Sign up now to receive a free game coding tutorial and unlock a world of creativity for your child. Perfect for parents looking to introduce their kids to the exciting world of coding!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full p-2 border rounded text-gray-800 border-[#4C9AFF]" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <div className="flex items-start space-x-3">
            <div className="relative flex items-center h-6 w-6">
              <input 
                type="checkbox" 
                id="marketing_consent_modal" 
                className="appearance-none h-6 w-6 border-2 border-[#4C9AFF] rounded-md checked:bg-[#4C9AFF] checked:border-transparent focus:outline-none cursor-pointer transition-all duration-200 ease-in-out"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                required 
              />
              <svg className="absolute w-4 h-4 pointer-events-none text-white left-1 top-1" viewBox="0 0 20 20" fill="currentColor" style={{ display: marketingConsent ? 'block' : 'none' }}>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <label htmlFor="marketing_consent_modal" className={`${lexend.className} text-sm text-gray-600`}>
              I consent to receive marketing emails. See our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </label>
          </div>
          <div className="flex items-start space-x-3">
            <div className="relative flex items-center h-6 w-6">
              <input 
                type="checkbox" 
                id="terms_consent_modal" 
                className="appearance-none h-6 w-6 border-2 border-[#4C9AFF] rounded-md checked:bg-[#4C9AFF] checked:border-transparent focus:outline-none cursor-pointer transition-all duration-200 ease-in-out"
                checked={termsConsent}
                onChange={(e) => setTermsConsent(e.target.checked)}
                required 
              />
              <svg className="absolute w-4 h-4 pointer-events-none text-white left-1 top-1" viewBox="0 0 20 20" fill="currentColor" style={{ display: termsConsent ? 'block' : 'none' }}>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <label htmlFor="terms_consent_modal" className={`${lexend.className} text-sm text-gray-600`}>
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
    </motion.div>
  )
}

export default Features