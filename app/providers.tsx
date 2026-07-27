'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { Toast } from '@heroui/react'

import { SearchProvider } from '@/components/search'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SearchProvider>
        <Toast.Provider placement="top" />
        {children}
      </SearchProvider>
    </NextThemesProvider>
  )
}
