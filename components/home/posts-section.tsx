import { cacheLife, cacheTag } from 'next/cache'

import { findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'

import { PostCard } from '../posts/post-card'

export const PostsSection: React.FC = async () => {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')

  const posts = await findPosts()

  return (
    <div className="flex min-h-screen justify-center items-center flex-col py-12 gap-4">
      <h1 className="text-2xl md:text-4xl">最近的博客</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 border md:border-l mt-4 gap-2 p-2">
        {posts.slice(0, 6).map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
