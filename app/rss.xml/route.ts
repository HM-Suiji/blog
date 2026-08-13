import { Feed } from 'feed'

import { siteConfig } from '@/config/site'
import { findPosts } from '@/server/actions/post.action'
import { getPost } from '@/utils/get-post'
import { mdxToHtml } from '@/utils/mdx'

export async function GET() {
  const feed = new Feed({
    title: siteConfig.name,
    description: `${siteConfig.description}
    feedId:${process.env.FOLO_FEED_ID}+userId:${process.env.FOLO_USER_ID}
    `,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'zh-CN',
    copyright: siteConfig.copyright,
    updated: new Date(),
    author: {
      name: siteConfig.name,
    },
    image: `${siteConfig.url}/images/avatar.avif`,
  })

  const posts = await findPosts()

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
        image: siteConfig.url + post.cover,
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
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
