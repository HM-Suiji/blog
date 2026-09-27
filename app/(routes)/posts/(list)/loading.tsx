import { Skeleton } from '@heroui/react'

import { RouteLoadingTransition } from '@/components/layout/directional-transition'
import styles from '@/components/posts/archive.module.css'

export default function Loading() {
  return (
    <RouteLoadingTransition>
      <div
        className={styles.page}
        aria-busy="true"
        aria-label="正在加载文章列表"
      >
        <div className={styles.header}>
          <div className="w-full space-y-6">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-14 w-2/3 max-w-sm rounded-xl" />
            <Skeleton className="h-5 w-4/5 max-w-xl rounded-md" />
          </div>
        </div>
        <div className={styles.sectionLabel}>
          <Skeleton className="h-6 w-28 rounded-md" />
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }, (_, index) => (
            <div className={styles.loadingCard} key={index}>
              <Skeleton className="aspect-[1.5] w-full rounded-xl" />
              <div className="mt-6 space-y-4">
                <Skeleton className="h-3 w-24 rounded-md" />
                <Skeleton className="h-7 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </RouteLoadingTransition>
  )
}
