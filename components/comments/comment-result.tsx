'use client'

import { useQuery } from '@tanstack/react-query'
import Markdown from 'react-markdown'

import { findComments } from '@/server/actions/comment.action'

export const CommentResult: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => findComments(postId),
  })

  if (isLoading) return <div className="text-muted py-4">加载中...</div>

  return (
    <>
      {comments?.map(comment => (
        <div key={comment.id} className="p-2 border my-2">
          <Markdown>{comment.content}</Markdown>
        </div>
      ))}
    </>
  )
}
