import type { Metadata } from 'next'

import { Timeline } from '@heroui-pro/react'
import { Card, Chip } from '@heroui/react'

import { DirectionalTransition } from '@/components/layout/directional-transition'
import { timelineYears, type TimelineMonth } from '@/config/timeline'

export const metadata: Metadata = {
  title: '生活时间线',
  description: '按年份和月份记录穗积的生活活动、项目经历与成长片段。',
}

function getEventCount(months: readonly TimelineMonth[]) {
  return months.reduce((count, month) => count + month.events.length, 0)
}

function padDatePart(value: number) {
  return String(value).padStart(2, '0')
}

export default function TimelinePage() {
  return (
    <DirectionalTransition>
      <div className="min-h-screen w-full pt-12 pb-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            生活时间线
          </h1>
          <p className="text-muted max-w-xl text-sm leading-6 md:text-base">
            记录那些值得留住的生活片段、项目节点与成长经历。按年归档，每个月的故事都在同一行里。
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-16">
          {timelineYears.map(year => (
            <section
              key={year.year}
              aria-labelledby={`timeline-year-${year.year}`}
              className="relative min-w-0"
            >
              <header className="mb-6 flex items-baseline justify-between lg:absolute lg:inset-y-0 lg:left-0 lg:mb-0 lg:block lg:w-24 lg:text-right">
                <div className="lg:sticky lg:top-24">
                  <h2
                    id={`timeline-year-${year.year}`}
                    className="text-3xl font-semibold tracking-tight tabular-nums"
                  >
                    {year.year}
                  </h2>
                  <p className="text-muted mt-1 text-xs tabular-nums">
                    {year.months.length} 个月 · {getEventCount(year.months)}{' '}
                    件事
                  </p>
                </div>
              </header>

              <div className="mx-auto w-full max-w-3xl">
                <div className="sm:hidden">
                  <Timeline
                    aria-label={`${year.year} 年生活时间线`}
                    className="min-w-0"
                    density="comfortable"
                    size="sm"
                  >
                    {year.months.map(month => (
                      <Timeline.Item
                        key={month.month}
                        status={month.isCurrent ? 'current' : 'default'}
                      >
                        <Timeline.Content>
                          <MonthCard
                            month={month.month}
                            events={month.events}
                            year={year.year}
                          />
                        </Timeline.Content>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </div>

                <div className="hidden sm:block">
                  <Timeline
                    aria-label={`${year.year} 年生活时间线`}
                    size="sm"
                    axis="center"
                    itemAlign="center"
                    placement="alternate"
                  >
                    {year.months.map((month, index) => {
                      const side = index % 2 === 1 ? 'start' : 'end'
                      return (
                        <Timeline.Item
                          key={month.month}
                          side={side}
                          status={month.isCurrent ? 'current' : 'default'}
                        >
                          <Timeline.Content side={side}>
                            <MonthCard
                              month={month.month}
                              events={month.events}
                              side={side}
                              year={year.year}
                            />
                          </Timeline.Content>
                        </Timeline.Item>
                      )
                    })}
                  </Timeline>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </DirectionalTransition>
  )
}

function MonthCard({
  month,
  events,
  side,
  year,
}: TimelineMonth & {
  side?: 'start' | 'end'
  year: number
}) {
  return (
    <div
      className={`grid min-w-0 gap-4 sm:gap-4 ${
        side === 'start'
          ? 'sm:grid-cols-[minmax(0,1fr)_4rem]'
          : 'sm:grid-cols-[4rem_minmax(0,1fr)]'
      }`}
    >
      <div
        className={
          side === 'start' ? 'text-center sm:col-start-2' : 'text-center'
        }
      >
        <h3 className="text-base font-semibold tabular-nums">{month} 月</h3>
        <p className="text-muted mt-1 text-xs tabular-nums">
          {events.length} 件事
        </p>
      </div>

      <ul
        className={`grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2 ${
          side === 'start' ? 'sm:col-start-1 sm:row-start-1' : ''
        }`}
      >
        {events.map(event => {
          const eventTitleId = `timeline-${year}-${month}-${event.id}`
          const dateTime = `${year}-${padDatePart(month)}-${padDatePart(event.day)}`

          return (
            <li key={event.id} className="min-w-0">
              <Card
                aria-labelledby={eventTitleId}
                className="h-full gap-3 p-4 shadow-none"
                role="article"
                variant="secondary"
              >
                <Card.Header
                  className={`flex-row items-center justify-between gap-3 p-0 ${
                    side === 'start' ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <time
                    className="text-accent text-xs font-semibold tabular-nums"
                    dateTime={dateTime}
                  >
                    {padDatePart(event.day)} 日
                  </time>
                  <Chip size="sm">{event.category}</Chip>
                </Card.Header>
                <Card.Content className="gap-1.5 p-0">
                  <h4
                    id={eventTitleId}
                    className="text-foreground text-sm font-medium leading-5"
                  >
                    {event.title}
                  </h4>
                  <p className="text-muted line-clamp-3 text-xs leading-5">
                    {event.description}
                  </p>
                </Card.Content>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
