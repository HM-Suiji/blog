import Markdown from 'react-markdown'

import { findComments } from '@/server/actions/comment.action'

export const CommentResult: React.FC<{ postId: string }> = async ({
  postId,
}) => {
  const comments = await findComments(postId)
  return (
    <>
      {comments.map(comment => (
        <div key={comment.id} className="p-2 border my-2">
          <Markdown>{comment.content}</Markdown>
        </div>
      ))}
    </>
  )
}
