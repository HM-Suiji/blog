'use client'

import { useRef, type ReactNode } from 'react'

import { motion, useScroll, useSpring } from 'motion/react'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

import styles from './reading.module.css'

export function ReadingProgress({ children }: { children: ReactNode }) {
  const articleRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
    trackContentSize: true,
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  })

  return (
    <div ref={articleRef} className={styles.readingTarget}>
      <motion.div
        className={styles.readingProgress}
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
