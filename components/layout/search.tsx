'use client'

import { useEffect, useState } from 'react'

import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useHits, useSearchBox } from 'react-instantsearch-core'

import { Command } from '@heroui-pro/react'
import { Button, Card, Chip, Kbd } from '@heroui/react'

export function SearchCommand() {
  const [isOpen, setOpen] = useState(false)
  const { query, refine } = useSearchBox()
  const { items } = useHits()
  const router = useRouter()
  const pathname = usePathname()
  const [inputValue, setInputValue] = useState(query)

  const handleChange = (value: string) => {
    setInputValue(value)
    refine(value)
  }
  useEffect(() => {
    const abortController = new AbortController()

    document.addEventListener(
      'keydown',
      event => {
        if (event.key === 'k' && event.ctrlKey) {
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
        className="w-48 flex justify-between text-muted"
        variant="secondary"
        onPress={() => setOpen(true)}
      >
        <SearchIcon />
        搜索内容
        <Kbd>
          <Kbd.Abbr keyValue="ctrl" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop isOpen={isOpen} onOpenChange={setOpen}>
          <Command.Container>
            <Command.Dialog
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
                <Command.InputGroup.Input placeholder="搜索文章..." />
                <Command.InputGroup.ClearButton />
                <Command.InputGroup.Suffix>
                  <Kbd className="text-xs">
                    <Kbd.Content>Esc</Kbd.Content>
                  </Kbd>
                </Command.InputGroup.Suffix>
              </Command.InputGroup>
              <Command.List
                renderEmptyState={() => (
                  <div className="text-muted flex h-12 items-center justify-center text-sm">
                    {query && '没有找到相关内容'}
                    {!query && '请输入内容开始搜索'}
                  </div>
                )}
                onAction={key =>
                  router.push(key as any, { transitionTypes: ['nav-forward'] })
                }
                className="gap-2 flex flex-col"
              >
                {query &&
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
                            {item.tags?.map((tag: string) => (
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
