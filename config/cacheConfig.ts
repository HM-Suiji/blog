import { CacheTree } from '@/utils/cache'

export const cacheConfig = {
  posts: '/posts',
  post: id => `/posts/${id}`,
} as const satisfies CacheTree
