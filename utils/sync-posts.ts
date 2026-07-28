import crypto from 'node:crypto'

import { glob } from 'fast-glob'

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '@/server/db/query/post.query'
import { getPost } from '@/utils/get-post'

export const syncPosts = async () => {
  const files = await glob('content/posts/*.mdx')

  const db_posts_map = new Map(
    (await getPosts()).map(post => [
      post.slug,
      { id: post.id, hash: post.hash, public: post.public },
    ])
  )
  const actions: {
    type: 'create' | 'update' | 'delete' | 'available-change'
    slug: string
  }[] = []
  const files_slug: string[] = []
  for (const file of files) {
    const slug = file.replace('content/posts/', '').replace('.mdx', '')
    files_slug.push(slug)

    const { source, frontmatter } = await getPost(slug)
    const hash = crypto.createHash('sha256').update(source).digest('hex')

    if (!db_posts_map.get(slug)) {
      // create post
      await createPost({
        title: frontmatter.title,
        tags: frontmatter.tags,
        slug,
        author: frontmatter.author,
        contentPath: file,
        hash,
        description: frontmatter.description,
        cover: frontmatter.cover,
        public: frontmatter.public,
        publishedAt: frontmatter.date,
        pin: frontmatter.pin,
      })
      if (frontmatter.public) {
        actions.push({
          type: 'create',
          slug,
        })
      }
      continue
    }

    if (db_posts_map.get(slug) && db_posts_map.get(slug)!.hash !== hash) {
      const flag = db_posts_map.get(slug)!.public !== frontmatter.public
      // update post
      await updatePost(db_posts_map.get(slug)!.id, {
        title: frontmatter.title,
        tags: frontmatter.tags,
        slug,
        author: frontmatter.author,
        contentPath: file,
        hash,
        description: frontmatter.description,
        cover: frontmatter.cover,
        public: frontmatter.public,
        publishedAt: frontmatter.date,
        pin: frontmatter.pin,
      })

      if (flag) {
        actions.push({
          type: 'available-change',
          slug,
        })
      } else {
        actions.push({
          type: 'update',
          slug,
        })
      }
      continue
    }
  }

  for (const [slug, { id }] of db_posts_map) {
    if (!files_slug.includes(slug)) {
      // delete post
      await deletePost(id)
      actions.push({
        type: 'delete',
        slug,
      })
    }
  }

  return actions
}
