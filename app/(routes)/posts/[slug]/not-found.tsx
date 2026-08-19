import { ArrowLeft } from 'lucide-react'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'

import { Button } from '@heroui/react'

import { findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'

export default async function PostNotFound() {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')

  const posts = await findPosts()

  return (
    <div className="flex flex-col h-[80vh] w-full justify-center items-center gap-4">
      <h1 className="text-2xl">未找到当前这条博客，请检查路径是否正确</h1>
      <Link href={'/posts'} className="flex flex-row gap-2 mt-6">
        <Button variant="secondary">
          <ArrowLeft />
          博客列表
        </Button>
      </Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
