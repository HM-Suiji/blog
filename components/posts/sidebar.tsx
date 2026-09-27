'use client'

import type { Heading } from '@/utils/mdx'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import styles from './reading.module.css'

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
    <nav aria-label="博客目录" className={styles.stickyContents}>
      <h2>本文目录</h2>
      <ul
        ref={listRef}
        data-lenis-prevent
        className={`${styles.contentsList} ${styles.desktopContents}`}
      >
        {headings.map(heading => (
          <li key={heading.id}>
            <Link
              href={`#${encodeURIComponent(heading.id)}`}
              aria-current={
                activeHeading === heading.id ? 'location' : undefined
              }
              style={{
                paddingInlineStart: 12 + Math.max(0, heading.depth - 2) * 12,
              }}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
      <a className={styles.topLink} href="#">
        返回顶部 <span aria-hidden="true">↑</span>
      </a>
    </nav>
  )
}
