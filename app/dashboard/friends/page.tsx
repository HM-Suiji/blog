import { cacheLife, cacheTag } from 'next/cache'

import { FriendsTable } from '@/components/dashboard/friends-table'
import { findAllFriends } from '@/server/actions/friend.action'
import { cacheSelector } from '@/utils/cache'

export default async function FriendsPage() {
  'use cache: remote'
  cacheTag(cacheSelector.friends)
  cacheLife('weeks')

  const friends = await findAllFriends()

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">友链管理</h1>
      <FriendsTable friends={friends} />
    </>
  )
}
