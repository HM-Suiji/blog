import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'

import { RSSButton } from '@/components/feature-button'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import styles from '@/components/posts/archive.module.css'
import { PostCard } from '@/components/posts/post-card'
import { findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'

export const generateMetadata = async (): Promise<Metadata> => {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()
  return {
    title: '博客列表',
    description: `分享一些技术文章与个人简介，欢迎大家交流。博客列表：${posts
      .map(post => post.title)
      .slice(0, 5)
      .join('、')}`,
  }
}

export default async function PostsPage() {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()

  return (
    <DirectionalTransition reveal>
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>持续记录，保持好奇</span>
            <h1>
              文章与思考<span>。</span>
            </h1>
            <p>关于 Web 工程、AI 与开发实践，也记录探索过程中的想法。</p>
          </div>
          <div className={styles.rss}>
            <RSSButton />
          </div>
        </header>
        <div className={styles.sectionLabel}>
          <h2>
            所有文章 <span>{posts.length}</span>
          </h2>
          <span>按发布时间排序</span>
        </div>
        <div className={styles.grid}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className={styles.empty}>下一篇思考，正在路上。</p>
        )}
      </div>
    </DirectionalTransition>
  )
}
