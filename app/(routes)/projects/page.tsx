import type { Metadata } from 'next'

import { DirectionalTransition } from '@/components/layout/directional-transition'
import { PageReveal } from '@/components/motion/page-reveal'
import { ProjectIndex } from '@/components/projects/project-index'

export const metadata: Metadata = {
  title: '项目集',
  description: '参与过的应用与网站，记录从想法到实现的过程。',
}

export default function ProjectsPage() {
  return (
    <DirectionalTransition>
      <PageReveal>
        <ProjectIndex />
      </PageReveal>
    </DirectionalTransition>
  )
}
