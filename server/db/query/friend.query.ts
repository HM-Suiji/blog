import { eq } from 'drizzle-orm'

import { db } from '..'
import { toFriendDto } from '../dto/friend.dto'
import { friendsTable, InsertFriend } from '../schema/friend'

export const getAllFriends = async () => {
  const friends = await db.select().from(friendsTable)
  return friends.map(toFriendDto)
}

export const getFriends = async () => {
  const approved_friends = await db
    .select()
    .from(friendsTable)
    .where(eq(friendsTable.status, 'active'))
  return approved_friends.map(toFriendDto)
}

export const getFriendById = async (id: string) => {
  const friend = await db
    .select()
    .from(friendsTable)
    .where(eq(friendsTable.id, id))
  if (friend.length === 0 || friend[0].status !== 'active') return null
  return toFriendDto(friend[0])
}

export const createFriend = async (friend: InsertFriend) => {
  await db.insert(friendsTable).values(friend)
}

export const updateFriend = async (
  id: string,
  friend: Partial<InsertFriend>
) => {
  await db.update(friendsTable).set(friend).where(eq(friendsTable.id, id))
}

export const deleteFriendById = async (id: string) => {
  await db.delete(friendsTable).where(eq(friendsTable.id, id))
}
