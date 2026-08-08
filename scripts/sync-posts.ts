import { logger } from '@/utils/logger'
import { syncPosts } from '@/utils/sync-posts'

const actions = await syncPosts()

logger.info(JSON.stringify({ actions }, null, 2))
