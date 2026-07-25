import { Friend } from '@/types/friend'

import { SelectFriend } from '../schema'

export const toFriendDto = (friend: SelectFriend): Friend => ({
  id: friend.id,
  name: friend.name,
  description: friend.description ?? '',
  avatar: friend.avatar ?? '',
  link: friend.link,
  createdAt: friend.createdAt.toISOString(),
  updatedAt: friend.updatedAt.toISOString(),
  category: friend.category,
  status: friend.status,
})
