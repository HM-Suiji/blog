'use server'

import { updateTag } from 'next/cache'

import { cacheSelector } from '@/utils/cache'

import {
  createFriend,
  deleteFriendById,
  updateFriend,
} from '../db/query/friend.query'
import { InsertFriend } from '../db/schema'
import { friendNotificationEmail } from '../email/notifications/friend'

export const deleteFriend = async (id: string) => {
  await deleteFriendById(id)
  updateTag(cacheSelector.friends)
}

export const registerFriend = async (friend: InsertFriend) => {
  await createFriend(friend)
  void friendNotificationEmail(friend)
}

export const updateFriendInfo = async (
  id: string,
  friend: Partial<InsertFriend>
) => {
  await updateFriend(id, friend)
  updateTag(cacheSelector.friends)
}
