'use client'

import React, { useEffect } from 'react'
import { GettingStartedSection } from './components/sections/GettingStartedSection'
import { HTMLSetupSection } from './components/sections/HTMLSetupSection'
import { GameGridSection } from './components/sections/GameGridSection'
import { HighlightingCellsSection } from './components/sections/HighlightingCellsSection'
import { SequencesSection } from './components/sections/SequencesSection'
import { PlayerInteractionSection } from './components/sections/PlayerInteractionSection'
import { CongratulationsSection } from './components/sections/CongratulationsSection'
import { useAnalytics } from '../../hooks/useAnalytics'

export function MemoryMazeTutorial() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent('view', 'Tutorial Started')
  }, [trackEvent])

  const handleFeedbackClick = () => {
    trackEvent('click', 'Feedback Form')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-400 to-blue-500">
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-yellow-300 p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-2 md:mb-4">
              🧠 Memory Maze Game Tutorial 🎮
            </h1>
            <p className="text-lg md:text-xl text-center text-purple-600">
              Let's build an awesome memory game together!
            </p>
          </div>
          
          <div className="p-6 md:p-12 space-y-16 md:space-y-32">
            <GettingStartedSection id="getting-started" onView={() => trackEvent('view', 'Getting Started')} />
            <HTMLSetupSection id="html-setup" onView={() => trackEvent('view', 'HTML Setup')} />
            <GameGridSection id="game-grid" onView={() => trackEvent('view', 'Game Grid')} />
            <HighlightingCellsSection id="highlighting-cells" onView={() => trackEvent('view', 'Highlighting Cells')} />
            <SequencesSection id="sequences" onView={() => trackEvent('view', 'Sequences')} />
            <PlayerInteractionSection id="player-interaction" onView={() => trackEvent('view', 'Player Interaction')} />
            <CongratulationsSection id="congratulations" onView={() => trackEvent('view', 'Congratulations')} />
            
            {/* Feedback Section */}
            <section className="bg-purple-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                We'd Love Your Feedback! 💭
              </h2>
              <p className="text-lg text-purple-700 mb-6">
                How was your experience with this tutorial? Your feedback helps us make our tutorials even better!
              </p>
              <a 
                href="https://forms.gle/BkPr3DAXpiantKi48"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-200"
                onClick={handleFeedbackClick}
              >
                Share Your Thoughts 📝
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryMazeTutorial