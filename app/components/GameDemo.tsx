'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Press_Start_2P } from 'next/font/google'
import { Twitter, Linkedin, Facebook } from 'lucide-react'
import { trackButtonClick, trackGameEvent } from './EventTrackers'

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
})

interface TrianglePatternProps {
  height?: number
  lightColor?: string
  darkColor?: string
}

function TrianglePattern({
  height = 60,
  lightColor = '#F3F4F6',
  darkColor = '#000000'
}: TrianglePatternProps) {
  const triangleWidth = height * Math.sqrt(3)  // Doubled the width

  const createTrianglePath = (x: number, isUptooth: boolean) => {
    if (isUptooth) {
      return `M${x},${height} L${x + triangleWidth / 2},0 L${x + triangleWidth},${height} Z`
    } else {
      return `M${x},0 L${x + triangleWidth},0 L${x + triangleWidth / 2},${height} Z`
    }
  }

  return (
    <svg width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <pattern id="trianglePattern" x="0" y="0" width={triangleWidth} height={height} patternUnits="userSpaceOnUse">
          <path d={createTrianglePath(0, false)} fill={lightColor} />
          <path d={createTrianglePath(triangleWidth / 2, true)} fill={darkColor} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill="url(#trianglePattern)" />
    </svg>
  )
}

export default function GameDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameOver'>('ready')
  const [score, setScore] = useState(0)

  const GRID_SIZE = 5;
  const CELL_SIZE = 60;
  const CELL_GAP = 10;
  const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP;
  const INITIAL_SEQUENCE_LENGTH = 3;
  const SEQUENCE_INCREASE = 1;
  const SEQUENCE_SHOW_INTERVAL = 600;
  const START_GAME_DELAY = 1000;

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let sequence: number[] = []
    let playerSequence: number[] = []
    let showingSequence = false
    let lastTouchTime = 0
    const TOUCH_COOLDOWN = 300 // Cooldown period in milliseconds

    function drawGrid() {
      if (!ctx) return
      ctx.fillStyle = '#444'  // Solid dark grey background
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const x = j * (CELL_SIZE + CELL_GAP)
          const y = i * (CELL_SIZE + CELL_GAP)
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
        }
      }
    }

    function drawCell(index: number, active: boolean) {
      if (!ctx) return
      const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP)
      const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP)
      if (active) {
        const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE)
        gradient.addColorStop(0, '#FF69B4')  // Hot Pink
        gradient.addColorStop(1, '#8A2BE2')  // Blue Violet
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = '#444'  // Solid dark grey for inactive cells
      }
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
    }

    function generateSequence(length: number) {
      return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)))
    }

    async function showSequence() {
      showingSequence = true
      for (const cell of sequence) {
        drawCell(cell, true)
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2))
        drawCell(cell, false)
        await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2))
      }
      showingSequence = false
    }

    function startNewGame() {
      sequence = generateSequence(INITIAL_SEQUENCE_LENGTH)
      playerSequence = []
      setScore(0)
      setGameState('playing')
      drawGrid()

      trackGameEvent('game_start')

      setTimeout(() => {
        showSequence()
      }, START_GAME_DELAY)
    }

    function handleInput(x: number, y: number) {
      if (showingSequence || gameState !== 'playing') return

      const col = Math.floor(x / (CELL_SIZE + CELL_GAP))
      const row = Math.floor(y / (CELL_SIZE + CELL_GAP))
      const index = row * GRID_SIZE + col

      if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return

      playerSequence.push(index)
      drawCell(index, true)
      setTimeout(() => drawCell(index, false), 300)

      if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        setGameState('gameOver')
        trackGameEvent('game_over', { score })
        return
      }

      if (playerSequence.length === sequence.length) {
        setScore(prevScore => {
          const newScore = prevScore + 1
          trackGameEvent('level_complete', { level: newScore })
          return newScore
        })
        sequence = [...sequence, ...generateSequence(SEQUENCE_INCREASE)]
        playerSequence = []
        setTimeout(showSequence, 1000)
      }
    }

    function handleClick(event: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      handleInput(x, y)
    }

    function handleTouch(event: TouchEvent) {
      event.preventDefault()
      if (!canvas) return
      const currentTime = new Date().getTime()
      if (currentTime - lastTouchTime < TOUCH_COOLDOWN) return
      lastTouchTime = currentTime

      const rect = canvas.getBoundingClientRect()
      const touch = event.touches[0]
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      handleInput(x, y)
    }

    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('touchstart', handleTouch, { passive: false })
    drawGrid()

    if (gameState === 'playing') {
      startNewGame()
    }

    return () => {
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('touchstart', handleTouch)
    }
  }, [gameState, score])

  const handleStartGame = () => {
    setGameState('playing')
    trackButtonClick('start_game')
  }

  const handlePlayAgain = () => {
    setGameState('playing')
    trackButtonClick('play_again')
  }

  const shareScore = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const message = `I just got ${score} on Memory Maze. A retro fun game pre-teens can build. Get the tutorial at codecrusaders.co.uk #kidcoders #codingforkids #codingisfun`
    const encodedMessage = encodeURIComponent(message)
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://codecrusaders.co.uk')}&summary=${encodedMessage}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://codecrusaders.co.uk')}&quote=${encodedMessage}`
    }
    window.open(urls[platform], '_blank')
    trackButtonClick(`share_score_${platform}`)
  }

  return (
    <section id="game-demo" className="relative bg-black py-16">
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <TrianglePattern height={60} lightColor="#F3F4F6" darkColor="#000000" />
      </div>
      <div className="container mx-auto px-4 pt-24">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl md:text-3xl font-bold text-center mb-12 text-white ${pixelFont.className}`}
        >
          Get your child to build this!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-white mb-4">
            Check out this memory maze game - just one of the cool coding projects for kids your pre-teen could create with Code Crusaders!
          </p>
          <p className="text-white mb-4">
            We teach kids to code games, allowing them to build, tweak, and make it their own. It&apos;s not just a game, it&apos;s a launchpad for their creativity! 🌠
          </p>
        </motion.div>
        <div className={`w-full max-w-lg mx-auto p-4 ${pixelFont.className}`}>
          <h2 className="text-2xl text-white text-center mb-4">Memory Maze</h2>
          <div className="mb-4 text-white text-center">Score: {score}</div>
          <div className="relative" style={{ width: '340px', height: '340px', margin: '0 auto' }}>
            <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
            {gameState !== 'playing' && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-80">
                {gameState === 'ready' && (
                  <>
                    <h2 className="text-xl text-white mb-4">Ready to Play?</h2>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleStartGame}
                    >
                      Start Game
                    </button>
                  </>
                )}
                {gameState === 'gameOver' && (
                  <>
                    <h2 className="text-xl text-white mb-4">Game Over</h2>
                    <p className="text-white mb-4">Your score: {score}</p>
                    <div className="flex justify-center space-x-4 mb-4">
                      <button onClick={() => shareScore('twitter')} className="text-white hover:text-blue-400">
                        <Twitter size={24} />
                      </button>
                      <button onClick={() => shareScore('linkedin')} className="text-white hover:text-blue-600">
                        <Linkedin size={24} />
                      </button>
                      <button onClick={() => shareScore('facebook')} className="text-white hover:text-blue-800">
                        <Facebook size={24} />
                      </button>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handlePlayAgain}
                    >
                      Play Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}