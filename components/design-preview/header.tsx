'use client'

import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@heroui/react'

const destinations = [
  { href: '/design-preview', title: '首页' },
  { href: '/design-preview/article', title: '文章' },
  { href: '/design-preview/cherry-studio', title: '项目' },
] as const

export function ObservatoryHeader() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <header className="obs-header">
      <div className="obs-container obs-header-inner">
        <Link
          href="/design-preview"
          className="obs-brand"
          aria-label="穗积的宇宙船，返回样板首页"
        >
          <span className="obs-brand-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M16 5 19.2 12.8 27 16l-7.8 3.2L16 27l-3.2-7.8L5 16l7.8-3.2Z"
                fill="currentColor"
              />
              <circle cx="25" cy="7" r="2" fill="currentColor" opacity=".65" />
            </svg>
          </span>
          <span>
            <strong>穗积</strong>
            <span className="obs-brand-subtitle">的宇宙船</span>
          </span>
        </Link>
        <nav aria-label="设计样板导航" className="obs-nav">
          {destinations.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.title}
            </Link>
          ))}
          <Link href="/about">关于</Link>
        </nav>
        <div className="obs-header-actions">
          <Button
            variant="ghost"
            isIconOnly
            className="obs-theme-button"
            aria-label="切换深浅主题"
            onPress={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <Sun className="obs-sun" aria-hidden="true" size={18} />
            <Moon className="obs-moon" aria-hidden="true" size={18} />
          </Button>
          <a
            className="obs-github"
            href="https://github.com/HM-Suiji"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
