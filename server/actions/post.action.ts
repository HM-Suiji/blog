'use server'
import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'

import { cacheSelector } from '@/utils/cache'

import { getPostBySlug, getPosts } from '../db/query/post.query'

export async function findPostBySlug(slug: string) {
  'use cache'
  cacheTag(cacheSelector.post(slug))
  cacheLife('weeks')

  return await getPostBySlug(slug)
}

export async function findPosts() {
  'use cache'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')

  return await getPosts()
}
