'use client'

import type { Route } from 'next'

import { useId, useState } from 'react'

import { ArrowUpRight, Braces, Sparkles, Smartphone } from 'lucide-react'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@heroui/react'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

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

export function ResearchOrbit({
  articleHref = '/design-preview/article',
  projectHref = '/design-preview/cherry-studio',
}: {
  articleHref?: Route
  projectHref?: Route
}) {
  const [selected, setSelected] = useState(0)
  const group = useId()
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 100, damping: 22 })
  const y = useSpring(pointerY, { stiffness: 100, damping: 22 })
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(x, [-0.5, 0.5], [-9, 9])
  const current = destinations[selected]
  const href =
    selected === 0 ? articleHref : selected === 2 ? projectHref : current.href
  return (
    <section
      className="obs-orbit"
      aria-label="探索我的关注方向"
      data-destination={selected}
    >
      <motion.div
        className="obs-orbit-art"
        aria-hidden="true"
        data-intro
        onPointerMove={event => {
          if (reduceMotion || event.pointerType !== 'mouse') return
          const bounds = event.currentTarget.getBoundingClientRect()
          pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
          pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
        }}
        onPointerLeave={() => {
          pointerX.set(0)
          pointerY.set(0)
        }}
      >
        <div className="obs-orbit-parallax" data-parallax>
          <motion.div
            className="obs-orbit-perspective"
            style={{
              rotateX: reduceMotion ? 0 : rotateX,
              rotateY: reduceMotion ? 0 : rotateY,
              transformPerspective: 800,
            }}
          >
            <motion.div
              className="obs-orbit-model"
              animate={{
                rotate: reduceMotion ? 0 : [0, -9, 9][selected],
                scale: selected === 0 || reduceMotion ? 1 : 1.06,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 65, damping: 18 }
              }
            >
              <Image
                src="/images/design-preview/orbit-sculpture.png"
                alt=""
                fill
                sizes="(max-width: 767px) 90vw, 500px"
                className="obs-orbit-sculpture"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <LayoutGroup id={group}>
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
              {selected === index && (
                <motion.span
                  className="obs-interest-indicator"
                  layoutId="interest"
                  aria-hidden="true"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 32 }
                  }
                />
              )}
              <item.icon size={16} aria-hidden="true" />
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
      </LayoutGroup>
      <div
        className="obs-orbit-note"
        id="orbit-note"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -5 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
          >
            <p>{current.title}</p>
            <span>{current.description}</span>
          </motion.div>
        </AnimatePresence>
        <Link
          href={href}
          transitionTypes={['nav-forward']}
          className="obs-orbit-open"
          aria-label={current.action}
        >
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
