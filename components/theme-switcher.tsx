'use client'

import { useEffect, useState } from 'react'

import { Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Segment } from '@heroui-pro/react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Segment
      className="gap-0"
      defaultSelectedKey="system"
      size="sm"
      selectedKey={theme}
      onSelectionChange={item => setTheme(item as string)}
    >
      <Segment.Item aria-label="Light" className="size-7 px-0" id="light">
        <Sun className="size-3.5" />
      </Segment.Item>
      <Segment.Item aria-label="Dark" className="size-7 px-0" id="dark">
        <Moon className="size-3.5" />
      </Segment.Item>
      <Segment.Item aria-label="System" className="size-7 px-0" id="system">
        <SunMoon />
      </Segment.Item>
    </Segment>
  )
}
