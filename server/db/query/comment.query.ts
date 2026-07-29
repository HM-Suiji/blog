import { eq } from 'drizzle-orm'

import { db } from '..'
import { commentsTable, InsertComment } from '../schema'

export const createComment = async (comment: InsertComment) => {
  await db.insert(commentsTable).values(comment)
}

export const getCommentsByPostId = async (postId: string) => {
  const comments = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.postId, postId))

  return comments
}
