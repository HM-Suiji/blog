import fs from 'node:fs/promises'

import { PostFrontmatterSchema } from '@/types/post'

import { extractHeadings, parseFrontmatter, calcReadingMinutes } from './mdx'

export async function getPost(slug: string) {
  const raw = await fs.readFile(`content/posts/${slug}.mdx`, 'utf8')

  const { frontmatter, content } = parseFrontmatter(raw, PostFrontmatterSchema)

  return {
    content,
    frontmatter,
    headings: extractHeadings(content), // 使用去掉 frontmatter 的内容
    readingTime: calcReadingMinutes(content),
  }
}
