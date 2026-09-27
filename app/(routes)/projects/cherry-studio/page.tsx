import type { Metadata } from 'next'

import { DirectionalTransition } from '@/components/layout/directional-transition'
import { PageReveal } from '@/components/motion/page-reveal'
import { CherryStudioCase } from '@/components/projects/cherry-studio-case'

export const metadata: Metadata = {
  title: 'Cherry Studio App · 项目',
  description: '参与 Cherry Studio App 的移动端布局与核心功能开发。',
}

export default function CherryStudioPage() {
  return (
    <DirectionalTransition>
      <PageReveal>
        <CherryStudioCase />
      </PageReveal>
    </DirectionalTransition>
  )
}
