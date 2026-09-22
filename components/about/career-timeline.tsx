'use client'

import type { aboutCareer } from '@/config/about'

import { useState, type CSSProperties } from 'react'

import { BookOpen, BrainCircuit, Rocket } from 'lucide-react'

import { Button } from '@heroui/react'

import styles from './about.module.css'

type CareerEvent = (typeof aboutCareer)[number]

const categoryIcons = {
  建站: Rocket,
  研究: BrainCircuit,
  生活: BookOpen,
  创作: BookOpen,
}

export function CareerTimeline({ events }: { events: readonly CareerEvent[] }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const activeId = hovered ?? focused ?? selected

  return (
    <div className={styles.careerExperience}>
      <div className={styles.careerDetails}>
        <div
          className={styles.detailPanel}
          data-visible={activeId === null}
          aria-hidden={activeId !== null}
        >
          <p className="mb-4 text-sm text-muted">
            全栈开发 · 技术创作 · AI 探索
          </p>
          <ul className="flex flex-col gap-2.5">
            {events.map(event => (
              <li
                key={event.id}
                className={styles.careerLegend}
                data-category={event.category}
              >
                <span className={styles.careerDot} aria-hidden="true" />
                <span>{event.title}</span>
              </li>
            ))}
          </ul>
        </div>
        {events.map(event => (
          <div
            key={event.id}
            id={`career-detail-${event.id}`}
            className={styles.detailPanel}
            data-visible={activeId === event.id}
            data-category={event.category}
            aria-hidden={activeId !== event.id}
          >
            <time dateTime={event.date} className={styles.detailDate}>
              {event.date.replaceAll('-', '.')}
              <span className={styles.careerDot} aria-hidden="true" />
              {event.category}
            </time>
            <h3 className="mt-3 text-lg font-semibold leading-snug">
              {event.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {event.description}
            </p>
          </div>
        ))}
      </div>

      <div
        className={styles.journeyGraphic}
        data-exploring={activeId !== null}
        style={{ '--event-count': events.length } as CSSProperties}
      >
        <div className={styles.journeyAxis} aria-hidden="true" />
        <ol className={styles.journeyNodes} aria-label="生涯节点，选择查看经历">
          {events.map(event => {
            const Icon = categoryIcons[event.category]

            return (
              <li key={event.id} className={styles.journeyColumn}>
                <Button
                  variant="ghost"
                  className={styles.journeyNode}
                  data-category={event.category}
                  data-active={activeId === event.id}
                  aria-label={`${event.period}，${event.title}`}
                  aria-describedby={`career-detail-${event.id}`}
                  aria-pressed={selected === event.id}
                  onHoverStart={() => setHovered(event.id)}
                  onHoverEnd={() => setHovered(null)}
                  onFocus={() => setFocused(event.id)}
                  onBlur={() => setFocused(null)}
                  onPress={() =>
                    setSelected(value => (value === event.id ? null : event.id))
                  }
                  onKeyDown={event => {
                    if (event.key === 'Escape') {
                      setSelected(null)
                      event.currentTarget.blur()
                    }
                  }}
                >
                  <span className={styles.nodeLabel}>
                    <Icon aria-hidden="true" />
                    {event.category}
                  </span>
                  <span className={styles.nodeCapsule} aria-hidden="true">
                    <span className={styles.nodeShine} />
                  </span>
                  <span className={styles.nodeStem} aria-hidden="true" />
                </Button>
                <time dateTime={event.date} className={styles.axisDate}>
                  {event.period}
                </time>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
