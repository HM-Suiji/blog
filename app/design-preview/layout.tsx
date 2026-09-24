import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Link from 'next/link'

import { ObservatoryHeader } from '@/components/design-preview/header'
import '@/components/design-preview/preview.css'

export const metadata: Metadata = {
  title: {
    default: '穗积的宇宙船 · 紫色设计样板',
    template: '%s · 穗积观测站',
  },
  description: '保留原紫色品牌的现代个人博客设计样板。',
  robots: { index: false, follow: false },
}

export default function DesignPreviewLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="obs">
      <a className="obs-skip" href="#observatory-main">
        跳至内容
      </a>
      <div className="obs-preview-note">
        <div className="obs-container">
          <span>
            设计样板 <span aria-hidden="true">/</span> 第二版 · 保留原紫色
          </span>
          <Link href="/">
            查看现有博客 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <ObservatoryHeader />
      <main className="obs-container" id="observatory-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="obs-footer obs-container">
        <div>
          <Link href="/design-preview" className="obs-footer-name">
            穗积的宇宙船
          </Link>
          <p>保持好奇，继续探索。</p>
        </div>
        <div className="obs-footer-links">
          <a
            href="https://github.com/HM-Suiji"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a href="/rss.xml">RSS ↗</a>
          <Link href="/about">关于我 ↗</Link>
        </div>
        <span className="obs-copyright">© 穗积 · Built with curiosity</span>
      </footer>
    </div>
  )
}
