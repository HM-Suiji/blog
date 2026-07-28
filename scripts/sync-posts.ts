import { syncPosts } from '@/utils/sync-posts'

const actions = await syncPosts()

console.log(JSON.stringify({ actions }, null, 2))
