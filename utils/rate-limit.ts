import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const webhookLimiter = new Ratelimit({
  redis,

  // 滑动窗口
  limiter: Ratelimit.slidingWindow(5, '10 m'),

  analytics: true,
})
