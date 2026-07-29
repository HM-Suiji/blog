import { Comment } from '@/types/comment'

import { SelectComment } from '../schema'

export const toCommentDto = (comment: SelectComment): Comment => ({
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt.toISOString(),
  updatedAt: comment.updatedAt.toISOString(),
  userId: comment.userId,
  postId: comment.postId,
  replyToId: comment.replyToId || '',
  userAgent: comment.userAgent || '',
  hot: comment.hot,
})
