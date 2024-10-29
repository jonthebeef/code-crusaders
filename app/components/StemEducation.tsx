'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lexend } from 'next/font/google'
import Image from 'next/image'

const lexend = Lexend({ subsets: ['latin'] })

const StemEducation: React.FC = () => {
  const features = [
    { icon: '🔬', title: 'Future-Ready Skills', description: 'Coding is a fundamental literacy in the digital age, preparing kids for the jobs of tomorrow.' },
    { icon: '🧩', title: 'Problem-Solving Prowess', description: 'Coding teaches kids to think logically and solve complex problems, skills that apply to all areas of life.' },
    { icon: '🎨', title: 'Creativity Unleashed', description: 'Building games allows kids to express their creativity in new, exciting ways, fostering innovation.' },
  ]

  return (
    <section className="bg-[#F3F4F6] py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${lexend.className} text-3xl font-bold text-center mb-6 md:mb-12`}
        >
          STEM Education for Pre-Teens: Why It Matters
        </motion.h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${lexend.className} mb-8 max-w-2xl`}
            >
              In today&apos;s digital world, learning to code is more important than ever. Our game-building for kids program isn&apos;t just about fun (though it&apos;s a big part!). It&apos;s about equipping your pre-teen with valuable STEM skills that will serve them well into the future.
            </motion.p>
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="flex items-start"
                >
                  <span className="text-4xl mr-4 text-vibrant-purple" role="img" aria-hidden="true">{feature.icon}</span>
                  <div>
                    <h3 className={`${lexend.className} text-xl font-semibold mb-2 text-electric-blue`}>{feature.title}</h3>
                    <p>{feature.description}</p>
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
                src="http://jonthebeef.xyz/code-crusaders/images/children-coding.jpg"
                alt="Children excited about coding"
                fill
                className="rounded-lg shadow-lg object-cover"
                onError={(e) => console.error('Error loading image:', e)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StemEducation