'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Press_Start_2P } from 'next/font/google'
import { Twitter, Linkedin, Facebook } from 'lucide-react'
import { trackButtonClick } from './EventTrackers'

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
  height = 30,
  lightColor = '#F3F4F6',
  darkColor = '#000000'
}: TrianglePatternProps) {
  const triangleWidth = 60

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
  const sequenceRef = useRef<number[]>([])
  const playerSequenceRef = useRef<number[]>([])
  const showingSequenceRef = useRef(false)
  const gameActiveRef = useRef(false)
  const lastClickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const GRID_SIZE = 5
  const CELL_SIZE = 60
  const CELL_GAP = 10
  const CANVAS_SIZE = GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * CELL_GAP
  const INITIAL_SEQUENCE_LENGTH = 3
  const SEQUENCE_INCREASE = 1
  const SEQUENCE_SHOW_INTERVAL = 600
  const START_GAME_DELAY = 1000
  const CLICK_HIGHLIGHT_DURATION = 300
  const NEXT_SEQUENCE_DELAY = 1000

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#444'
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const x = j * (CELL_SIZE + CELL_GAP)
        const y = i * (CELL_SIZE + CELL_GAP)
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
      }
    }
  }, [])

  const drawCell = useCallback((ctx: CanvasRenderingContext2D, index: number, active: boolean) => {
    const x = (index % GRID_SIZE) * (CELL_SIZE + CELL_GAP)
    const y = Math.floor(index / GRID_SIZE) * (CELL_SIZE + CELL_GAP)
    if (active) {
      const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE)
      gradient.addColorStop(0, '#FF69B4')
      gradient.addColorStop(1, '#8A2BE2')
      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = '#444'
    }
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
  }, [])

  const generateSequence = useCallback((length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)))
  }, [])

  const showSequence = useCallback(async (ctx: CanvasRenderingContext2D) => {
    showingSequenceRef.current = true
    for (const cell of sequenceRef.current) {
      drawCell(ctx, cell, true)
      await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2))
      drawCell(ctx, cell, false)
      await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_INTERVAL / 2))
    }
    showingSequenceRef.current = false
  }, [drawCell])

  const startNewGame = useCallback(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    sequenceRef.current = generateSequence(INITIAL_SEQUENCE_LENGTH)
    playerSequenceRef.current = []
    setScore(0)
    setGameState('playing')
    gameActiveRef.current = true
    drawGrid(ctx)


    setTimeout(() => {
      showSequence(ctx)
    }, START_GAME_DELAY)
  }, [drawGrid, generateSequence, showSequence])

  const handleClick = useCallback((event: MouseEvent) => {
    if (showingSequenceRef.current || !gameActiveRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const col = Math.floor(x / (CELL_SIZE + CELL_GAP))
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP))
    const index = row * GRID_SIZE + col

    if (col < 0 || col >= GRID_SIZE || row < 0 || row >= GRID_SIZE) return

    playerSequenceRef.current.push(index)
    drawCell(ctx, index, true)

    if (lastClickTimeoutRef.current) {
      clearTimeout(lastClickTimeoutRef.current)
    }

    const isLastClick = playerSequenceRef.current.length === sequenceRef.current.length
    const isCorrect = playerSequenceRef.current[playerSequenceRef.current.length - 1] === sequenceRef.current[playerSequenceRef.current.length - 1]

    if (!isCorrect) {
      gameActiveRef.current = false
      setGameState('gameOver')
      return
    }

    lastClickTimeoutRef.current = setTimeout(() => {
      if (gameActiveRef.current) {
        drawCell(ctx, index, false)
        
        if (isLastClick) {
          setScore(prevScore => prevScore + 1)
          sequenceRef.current.push(generateSequence(SEQUENCE_INCREASE)[0])
          playerSequenceRef.current = []
          
          setTimeout(() => {
            if (gameActiveRef.current) {
              drawGrid(ctx)
              showSequence(ctx)
            }
          }, NEXT_SEQUENCE_DELAY)
        }
      }
    }, CLICK_HIGHLIGHT_DURATION)
  }, [generateSequence, showSequence, drawCell, drawGrid])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.addEventListener('click', handleClick)
    drawGrid(ctx)

    return () => {
      canvas.removeEventListener('click', handleClick)
      if (lastClickTimeoutRef.current) {
        clearTimeout(lastClickTimeoutRef.current)
      }
    }
  }, [drawGrid, handleClick])

  useEffect(() => {
    if (gameState === 'playing') {
      startNewGame()
    }
  }, [gameState, startNewGame])

  const handleStartGame = useCallback(() => {
    setGameState('playing')
    trackButtonClick('start_game')
  }, [])

  const handlePlayAgain = useCallback(() => {
    setGameState('playing')
    trackButtonClick('play_again')
  }, [])

  const shareScore = useCallback((platform: 'twitter' | 'linkedin' | 'facebook') => {
    const message = `I just got ${score} on Memory Maze. A retro fun game pre-teens can build. Get the tutorial at codecrusaders.co.uk #kidcoders #codingforkids #codingisfun`
    const encodedMessage = encodeURIComponent(message)
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://codecrusaders.co.uk')}&summary=${encodedMessage}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://codecrusaders.co.uk')}&quote=${encodedMessage}`
    }
    window.open(urls[platform], '_blank')
    trackButtonClick(`share_score_${platform}`)
  }, [score])

  return (
    <section id="game-demo" className="relative bg-black py-16">
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <TrianglePattern height={30} lightColor="#F3F4F6" darkColor="#000000" />
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
        <div className="w-full max-w-lg mx-auto p-4">
          <h2 className={`text-2xl text-white text-center mb-4 ${pixelFont.className}`}>Memory Maze</h2>
          <div className={`mb-4 text-white text-center ${pixelFont.className}`}>Score: {score}</div>
          <div className="relative" style={{ width: '340px', height: '340px', margin: '0 auto' }}>
            <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>
            {gameState !== 'playing' && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-80">
                {gameState === 'ready' && (
                  <>
                    <h2 className={`text-xl text-white mb-4 ${pixelFont.className}`}>Ready to Play?</h2>
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded ${pixelFont.className}`}
                      onClick={handleStartGame}
                    >
                      Start Game
                    </button>
                  </>
                )}
                {gameState === 'gameOver' && (
                  <>
                    <h2 className={`text-xl text-white mb-4 ${pixelFont.className}`}>Game Over</h2>
                    <p className={`text-white mb-4 ${pixelFont.className}`}>Your score: {score}</p>
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
                      className={`bg-blue-500 text-white px-4 py-2 rounded ${pixelFont.className}`}
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