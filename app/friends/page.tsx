import { cacheLife, cacheTag } from 'next/cache'

import { ExploreFriend } from '@/components/feature-button'
import { findFriends } from '@/server/actions/friend.action'
import { cacheSelector } from '@/utils/cache'

export default async function FriendsPage() {
  'use cache'
  cacheTag(cacheSelector.friends)
  cacheLife('weeks')

  const friends = await findFriends()

  return (
    <div className="h-screen w-full flex flex-col pt-12 items-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">友情链接</h1>
        <p className="text-muted">海内存知己，天涯若比邻</p>
        <div className="flex gap-2">
          <div className="flex gap-2">
            已收录<span className="text-accent">{1}</span>位朋友
          </div>
        </div>
      </div>
      <div>
        {friends.map(friend => (
          <ExploreFriend key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  )
}
