import type { Metadata } from 'next'

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

import '@/assets/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono } from 'next/font/google'

import { siteConfig } from '@/config/site'

import { Providers } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    types: {
      'application/rss+xml': siteConfig.url + '/rss.xml',
    },
  },
  applicationName: siteConfig.name,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.links.github,
    },
  ],
  keywords: siteConfig.keywords as unknown as string[],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen h-auto antialiased`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID!} />
      <body className="min-h-full flex flex-col relative">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
        {/* <!-- Cloudflare Web Analytics --> */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${process.env.CLOUDFLARE_ANALYTICS_TOKEN}"}`}
        ></script>
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </html>
  )
}
