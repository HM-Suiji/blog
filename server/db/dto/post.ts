import { Post } from '@/types/post'

import { SelectPost } from '../schema'

export const toPostDto = (post: SelectPost): Post => ({
  id: post.id,
  author: post.author,
  contentPath: post.contentPath,
  cover: post.cover || '',
  description: post.description || '',
  public: post.public,
  pin: post.pin,
  publishedAt: post.publishedAt.toISOString(),
  slug: post.slug,
  title: post.title,
  updatedAt: post.updatedAt.toISOString(),
  tags: post.tags,
})
