import { FriendsTable } from '@/components/dashboard/friends-table'
import { getAllFriends } from '@/server/db/query/friend.query'

export default async function FriendsPage() {
  const friends = await getAllFriends()

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">友链管理</h1>
      <FriendsTable friends={friends} />
    </>
  )
}

export const instant = false
