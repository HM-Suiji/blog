import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'

import { RSSButton } from '@/components/feature-button'
import { PostCard } from '@/components/posts/post-card'
import { findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'

export const generateMetadata = async (): Promise<Metadata> => {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()
  return {
    title: '博客列表',
    description: `分享一些技术文章与个人简介，欢迎大家交流。博客列表：${posts
      .map(post => post.title)
      .slice(0, 5)
      .join('、')}`,
  }
}

export default async function PostsPage() {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()
  return (
    <div className="min-h-screen w-full flex flex-col pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">博客列表</h1>
        <RSSButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 border md:border-l mt-4 gap-2 p-2">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
