'use client'

import React from 'react'
import { GettingStartedSection } from './components/sections/GettingStartedSection'
import { HTMLSetupSection } from './components/sections/HTMLSetupSection'
import { GameGridSection } from './components/sections/GameGridSection'
import { HighlightingCellsSection } from './components/sections/HighlightingCellsSection'
import { SequencesSection } from './components/sections/SequencesSection'
import { PlayerInteractionSection } from './components/sections/PlayerInteractionSection'
import { CongratulationsSection } from './components/sections/CongratulationsSection'

export function MemoryMazeTutorial() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-400 to-blue-500">
      <div className="flex-grow p-4 md:p-8"> {/* Reduced padding on mobile */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-yellow-300 p-4 md:p-8"> {/* Reduced padding on mobile */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-2 md:mb-4">
              🧠 Memory Maze Game Tutorial 🎮
            </h1>
            <p className="text-lg md:text-xl text-center text-purple-600">
              Let's build an awesome memory game together!
            </p>
          </div>
          
          <div className="p-6 md:p-12 space-y-16 md:space-y-32"> {/* Adjusted spacing and padding for mobile */}
            <GettingStartedSection id="getting-started" />
            <HTMLSetupSection id="html-setup" />
            <GameGridSection id="game-grid" />
            <HighlightingCellsSection id="highlighting-cells" />
            <SequencesSection id="sequences" />
            <PlayerInteractionSection id="player-interaction" />
            <CongratulationsSection id="congratulations" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryMazeTutorial