'use client'

import { sendGTMEvent } from '@next/third-parties/google'
import { Button } from '@/components/ui/button'

export function SubscriptionButton() {
  return (
    <Button
      onClick={() => sendGTMEvent({ event: 'subscription_click', category: 'engagement', label: '10% off subscription' })}
    >
      Get 10% Off Subscription
    </Button>
  )
}

export function TutorialStartButton() {
  return (
    <Button
      onClick={() => sendGTMEvent({ event: 'tutorial_start', category: 'learning', label: 'Free Game-Building Tutorial' })}
    >
      Start Free Tutorial
    </Button>
  )
}

export function GameDemoButton() {
  return (
    <Button
      onClick={() => sendGTMEvent({ event: 'demo_start', category: 'engagement', label: 'Game Demo' })}
    >
      Try Game Demo
    </Button>
  )
}

// You can create similar components for other trackable events