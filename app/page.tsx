import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import GameDemo from './components/GameDemo'
import JavaScriptExplanation from './components/JavaScriptExplanation'
import StemEducation from './components/StemEducation'
import About from './components/About'
import Footer from './components/Footer'

const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
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