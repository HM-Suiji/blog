import type { Post } from '@/types/post'

import { siteConfig } from '@/config/site'

export function ArticleJsonLd({ post }: { post: Post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,

    image: post.cover ? [`${siteConfig.url}${post.cover}`] : undefined,

    author: {
      '@type': 'Person',
      name: siteConfig.author,
      url: `${siteConfig.url}/about`,
    },

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/posts/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  )
}
