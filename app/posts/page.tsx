import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'

import { findPosts } from '@/server/actions/post'
import { cacheSelector } from '@/utils/cache'

export default async function PostsPage() {
  'use cache'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()
  return (
    <div className="w-full flex flex-col">
      PostsPage
      {posts.map(post => (
        <Link href={`/posts/${post.slug}`} key={post.slug}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}
