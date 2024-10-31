import { useCallback } from 'react'

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        event_category?: string
        event_label?: string
        value?: number
      }
    ) => void
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback((action: string, label: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: 'Tutorial',
        event_label: label,
        value: value
      })
    }
  }, [])

  return { trackEvent }
}