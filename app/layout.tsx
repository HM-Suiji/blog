import type { Metadata } from 'next'

import '@/assets/styles/globals.css'

import { Geist, Geist_Mono } from 'next/font/google'

import { Providers } from '@/components/providers'
import { siteConfig } from '@/config/site'

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
      <body className="min-h-full flex flex-col relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
