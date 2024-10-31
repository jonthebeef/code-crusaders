'use client'

import React from 'react'
import { GettingStartedSection } from './components/sections/GettingStartedSection'
import { HTMLSetupSection } from './components/sections/HTMLSetupSection'
import { GameGridSection } from './components/sections/GameGridSection'
import { HighlightingCellsSection } from './components/sections/HighlightingCellsSection'
import { SequencesSection } from './components/sections/SequencesSection'
import { PlayerInteractionSection } from './components/sections/PlayerInteractionSection'
import { CongratulationsSection } from './components/sections/CongratulationsSection'

export default function MemoryMazeTutorial() {
  const trackEvent = (action: string, label: string) => {
    if (typeof window !== 'undefined' && typeof (window as Window).gtag === 'function') {
      (window as Window).gtag('event', action, {
        event_category: 'Tutorial',
        event_label: label
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-200 p-4 md:p-8 rounded-xl mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 flex items-center gap-2">
            🧠 Memory Maze
          </h1>
          <p className="text-xl md:text-2xl text-purple-700 mt-2">
            Let's build an awesome memory game!
          </p>
        </div>

        <div className="space-y-16">
          <GettingStartedSection id="getting-started" onView={() => trackEvent('view', 'Getting Started')} />
          <HTMLSetupSection id="html-setup" onView={() => trackEvent('view', 'HTML Setup')} />
          <GameGridSection id="game-grid" onView={() => trackEvent('view', 'Game Grid')} />
          <HighlightingCellsSection id="highlighting-cells" onView={() => trackEvent('view', 'Highlighting Cells')} />
          <SequencesSection id="sequences" onView={() => trackEvent('view', 'Sequences')} />
          <PlayerInteractionSection id="player-interaction" onView={() => trackEvent('view', 'Player Interaction')} />
          <CongratulationsSection id="congratulations" onView={() => trackEvent('view', 'Congratulations')} />
          
          {/* Feedback Section */}
          <section className="bg-purple-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">How did we do? 📝</h2>
            <p className="text-lg text-purple-700 mb-6">
              We'd love to hear your feedback on this tutorial! Please take a moment to fill out our quick survey.
            </p>
            <a 
              href="https://forms.gle/your-form-url" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Give Feedback
            </a>
          </section>
        </div>
      </main>
    </div>
  )
}