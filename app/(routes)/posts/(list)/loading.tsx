import { Skeleton } from '@heroui/react'

import { RouteLoadingTransition } from '@/components/layout/directional-transition'

export default function Loading() {
  return (
    <RouteLoadingTransition>
      <div className="min-h-screen w-full flex flex-col pt-8 gap-4">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 border md:border-l mt-4 gap-2 p-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </RouteLoadingTransition>
  )
}
