import { SelectFriend } from '@/server/db/schema'

import { Dtoify } from './utils'

export type Friend = Dtoify<SelectFriend>
