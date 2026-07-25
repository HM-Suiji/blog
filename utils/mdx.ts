import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import { toString } from 'mdast-util-to-string'
import readingTime from 'reading-time'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { z } from 'zod'

export function parseFrontmatter<T>(raw: string, schema: z.ZodType<T>) {
  const { data, content } = matter(raw)

  return {
    frontmatter: schema.parse(data),
    content,
  }
}
export function calcReadingMinutes(raw: string) {
  return Math.max(1, Math.round(readingTime(raw).minutes))
}

export interface Heading {
  depth: 1 | 2 | 3 | 4 | 5 | 6
  text: string
  id: string
}

export function extractHeadings(raw: string): Heading[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(raw)

  const slugger = new GithubSlugger()

  const headings: Heading[] = []

  visit(tree, 'heading', (node: any) => {
    const text = toString(node)

    headings.push({
      depth: node.depth,
      text,
      id: slugger.slug(text),
    })
  })

  return headings
}

export async function mdxToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeStringify)
    .process(markdown)

  return String(result)
}
