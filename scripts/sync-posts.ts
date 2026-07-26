import crypto from 'node:crypto'

import { glob } from 'fast-glob'

import { createPost } from '@/server/db/query/post.query'
import { getPost } from '@/utils/get-post'
const files = await glob('content/posts/*.mdx')

for (const file of files) {
  const slug = file.replace('content/posts/', '').replace('.mdx', '')
  const { source, frontmatter } = await getPost(slug)
  const hash = crypto.createHash('sha256').update(source).digest('hex')
  await createPost({
    title: frontmatter.title,
    tags: frontmatter.tags,
    slug,
    author: frontmatter.author,
    contentPath: file,
    hash,
    description: frontmatter.description,
    cover: frontmatter.cover,
  })
}
