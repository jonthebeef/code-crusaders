'use client'

import { sendGTMEvent } from '@next/third-parties/google'

export function trackSubscription() {
  sendGTMEvent({ event: 'subscription_click' })
}

export function trackTutorialStart() {
  sendGTMEvent({ event: 'tutorial_start' })
}

// Add more tracking functions as needed

export function trackFormSubmission(formType: string) {
  sendGTMEvent({ event: 'form_submission', type: formType })
}

export function trackButtonClick(buttonType: string) {
  sendGTMEvent({ event: 'button_click', type: buttonType })
}