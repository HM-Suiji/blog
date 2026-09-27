'use client'

import type { Route } from 'next'

import { useEffect, useId, useRef, useState } from 'react'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import { LayoutGroup, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button, Popover } from '@heroui/react'

import { BrandLogo } from '@/components/icons'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { siteConfig } from '@/config/site'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

import styles from './header.module.css'
import { SearchCommand } from './search'
import { SearchProvider } from './search-provider'

const mobileNav = [{ label: '首页', href: '/' }, ...siteConfig.nav]
const previewNav = [
  { label: '首页样板', href: '/design-preview' },
  { label: '文章样板', href: '/design-preview/article' },
  { label: '项目样板', href: '/design-preview/cherry-studio' },
] as const

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
      // Separate thresholds keep the header steady near its resting position.
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

export function Header({ preview = false }: { preview?: boolean }) {
  const pathname = usePathname()
  const isCompact = useCompactHeader()
  const reduceMotion = useReducedMotion()
  const layoutId = useId()
  const brandRef = useRef<HTMLAnchorElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const desktopLinksRef = useRef<HTMLDivElement>(null)
  const desktopThemeRef = useRef<HTMLDivElement>(null)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const currentPage = mobileNav.find(item =>
    isCurrentRoute(pathname, item.href)
  )
  const activeHref = siteConfig.nav.find(item =>
    isCurrentRoute(pathname, item.href)
  )?.href
  const highlightedHref = hoveredHref ?? activeHref
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 430, damping: 36, mass: 0.8 }

  useEffect(() => {
    setMenuOpen(false)
    setHoveredHref(null)
  }, [pathname])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 920px)')
    let focusFrame = 0
    const handleBreakpointChange = () => {
      cancelAnimationFrame(focusFrame)
      const activeElement = document.activeElement
      if (!desktopQuery.matches) {
        const focusWasOnDesktopControl =
          desktopLinksRef.current?.contains(activeElement) ||
          desktopThemeRef.current?.contains(activeElement)

        if (focusWasOnDesktopControl) {
          focusFrame = requestAnimationFrame(() => {
            if (!desktopQuery.matches) {
              menuTriggerRef.current?.focus({ preventScroll: true })
            }
          })
        }
        return
      }

      const focusWasInMenu = menuRef.current?.contains(activeElement)
      setMenuOpen(false)
      // The mobile trigger is hidden at this breakpoint, so restore to the brand.
      if (focusWasInMenu) {
        focusFrame = requestAnimationFrame(() => {
          if (desktopQuery.matches) {
            brandRef.current?.focus({ preventScroll: true })
          }
        })
      }
    }

    desktopQuery.addEventListener('change', handleBreakpointChange)
    return () => {
      desktopQuery.removeEventListener('change', handleBreakpointChange)
      cancelAnimationFrame(focusFrame)
    }
  }, [])

  return (
    <div className={styles.placeholder} data-preview={preview}>
      <motion.header
        layoutRoot
        className={styles.header}
        data-compact={isCompact}
        style={{ viewTransitionName: 'site-header' }}
      >
        <nav
          aria-label="主导航"
          className={styles.nav}
          data-compact={isCompact}
        >
          <Link
            ref={brandRef}
            href={preview ? '/design-preview' : '/'}
            aria-label={`${siteConfig.name}，返回${preview ? '样板' : ''}首页`}
            aria-current={
              pathname === (preview ? '/design-preview' : '/')
                ? 'page'
                : undefined
            }
            className={styles.brand}
            transitionTypes={['nav-tab']}
          >
            <div aria-hidden="true">
              <BrandLogo />
            </div>
            <span className={styles.brandSuffix} aria-hidden="true">
              的宇宙船
            </span>
          </Link>

          <LayoutGroup id={layoutId}>
            <div
              ref={desktopLinksRef}
              className={styles.links}
              onPointerLeave={() => setHoveredHref(null)}
              onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setHoveredHref(null)
              }}
            >
              {siteConfig.nav.map(item => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  aria-current={
                    isCurrentRoute(pathname, item.href) ? 'page' : undefined
                  }
                  className={styles.link}
                  transitionTypes={['nav-tab']}
                  onPointerEnter={event => {
                    if (event.pointerType === 'mouse') setHoveredHref(item.href)
                  }}
                  onFocus={() => setHoveredHref(item.href)}
                >
                  {highlightedHref === item.href && (
                    <motion.span
                      aria-hidden="true"
                      className={styles.linkHighlight}
                      layoutId="navigation-highlight"
                      initial={false}
                      transition={transition}
                    />
                  )}
                  <span className={styles.linkLabel}>{item.label}</span>
                </Link>
              ))}
            </div>
          </LayoutGroup>

          <span className={styles.currentPage}>
            {preview ? '设计样板' : (currentPage?.label ?? '探索')}
          </span>

          <div className={styles.actions}>
            <SearchProvider>
              <SearchCommand triggerClassName={styles.searchTrigger} />
            </SearchProvider>
            <div ref={desktopThemeRef} className={styles.desktopTheme}>
              <ThemeSwitcher />
            </div>
            <Popover isOpen={isMenuOpen} onOpenChange={setMenuOpen}>
              <Button
                ref={menuTriggerRef}
                isIconOnly
                variant="ghost"
                className={styles.menuToggle}
                aria-label={isMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
              >
                <motion.span
                  className={styles.menuIcon}
                  animate={{ rotate: isMenuOpen && !reduceMotion ? 90 : 0 }}
                  transition={transition}
                >
                  {isMenuOpen ? (
                    <X aria-hidden="true" />
                  ) : (
                    <Menu aria-hidden="true" />
                  )}
                </motion.span>
              </Button>
              <Popover.Content
                placement="bottom end"
                offset={12}
                containerPadding={12}
                className={styles.mobileMenu}
              >
                <Popover.Dialog
                  ref={menuRef}
                  aria-label="导航菜单"
                  className={styles.menuDialog}
                >
                  <Popover.Heading className={styles.menuHeading}>
                    探索宇宙船
                  </Popover.Heading>
                  <nav aria-label="移动端导航" className={styles.mobileLinks}>
                    {mobileNav.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.22,
                          delay: reduceMotion ? 0 : index * 0.025,
                        }}
                      >
                        <Link
                          href={item.href as Route}
                          aria-current={
                            isCurrentRoute(pathname, item.href)
                              ? 'page'
                              : undefined
                          }
                          className={styles.mobileLink}
                          transitionTypes={['nav-tab']}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span>{item.label}</span>
                          {isCurrentRoute(pathname, item.href) ? (
                            <span className={styles.currentMarker}>当前</span>
                          ) : (
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4"
                            />
                          )}
                        </Link>
                      </motion.div>
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
      </motion.header>
      {preview && (
        <nav aria-label="设计样板导航" className={styles.previewLinks}>
          {previewNav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
