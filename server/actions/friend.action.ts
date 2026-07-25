import { cacheLife, cacheTag, revalidateTag } from 'next/cache'

import { cacheSelector } from '@/utils/cache'

import {
  deleteFriendById,
  getAllFriends,
  getFriends,
  updateFriend,
} from '../db/query/friend.query'

/**
 * @description ! 获取所有好友, 包括已删除和未被批准的好友
 */
export const findAllFriends = async () => {
  'use cache'
  cacheTag(cacheSelector.friends)
  cacheLife('weeks')

  return await getAllFriends()
}

export const findFriends = async () => {
  'use cache'
  cacheTag(cacheSelector.friends)
  cacheLife('weeks')

  return await getFriends()
}

export const approveFriend = async (id: string) => {
  await updateFriend(id, { status: 'active' })
  revalidateTag(cacheSelector.friends, 'max')
}

export const deleteFriend = async (id: string) => {
  await deleteFriendById(id)
  revalidateTag(cacheSelector.friends, 'max')
}
