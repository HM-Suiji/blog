import { revalidateTag } from 'next/cache'

import { cacheSelector } from '@/utils/cache'
import { logger } from '@/utils/logger'
import { webhookLimiter } from '@/utils/rate-limit'
import { syncPosts } from '@/utils/sync-posts'

export async function POST(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.PAGESCMS_WEBHOOK_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { success } = await webhookLimiter.limit('sync-posts')

  if (!success) {
    return Response.json(
      {
        error: 'Too many requests',
      },
      {
        status: 429,
      }
    )
  }

  const actions = await syncPosts()

  logger.debug(actions, 'pagescms webhook actions')

  if (actions.length === 0)
    return Response.json({
      success: true,
      message: 'no content changed',
    })

  revalidateTag(cacheSelector.posts, 'max')
  logger.info(`revalidate ${actions.length} posts`)

  actions.forEach(action => {
    revalidateTag(cacheSelector.post(action.slug), 'max')
    logger.info(`revalidate post: ${action.slug}, because ${action.type}`)
  })

  return Response.json({
    success: true,
    message: `revalidated ${actions.length} posts`,
    actions,
  })
}
