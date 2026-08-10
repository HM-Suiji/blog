import { Suspense } from 'react'

import { ArrowLeft } from 'lucide-react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Chip, Separator } from '@heroui/react'

import { CommentsContainer } from '@/components/comments'
import { PostSidebar } from '@/components/posts/sidebar'
import { siteConfig } from '@/config/site'
import { components } from '@/mdx-components'
import { findPostBySlug, findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'
import { getPost } from '@/utils/get-post'

export const generateMetadata = async ({
  params,
}: PageProps<'/posts/[slug]'>) => {
  'use cache'
  const { slug } = await params

  cacheTag(cacheSelector.post(slug))
  cacheLife('weeks')

  const post = await findPostBySlug(slug)

  if (!post || !post.public) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    keywords: [siteConfig.name, ...post.tags],
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export const generateStaticParams = async () => {
  'use cache'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export default async function PostSlugPage({
  params,
}: PageProps<'/posts/[slug]'>) {
  'use cache'
  const { slug } = await params

  cacheTag(cacheSelector.post(slug))
  cacheLife('weeks')

  const post = await findPostBySlug(slug)

  if (!post || !post.public) notFound()

  const { frontmatter, headings, readingTime, content } = await getPost(slug)

  if (!frontmatter.public) notFound()

  const { content: MDXContent } = await compileMDX({
    source: content,
    components,
  })

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 my-8">
      <div className="col-span-full lg:col-span-3 flex flex-col">
        <Link href={'/posts'} className="h-full border flex px-4 py-2 gap-2">
          <ArrowLeft />
          返回博客列表
        </Link>
        <div className="mt-2 flex gap-2 flex-wrap">
          {frontmatter.tags.map(tag => (
            <Chip color="accent" key={tag}>
              {tag}
            </Chip>
          ))}
          <Chip>{readingTime} 分钟</Chip>
          {frontmatter.pin && <Chip color="success">置顶</Chip>}
        </div>
        <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-foreground text-muted prose-strong:text-foreground prose-blockquote:text-foreground prose-h1:text-3xl md:prose-h1:text-5xl prose-h2:text-2xl md:prose-h2:text-4xl prose-h3:text-xl md:prose-h3:text-3xl prose-h4:text-lg md:prose-h4:text-2xl prose-h5:text-base md:prose-h5:text-xl prose-h6:text-sm md:prose-h6:text-lg w-full max-w-6xl">
          {MDXContent}
        </div>
        <Separator className="my-8" />
        <Suspense
          fallback={<div className="w-full p-4 border">加载评论中...</div>}
        >
          <CommentsContainer postId={post.id} postName={post.title} />
        </Suspense>
      </div>
      <div className="relative hidden lg:block">
        <div className="border p-2 sticky top-16">
          <h2>博客目录</h2>
          <PostSidebar headings={headings} />
        </div>
      </div>
    </div>
  )
}
