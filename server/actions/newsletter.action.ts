'use server'

import { z } from 'zod'

import { resend } from '@/server/email/resend'
import { logger } from '@/utils/logger'

const subscribeSchema = z.object({
  email: z.email(),
})

export async function subscribeNewsletter(formData: FormData) {
  const result = subscribeSchema.safeParse({
    email: formData.get('email'),
  })

  if (!result.success) {
    return {
      success: false,
      message: '请输入正确的邮箱地址',
    }
  }

  const email = result.data.email

  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,

    segments: [
      {
        id: process.env.RESEND_BLOG_SEGMENT_ID!,
      },
    ],

    topics: [
      {
        id: process.env.RESEND_BLOG_TOPIC_ID!,
        subscription: 'opt_in',
      },
    ],
  })

  if (error) {
    logger.error(error, 'Newsletter subscription failed:')

    return {
      success: false,
      message: '订阅失败，请稍后再试',
    }
  }

  return {
    success: true,
    message: '订阅成功！',
  }
}
