import { Suspense } from 'react'

import { ArrowLeft, Clock3, MessageSquare } from 'lucide-react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cacheLife, cacheTag } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import remarkGfm from 'remark-gfm'

import { Skeleton } from '@heroui/react'

import { CommentsContainer } from '@/components/comments'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import { articleComponents } from '@/components/posts/article-components'
import { ReadingProgress } from '@/components/posts/reading-progress'
import styles from '@/components/posts/reading.module.css'
import { PostSidebar } from '@/components/posts/sidebar'
import { ArticleJsonLd } from '@/components/seo/article-json-ld'
import { siteConfig } from '@/config/site'
import { PostTitle } from '@/mdx-components'
import { findPostBySlug, findPosts } from '@/server/actions/post.action'
import { cacheSelector } from '@/utils/cache'
import { getPost } from '@/utils/get-post'
import { remarkHeadingIds } from '@/utils/mdx'

export const generateMetadata = async ({
  params,
}: PageProps<'/posts/[slug]'>) => {
  'use cache: remote'
  const { slug } = await params

  cacheTag(cacheSelector.post(slug))
  cacheLife('weeks')

  const post = await findPostBySlug(slug)

  if (!post || !post.public) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    keywords: [siteConfig.name, ...post.tags],
    alternates: {
      canonical: `${siteConfig.url}/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/posts/${post.slug}`,
      images: post.cover
        ? [{ url: post.cover, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
  }
}

export const generateStaticParams = async () => {
  'use cache: remote'
  cacheTag(cacheSelector.posts)
  cacheLife('weeks')
  const posts = await findPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function PostSlugPage({
  params,
}: PageProps<'/posts/[slug]'>) {
  'use cache: remote'
  const { slug } = await params

  cacheTag(cacheSelector.post(slug))
  cacheLife('weeks')

  const post = await findPostBySlug(slug)
  if (!post || !post.public) notFound()

  const { frontmatter, headings, readingTime, content } = await getPost(slug)
  if (!frontmatter.public) notFound()

  const sourceTitle = headings.find(
    heading =>
      heading.depth === 1 &&
      (heading.text === frontmatter.title || heading.text === post.title)
  )
  const titleId = sourceTitle?.id ?? 'article-title'
  const sectionHeadings = headings.filter(
    heading => heading.id !== sourceTitle?.id
  )
  const published = frontmatter.date.toISOString().slice(0, 10)
  const { content: MDXContent } = await compileMDX({
    source: content,
    components: {
      ...articleComponents,
      h1: props =>
        sourceTitle && props.id === sourceTitle.id ? null : (
          <PostTitle {...props} />
        ),
    },
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm, remarkHeadingIds] },
    },
  })

  return (
    <DirectionalTransition reveal>
      <div className={styles.page}>
        <ArticleJsonLd post={post} />
        <div className={styles.articleNav}>
          <Link
            href="/posts"
            className={styles.backLink}
            transitionTypes={['nav-back']}
          >
            <ArrowLeft size={17} aria-hidden="true" /> 所有文章
          </Link>
          <a href="#comment" className={styles.backLink}>
            <MessageSquare size={16} aria-hidden="true" /> 参与讨论
          </a>
        </div>
        <div className={styles.layout}>
          <div className={styles.articleColumn}>
            <ReadingProgress>
              <article className={styles.article} aria-labelledby={titleId}>
                <header className={styles.header}>
                  <span className={styles.kicker}>开发手记</span>
                  <PostTitle
                    id={titleId}
                    transitionName={`post-title-${post.id}`}
                  >
                    {post.title}
                  </PostTitle>
                  <p className={styles.description}>{post.description}</p>
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
                      <Clock3 size={15} aria-hidden="true" />约 {readingTime}{' '}
                      分钟
                    </span>
                  </div>
                  <ul className={styles.tags} aria-label="文章标签">
                    {frontmatter.pin && (
                      <li className={styles.pinnedTag}>置顶</li>
                    )}
                    {frontmatter.tags.map(tag => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </header>
                {sectionHeadings.length > 0 && (
                  <details className={styles.mobileContents}>
                    <summary>
                      <span>本文目录</span>
                      <span className={styles.sectionCount}>
                        {sectionHeadings.length} 个章节
                      </span>
                    </summary>
                    <nav aria-label="文章目录" data-lenis-prevent>
                      <ul className={styles.contentsList}>
                        {sectionHeadings.map(heading => (
                          <li key={heading.id}>
                            <a
                              href={`#${encodeURIComponent(heading.id)}`}
                              style={{
                                paddingInlineStart:
                                  10 + Math.max(0, heading.depth - 2) * 12,
                              }}
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </details>
                )}
                <div className={styles.prose}>{MDXContent}</div>
              </article>
            </ReadingProgress>
            <section
              className={styles.discussion}
              aria-labelledby="discussion-title"
            >
              <div className={styles.discussionHeading}>
                <div>
                  <h2 id="discussion-title">让思考继续。</h2>
                  <p>有不同的实践或想法？欢迎一起聊聊。</p>
                </div>
                <MessageSquare size={23} aria-hidden="true" />
              </div>
              <Suspense
                fallback={<Skeleton className="h-64 w-full rounded-2xl" />}
              >
                <CommentsContainer postId={post.id} postName={post.title} />
              </Suspense>
            </section>
          </div>
          <aside className={styles.sidebar}>
            <PostSidebar headings={sectionHeadings} />
          </aside>
        </div>
      </div>
    </DirectionalTransition>
  )
}
