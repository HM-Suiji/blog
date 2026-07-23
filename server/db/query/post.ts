import { eq } from 'drizzle-orm'

import { db } from '..'
import { toPostDto } from '../dto/post'
import {
  InsertPost,
  InsertPostStats,
  postsTable,
  postStatsTable,
} from '../schema'

export const getPostBySlug = async (slug: string) => {
  const post = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.slug, slug))
  return toPostDto(post[0])
}

export const getPosts = async () => {
  const posts = await db.select().from(postsTable)
  return posts.map(toPostDto)
}

export const getPostStats = async (postId: string) => {
  const postStats = await db
    .select()
    .from(postStatsTable)
    .where(eq(postStatsTable.postId, postId))
  return postStats[0]
}

export const getAllPostWithStats = async () => {
  const postsWithStats = (
    await db
      .select({
        post: postsTable,
        stats: postStatsTable,
      })
      .from(postsTable)
      .leftJoin(postStatsTable, eq(postsTable.id, postStatsTable.postId))
  ).map(({ post, stats }) => ({
    ...toPostDto(post),
    stats,
  }))
  return postsWithStats
}

export const createPost = async (post: InsertPost) => {
  await db.insert(postsTable).values(post)
}

export const createPostStats = async (postId: string) => {
  await db.insert(postStatsTable).values({
    postId,
  })
}

export const updatePost = async (id: string, post: Partial<InsertPost>) => {
  await db.update(postsTable).set(post).where(eq(postsTable.id, id))
}

export const updatePostStats = async (
  postId: string,
  stats: Partial<InsertPostStats>
) => {
  await db
    .update(postStatsTable)
    .set(stats)
    .where(eq(postStatsTable.postId, postId))
}

export const deletePost = async (id: string) => {
  await db.delete(postStatsTable).where(eq(postStatsTable.postId, id))
  await db.delete(postsTable).where(eq(postsTable.id, id))
}
