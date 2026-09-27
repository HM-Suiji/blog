import type { MDXComponents } from 'mdx/types'
import type { ComponentProps, ReactElement } from 'react'

import { bundledLanguages, codeToHtml } from 'shiki'

import { Mermaid } from '@/components/mermaid'
import { components } from '@/mdx-components'

import { CodeCopyButton } from './code-copy-button'
import styles from './reading.module.css'

async function ArticleCodeBlock({ children }: ComponentProps<'pre'>) {
  const element = children as ReactElement<ComponentProps<'code'>>
  const code =
    typeof element.props.children === 'string'
      ? element.props.children.replace(/\n$/, '')
      : ''
  const language = element.props.className?.replace('language-', '') ?? 'text'

  if (language === 'mermaid') {
    return (
      <figure className={styles.diagram}>
        <figcaption>流程图</figcaption>
        <Mermaid chart={code} />
      </figure>
    )
  }

  const html = await codeToHtml(code, {
    lang: language in bundledLanguages ? language : 'text',
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

export const articleComponents: MDXComponents = {
  ...components,
  code: props => <code {...props} />,
  pre: props => <ArticleCodeBlock {...props} />,
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
