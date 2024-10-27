'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Press_Start_2P } from 'next/font/google'
import { Twitter, Linkedin, Facebook } from 'lucide-react'

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
})

const GAME_WIDTH = 900
const GAME_HEIGHT = 640
const TOP_BAR_HEIGHT = 40
const ENEMY_MOVE_INTERVAL = 500
const ENEMY_MOVE_DISTANCE = 15
const BASE_ENEMY_FIRE_INTERVAL = 1000
const LEVEL_TRANSITION_DURATION = 3000
const INITIAL_ENEMY_SPEED = 15
const ENEMY_SPEED_INCREASE = 1
const MAX_ENEMY_SPEED = 30
const BOMBER_SPEED = 150
const BOMB_SPEED = 450
const BOMBER_FIRE_INTERVAL = 2000
const EXPLOSION_DURATION = 1000
const POWER_UP_SPAWN_INTERVAL = 15000
const POWER_UP_DURATION = 10000
const FIRE_COOLDOWN = 250
const FIXED_TIME_STEP = 1000 / 60
const MAX_FRAME_TIME = 250

interface GameObject {
  id: number
  x: number
  y: number
  width: number
  height: number
  active?: boolean
}

interface Enemy extends GameObject {
  type: 'regular' | 'shield'
  health: number
  shieldActive?: boolean
}

interface Bomber extends Enemy {
  dx: number
}

interface Player extends Omit<GameObject, 'id'> {
  dx: number
  powerUp: 'none' | 'doubleBullets'
  powerUpTimer: number
}

interface PowerUp extends GameObject {
  type: 'doubleBullets'
}

interface Explosion {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
}

interface GameState {
  player: Player
  bullets: GameObject[]
  enemyBullets: GameObject[]
  enemies: Enemy[]
  bombers: Bomber[]
  bomberBombs: GameObject[]
  powerUps: PowerUp[]
  score: number
  bonusScore: number
  gameOver: boolean
  totalShots: number
  hitShots: number
  level: number
  enemyBlockDirection: number
  enemySpeed: number
  explosion: Explosion | null
  lastFireTime: number
}

class BulletPool {
  private bullets: GameObject[] = []
  private activeCount = 0

  create(x: number, y: number): GameObject {
    if (this.activeCount < this.bullets.length) {
      const bullet = this.bullets[this.activeCount]
      bullet.x = x
      bullet.y = y
      bullet.active = true
      this.activeCount++
      return bullet
    }
    const newBullet = { id: this.bullets.length, x, y, width: 6, height: 15, active: true }
    this.bullets.push(newBullet)
    this.activeCount++
    return newBullet
  }

  reset() {
    this.bullets.forEach(bullet => bullet.active = false)
    this.activeCount = 0
  }

  getActiveBullets(): GameObject[] {
    return this.bullets.slice(0, this.activeCount)
  }

  deactivateBullet(bullet: GameObject) {
    const index = this.bullets.findIndex(b => b === bullet)
    if (index !== -1 && index < this.activeCount) {
      this.bullets[index].active = false
      this.bullets[index] = this.bullets[this.activeCount - 1]
      this.bullets[this.activeCount - 1] = bullet
      this.activeCount--
    }
  }
}

class EntityManager {
  private positions: Float32Array
  private entities: GameObject[]

  constructor(maxEntities: number) {
    this.positions = new Float32Array(maxEntities * 2)
    this.entities = []
  }

  addEntity(entity: GameObject) {
    const index = this.entities.length
    this.entities.push(entity)
    this.positions[index * 2] = entity.x
    this.positions[index * 2 + 1] = entity.y
  }

  updatePosition(index: number, x: number, y: number) {
    this.positions[index * 2] = x
    this.positions[index * 2 + 1] = y
  }

  getPosition(index: number): [number, number] {
    return [this.positions[index * 2], this.positions[index * 2 + 1]]
  }

  getEntities(): GameObject[] {
    return this.entities
  }

  clear() {
    this.entities = []
    this.positions.fill(0)
  }
}

export default function GameDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [showEndScreen, setShowEndScreen] = useState(false)
  const [showLevelTransition, setShowLevelTransition] = useState(false)
  const [nextLevelNumber, setNextLevelNumber] = useState(1)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  const gameStateRef = useRef<GameState>({
    player: {
      x: GAME_WIDTH / 2 - 30,
      y: GAME_HEIGHT - 50,
      width: 60,
      height: 30,
      dx: 0,
      powerUp: 'none',
      powerUpTimer: 0,
    },
    bullets: [],
    enemyBullets: [],
    enemies: [],
    bombers: [],
    bomberBombs: [],
    powerUps: [],
    score: 0,
    bonusScore: 0,
    gameOver: false,
    totalShots: 0,
    hitShots: 0,
    level: 1,
    enemyBlockDirection: 1,
    enemySpeed: INITIAL_ENEMY_SPEED,
    explosion: null,
    lastFireTime: 0,
  })

  const lastTimeRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const lastEnemyFireTimeRef = useRef(0)
  const lastBomberFireTimeRef = useRef(0)
  const lastEnemyMoveTimeRef = useRef(0)
  const lastPowerUpSpawnTimeRef = useRef(0)
  const enemyIdCounterRef = useRef(0)
  const gameLoopRef = useRef<number | null>(null)
  const explosionStartTimeRef = useRef(0)
  const inputBufferRef = useRef<(() => void)[]>([])
  const accumulatorRef = useRef(0)

  const bulletPoolRef = useRef(new BulletPool())
  const entityManagerRef = useRef(new EntityManager(1000))

  const checkCollision = useCallback((rect1: GameObject, rect2: GameObject) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y
  }, [])

  const createEnemies = useCallback(() => {
    const gameState = gameStateRef.current
    const level = gameState.level
    const columns = 8
    let rows = 3
    if (level >= 3) rows = 4
    if (level >= 5) rows = 5
    if (level >= 7) rows = 6

    const newEnemies: Enemy[] = []
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const isShieldEnemy = level > 3 && Math.random() < (0.3 + (level - 4) * 0.05)
        const enemy: Enemy = {
          id: enemyIdCounterRef.current++,
          x: i * 100 + 50,
          y: j * 60 + 100,
          width: 60,
          height: 45,
          type: isShieldEnemy ? 'shield' : 'regular',
          health: isShieldEnemy ? 2 : 1,
          shieldActive: isShieldEnemy
        }
        newEnemies.push(enemy)
        entityManagerRef.current.addEntity(enemy)
      }
    }
    gameState.enemies = newEnemies
    gameState.enemyBlockDirection = 1

    if (level >= 2) {
      const bomberCount = Math.min(Math.floor((level - 1) / 3) + 1, 3)
      gameState.bombers = []
      for (let i = 0; i < bomberCount; i++) {
        const bomber: Bomber = {
          id: enemyIdCounterRef.current++,
          x: (i + 1) * (GAME_WIDTH / (bomberCount + 1)) - 37.5,
          y: 30,
          width: 75,
          height: 45,
          dx: BOMBER_SPEED * (i % 2 === 0 ? 1 : -1),
          type: 'regular',
          health: 1
        }
        gameState.bombers.push(bomber)
        entityManagerRef.current.addEntity(bomber)
      }
    }
  }, [])

  const calculateBonusScore = useCallback(() => {
    const gameState = gameStateRef.current
    const accuracy = gameState.hitShots / gameState.totalShots
    const bonusScore = Math.floor(accuracy * 1000)
    gameState.bonusScore = bonusScore
  }, [])

  const startExplosion = useCallback(() => {
    const gameState = gameStateRef.current
    const player = gameState.player
    gameState.explosion = {
      x: player.x + player.width / 2,
      y: player.y + player.height / 2,
      radius: 0,
      maxRadius: Math.max(player.width, player.height),
      alpha: 1,
    }
    explosionStartTimeRef.current = performance.now()
  }, [])

  const endGame = useCallback((reason: string) => {
    const gameState = gameStateRef.current
    gameState.gameOver = true
    calculateBonusScore()
    startExplosion()
  }, [calculateBonusScore, startExplosion])

  const nextLevel = useCallback(() => {
    const gameState = gameStateRef.current
    const newLevel = gameState.level + 1
    setNextLevelNumber(newLevel)
    setShowLevelTransition(true)
    
    if (gameLoopRef.current !== null) {
      cancelAnimationFrame(gameLoopRef.current)
      gameLoopRef.current = null
    }

    setTimeout(() => {
      gameStateRef.current = {
        ...gameState,
        level: newLevel,
        bullets: [],
        enemyBullets: [],
        bombers: [],
        bomberBombs: [],
        powerUps: [],
        enemySpeed: Math.min(INITIAL_ENEMY_SPEED + (newLevel - 1) * ENEMY_SPEED_INCREASE, MAX_ENEMY_SPEED),
      }
      bulletPoolRef.current.reset()
      entityManagerRef.current.clear()
      calculateBonusScore()
      setShowLevelTransition(false)
      createEnemies()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }, LEVEL_TRANSITION_DURATION)
  }, [calculateBonusScore, createEnemies])

  const spawnPowerUp = useCallback(() => {
    const gameState = gameStateRef.current
    const powerUp: PowerUp = {
      id: enemyIdCounterRef.current++,
      x: Math.random() * (GAME_WIDTH - 30),
      y: 0,
      width: 30,
      height: 30,
      type: 'doubleBullets',
    }
    gameState.powerUps.push(powerUp)
    entityManagerRef.current.addEntity(powerUp)
  }, [])

  const updateGame = useCallback((deltaTime: number) => {
    const gameState = gameStateRef.current
    const currentTime = performance.now()

    if (gameState.gameOver) {
      if (gameState.explosion) {
        const elapsedTime = currentTime - explosionStartTimeRef.current
        const progress = Math.min(elapsedTime / EXPLOSION_DURATION, 1)
        gameState.explosion.radius = gameState.explosion.maxRadius * progress
        gameState.explosion.alpha = 1 - progress

        if (progress >= 1) {
          gameState.explosion = null
          setShowEndScreen(true)
        }
      }
      return
    }

    if (showLevelTransition) {
      return
    }

    gameState.player.x = 
      Math.max(0, Math.min(gameState.player.x + gameState.player.dx * deltaTime, GAME_WIDTH - gameState.player.width))
    gameState.player.y = GAME_HEIGHT - 50

    if (gameState.player.powerUp !== 'none') {
      gameState.player.powerUpTimer -= deltaTime * 1000
      if (gameState.player.powerUpTimer <= 0) {
        gameState.player.powerUp = 'none'
        gameState.player.powerUpTimer = 0
      }
    }

    const activeBullets = bulletPoolRef.current.getActiveBullets()
    for (let i = activeBullets.length - 1; i >= 0; i--) {
      const bullet = activeBullets[i]
      bullet.y -= 450 * deltaTime
      if (bullet.y <= 0) {
        bulletPoolRef.current.deactivateBullet(bullet)
      }
    }

    if (currentTime - lastEnemyMoveTimeRef.current > ENEMY_MOVE_INTERVAL) {
      let moveDown = false
      const leftmostEnemy = Math.min(...gameState.enemies.map(e => e.x))
      const rightmostEnemy = Math.max(...gameState.enemies.map(e => e.x + e.width))

      if (
        (gameState.enemyBlockDirection > 0 && rightmostEnemy + gameState.enemySpeed > GAME_WIDTH) ||
        (gameState.enemyBlockDirection < 0 && leftmostEnemy - gameState.enemySpeed < 0)
      ) {
        gameState.enemyBlockDirection *= -1
        moveDown = true
      }

      gameState.enemies.forEach((enemy, index) => {
        enemy.x += gameState.enemySpeed * gameState.enemyBlockDirection
        if (moveDown) {
          enemy.y += ENEMY_MOVE_DISTANCE
        }
        entityManagerRef.current.updatePosition(index, enemy.x, enemy.y)
      })

      lastEnemyMoveTimeRef.current = currentTime

      if (gameState.enemies.some(enemy => enemy.y + enemy.height >= gameState.player.y)) {
        endGame('Enemies reached the bottom')
        return
      }
    }

    

    gameState.bombers.forEach((bomber, index) => {
      bomber.x += bomber.dx * deltaTime
      if (bomber.x <= 0 || bomber.x + bomber.width >= GAME_WIDTH) {
        bomber.dx = -bomber.dx
        bomber.x = Math.max(0, Math.min(bomber.x, GAME_WIDTH - bomber.width))
      }
      bomber.y = Math.max(TOP_BAR_HEIGHT, bomber.y)
      entityManagerRef.current.updatePosition(gameState.enemies.length + index, bomber.x, bomber.y)
    })

    if (currentTime - lastBomberFireTimeRef.current > BOMBER_FIRE_INTERVAL && gameState.bombers.length > 0) {
      const bomber = gameState.bombers[Math.floor(Math.random() * gameState.bombers.length)]
      gameState.bomberBombs.push({
        id: enemyIdCounterRef.current++,
        x: bomber.x + bomber.width / 2 - 4,
        y: bomber.y + bomber.height,
        width: 8,
        height: 16
      })
      lastBomberFireTimeRef.current = currentTime
    }

    gameState.bomberBombs = gameState.bomberBombs.filter(bomb => {
      bomb.y += BOMB_SPEED * deltaTime
      return bomb.y < GAME_HEIGHT
    })

    gameState.powerUps = gameState.powerUps.filter(powerUp => {
      powerUp.y += 100 * deltaTime
      return powerUp.y < GAME_HEIGHT
    })

    gameState.enemies = gameState.enemies.filter(enemy => {
      const hitByBullet = activeBullets.find(bullet => checkCollision(bullet, enemy))
      if (hitByBullet) {
        enemy.health--
        if (enemy.health <= 0) {
          gameState.score += enemy.type === 'shield' ? 20 : 10
          gameState.hitShots++
          bulletPoolRef.current.deactivateBullet(hitByBullet)
          return false
        } else {
          enemy.shieldActive = false
          bulletPoolRef.current.deactivateBullet(hitByBullet)
        }
      }
      return true
    })

    gameState.bombers = gameState.bombers.filter(bomber => {
      const hitByBullet = activeBullets.find(bullet => checkCollision(bullet, bomber))
      if (hitByBullet) {
        gameState.score += 50
        gameState.hitShots++
        bulletPoolRef.current.deactivateBullet(hitByBullet)
        return false
      }
      return true
    })

    gameState.powerUps = gameState.powerUps.filter(powerUp => {
      if (checkCollision(powerUp, gameState.player)) {
        gameState.player.powerUp = powerUp.type
        gameState.player.powerUpTimer = POWER_UP_DURATION
        return false
      }
      return true
    })

    if (gameState.enemies.length === 0 && gameState.bombers.length === 0) {
      nextLevel()
      return
    }

    gameState.enemyBullets = gameState.enemyBullets.filter(bullet => {
      bullet.y += 300 * deltaTime
      return bullet.y < GAME_HEIGHT
    })

    const playerHit = gameState.enemyBullets.some(bullet => checkCollision(bullet, gameState.player)) ||
                      gameState.bomberBombs.some(bomb => checkCollision(bomb, gameState.player))

    if (playerHit) {
      endGame('Player hit')
      return
    }

    const enemyFireInterval = BASE_ENEMY_FIRE_INTERVAL / Math.sqrt(gameState.level)
    if (currentTime - lastEnemyFireTimeRef.current > enemyFireInterval && gameState.enemies.length > 0) {
      const randomEnemy = gameState.enemies[Math.floor(Math.random() * gameState.enemies.length)]
      gameState.enemyBullets.push({
        id: enemyIdCounterRef.current++,
        x: randomEnemy.x + randomEnemy.width / 2 - 3,
        y: randomEnemy.y + randomEnemy.height,
        width: 6,
        height: 15
      })
      
      lastEnemyFireTimeRef.current = currentTime
    }

    if (currentTime - lastPowerUpSpawnTimeRef.current > POWER_UP_SPAWN_INTERVAL) {
      spawnPowerUp()
      lastPowerUpSpawnTimeRef.current = currentTime
    }

    if (gameState.level >= 5 && Math.random() < 0.0005 * gameState.level) {
      const shieldEnemies = gameState.enemies.filter(e => e.type === 'shield' && e.shieldActive)
      if (shieldEnemies.length > 0) {
        const pulsingEnemy = shieldEnemies[Math.floor(Math.random() * shieldEnemies.length)]
        gameState.enemies.forEach(enemy => {
          if (enemy.type === 'regular' && 
              Math.abs(enemy.x - pulsingEnemy.x) < 100 && 
              Math.abs(enemy.y - pulsingEnemy.y) < 100) {
            enemy.shieldActive = true
            enemy.health = 2
            setTimeout(() => {
              if (enemy.active) {
                enemy.shieldActive = false
                enemy.health = 1
              }
            }, 5000)
          }
        })
      }
    }
  }, [checkCollision, endGame, nextLevel, showLevelTransition, spawnPowerUp])

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gameState = gameStateRef.current

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    ctx.font = `16px "${pixelFont.style.fontFamily}"`
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    ctx.fillText(`Score: ${gameState.score}`, 10, TOP_BAR_HEIGHT / 2)
    
    ctx.textAlign = 'right'
    ctx.fillText(`Level: ${gameState.level}`, GAME_WIDTH - 10, TOP_BAR_HEIGHT / 2)
    
    if (gameState.player.powerUp !== 'none') {
      ctx.textAlign = 'center'
      ctx.fillStyle = '#ffff00'
      ctx.fillText(`Power-up: ${Math.ceil(gameState.player.powerUpTimer / 1000)}s`, GAME_WIDTH / 2, TOP_BAR_HEIGHT / 2)
    }

    ctx.textAlign = 'left'

    if (!gameState.explosion) {
      ctx.fillStyle = '#00ff00'
      ctx.beginPath()
      ctx.moveTo(gameState.player.x, gameState.player.y + gameState.player.height)
      ctx.lineTo(gameState.player.x + gameState.player.width / 2, gameState.player.y)
      ctx.lineTo(gameState.player.x + gameState.player.width, gameState.player.y + gameState.player.height)
      ctx.closePath()
      ctx.fill()

      if (gameState.player.powerUp !== 'none') {
        ctx.fillStyle = '#ffff00'
        ctx.beginPath()
        ctx.arc(gameState.player.x + gameState.player.width / 2, gameState.player.y - 10, 5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (gameState.explosion) {
      ctx.beginPath()
      ctx.arc(gameState.explosion.x, gameState.explosion.y, gameState.explosion.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 100, 0, ${gameState.explosion.alpha})`
      ctx.fill()
    }

    ctx.fillStyle = '#ffffff'
    bulletPoolRef.current.getActiveBullets().forEach(bullet => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
    })

    ctx.fillStyle = '#ff00ff'
    gameState.enemyBullets.forEach(bullet => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
    })

    ctx.fillStyle = '#ff8c00'
    gameState.bomberBombs.forEach(bomb => {
      ctx.fillRect(bomb.x, bomb.y, bomb.width, bomb.height)
    })

    gameState.enemies.forEach(enemy => {
      if (enemy.type === 'regular') {
        const gradient = ctx.createLinearGradient(enemy.x, enemy.y, enemy.x + enemy.width, enemy.y + enemy.height)
        gradient.addColorStop(0, '#8A2BE2')
        gradient.addColorStop(0.5, '#FF69B4')
        gradient.addColorStop(1, '#1E90FF')
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = enemy.shieldActive ? '#00CED1' : '#20B2AA'
      }
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
      
      ctx.fillStyle = '#000000'
      const detailSize = 12
      ctx.fillRect(enemy.x + detailSize, enemy.y + detailSize, detailSize, detailSize)
      ctx.fillRect(enemy.x + enemy.width - 2*detailSize, enemy.y + detailSize, detailSize, detailSize)
      ctx.fillRect(enemy.x + detailSize, enemy.y + enemy.height - 1.5*detailSize, enemy.width - 2*detailSize, detailSize/2)

      if (enemy.type === 'shield' && enemy.shieldActive) {
        ctx.strokeStyle = 'rgba(32, 178, 170, 0.5)'
        ctx.lineWidth = 3
        ctx.strokeRect(enemy.x - 2, enemy.y - 2, enemy.width + 4, enemy.height + 4)
      }
    })

    gameState.bombers.forEach(bomber => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(bomber.x, bomber.y, bomber.width, bomber.height)
      
      ctx.fillStyle = '#000000'
      ctx.fillRect(bomber.x + 15, bomber.y + 15, 15, 15)
      ctx.fillRect(bomber.x + bomber.width - 30, bomber.y + 15, 15, 15)
      ctx.fillRect(bomber.x + 15, bomber.y + bomber.height - 22, bomber.width - 30, 7)
    })

    ctx.fillStyle = '#00ffff'
    gameState.powerUps.forEach(powerUp => {
      ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height)
      ctx.fillStyle = '#000000'
      ctx.font = `20px "${pixelFont.style.fontFamily}"`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('2x', powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2)
    })
  }, [])

  const gameLoop = useCallback((currentTime: number) => {
    if (currentTime - lastFrameTimeRef.current < 16.67) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
      return
    }
    lastFrameTimeRef.current = currentTime

    const gameState = gameStateRef.current

    if (!lastTimeRef.current) {
      lastTimeRef.current = currentTime
    }

    let deltaTime = (currentTime - lastTimeRef.current) / 1000
    lastTimeRef.current = currentTime

    if (deltaTime > MAX_FRAME_TIME / 1000) {
      deltaTime = MAX_FRAME_TIME / 1000
    }

    if (!gameState.gameOver) {
      accumulatorRef.current += deltaTime * 1000

      while (accumulatorRef.current >= FIXED_TIME_STEP) {
        updateGame(FIXED_TIME_STEP / 1000)
        accumulatorRef.current -= FIXED_TIME_STEP
      }
    } else if (gameState.explosion) {
      updateGame(deltaTime)
    }

    drawGame()

    while (inputBufferRef.current.length > 0) {
      const action = inputBufferRef.current.shift()
      if (action) action()
    }

    if (!gameState.gameOver && !showLevelTransition) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    } else if (gameState.explosion) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    } else {
      setShowEndScreen(true)
    }
  }, [updateGame, drawGame, showLevelTransition])

  const handleFire = useCallback(() => {
    if (!gameStarted || gameStateRef.current.gameOver || showLevelTransition) return

    const currentTime = performance.now()
    if (currentTime - gameStateRef.current.lastFireTime < FIRE_COOLDOWN) {
      return
    }

    const player = gameStateRef.current.player
    const newBullets: GameObject[] = []

    if (player.powerUp === 'doubleBullets') {
      newBullets.push(
        bulletPoolRef.current.create(player.x + 10, player.y),
        bulletPoolRef.current.create(player.x + player.width - 16, player.y)
      )
    } else {
      newBullets.push(bulletPoolRef.current.create(player.x + player.width / 2 - 3, player.y))
    }

    gameStateRef.current.totalShots += newBullets.length
    gameStateRef.current.lastFireTime = currentTime
  }, [gameStarted, showLevelTransition])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current.gameOver) return

      if (e.key === 'ArrowLeft') {
        gameStateRef.current.player.dx = -300
      } else if (e.key === 'ArrowRight') {
        gameStateRef.current.player.dx = 300
      } else if (e.key === ' ') {
        e.preventDefault()
        handleFire()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameStateRef.current.gameOver) return

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        gameStateRef.current.player.dx = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const preventSpacebarScroll = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', preventSpacebarScroll)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keydown', preventSpacebarScroll)
    }
  }, [handleFire])

  useEffect(() => {
    if (gameStarted && !gameStateRef.current.gameOver && !showLevelTransition) {
      if (gameStateRef.current.enemies.length === 0 && gameStateRef.current.bombers.length === 0) {
        createEnemies()
      }
      if (gameLoopRef.current === null) {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      }
    }

    return () => {
      if (gameLoopRef.current !== null) {
        cancelAnimationFrame(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [gameStarted, showLevelTransition, createEnemies, gameLoop])

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobileOrTablet(window.innerWidth < 1024)
    }

    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)

    return () => {
      window.removeEventListener('resize', checkDeviceType)
    }
  }, [])

  const totalScore = gameStateRef.current.score + gameStateRef.current.bonusScore
  const shareMessage = `I just played a brilliant space invaders game and scored ${totalScore}. Can you beat it? Visit codecrusaders.co.uk`
  const encodedShareMessage = encodeURIComponent(shareMessage)
  const encodedUrl = encodeURIComponent('https://codecrusaders.co.uk')

  if (isMobileOrTablet) {
    return null
  }

  return (
    <section id="game-demo" className="relative bg-black py-16">
      <div className="absolute top-0 left-0 w-full h-[120px] overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-auto" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            d="M0,0 
               C30,1,60,2,90,6
               C120,10,150,17,180,22
               C210,27,240,30,270,28
               C300,26,330,19,360,15
               C390,11,420,10,450,12
               C480,14,510,19,540,23
               C570,27,600,30,630,28
               C660,26,690,19,720,15
               C750,11,780,10,810,12
               C840,14,870,19,900,23
               C930,27,960,30,990,28
               C1020,26,1050,19,1080,15
               C1110,11,1140,10,1170,12
               C1200,14,1230,19,1260,23
               C1290,27,1320,30,1350,28
               C1380,26,1410,19,1440,15
               L1440,0 L0,0 Z" 
            fill="#F3F4F6"
          />
        </svg>
      </div>
      <div className="container mx-auto px-4 pt-24">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl md:text-3xl font-bold text-center mb-12 text-white ${pixelFont.className}`}
        >
          Your Kid Could Build This!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-white mb-4">
            Check out this space invaders game - just one of the cool coding projects for kids your pre-teen could create with Code Crusaders!
          </p>
          <p className="text-white mb-4">
            We teach kids to code games, allowing them to build, tweak, and make it their own. It's not just a game, it's a launchpad for their creativity! 🌠
          </p>
          <p className="text-white font-bold">
            Use arrow keys to move and spacebar to shoot!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-[900px] mx-auto relative"
        >
          <canvas 
            ref={canvasRef} 
            className="bg-black cursor-crosshair" 
            onMouseDown={handleFire}
            onMouseMove={(e) => {
              if (e.buttons === 1) handleFire()
            }}
            aria-label="Space Invaders game area. Use arrow keys to move and spacebar to shoot."
          />
          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <button
                onClick={() => setGameStarted(true)}
                className={`px-6 py-3 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600 transition-colors ${pixelFont.className}`}
              >
                Start Game
              </button>
            </div>
          )}
          {showEndScreen && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
              <h3 className={`text-3xl text-white mb-4 ${pixelFont.className}`}>Game Over</h3>
              <p className={`text-xl text-white mb-2 ${pixelFont.className}`}>Score: {gameStateRef.current.score}</p>
              <p className={`text-xl text-white mb-4 ${pixelFont.className}`}>Bonus: {gameStateRef.current.bonusScore}</p>
              <p className={`text-lg text-white mb-4 ${pixelFont.className}`}>Share your score</p>
              <div className="flex space-x-4 mb-6">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedShareMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedShareMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-700 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-600 transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <button
                onClick={() => {
                  gameStateRef.current = {
                    ...gameStateRef.current,
                    player: {
                      ...gameStateRef.current.player,
                      x: GAME_WIDTH / 2 - 30,
                      y: GAME_HEIGHT - 50,
                      dx: 0,
                      powerUp: 'none',
                      powerUpTimer: 0,
                    },
                    bullets: [],
                    enemyBullets: [],
                    enemies: [],
                    bombers: [],
                    bomberBombs: [],
                    powerUps: [],
                    score: 0,
                    bonusScore: 0,
                    gameOver: false,
                    totalShots: 0,
                    hitShots: 0,
                    level: 1,
                    enemyBlockDirection: 1,
                    enemySpeed: INITIAL_ENEMY_SPEED,
                    explosion: null,
                    lastFireTime: 0,
                  }
                  bulletPoolRef.current.reset()
                  entityManagerRef.current.clear()
                  setShowEndScreen(false)
                  createEnemies()
                  gameLoopRef.current = requestAnimationFrame(gameLoop)
                }}
                className={`px-6 py-3 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600 transition-colors ${pixelFont.className}`}
              >
                Play Again
              </button>
            </div>
          )}
          {showLevelTransition && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <h3 className={`text-3xl text-white ${pixelFont.className}`}>
                Level {nextLevelNumber}
              </h3>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}