'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Navbar } from '@heroui-pro/react'
import { Kbd, Modal, SearchField } from '@heroui/react'

import { siteConfig } from '@/config/site'

import { BrandLogo } from '../icons'
import { SearchInput, SearchResults } from '../search'

import { ThemeSwitcher } from './../theme-switcher'

export const Header: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const abortController = new AbortController()

    document.addEventListener(
      'keydown',
      event => {
        if (event.key === 'k' && event.ctrlKey) {
          event.preventDefault()
          setIsOpen(true)
        }
      },
      { signal: abortController.signal }
    )

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <Navbar position="static" hideOnScroll shouldBlockScroll={false}>
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
            onClick={() => setIsOpen(true)}
          >
            <SearchField.Group className="h-8">
              <SearchField.SearchIcon />
              <SearchField.Input className="w-16" placeholder="搜索内容" />
              <Kbd className="pointer-events-none mr-1.5 text-xs">
                <Kbd.Abbr keyValue="ctrl" />
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
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger />
              <Modal.Header className="mt-2">
                <Modal.Heading className="px-6">
                  <SearchInput />
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <SearchResults />
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </Navbar>
  )
}
