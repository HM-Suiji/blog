'use server'

import { commentLimiter } from '@/utils/rate-limit'

import { toCommentDto } from '../db/dto/comment.dto'
import { createComment, getCommentsByPostId } from '../db/query/comment.query'
import { InsertComment } from '../db/schema'
import { commentNotificationEmail } from '../email/notifications/comment'

export const publishComment = async (
  comment: InsertComment,
  { userName, postName }: { userName: string; postName: string }
) => {
  const { success } = await commentLimiter.limit(comment.userId)

  if (!success) {
    throw new Error('评论过于频繁，请稍后再试')
  }

  let region = ''
  if (comment.ip) {
    // TODO: 根据 IP 获取地区
  }

  await createComment({ ...comment, region })

  void commentNotificationEmail(userName, postName, comment.content)
}

export const findComments = async (postId: string) => {
  const comments = (await getCommentsByPostId(postId)).filter(
    comment => comment.comments.status === 'approved'
  )
  return comments.map(comment => ({
    ...toCommentDto(comment.comments),
    userName: comment.user?.name || '',
    userAvatar: comment.user?.image || '',
  }))
}
