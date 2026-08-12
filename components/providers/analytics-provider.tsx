'use client'

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import { useCookieConsentStore } from '@/stores/cookie-consent.store'

export const AnalyticsProvider: React.FC = () => {
  const analytics = useCookieConsentStore(
    state => state.consent?.analytics ?? false
  )

  if (!analytics) {
    return null
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      )}

      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
        />
      )}

      <Analytics />

      <SpeedInsights />

      {process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
        <Script
          type="text/javascript"
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({
            token: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN,
          })}
        />
      )}
    </>
  )
}
