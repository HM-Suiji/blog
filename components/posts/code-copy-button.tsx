'use client'

import { useEffect, useRef, useState } from 'react'

import { Check, Copy } from 'lucide-react'
import { motion } from 'motion/react'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

import styles from './reading.module.css'

export function CodeCopyButton({ code }: { code: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    },
    []
  )

  async function copyCode() {
    if (resetTimer.current) clearTimeout(resetTimer.current)

    try {
      await navigator.clipboard.writeText(code)
      setStatus('copied')
      resetTimer.current = setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <button className={styles.copyButton} onClick={copyCode} type="button">
      <motion.span
        key={status}
        className={styles.copyIcon}
        initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18 }}
        aria-hidden="true"
      >
        {status === 'copied' ? <Check size={14} /> : <Copy size={14} />}
      </motion.span>
      <span aria-live="polite">
        {status === 'copied'
          ? '已复制'
          : status === 'failed'
            ? '复制失败，请手动选择'
            : '复制代码'}
      </span>
    </button>
  )
}
