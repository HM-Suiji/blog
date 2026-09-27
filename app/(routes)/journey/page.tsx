import type { Metadata } from 'next'

import { JourneyExplorer } from '@/components/journey/journey-explorer'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import { PageHeading } from '@/components/layout/page-heading'
import styles from '@/components/layout/page-heading.module.css'
import { PageReveal } from '@/components/motion/page-reveal'

export const metadata: Metadata = {
  title: '沿途',
  description: '记录穗积走过的城市、时间与旅途照片。',
}

export default function JourneyPage() {
  return (
    <DirectionalTransition>
      <PageReveal className={styles.page}>
        <PageHeading
          eyebrow="旅途存档"
          title="沿途，总有新发现。"
          description="从景德镇出发，把走过的城市、抵达的日期，和偶尔按下快门的瞬间留在这里。"
        />
        <JourneyExplorer />
      </PageReveal>
    </DirectionalTransition>
  )
}
