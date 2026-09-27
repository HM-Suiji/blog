'use client'

import type { Route } from 'next'

import { useEffect, useState } from 'react'

import { LoaderCircle, RefreshCw, SearchIcon, WifiOff } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch-core'

import { Command } from '@heroui-pro/react'
import { Button, Card, Chip, Kbd } from '@heroui/react'

type SearchHit = {
  objectID: string
  title: string
  description: string
  url: Route
  tags?: string[]
}

export function SearchCommand({
  triggerClassName,
}: {
  triggerClassName?: string
}) {
  const [isOpen, setOpen] = useState(false)
  const { query, refine } = useSearchBox()
  const { items } = useHits<SearchHit>()
  const { status, error, refresh } = useInstantSearch({ catchError: true })
  const router = useRouter()
  const pathname = usePathname()
  const [inputValue, setInputValue] = useState(query)
  const hasQuery = inputValue.trim().length > 0
  const isSearching = status === 'loading' || status === 'stalled'
  const hasError = status === 'error' && error !== undefined
  const showResults = hasQuery && !isSearching && !hasError

  const handleChange = (value: string) => {
    setInputValue(value)
    refine(value)
  }
  useEffect(() => {
    const abortController = new AbortController()

    document.addEventListener(
      'keydown',
      event => {
        if (
          event.key.toLowerCase() === 'k' &&
          (event.ctrlKey || event.metaKey) &&
          !event.altKey &&
          !event.repeat &&
          !event.defaultPrevented
        ) {
          event.preventDefault()
          setOpen(true)
        }
      },
      { signal: abortController.signal }
    )

    return () => {
      abortController.abort()
    }
  }, [])
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <Button
        className={triggerClassName ?? 'w-48 flex justify-between text-muted'}
        aria-label="搜索文章"
        aria-keyshortcuts="Control+K Meta+K"
        variant="secondary"
        onPress={() => setOpen(true)}
      >
        <SearchIcon aria-hidden="true" className="size-4 shrink-0" />
        <span data-search-label className="whitespace-nowrap">
          搜索内容
        </span>
        <Kbd>
          <Kbd.Abbr keyValue="ctrl" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Command.Container>
            <Command.Dialog
              aria-label="搜索文章"
              className="max-h-128"
              filter={() => true}
              inputValue={inputValue}
              onInputChange={handleChange}
            >
              <Command.Header>
                <Chip size="sm">博客</Chip>
              </Command.Header>
              <Command.InputGroup autoFocus>
                <Command.InputGroup.Prefix>
                  <SearchIcon />
                </Command.InputGroup.Prefix>
                <Command.InputGroup.Input
                  aria-label="搜索文章"
                  placeholder="搜索文章..."
                />
                <Command.InputGroup.ClearButton />
                <Command.InputGroup.Suffix>
                  <Kbd className="text-xs">
                    <Kbd.Content>Esc</Kbd.Content>
                  </Kbd>
                </Command.InputGroup.Suffix>
              </Command.InputGroup>
              {hasError ? (
                <div className="mx-4 my-3 rounded-2xl border border-border bg-surface-secondary p-5">
                  <div role="alert" className="flex items-start gap-3">
                    <WifiOff
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-muted"
                    />
                    <div>
                      <p className="font-medium">暂时无法连接搜索服务</p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        搜索未完成，请稍后重试。你输入的内容会保留。
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onPress={refresh}
                    className="mt-4"
                  >
                    <RefreshCw aria-hidden="true" className="size-4" />
                    重新搜索
                  </Button>
                </div>
              ) : null}
              <Command.List
                aria-label="文章搜索结果"
                aria-busy={hasQuery && isSearching}
                renderEmptyState={() =>
                  hasError ? null : (
                    <div
                      role="status"
                      aria-live="polite"
                      className="text-muted flex min-h-24 items-center justify-center gap-2 px-5 text-center text-sm"
                    >
                      {!hasQuery ? (
                        '输入标题、标签或关键词，寻找一篇文章'
                      ) : isSearching ? (
                        <>
                          {status === 'stalled' ? (
                            <LoaderCircle
                              aria-hidden="true"
                              className="size-4 animate-spin motion-reduce:animate-none"
                            />
                          ) : null}
                          {status === 'stalled'
                            ? '搜索仍在进行，请稍候…'
                            : '正在搜索…'}
                        </>
                      ) : (
                        '没有找到相关内容，试试其他关键词'
                      )}
                    </div>
                  )
                }
                onAction={key => {
                  const hit = items.find(item => item.url === key)
                  if (!hit) return
                  setOpen(false)
                  router.push(hit.url, { transitionTypes: ['nav-forward'] })
                }}
                className="gap-2 flex flex-col"
              >
                {showResults &&
                  items.map(item => (
                    <Command.Item
                      className="p-0 mx-2 rounded-xl"
                      key={item.url}
                      id={item.url}
                      textValue={item.title}
                    >
                      <Link
                        href={item.url}
                        transitionTypes={['nav-forward']}
                        className="w-full"
                      >
                        <Card className="w-full bg-transparent">
                          <Card.Title className="font-medium">
                            {item.title}
                          </Card.Title>
                          <Card.Description className="text-sm text-default-500 line-clamp-2">
                            {item.description}
                          </Card.Description>
                          <Card.Content className="w-full flex flex-row gap-2 flex-wrap">
                            {item.tags?.map(tag => (
                              <Chip key={tag}>{tag}</Chip>
                            ))}
                          </Card.Content>
                        </Card>
                      </Link>
                    </Command.Item>
                  ))}
              </Command.List>
              <Command.Footer className="justify-between [&_kbd]:h-5 [&_kbd]:text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <Kbd className="text-xs">
                        <Kbd.Abbr keyValue="up" />
                      </Kbd>
                      <Kbd className="text-xs">
                        <Kbd.Abbr keyValue="down" />
                      </Kbd>
                    </div>
                    <span>导航</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Kbd>
                      <Kbd.Abbr keyValue="enter" />
                    </Kbd>
                    <span>选择</span>
                  </div>
                </div>
              </Command.Footer>
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  )
}
