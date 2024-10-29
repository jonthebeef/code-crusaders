'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'
import { sendGTMEvent } from '@next/third-parties/google'

const lexend = Lexend({ subsets: ['latin'] })

const About: React.FC = () => {
  return (
    <section id="about" className="bg-gradient-to-r from-dark-charcoal to-vibrant-purple text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${lexend.className} text-3xl md:text-4xl font-bold mb-8`}
        >
          About Code Crusaders
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg mb-8 max-w-2xl mx-auto"
        >
          Code Crusaders is on a mission to empower the next generation of innovators. We believe that coding is not just a skill, but a superpower that can shape the future. Our engaging, interactive courses are designed to make learning fun and accessible for kids aged 9-11.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#contact"
            className={`${lexend.className} bg-neon-yellow text-dark-charcoal font-bold py-3 px-8 rounded-full hover:bg-deep-orange hover:text-white transition-colors duration-300`}
            onClick={() => sendGTMEvent({ event: 'cta_click', type: 'join_adventure' })}
          >
            Join the Adventure!
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default About