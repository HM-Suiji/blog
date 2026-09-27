import type { Metadata } from 'next'

import { CherryStudioCase } from '@/components/projects/cherry-studio-case'

export const metadata: Metadata = {
  title: 'Cherry Studio App · 项目',
  description: '参与 Cherry Studio App 的移动端布局与核心功能开发。',
}

export default function CherryStudioPreviewPage() {
  return <CherryStudioCase preview />
}
