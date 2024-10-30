'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'
import Image from 'next/image'
import { sendGTMEvent } from '@next/third-parties/google'

const lexend = Lexend({ subsets: ['latin'] })

const StemEducation: React.FC = () => {
  const features = [
    { icon: '🔬', title: 'Future-Ready Skills', description: 'Coding is a fundamental literacy in the digital age, preparing kids for the jobs of tomorrow.' },
    { icon: '🧩', title: 'Problem-Solving Prowess', description: 'Coding teaches kids to think logically and solve complex problems, skills that apply to all areas of life.' },
    { icon: '🎨', title: 'Creativity Unleashed', description: 'Building games allows kids to express their creativity in new, exciting ways, fostering innovation.' },
  ]

  return (
    <section className={`${lexend.className} bg-[#F3F4F6] py-16`}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-6 md:mb-12 text-gray-800"
        >
          Why Coding Matters for Pre-Teens
        </motion.h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-2xl text-gray-600"
            >
              In a world driven by technology, coding isn&apos;t just essential; it&apos;s a game changer. Our game-building platform empowers pre-teens to create their own games and dive into coding while developing valuable digital skills. It&apos;s not just about enjoyment; it&apos;s about equipping them with the STEM skills they&apos;ll need to thrive in the future.
            </motion.p>
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="flex items-start"
                  onClick={() => sendGTMEvent({ event: 'stem_feature_click', feature: feature.title })}
                >
                  <span className="text-4xl mr-4 text-vibrant-purple" role="img" aria-hidden="true">{feature.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-electric-blue">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full md:w-1/2 flex justify-end"
          >
            <div className="relative w-full md:w-[90%] h-[400px]">
              <Image
                src="/children-coding.jpg"
                alt="Children excited about coding"
                fill
                className="rounded-lg shadow-lg object-cover"
                onClick={() => sendGTMEvent({ event: 'image_click', image: 'children_coding' })}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StemEducation