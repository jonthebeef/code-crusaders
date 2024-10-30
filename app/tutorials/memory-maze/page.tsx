import { Metadata } from 'next'
import { MemoryMazeTutorial } from './tutorial'

export const metadata: Metadata = {
  title: 'Memory Maze Tutorial | Code Crusaders',
  description: 'Learn to build a memory game with JavaScript - perfect for young coders aged 9-11!',
}

export default function MemoryMazePage() {
  return <MemoryMazeTutorial />
}