import { asc, eq } from 'drizzle-orm'

import { db } from '..'
import { commentsTable, InsertComment, user } from '../schema'

export const createComment = async (comment: InsertComment) => {
  await db.insert(commentsTable).values(comment)
}

export const getCommentById = async (id: string) => {
  const comments = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.id, id))
    .leftJoin(user, eq(commentsTable.userId, user.id))

  return comments[0] ?? null
}

export const getCommentsByPostId = async (postId: string) => {
  const comments = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.postId, postId))
    .leftJoin(user, eq(commentsTable.userId, user.id))
    .orderBy(asc(commentsTable.createdAt))

  return comments
}
