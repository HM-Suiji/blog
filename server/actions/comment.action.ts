'use server'

import { CommentWithAuthor } from '@/types/comment'
import { getSession } from '@/utils/auth-server'
import { commentLimiter } from '@/utils/rate-limit'

import { toCommentDto } from '../db/dto/comment.dto'
import {
  createComment,
  getCommentById,
  getCommentsByPostId,
} from '../db/query/comment.query'
import { commentNotificationEmail } from '../email/notifications/comment'

import { getRegionByIp } from './ip.action'

export const publishComment = async (
  comment: {
    content: string
    postId: string
    userAgent?: string
    replyToId?: string
  },
  { postName }: { postName: string }
) => {
  const session = await getSession()
  if (!session?.user) {
    throw new Error('请先登录再进行评论')
  }

  const { success } = await commentLimiter.limit(session.user.id)

  if (!success) {
    throw new Error('评论过于频繁，请稍后再试')
  }

  const replyToId = comment.replyToId || undefined
  if (replyToId) {
    const { comments: parent } = await getCommentById(replyToId)
    if (!parent) {
      throw new Error('回复的评论不存在')
    }
    if (parent.postId !== comment.postId) {
      throw new Error('不能跨文章回复')
    }
    if (parent.status !== 'approved') {
      throw new Error('不能回复未通过审核的评论')
    }
  }

  const ip = session.session.ipAddress || undefined

  console.log('publish comment', comment, session.user.id, ip)

  let region = ''
  if (ip) {
    region = await getRegionByIp(ip)
  }

  await createComment({
    content: comment.content,
    postId: comment.postId,
    userAgent: comment.userAgent,
    replyToId,
    userId: session.user.id,
    ip,
    status: 'approved',
    region,
  })

  if (replyToId) {
    console.log('send reply email', replyToId)
    const { comments: replyTo, user } = await getCommentById(replyToId)

    const email = user?.email || ''
    console.log('send reply email', email, user)
    if (replyTo && email) {
      void commentNotificationEmail(
        session.user.name,
        postName,
        comment.content,
        true,
        email
      )
    }
  }

  void commentNotificationEmail(
    session.user.name,
    postName,
    comment.content,
    Boolean(replyToId)
  )
}

export const findComments = async (
  postId: string
): Promise<CommentWithAuthor[]> => {
  const comments = (await getCommentsByPostId(postId)).filter(
    comment => comment.comments.status === 'approved'
  )
  return comments.map(comment => ({
    ...toCommentDto(comment.comments),
    userName: comment.user?.name || '',
    userAvatar: comment.user?.image || '',
  }))
}
