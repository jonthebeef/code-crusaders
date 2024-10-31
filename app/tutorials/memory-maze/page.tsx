import { Metadata } from 'next'
import { default as MemoryMazeTutorial } from './tutorial'

export const metadata: Metadata = {
  title: 'Memory Maze Tutorial | Code Crusaders',
  description: 'Learn how to build an awesome memory game with our step-by-step tutorial!',
}

export default function Page() {
  return <MemoryMazeTutorial />
}