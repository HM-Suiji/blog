import { siteConfig } from '@/config/site'
import { Post } from '@/types/post'

import { resend } from '../resend'
import { BlogUpdateEmail } from '../templates/blog'

export async function sendBlogUpdate(post: Post) {
  const { data, error } = await resend.broadcasts.create({
    segmentId: process.env.RESEND_BLOG_SEGMENT_ID!,

    from: `${siteConfig.name} <${process.env.MAIL_FROM!}>`,

    subject: `新文章：${post.title}`,

    react: (
      <BlogUpdateEmail
        title={post.title}
        description={post.description}
        cover={post.cover}
        url={`${siteConfig.url}/posts/${post.slug}`}
      />
    ),

    send: true,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
