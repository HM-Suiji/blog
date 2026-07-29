import dayjs from 'dayjs'

import { Comment } from '@/types/comment'

import { SelectComment } from '../schema'

export const toCommentDto = (comment: SelectComment): Comment => ({
  id: comment.id,
  content: comment.content,
  createdAt: dayjs(comment.createdAt).format('YY-MM-DD HH:mm'),
  updatedAt: comment.updatedAt.toISOString(),
  userId: comment.userId,
  postId: comment.postId,
  replyToId: comment.replyToId || '',
  userAgent: comment.userAgent || '',
  hot: comment.hot,
})
