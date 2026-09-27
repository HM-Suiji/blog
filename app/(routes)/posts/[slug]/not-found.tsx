import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'

import styles from '@/components/posts/archive.module.css'
import { findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'

export default async function PostNotFound() {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()

  return (
    <div className={styles.notFound}>
      <span className={styles.notFoundCode}>404 / 未找到文章</span>
      <h1>这篇记录暂时不在这里。</h1>
      <p>链接可能有误，也可以从文章列表继续探索。</p>
      <Link
        href="/posts"
        className={styles.backLink}
        transitionTypes={['nav-back']}
      >
        <ArrowLeft size={17} aria-hidden="true" /> 返回所有文章
      </Link>
      {posts.length > 0 && (
        <section
          className={styles.suggestions}
          aria-labelledby="suggested-posts"
        >
          <h2 id="suggested-posts">也许你会感兴趣</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.slug}`}
                  transitionTypes={['nav-forward']}
                >
                  {post.title}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
