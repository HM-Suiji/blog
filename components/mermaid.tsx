'use client'

import { useEffect, useRef, useState } from 'react'

import { useTheme } from 'next-themes'

import { logger } from '@/utils/logger'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const renderDiagram = async () => {
      if (!containerRef.current) return

      try {
        setError(null)

        // 动态导入mermaid
        const mermaid = (await import('mermaid')).default

        // 初始化
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
        })

        // 生成ID
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`

        // SVG渲染
        const { svg } = await mermaid.render(id, chart)

        if (mounted && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : '绘制图表失败')
          logger.error(err)
        }
      }
    }

    // oxlint-disable-next-line typescript/no-floating-promises
    renderDiagram()

    return () => {
      mounted = false
    }
  }, [chart, resolvedTheme])

  if (error) {
    return <div className="p-4 text-danger bg-danger rounded-lg">{error}</div>
  }

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-x-auto border rounded-md"
    />
  )
}
