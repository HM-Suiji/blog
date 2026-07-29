'use server'
import { toCommentDto } from '../db/dto/comment.dto'
import { createComment, getCommentsByPostId } from '../db/query/comment.query'
import { InsertComment } from '../db/schema'

export const publishComment = async (comment: InsertComment) => {
  await createComment(comment)
}

export const findComments = async (postId: string) => {
  const comments = (await getCommentsByPostId(postId)).filter(
    comment => comment.status === 'approved'
  )
  return comments.map(toCommentDto)
}
