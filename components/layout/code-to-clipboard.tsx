'use client'

import { useRef, useState } from 'react'

import { Check, Copy } from 'lucide-react'

import { toast } from '@heroui/react'

export const CopyToClipboard: React.FC<{
  code: string
  className?: string
}> = ({ code, className }) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('复制成功🎉')
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      toast.danger('复制失败😭，请重试或手动复制代码')
    }
  }

  return copied ? (
    <Check className={className} size="18" onClick={copyToClipboard} />
  ) : (
    <Copy className={className} size="18" onClick={copyToClipboard} />
  )
}
