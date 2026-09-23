'use client'

import type { Heading } from '@/utils/mdx'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { cn } from '@heroui/react'

export const PostSidebar: React.FC<{ headings: Heading[] }> = ({
  headings,
}) => {
  const [activeHeading, setActiveHeading] = useState('')
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const elements = headings
      .map(heading => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null)

    if (!elements.length) return

    let frame = 0
    let currentHeading = ''

    const updateActiveHeading = () => {
      frame = 0

      // Match the headings' anchor offset so clicks and reading agree.
      const readingLine =
        Number.parseFloat(getComputedStyle(elements[0]).scrollMarginTop) || 88
      let nextHeading = elements[0].id

      for (const element of elements) {
        if (element.getBoundingClientRect().top > readingLine + 1) break
        nextHeading = element.id
      }

      // A short final section may never reach the reading line.
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      ) {
        nextHeading = elements[elements.length - 1].id
      }

      if (nextHeading !== currentHeading) {
        currentHeading = nextHeading
        setActiveHeading(nextHeading)
      }
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveHeading)
    }

    // Images, diagrams and streamed content can move headings after mount.
    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(document.body)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    scheduleUpdate()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
    }
  }, [headings])

  useEffect(() => {
    const list = listRef.current
    if (!list || !activeHeading) return

    const revealActiveHeading = () => {
      const link = list.querySelector<HTMLAnchorElement>(
        '[aria-current="location"]'
      )
      if (!link || list.clientHeight === 0) return

      const listBounds = list.getBoundingClientRect()
      const linkBounds = link.getBoundingClientRect()
      const padding = 24

      if (
        linkBounds.top < listBounds.top + padding ||
        linkBounds.bottom > listBounds.bottom - padding
      ) {
        // Scroll only the TOC; scrollIntoView would also move the article.
        list.scrollTo({
          top:
            list.scrollTop +
            linkBounds.top -
            listBounds.top -
            (list.clientHeight - linkBounds.height) / 2,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
        })
      }
    }

    revealActiveHeading()
    const resizeObserver = new ResizeObserver(revealActiveHeading)
    resizeObserver.observe(list)

    return () => resizeObserver.disconnect()
  }, [activeHeading])

  if (!headings.length) return null

  return (
    <nav
      aria-label="博客目录"
      className="sticky top-20 flex max-h-[calc(100dvh-8rem)] min-h-0 flex-col overflow-hidden border p-2"
    >
      <h2 className="shrink-0 px-2 py-1 text-sm font-semibold text-foreground">
        博客目录
      </h2>
      <ul
        ref={listRef}
        data-lenis-prevent
        className="mt-2 min-h-0 space-y-0.5 overflow-y-auto overscroll-contain px-1 pb-1 text-sm text-muted [scrollbar-gutter:stable] [scrollbar-width:thin]"
      >
        {headings.map(heading => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              aria-current={
                activeHeading === heading.id ? 'location' : undefined
              }
              className={cn(
                'block rounded-lg border-l-2 border-transparent py-2 pr-2 pl-2 leading-relaxed wrap-anywhere transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none',
                {
                  'pl-4': heading.depth === 3,
                  'pl-6': heading.depth === 4,
                  'pl-8': heading.depth === 5,
                  'pl-10': heading.depth === 6,
                  'border-accent bg-surface-hover text-foreground':
                    activeHeading === heading.id,
                }
              )}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
