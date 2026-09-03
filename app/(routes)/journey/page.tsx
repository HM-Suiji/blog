import type { Metadata } from 'next'

import { JourneyExplorer } from '@/components/journey/journey-explorer'
import { DirectionalTransition } from '@/components/layout/directional-transition'

export const metadata: Metadata = {
  title: '沿途',
  description: '记录穗积走过的城市、时间与旅途照片。',
}

export default function JourneyPage() {
  return (
    <DirectionalTransition>
      <main className="min-h-screen w-full pt-12 pb-24">
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-accent text-sm font-medium">旅途存档</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            沿途
          </h1>
          <p className="text-muted max-w-xl text-sm leading-6 md:text-base">
            从景德镇出发，把走过的城市、抵达的日期，和偶尔按下快门的瞬间留在这里。
          </p>
        </header>

        <JourneyExplorer />
      </main>
    </DirectionalTransition>
  )
}
