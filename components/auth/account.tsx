'use client'

import { User } from 'lucide-react'

import { Avatar } from '@heroui/react'

import { authClient } from '@/utils/auth-client'

export const AccountAvatar: React.FC = () => {
  const { data: session } = authClient.useSession()
  if (!session?.session) {
    return (
      <Avatar size="sm">
        <Avatar.Fallback>
          <User />
        </Avatar.Fallback>
      </Avatar>
    )
  }
  return (
    <Avatar size="sm" color="success" variant="soft">
      <Avatar.Image src={session.user.image || ''} />
      <Avatar.Fallback className="text-xs font-semibold">
        {session.user.name.charAt(0)}
      </Avatar.Fallback>
    </Avatar>
  )
}
