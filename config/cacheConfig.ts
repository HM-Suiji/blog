import { CacheTree } from '@/utils/cache'

export const cacheConfig = {
  posts: '/posts',
  post: id => `/posts/${id}`,
  friends: '/friends',
} as const satisfies CacheTree
