import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@heroui/react'

import { RSSButton } from '@/components/feature-button'
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
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <Card className="h-auto md:h-36 w-full items-stretch flex-col md:flex-row">
              <div className="md:relative my-auto w-24 h-16 shrink-0 overflow-hidden rounded-2xl hidden md:block">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={96}
                  height={64}
                />
              </div>
              <div className="flex flex-1 flex-col min-w-0 p-2 md:p-0">
                <div>
                  <span className="text-xs text-muted">{post.publishedAt}</span>
                </div>
                <Card.Header className="my-auto">{post.title}</Card.Header>
                <Card.Description className="line-clamp-2 md:line-clamp-3 my-auto">
                  {post.description}
                </Card.Description>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
