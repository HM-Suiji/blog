import { cacheLife, cacheTag } from 'next/cache'

import { cacheSelector } from '@/utils/cache'

import { getFriends } from '../db/query/friend.query'

export const findFriends = async () => {
  'use cache: remote'
  cacheTag(cacheSelector.friends)
  cacheLife('weeks')

  return await getFriends()
}
