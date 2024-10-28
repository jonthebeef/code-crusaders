'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'
import { Code, Zap, Brain } from 'lucide-react'

const lexend = Lexend({ subsets: ['latin'] })

const JavaScriptExplanation: React.FC = () => {
  const features = [
    { icon: Code, title: 'Easy as Pie', description: 'No confusing jargon here! JavaScript is super friendly for coding newbies, making it the perfect starting point for young minds.' },
    { icon: Zap, title: 'Instant Magic', description: 'Watch their eyes light up as their code comes to life right before their eyes! JavaScript provides immediate visual feedback.' },
    { icon: Brain, title: 'Brain Boost', description: "Coding doesn&apos;t just teach tech - it supercharges problem-solving and creativity, essential skills for any future career." },
  ]

  return (
    <section className="bg-gradient-to-br from-electric-blue to-vibrant-purple py-16 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${lexend.className} text-4xl font-bold text-center mb-12`}
        >
          Why JavaScript is the Coolest Language for Kids
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${lexend.className} text-center mb-12 max-w-2xl mx-auto text-lg`}
        >
          At Code Crusaders, we&apos;re all about teaching skills that matter - and JavaScript is the superhero of coding languages! It&apos;s perfect for making awesome, interactive games and so much more!
        </motion.p>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full md:w-72 flex flex-col items-center text-center"
            >
              <feature.icon className="w-12 h-12 mb-4 text-yellow-300" />
              <h3 className={`${lexend.className} text-xl font-semibold mb-4`}>{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default JavaScriptExplanation