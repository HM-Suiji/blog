import { ArrowLeft } from 'lucide-react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Chip } from '@heroui/react'

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
    <div className="w-full grid grid-cols-4 gap-4 my-8">
      <div className="col-span-3 flex flex-col">
        <Link href={'/posts'} className="h-full border flex px-4 py-2 gap-2">
          <ArrowLeft />
          返回博客列表
        </Link>
        <div className="mt-2 flex gap-2">
          {frontmatter.tags.map(tag => (
            <Chip color="accent" key={tag}>
              {tag}
            </Chip>
          ))}
          <Chip>{readingTime} 分钟</Chip>
          {frontmatter.pin && <Chip color="success">置顶</Chip>}
        </div>
        <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-foreground text-muted prose-strong:text-foreground prose-blockquote:text-foreground prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg w-full max-w-6xl">
          {MDXContent}
        </div>
      </div>
      <div className="relative">
        <div className="border p-2 sticky top-16">
          <h2>博客目录</h2>
          <ul className="text-muted mt-2">
            {headings.map(heading => (
              <li key={heading.id}>
                <Link href={`#${heading.id}`}>{heading.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
