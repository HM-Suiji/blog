import dayjs from 'dayjs'

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
  publishedAt: dayjs(post.publishedAt).format('YYYY-MM-DD'),
  slug: post.slug,
  title: post.title,
  updatedAt: dayjs(post.updatedAt).format('YYYY-MM-DD'),
  tags: post.tags,
  hash: post.hash || '',
})
