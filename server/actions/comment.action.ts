'use server'
import { commentLimiter } from '@/utils/rate-limit'

import { toCommentDto } from '../db/dto/comment.dto'
import { createComment, getCommentsByPostId } from '../db/query/comment.query'
import { InsertComment } from '../db/schema'

export const publishComment = async (comment: InsertComment) => {
  const { success } = await commentLimiter.limit(comment.userId)

  if (!success) {
    throw new Error('评论过于频繁，请稍后再试')
  }

  await createComment(comment)
}

export const findComments = async (postId: string) => {
  const comments = (await getCommentsByPostId(postId)).filter(
    comment => comment.status === 'approved'
  )
  return comments.map(toCommentDto)
}
