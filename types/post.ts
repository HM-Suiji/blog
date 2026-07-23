import { SelectPost, SelectPostStats } from '@/server/db/schema'

import { Dtoify } from './utils'

export type Post = Dtoify<SelectPost>
export type PostStats = Dtoify<SelectPostStats>
