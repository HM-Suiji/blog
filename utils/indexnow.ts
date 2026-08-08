import { siteConfig } from '@/config/site'

import { logger } from './logger'

export async function pingIndexNow(urls: string[]) {
  // Only fire in production so preview deploys never announce staging/preview URLs.
  if (process.env.VERCEL_ENV !== 'production') return

  const payload = {
    host: siteConfig.url.replace('https://', ''),
    key: 'f2a6b8d7dc524ce08a4956fe20d6a7a1',
    keyLocation: `${siteConfig.url}/f2a6b8d7dc524ce08a4956fe20d6a7a1.txt`,
    urlList: urls,
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // 202 Accepted = success. Bing may also return 200 but 202 is the official “I got it.”
    if (res.status === 202) {
      logger.info(urls, 'IndexNow ping accepted for')
    } else {
      logger.warn(`IndexNow ping returned ${res.status}: ${await res.text()}`)
    }
  } catch (error) {
    // Best‑effort — never let a failed ping block a publish.
    logger.error(error, 'IndexNow ping failed')
  }
}
