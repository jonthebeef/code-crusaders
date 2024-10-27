'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'] })

const Features: React.FC = () => {
  const features = [
    { icon: '🎁', title: '10% Off Kids Coding Subscription', description: 'Score a sweet discount on our annual plans - the gift that keeps on giving (and coding)!' },
    { icon: '🎮', title: 'Free Game-Building Tutorial', description: 'Keep the kids happily busy (and learning) with our awesome hands-on coding project!' },
    { icon: '🚀', title: 'First to Know', description: 'Be the coolest parent with insider info on our launch and special offers!' },
  ]

  return (
    <section className="bg-[#F3F4F6] pt-16 pb-24 relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#F3F4F6]"></div>
      <div className="container mx-auto px-4">
        <h2 className={`${lexend.className} text-3xl font-bold text-center mb-12`}>
          <span role="img" aria-label="Trophy">🏆</span> Why Join the Code Crusaders Squad? <span role="img" aria-label="Trophy">🏆</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`${lexend.className} text-xl font-semibold mb-2`}>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features