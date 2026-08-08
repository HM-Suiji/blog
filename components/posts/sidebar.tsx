'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { cn } from '@heroui/react'

import { Heading } from '@/utils/mdx'

export const PostSidebar: React.FC<{ headings: Heading[] }> = ({
  headings,
}) => {
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const _activeHeading = window.location.hash

    if (
      headings.some(
        heading => heading.id === decodeURIComponent(_activeHeading.slice(1))
      )
    ) {
      setActiveHeading(decodeURIComponent(_activeHeading.slice(1)))
    }
  }, [])

  return (
    <ul className="text-muted mt-2">
      {headings.map(heading => (
        <li
          className={cn(
            'hover:text-foreground hover:underline hover:bg-surface-hover py-1 pl-2 rounded-xl transition-all duration-200 ease-in-out',
            {
              'pl-4': heading.depth === 3,
              'pl-6': heading.depth === 4,
              'text-foreground underline bg-surface-hover':
                activeHeading === heading.id,
            }
          )}
          key={heading.id}
          onClick={() => setActiveHeading(heading.id)}
        >
          <Link href={`#${heading.id}`}>{heading.text}</Link>
        </li>
      ))}
    </ul>
  )
}
