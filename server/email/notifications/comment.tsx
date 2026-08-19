'use server'

import { resend } from '../resend'
import { CommentEmail } from '../templates/comment'

export const commentNotificationEmail = async (
  username: string,
  postTitle: string,
  content: string,
  isReply = false,
  replyTo?: string
) => {
  await resend.emails.send({
    from: process.env.MAIL_FROM!,

    to: isReply ? replyTo! : process.env.MAIL_TO!,

    subject: `${isReply ? '收到新的回复' : '收到新的评论'} - ${postTitle}`,

    react: (
      <CommentEmail
        username={username}
        content={content}
        postTitle={postTitle}
        isReply={isReply}
      />
    ),
  })
}
