import { siteConfig } from '@/config/site'
import { findPosts } from '@/server/actions/post.action'

export async function GET() {
  const posts = await findPosts()

  const { url, rss } = siteConfig

  const content = `
# ${siteConfig.name}

> ${siteConfig.author} (${url}) 的个人网站：IT / 互联网技术博客。

想批量获取博客正文，最省事的是 RSS 全文源 ${rss} —— 它包含全部 ${posts.length} 篇文章的完整正文（HTML）。

## 博客

- [文章列表](${url}/posts): 共 159 篇，分页浏览
- [RSS 全文订阅源](${rss}): 全部文章带正文，适合批量抓取
- [文章 sitemap](${url}/sitemap.xml): 全部文章 URL 与更新时间

## 博客文章

${posts.map(
  post =>
    `- [${post.title}](${url}/posts/${post.slug}]: ${post.publishedAt} - ${post.description}`
)}

## Optional

- [友情链接](${url}/friends): 互链站点列表
  `

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
