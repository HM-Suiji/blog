import type { MDXComponents } from 'mdx/types'

import { Children, cloneElement, isValidElement, ViewTransition } from 'react'

import GithubSlugger from 'github-slugger'
import Link from 'next/link'

import { CodeBlock } from '@heroui-pro/react/code-block'
import { Code as InlineCode } from '@heroui/react'
import { Link as HerouiLink } from '@heroui/react'

import { Mermaid } from '@/components/mermaid'

export const components: MDXComponents = {
  h1: props => (
    <ViewTransition name={props.children} share="text-morph" default="none">
      <WrapHeadingWithId>
        <h1>{props.children}</h1>
      </WrapHeadingWithId>
    </ViewTransition>
  ),
  h2: props => (
    <WrapHeadingWithId>
      <h2>{props.children}</h2>
    </WrapHeadingWithId>
  ),
  h3: props => (
    <WrapHeadingWithId>
      <h3>{props.children}</h3>
    </WrapHeadingWithId>
  ),
  h4: props => (
    <WrapHeadingWithId>
      <h4>{props.children}</h4>
    </WrapHeadingWithId>
  ),
  code: props => (
    <InlineCode className="before:content-none after:content-none text-foreground">
      {props.children}
    </InlineCode>
  ),
  pre: props => {
    const code = (props.children.props.children as string).trim()

    const lang = (props.children.props.className || '').split('-')[1]

    if (lang === 'mermaid') {
      return <Mermaid chart={code} />
    }

    return (
      <CodeBlock>
        <CodeBlock.Header>
          <span className="text-muted text-xs uppercase">{lang}</span>
          <CodeBlock.CopyButton code={code} />
        </CodeBlock.Header>
        <CodeBlock.Code code={code} language="typescript" />
      </CodeBlock>
    )
  },
  mermaid: Mermaid,
  Mermaid,
  a: props => {
    const url = props.href as string
    return url.startsWith('http://') || url.startsWith('https://') ? (
      <HerouiLink target="_blank" {...props}>
        {props.children}
        <HerouiLink.Icon />
      </HerouiLink>
    ) : (
      <Link {...props}>{props.children}</Link>
    )
  },
}

export function useMDXComponents(): MDXComponents {
  return components
}

const WrapHeadingWithId: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const childrenWithIds = Children.map(children, child => {
    if (isValidElement(child)) {
      const { type, props } = child as any

      if (typeof type === 'string' && /^h[1-6]$/.test(type)) {
        const slugger = new GithubSlugger()
        const headingText =
          typeof props.children === 'string' ? props.children : ''
        const slugId = slugger.slug(headingText)

        return (
          <Link className="no-underline" href={`#${slugId}`}>
            {cloneElement(child, {
              //@ts-ignore
              id: slugId,
              className: `${props.className} scroll-m-32`,
            })}
          </Link>
        )
      }
    }

    return child
  })

  return <>{childrenWithIds}</>
}
