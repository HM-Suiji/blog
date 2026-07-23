import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'

import { findPostBySlug } from '@/server/actions/post'
import { cacheSelector } from '@/utils/cache'

export default async function PostSlugPage({
  params,
}: PageProps<'/posts/[slug]'>) {
  'use cache'
  const { slug } = await params

  cacheTag(cacheSelector.post(slug))
  cacheLife('weeks')

  const post = await findPostBySlug(slug)

  if (!post || !post.public) {
    notFound()
  }

  const { default: Post } = await import(`@/content/posts/${slug}.mdx`)

  return (
    <>
      <Post />
    </>
  )
}
