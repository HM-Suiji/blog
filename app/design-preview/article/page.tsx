import type { MDXComponents } from 'mdx/types'
import type { Metadata } from 'next'
import type { ComponentProps, ReactElement } from 'react'

import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cacheLife } from 'next/cache'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import { codeToHtml } from 'shiki'

import { CodeCopyButton } from '@/components/design-preview/article-sample'
import styles from '@/components/design-preview/article.module.css'
import { Mermaid } from '@/components/mermaid'
import { getPost } from '@/utils/get-post'
import { remarkHeadingIds, type Heading } from '@/utils/mdx'

const slug = 'nextjs-partial-prerendering'

export const metadata: Metadata = {
  title: '技术手记 · 阅读样板',
  robots: { index: false, follow: false },
}

async function CodeFence({ children }: ComponentProps<'pre'>) {
  const codeElement = children as ReactElement<ComponentProps<'code'>>
  const code =
    typeof codeElement.props.children === 'string'
      ? codeElement.props.children.replace(/\n$/, '')
      : ''
  const language =
    codeElement.props.className?.replace('language-', '') ?? 'text'

  if (language === 'mermaid') {
    return (
      <figure className={styles.diagram}>
        <figcaption>流程图</figcaption>
        <Mermaid chart={code} />
      </figure>
    )
  }

  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark-default',
  })

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span>{language}</span>
        <CodeCopyButton code={code} />
      </div>
      <div
        className={styles.codeBody}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

const articleComponents: MDXComponents = {
  // The source title is rendered once in the article header below.
  h1: () => null,
  pre: props => <CodeFence {...props} />,
  table: props => (
    <div
      className={styles.tableScroll}
      role="group"
      aria-label="可横向滚动的数据表格"
      tabIndex={0}
    >
      <table {...props} />
    </div>
  ),
}

function Contents({ headings }: { headings: Heading[] }) {
  return (
    <ul className={styles.contentsList}>
      {headings.map(heading => (
        <li key={heading.id}>
          <a href={`#${encodeURIComponent(heading.id)}`}>{heading.text}</a>
        </li>
      ))}
    </ul>
  )
}

export default async function ArticlePreviewPage() {
  'use cache'
  cacheLife('days')

  const { frontmatter, content, headings, readingTime } = await getPost(slug)
  const sectionHeadings = headings.filter(heading => heading.depth === 2)
  const { content: body } = await compileMDX({
    source: content,
    components: articleComponents,
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm, remarkHeadingIds] },
    },
  })
  const published = frontmatter.date.toISOString().slice(0, 10)

  return (
    <div className={styles.page}>
      <Link href="/design-preview" className={styles.backLink}>
        <ArrowLeft size={17} aria-hidden="true" /> 返回首页
      </Link>

      <div className={styles.layout}>
        <article className={styles.article} aria-labelledby="article-title">
          <header className={styles.header}>
            <span className={styles.kicker}>开发手记</span>
            <h1 id="article-title">{frontmatter.title}</h1>
            <p className={styles.description}>{frontmatter.description}</p>
            <div className={styles.metadata}>
              <span className={styles.authorMark} aria-hidden="true">
                穗
              </span>
              <div className={styles.authorInfo}>
                <span>{frontmatter.author}</span>
                <time dateTime={published}>
                  {published.replaceAll('-', '.')}
                </time>
              </div>
              <span className={styles.readingTime}>
                <Clock3 size={15} aria-hidden="true" />约 {readingTime} 分钟
              </span>
            </div>
            <ul className={styles.tags} aria-label="文章标签">
              {frontmatter.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </header>

          <details className={styles.mobileContents}>
            <summary>
              <span>本文目录</span>
              <span className={styles.sectionCount}>
                {sectionHeadings.length} 个章节
              </span>
            </summary>
            <nav aria-label="文章目录">
              <Contents headings={sectionHeadings} />
            </nav>
          </details>

          <div className={styles.prose}>{body}</div>

          <footer className={styles.articleFooter}>
            <h2>让思考继续。</h2>
            <p>如果你有不同的实践或想法，欢迎到原文一起讨论。</p>
            <div className={styles.footerLinks}>
              <Link
                href={`/posts/${slug}#comment`}
                className={styles.discussLink}
                prefetch={false}
              >
                一起聊聊 <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/design-preview">
                返回首页 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </footer>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.stickyContents}>
            <h2>本文目录</h2>
            <nav aria-label="文章目录">
              <Contents headings={sectionHeadings} />
            </nav>
            <a className={styles.topLink} href="#article-title">
              返回顶部 <span aria-hidden="true">↑</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
