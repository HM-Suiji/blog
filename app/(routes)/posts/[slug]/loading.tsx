import { Skeleton } from '@heroui/react'

import { RouteLoadingTransition } from '@/components/layout/directional-transition'
import styles from '@/components/posts/reading.module.css'

export default function Loading() {
  return (
    <RouteLoadingTransition>
      <div className={styles.page} aria-busy="true" aria-label="正在加载文章">
        <Skeleton className="h-5 w-24 rounded-md" />
        <div className={styles.layout}>
          <div className={styles.articleColumn}>
            <div className="space-y-6">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-2/3 rounded-xl" />
              <Skeleton className="h-5 w-full rounded-md" />
              <Skeleton className="h-5 w-4/5 rounded-md" />
              <Skeleton className="h-11 w-40 rounded-full" />
            </div>
            <div className="mt-14 space-y-5">
              {Array.from({ length: 8 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="h-4 rounded-md"
                  style={{ width: `${100 - (index % 3) * 9}%` }}
                />
              ))}
            </div>
          </div>
          <div className={styles.sidebar}>
            <Skeleton className="h-80 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </RouteLoadingTransition>
  )
}
