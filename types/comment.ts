import { SelectComment } from '@/server/db/schema'

import { Dtoify } from './utils'

export type Comment = Dtoify<Omit<SelectComment, 'ip' | 'status'>>
