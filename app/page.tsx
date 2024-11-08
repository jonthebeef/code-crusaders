'use client'

import React, { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import GameDemo from './components/GameDemo'
import JavaScriptExplanation from './components/JavaScriptExplanation'
import StemEducation from './components/StemEducation'
import About from './components/About'
import Footer from './components/Footer'
import { trackFormSubmission } from './components/EventTrackers'

const Home: React.FC = () => {
  useEffect(() => {
    // Track homepage view
    if (typeof window.trackFBEvent !== 'undefined') {
      window.trackFBEvent('ViewHomepage');
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero trackFormSubmission={trackFormSubmission} />
      <Features />
      <GameDemo />
      <StemEducation />
      <JavaScriptExplanation />
      <About />
      <Footer />
    </main>
  )
}

export default Home