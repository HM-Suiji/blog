'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Navbar } from '@heroui-pro/react'
import { Kbd, SearchField } from '@heroui/react'

import { siteConfig } from '@/config/site'

import { BrandLogo } from '../icons'

import { ThemeSwitcher } from './../theme-switcher'

export const Header: React.FC = () => {
  const pathname = usePathname()
  return (
    <Navbar position="static" shouldBlockScroll={false}>
      <Navbar.Header>
        <Navbar.MenuToggle className="md:hidden" />
        <Navbar.Brand>
          <Link href={'/'}>
            <BrandLogo />
          </Link>
          <span className="sr-only">HeroUI</span>
        </Navbar.Brand>
        <Navbar.Content className="hidden gap-0 md:flex">
          {siteConfig.nav.map(item => (
            <Navbar.Item
              key={item.href}
              className="px-2"
              isCurrent={pathname.startsWith(item.href)}
            >
              <Link href={item.href}>{item.label}</Link>
            </Navbar.Item>
          ))}
        </Navbar.Content>
        <Navbar.Spacer />
        <Navbar.Content className="hidden md:flex">
          <SearchField
            aria-label="Search documentation"
            className="w-50"
            variant="secondary"
          >
            <SearchField.Group className="h-8">
              <SearchField.SearchIcon />
              <SearchField.Input className="w-16" placeholder="Search docs…" />
              <Kbd className="pointer-events-none mr-1.5 text-xs">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>K</Kbd.Content>
              </Kbd>
            </SearchField.Group>
          </SearchField>
          <ThemeSwitcher />
        </Navbar.Content>
      </Navbar.Header>
      <Navbar.Menu>
        {siteConfig.nav.map(item => (
          <Navbar.MenuItem
            key={item.href}
            href={item.href}
            isCurrent={pathname.startsWith(item.href)}
          >
            {item.label}
          </Navbar.MenuItem>
        ))}
      </Navbar.Menu>
    </Navbar>
  )
}
