import type { MDXComponents } from 'mdx/types'

import { Children, cloneElement, isValidElement } from 'react'

import Link from 'next/link'

import { Code as InlineCode } from '@heroui/react'

import { Code } from './components/layout/code'

const components: MDXComponents = {
  h1: props => (
    <WrapHeadingWithId>
      <h1>{props.children}</h1>
    </WrapHeadingWithId>
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
    const code = props.children.props.children as string

    let filename: string | undefined = undefined

    if (code.startsWith('#!/')) filename = code.split('\n')[0].substring(3)

    return (
      <Code
        code={code
          .split('\n')
          .slice(filename ? 1 : 0, -1)
          .join('\n')}
        filename={filename}
        lang={(props.children.props.className || '').split('-')[1]}
      />
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
        const headingText =
          typeof props.children === 'string' ? props.children : ''
        const slugId = headingText.toLowerCase().replace(/ /g, '-')

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
