import './globals.css'
import './styles/WaveDivider.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code Crusaders',
  description: 'Epic Coding Adventures for 9-11 year olds',
  openGraph: {
    title: 'Code Crusaders - Fun Coding for Kids',
    description: 'Epic coding adventures for 9-11 year olds. Learn JavaScript through fun game-building tutorials!',
    url: 'https://codecrusaders.co.uk',
    siteName: 'Code Crusaders',
    images: [
      {
        url: 'https://codecrusaders.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Crusaders - Fun Coding for Kids',
    description: 'Epic coding adventures for 9-11 year olds. Learn JavaScript through fun game-building tutorials!',
    site: '@jonthebeef',
    images: ['https://codecrusaders.co.uk/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-301YNBBL7R" />
    </html>
  )
}