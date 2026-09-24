'use client'

import { useEffect, useRef, useState } from 'react'

import { Check, Copy } from 'lucide-react'

import styles from './article.module.css'

export function CodeCopyButton({ code }: { code: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      {status === 'copied' ? (
        <Check size={14} aria-hidden="true" />
      ) : (
        <Copy size={14} aria-hidden="true" />
      )}
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
