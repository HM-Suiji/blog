import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'

import { findPostBySlug, findPosts } from '@/server/actions/post'
import { cacheSelector } from '@/utils/cache'

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

  if (!post || !post.public) {
    notFound()
  }

  const { default: Post } = await import(`@/content/posts/${slug}.mdx`)

  return (
    <section className="">
      <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg w-full max-w-6xl">
        <Post />
      </div>
    </section>
  )
}
