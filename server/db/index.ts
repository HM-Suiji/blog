import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { ProxyAgent } from 'undici'

import { authRelations } from './relations'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is required. Set it in .env.local or the environment.'
  )
}

const proxyUrl = process.env.DATABASE_PROXY_URL?.trim()
const client = neon(databaseUrl, {
  fetchOptions: proxyUrl
    ? {
        dispatcher: new ProxyAgent(proxyUrl), // Node.js fetch
        proxy: proxyUrl, // Bun fetch (used by the standalone scripts)
      }
    : undefined,
})

export const db = drizzle({
  client,
  relations: authRelations,
})
