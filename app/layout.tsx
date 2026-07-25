import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

import '@/assets/styles/globals.css'
import { Header } from '@/components/layout/header'
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
      <body className="min-h-full flex flex-col relative">
        <Providers>
          <Header />
          <section className="min-h-full mx-auto w-5xl 2xl:w-6xl max-w-5xl 2xl:max-w-6xl">
            {children}
          </section>
        </Providers>
      </body>
    </html>
  )
}
