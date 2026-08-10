import { Suspense } from 'react'

import Link from 'next/link'

import { Badge } from '@heroui/react'

import { DashCard } from '@/components/dashboard/dash-card'
import { findAllFriends } from '@/server/actions/friend.action'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<div>Loading...</div>}>
        <FriendCard />
      </Suspense>
      <DashCard title="Card 2" />
      <DashCard title="Card 3" />
      <DashCard title="Card 4" />
      <DashCard title="Card 5" />
      <DashCard title="Card 6" />
    </div>
  )
}

export const FriendCard: React.FC = async () => {
  const allFriends = await findAllFriends()
  const activeFriends = allFriends.filter(friend => friend.status === 'active')
  const pendingFriends = allFriends.filter(
    friend => friend.status === 'pending'
  )
  return (
    <Link href="/dashboard/friends">
      <DashCard title="友链数量" className="flex flex-row gap-3">
        <div className="flex gap-2 w-24 h-10 items-center justify-center rounded-md bg-surface">
          <span>Active</span>
          <span>{activeFriends.length}</span>
        </div>
        <Badge.Anchor>
          <div className="flex gap-2 w-24 h-10 items-center justify-center rounded-md bg-surface">
            <span>Pending</span>
            <span>{pendingFriends.length}</span>
          </div>
          {pendingFriends.length > 0 && (
            <Badge color="success" size="sm">
              New
            </Badge>
          )}
        </Badge.Anchor>
      </DashCard>
    </Link>
  )
}
