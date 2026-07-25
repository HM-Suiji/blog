import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const friendsTable = pgTable('friends', {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  name: text().notNull(),
  link: text().notNull().unique(),
  avatar: text(),
  description: text(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  category: text('category', { enum: ['tech', 'own', 'offline', 'other'] })
    .notNull()
    .default('own'),
  status: text('status', {
    enum: ['active', 'inactive', 'deleted', 'pending', 'disapproved'],
  })
    .notNull()
    .default('pending'),
})

export type InsertFriend = typeof friendsTable.$inferInsert
export type SelectFriend = typeof friendsTable.$inferSelect
