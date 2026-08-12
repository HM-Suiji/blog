'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import {
  COOKIE_CONSENT_VERSION,
  DEFAULT_COOKIE_CONSENT,
  COOKIE_CONSENT_STORAGE_KEY,
  type CookieConsent,
  type OptionalCookieConsent,
} from '@/config/cookie-consent'

type CookieConsentState = {
  consent: CookieConsent | null

  acceptAll: () => void

  rejectOptional: () => void

  saveConsent: (consent: OptionalCookieConsent) => void

  resetConsent: () => void
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    set => ({
      consent: null,

      acceptAll: () => {
        set({
          consent: {
            necessary: true,
            analytics: true,
            marketing: true,
          },
        })
      },

      rejectOptional: () => {
        set({
          consent: {
            ...DEFAULT_COOKIE_CONSENT,
          },
        })
      },

      saveConsent: consent => {
        set({
          consent: {
            necessary: true,
            ...consent,
          },
        })
      },

      resetConsent: () => {
        set({
          consent: null,
        })
      },
    }),
    {
      name: COOKIE_CONSENT_STORAGE_KEY,

      version: COOKIE_CONSENT_VERSION,

      storage: createJSONStorage(() => localStorage),
    }
  )
)
