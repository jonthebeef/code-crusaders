import './globals.css'
import './styles/WaveDivider.css'
import { Inter, Fira_Code } from 'next/font/google'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import CookieNotice from './components/cookie-notice'

const inter = Inter({ subsets: ['latin'] })
const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code'
})

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
    <html lang="en" className={`${firaCode.variable}`}>
      <head>
        <Script id="mailchimp-init" strategy="afterInteractive">
          {`
            window.enableMailchimp = function() {
              if (typeof window.loadMailchimp === 'function') {
                window.loadMailchimp();
              }
            };
          `}
        </Script>
        <Script id="ga-custom-events" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Custom event for tutorial page views
            if (window.location.pathname.includes('/memory-maze-tutorial')) {
              gtag('event', 'tutorial_view', {
                'tutorial_name': 'Memory Maze'
              });
            }

            // Function to track tutorial progress
            window.trackTutorialProgress = function(sectionName) {
              gtag('event', 'tutorial_progress', {
                'tutorial_name': 'Memory Maze',
                'section_name': sectionName
              });
            };
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <CookieNotice />
        <GoogleAnalytics gaId="G-301YNBBL7R" />
      </body>
    </html>
  )
}