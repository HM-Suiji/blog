import { revalidateTag } from 'next/cache'

import { cacheSelector } from '@/utils/cache'

export async function POST(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { actions } = (await req.json()) as {
    actions: { type: string; slug: string }[]
  }

  if (actions.length === 0) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'no content update',
    })
  }

  revalidateTag(cacheSelector.posts, 'max')

  for (const action of actions) {
    revalidateTag(cacheSelector.post(action.slug), 'max')
  }

  return Response.json({
    revalidated: true,
    now: Date.now(),
    message: `${actions.length} posts update`,
    actions,
  })
}
