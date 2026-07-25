import { z } from 'zod'

import { siteConfig } from '@/config/site'
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
  pin: z.boolean().default(false),
  author: z.string().default(siteConfig.author),
})

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>
