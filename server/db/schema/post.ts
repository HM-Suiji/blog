import { sql } from 'drizzle-orm'
import {
  pgTable,
  uuid,
  timestamp,
  varchar,
  integer,
  boolean,
  text,
} from 'drizzle-orm/pg-core'

export const postsTable = pgTable('posts', {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  title: varchar('title', { length: 256 }).notNull(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  description: varchar('description', { length: 256 }),
  author: varchar('author', { length: 256 }).notNull(),
  cover: varchar('cover', { length: 256 }),
  publishedAt: timestamp('published_at', { mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  contentPath: varchar('content_path', { length: 256 }).notNull(),
  public: boolean('public').default(true).notNull(),
  pin: boolean('pin').default(false).notNull(),
  tags: text('tags')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  hash: text('hash'),
  likes: integer('likes').default(0).notNull(),
})

export const postStatsTable = pgTable('post_stats', {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  postId: uuid()
    .references(() => postsTable.id)
    .notNull(),
  views: integer('views').default(0).notNull(),
  likes: integer('likes').default(0).notNull(),
  averageReadTime: integer('average_read_time').default(0).notNull(),
})

export type InsertPost = Omit<typeof postsTable.$inferInsert, 'id'>
export type SelectPost = typeof postsTable.$inferSelect
export type InsertPostStats = Omit<typeof postStatsTable.$inferInsert, 'id'>
export type SelectPostStats = typeof postStatsTable.$inferSelect
