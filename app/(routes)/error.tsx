'use client'

import { RefreshCw } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@heroui/react'

import { PageHeading } from '@/components/layout/page-heading'
import styles from '@/components/layout/page-heading.module.css'

export default function PublicPageError({ retry }: { retry: () => void }) {
  return (
    <div className={styles.page}>
      <PageHeading
        eyebrow="稍后再试"
        title="这一页，暂时未能抵达。"
        description="页面暂时无法加载。你可以重新尝试，或先回首页继续探索。"
      >
        <Button onPress={retry}>
          <RefreshCw size={16} aria-hidden="true" />
          重新加载
        </Button>
        <Link href="/" className="obs-secondary-link">
          返回首页
        </Link>
      </PageHeading>
    </div>
  )
}
