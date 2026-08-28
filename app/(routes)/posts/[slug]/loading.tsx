import { ViewTransition } from 'react'

import { Skeleton } from '@heroui/react'

export default function Loading() {
  return (
    <ViewTransition exit="slide-down" default="none">
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 my-8">
        <div className="col-span-full lg:col-span-3 flex flex-col">
          <Skeleton className="h-6 w-64 rounded-lg mb-4" />
          <Skeleton className="h-36 w-full rounded-lg" />
          <div className="mt-4 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-5 w-full rounded-lg"
                style={{ width: `${95 - i * 7}%` }}
              />
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <Skeleton className="h-64 w-full rounded-lg border p-2" />
        </div>
      </div>
    </ViewTransition>
  )
}
