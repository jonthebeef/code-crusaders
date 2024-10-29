'use client'

import { sendGTMEvent } from '@next/third-parties/google'

export function trackButtonClick(buttonType: string) {
  sendGTMEvent({ event: 'button_click', type: buttonType })
}

export function trackGameEvent(eventName: string, eventData?: Record<string, any>) {
  sendGTMEvent({ event: eventName, ...eventData })
}

export function trackFormSubmission(formType: string) {
  sendGTMEvent({ event: 'form_submission', type: formType })
}