'use client'

import { useState } from 'react'

import { CookieBanner } from './cookie-banner'
import { CookieSettings } from './cookie-settings'

export function CookieConsentProvider() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <CookieBanner onOpenSettings={() => setIsOpen(true)} />
      <CookieSettings isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
