import { ArrowUpRight } from 'lucide-react'
import NextLink from 'next/link'

import { Card } from '@heroui/react'

import { aboutCareer } from '@/config/about'

import styles from './about.module.css'
import { CareerTimeline } from './career-timeline'

export function CareerCard() {
  return (
    <Card
      className={`min-w-0 gap-0 overflow-hidden p-0 ${styles.careerCard}`}
      role="region"
      aria-labelledby="career-title"
    >
      <Card.Header className="px-6 pt-6 sm:px-8 sm:pt-8">
        <p className="mb-2 text-sm text-muted">生涯</p>
        <h2 id="career-title" className="text-3xl font-semibold tracking-tight">
          无限进步
        </h2>
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col">
        <CareerTimeline events={aboutCareer} />
      </Card.Content>
      <Card.Footer className="mt-auto px-6 pb-6 sm:px-8">
        <NextLink href="/timeline" className={styles.timelineLink}>
          查看完整时间线
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </NextLink>
      </Card.Footer>
    </Card>
  )
}
