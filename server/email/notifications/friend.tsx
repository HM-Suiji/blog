'use server'

import { InsertFriend } from '@/server/db/schema'

import { resend } from '../resend'
import { FriendApplyEmail } from '../templates/friend'

export const friendNotificationEmail = async (friend: InsertFriend) =>
  await resend.emails.send({
    from: process.env.MAIL_FROM!,

    to: process.env.MAIL_TO!,

    subject: '新的友链申请',

    react: <FriendApplyEmail friend={friend} />,
  })
