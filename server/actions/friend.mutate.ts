'use server'

import { revalidateTag } from 'next/cache'

import { cacheSelector } from '@/utils/cache'

import {
  createFriend,
  deleteFriendById,
  updateFriend,
} from '../db/query/friend.query'
import { InsertFriend } from '../db/schema'

export const approveFriend = async (id: string) => {
  await updateFriend(id, { status: 'active' })
  revalidateTag(cacheSelector.friends, 'max')
}

export const deleteFriend = async (id: string) => {
  await deleteFriendById(id)
  revalidateTag(cacheSelector.friends, 'max')
}

export const registerFriend = async (friend: InsertFriend) => {
  await createFriend(friend)
}
