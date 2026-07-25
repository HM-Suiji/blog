import { Feed } from 'feed'

import { siteConfig } from '@/config/site'
import { getPosts } from '@/server/db/query/post'
import { getPost } from '@/utils/get-post'
import { mdxToHtml } from '@/utils/mdx'

export async function GET() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'zh-CN',
    copyright: `${new Date().getFullYear()} ${siteConfig.name}`,
    updated: new Date(),
    author: {
      name: siteConfig.name,
    },
  })

  const posts = await getPosts()

  const items = await Promise.all(
    posts.map(async post => {
      const { content } = await getPost(post.slug)

      return {
        title: post.title,
        id: `${siteConfig.url}/posts/${post.slug}`,
        link: `${siteConfig.url}/posts/${post.slug}`,
        description: post.description,
        author: [
          {
            name: post.author,
          },
        ],
        date: new Date(post.publishedAt),
        image: post.cover,
        category: post.tags.map(tag => ({
          name: tag,
        })),
        content: await mdxToHtml(content),
      }
    })
  )

  items.forEach(item => {
    feed.addItem(item)
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
