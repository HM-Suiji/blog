'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { Toast } from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Toast.Provider placement="top" />
      {children}
    </NextThemesProvider>
  )
}
