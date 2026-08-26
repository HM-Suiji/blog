'use client'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Navbar } from '@heroui-pro/react'

import { siteConfig } from '@/config/site'

import { BrandLogo } from '../icons'

import { ThemeSwitcher } from './../theme-switcher'
import { SearchCommand } from './search'
import { SearchProvider } from './search-provider'

export const Header: React.FC = () => {
  const pathname = usePathname()

  return (
    <Navbar
      position="static"
      hideOnScroll
      shouldBlockScroll={false}
      style={{ viewTransitionName: 'site-header' }}
    >
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
          <SearchProvider>
            <SearchCommand />
          </SearchProvider>
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
