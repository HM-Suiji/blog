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
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen h-auto antialiased`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="GTM-K4SGL4W2" />
      <body className="min-h-full flex flex-col relative">
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId="G-B7S2L4QE99" />
      <Analytics />
      <SpeedInsights />
      {/* <!-- Cloudflare Web Analytics --> */}
      <script
        type="module"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "32f0435273544d08b89ddf93d33ee4ce"}'
      ></script>
    </html>
  )
}
