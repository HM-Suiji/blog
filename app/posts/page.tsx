import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'

import { findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'

export const metadata: Metadata = {
  title: '博客列表',
  description: '分享一些技术文章与个人简介，欢迎大家交流',
}

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
