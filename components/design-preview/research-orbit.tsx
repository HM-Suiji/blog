'use client'

import { useState } from 'react'

import { ArrowUpRight, Braces, Sparkles, Smartphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@heroui/react'

const destinations = [
  {
    name: 'Web 工程',
    icon: Braces,
    title: '从界面到背后的系统',
    description: '关于 Next.js、渲染与开发体验的笔记。',
    href: '/design-preview/article',
    action: '阅读文章',
  },
  {
    name: 'AI / Agent',
    icon: Sparkles,
    title: '和新的可能性碰个面',
    description: '理解 AI，也记录和 Agent 一起探索的过程。',
    href: '/posts/harness-roading',
    action: '探索笔记',
  },
  {
    name: '移动开发',
    icon: Smartphone,
    title: '把想法，带到手机上',
    description: '参与 Cherry Studio App 的布局与功能开发。',
    href: '/design-preview/cherry-studio',
    action: '查看项目',
  },
] as const

export function ResearchOrbit() {
  const [selected, setSelected] = useState(0)
  const current = destinations[selected]
  return (
    <section
      className="obs-orbit"
      aria-label="探索我的关注方向"
      data-destination={selected}
    >
      <div className="obs-orbit-art" aria-hidden="true">
        <Image
          src="/images/design-preview/orbit-sculpture.png"
          alt=""
          fill
          sizes="(max-width: 767px) 90vw, 500px"
          className="obs-orbit-sculpture"
        />
      </div>
      <div
        className="obs-interest-switch"
        role="group"
        aria-label="选择关注方向"
      >
        {destinations.map((item, index) => (
          <Button
            key={item.name}
            variant="ghost"
            className="obs-interest-button"
            aria-pressed={selected === index}
            aria-controls="orbit-note"
            onPress={() => setSelected(index)}
          >
            <item.icon size={16} aria-hidden="true" />
            {item.name}
          </Button>
        ))}
      </div>
      <div
        className="obs-orbit-note"
        id="orbit-note"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <p>{current.title}</p>
          <span>{current.description}</span>
        </div>
        <Link
          href={current.href}
          className="obs-orbit-open"
          aria-label={current.action}
        >
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
