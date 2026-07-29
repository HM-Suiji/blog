import { sql } from 'drizzle-orm'
import {
  AnyPgColumn,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

import { user } from './auth'
import { postsTable } from './post'

export const commentsTable = pgTable('comments', {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  postId: uuid('post_id')
    .references(() => postsTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  hot: integer('hot').default(0).notNull(),
  replyToId: uuid('reply_to_id').references(
    (): AnyPgColumn => commentsTable.id,
    {
      onDelete: 'cascade',
    }
  ),
  status: text('status', {
    enum: ['pending', 'approved', 'rejected', 'spam'],
  })
    .default('pending')
    .notNull(),
  userAgent: text('user_agent'),
  ip: text('ip'),
})

export const commentReactionsTable = pgTable(
  'comment_reactions',
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),

    commentId: uuid('comment_id')
      .references(() => commentsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    userId: text('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    /**
     * emoji
     * 👍
     * ❤️
     * 😂
     */
    emoji: text('emoji').notNull(),

    createdAt: timestamp('created_at', {
      mode: 'date',
    })
      .defaultNow()
      .notNull(),
  },
  table => [
    uniqueIndex('comment_reaction_unique').on(
      table.commentId,
      table.userId,
      table.emoji
    ),
  ]
)

export type InsertComment = typeof commentsTable.$inferInsert
export type SelectComment = typeof commentsTable.$inferSelect
