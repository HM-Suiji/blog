import { algoliasearch } from 'algoliasearch'

import { getPosts } from '@/server/db/query/post.query'
import { getPost } from '@/utils/get-post'

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_WRITE_KEY!
)

const posts = await getPosts()
const postsWithContent = await Promise.all(
  posts.map(async post => ({
    ...post,
    ...(await getPost(post.slug)),
  }))
)

await client.saveObjects({
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,

  objects: postsWithContent.map(post => ({
    objectID: `post-${post.slug}`,
    title: post.title,
    content: post.content.slice(0, 2500),
    description: post.description.slice(0, 200),
    tags: post.tags,
    url: `/posts/${post.slug}`,
    headings: post.headings.map(({ text, depth }) => ({ text, level: depth })),
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
  })),
})
