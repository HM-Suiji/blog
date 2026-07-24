import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

import '@/assets/styles/globals.css'
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
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen h-auto antialiased`}
    >
      <body className="min-h-full flex flex-col mx-auto my-12 max-w-4xl 2xl:max-w-6xl">
        {children}
      </body>
    </html>
  )
}
