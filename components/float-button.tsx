'use client'

import { useEffect, useState } from 'react'

import { useWindowScroll } from '@uidotdev/usehooks'
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Link,
  MessageSquare,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button, cn, toast } from '@heroui/react'

import { siteConfig } from '@/config/site'
import { useMobile } from '@/hooks/use-mobile'

export const FloatButton: React.FC = () => {
  const [status, setStatus] = useState<'collapsed' | 'expanded' | 'hidden'>(
    'hidden'
  )
  const [{ y }, scrollTo] = useWindowScroll()
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    if (!y) return
    if (y > 200 && y < 1000) {
      setStatus('expanded')
    } else if (y > 1000) {
      setStatus('collapsed')
    } else if (pathname.startsWith('/posts') && pathname !== '/posts') {
      setStatus('expanded')
    } else if (y < 200) {
      setStatus('hidden')
    }
  }, [y])

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.url + pathname)
    toast.success('已复制链接')
  }

  const handleScrollToComments = () => {
    document.querySelector('#comment')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div
      className={cn(
        'fixed bottom-16 md:bottom-20 right-2 md:right-10 z-20 flex flex-col gap-2 overflow-hidden',
        status === 'hidden' && 'hidden'
      )}
    >
      <Button
        size={isMobile ? 'sm' : 'md'}
        variant="outline"
        onPress={() => scrollTo({ top: 0, behavior: 'smooth' })}
        isIconOnly
        aria-label="回到顶部"
        className={cn(
          'translate-x-0 transition-transform duration-300 ease-in-out',
          status === 'collapsed' && 'translate-x-full'
        )}
      >
        <ArrowUp />
      </Button>

      {pathname.startsWith('/posts') && pathname !== '/posts' && (
        <div
          className={cn(
            'flex flex-col gap-2 translate-x-0 transition-transform duration-300 ease-in-out',
            status === 'collapsed' && 'translate-x-full'
          )}
        >
          <Button
            size={isMobile ? 'sm' : 'md'}
            isIconOnly
            aria-label="跳转至评论区"
            variant="outline"
            onPress={handleScrollToComments}
          >
            <MessageSquare />
          </Button>
          <Button
            size={isMobile ? 'sm' : 'md'}
            isIconOnly
            aria-label="复制本页链接"
            variant="outline"
            onPress={handleCopy}
          >
            <Link />
          </Button>
        </div>
      )}

      <div
        className={cn(
          'translate-x-0 transition-transform duration-300 ease-in-out',
          status === 'collapsed' && 'translate-x-1/3'
        )}
      >
        {status === 'expanded' && (
          <Button
            size={isMobile ? 'sm' : 'md'}
            variant="outline"
            onPress={() => setStatus('collapsed')}
            isIconOnly
            aria-label="折叠操作按钮"
          >
            <ChevronRight />
          </Button>
        )}
        {status === 'collapsed' && (
          <Button
            size={isMobile ? 'sm' : 'md'}
            onPress={() => setStatus('expanded')}
            variant="outline"
            isIconOnly
            aria-label="展开操作按钮"
          >
            <ChevronLeft />
          </Button>
        )}
      </div>
    </div>
  )
}
