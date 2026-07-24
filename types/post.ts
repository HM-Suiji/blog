import { z } from 'zod'

import { SelectPost, SelectPostStats } from '@/server/db/schema'

import { Dtoify } from './utils'

export type Post = Dtoify<SelectPost>
export type PostStats = Dtoify<SelectPostStats>

export const PostFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  public: z.boolean().default(true),
})

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>
