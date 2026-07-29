import { HoverCard } from '@heroui-pro/react'
import { Avatar, Button, Link } from '@heroui/react'

import { Friend } from '@/types/friend'

const CategoryMap: Record<Friend['category'], string> = {
  offline: '已离线',
  tech: '技术博客',
  own: '个人博客',
  other: '其他',
}

export const FriendCanvas: React.FC<{
  friends: Friend[]
}> = ({ friends }) => {
  return (
    <div className="mt-4 md:w-2/3 justify-center">
      <div className="flex justify-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            全部
          </Button>
          {(Object.keys(CategoryMap) as (keyof typeof CategoryMap)[]).map(
            category => (
              <Button key={category} variant="ghost" size="sm">
                {CategoryMap[category]}
              </Button>
            )
          )}
        </div>
      </div>
      <div className="p-4 flex gap-2 relative flex-wrap">
        {friends.map(friend => (
          <HoverCard key={friend.id}>
            <HoverCard.Trigger className="relative">
              <Link href={friend.link} target="_blank">
                <Avatar className="rounded-full">
                  <Avatar.Image src={friend.avatar} alt={friend.name} />
                  <Avatar.Fallback>{friend.name[0]}</Avatar.Fallback>
                </Avatar>
              </Link>
            </HoverCard.Trigger>
            <HoverCard.Content placement="left bottom" className="opacity-75">
              <HoverCard.Arrow />
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <Avatar.Image alt={friend.name} src={friend.avatar} />
                  <Avatar.Fallback>{friend.name[0]}</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-sm font-semibold leading-4">
                    {friend.name}
                  </span>
                  <span className="text-muted text-sm tracking-tight">
                    @{friend.name.replace(' ', '_').toLocaleLowerCase()}
                  </span>
                </div>
              </div>
              <p className="mt-3 pl-px text-sm font-medium">
                {friend.description}
              </p>
            </HoverCard.Content>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}
