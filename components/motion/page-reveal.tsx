'use client'

import { type ReactNode, useLayoutEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

/** Content stays visible without JS; each route owns and cleans up its timeline. */
export function PageReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const scope = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (!scope.current) return
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const root = scope.current
        if (!root) return
        const intro = root.querySelectorAll('[data-intro]')
        if (intro.length) {
          gsap.from(intro, {
            y: 22,
            opacity: 0,
            duration: 0.85,
            stagger: 0.075,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          })
        }
        root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, {
            y: 28,
            opacity: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          })
        })
        root
          .querySelectorAll<HTMLElement>('[data-parallax]')
          .forEach(element => {
            gsap.to(element, {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: element.parentElement,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.7,
              },
            })
          })
      },
      scope
    )
    return () => media.revert()
  }, [pathname])

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}
