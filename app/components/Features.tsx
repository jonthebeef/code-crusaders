'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'
import { sendGTMEvent } from '@next/third-parties/google'
import Link from 'next/link'

const lexend = Lexend({ subsets: ['latin'] })

const Features: React.FC = () => {
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
          <Link 
            href="#signup"
            className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:opacity-90 transition-opacity duration-200 shadow-lg"
            onClick={() => 
              sendGTMEvent({ event: 'cta_click', action: 'get_started' })
            }
          >
            Get Free Tutorial
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Features