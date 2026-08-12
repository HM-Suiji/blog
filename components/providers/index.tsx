'use client'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { Toast } from '@heroui/react'

import { CookieConsentProvider } from '@/components/cookie-consent/cookie-provider'
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider'

import { AnalyticsProvider } from './analytics-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Toast.Provider placement="top" />
        <CookieConsentProvider />
        <AnalyticsProvider />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </NextThemesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
