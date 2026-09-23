'use client'

import type { Route } from 'next'

import { useEffect, useState } from 'react'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button, Popover } from '@heroui/react'

import { BrandLogo } from '@/components/icons'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { siteConfig } from '@/config/site'

import styles from './header.module.css'
import { SearchCommand } from './search'
import { SearchProvider } from './search-provider'

const mobileNav = [{ label: '首页', href: '/' }, ...siteConfig.nav]

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
}

function useCompactHeader() {
  const [isCompact, setCompact] = useState(false)

  useEffect(() => {
    let frame = 0
    let compact = false

    const update = () => {
      frame = 0
      // Separate thresholds prevent flickering near the edge of the header.
      const nextCompact = window.scrollY > (compact ? 64 : 96)

      if (nextCompact !== compact) {
        compact = nextCompact
        setCompact(compact)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return isCompact
}

export function Header() {
  const pathname = usePathname()
  const isCompact = useCompactHeader()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const currentPage = mobileNav.find(item =>
    isCurrentRoute(pathname, item.href)
  )

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setMenuOpen(false)
    }

    desktopQuery.addEventListener('change', closeOnDesktop)
    return () => desktopQuery.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <div className={styles.placeholder}>
      <header
        className={styles.header}
        style={{ viewTransitionName: 'site-header' }}
      >
        <nav
          aria-label="主导航"
          className={styles.nav}
          data-compact={isCompact}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name}，返回首页`}
            aria-current={pathname === '/' ? 'page' : undefined}
            className={styles.brand}
            transitionTypes={['nav-tab']}
          >
            <div aria-hidden="true">
              <BrandLogo />
            </div>
          </Link>

          <div className={styles.links}>
            {siteConfig.nav.map(item => (
              <Link
                key={item.href}
                href={item.href as Route}
                aria-current={
                  isCurrentRoute(pathname, item.href) ? 'page' : undefined
                }
                className={styles.link}
                transitionTypes={['nav-tab']}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <span className={styles.currentPage}>
            {currentPage?.label ?? '探索'}
          </span>

          <div className={styles.actions}>
            <SearchProvider>
              <SearchCommand triggerClassName={styles.searchTrigger} />
            </SearchProvider>
            <div className={styles.desktopTheme}>
              <ThemeSwitcher />
            </div>
            <Popover isOpen={isMenuOpen} onOpenChange={setMenuOpen}>
              <Button
                isIconOnly
                variant="ghost"
                className={styles.menuToggle}
                aria-label={isMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
              >
                {isMenuOpen ? (
                  <X aria-hidden="true" />
                ) : (
                  <Menu aria-hidden="true" />
                )}
              </Button>
              <Popover.Content
                placement="bottom end"
                offset={12}
                containerPadding={12}
                className={styles.mobileMenu}
              >
                <Popover.Dialog
                  aria-label="导航菜单"
                  className={styles.menuDialog}
                >
                  <Popover.Heading className={styles.menuHeading}>
                    探索宇宙船
                  </Popover.Heading>
                  <nav aria-label="移动端导航" className={styles.mobileLinks}>
                    {mobileNav.map(item => (
                      <Link
                        key={item.href}
                        href={item.href as Route}
                        aria-current={
                          isCurrentRoute(pathname, item.href)
                            ? 'page'
                            : undefined
                        }
                        className={styles.mobileLink}
                        transitionTypes={['nav-tab']}
                        onNavigate={() => setMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                        {isCurrentRoute(pathname, item.href) ? (
                          <span className={styles.currentMarker}>当前</span>
                        ) : (
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        )}
                      </Link>
                    ))}
                  </nav>
                  <div className={styles.mobileTheme}>
                    <span>外观</span>
                    <ThemeSwitcher />
                  </div>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          </div>
        </nav>
      </header>
    </div>
  )
}
