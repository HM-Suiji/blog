'use client'

import { Rss, Shuffle } from 'lucide-react'

import { Button, toast } from '@heroui/react'

import { siteConfig } from '@/config/site'
import { Friend } from '@/types/friend'

export const RSSButton: React.FC = () => {
  const copyRSS = async () => {
    try {
      await navigator.clipboard.writeText(`${siteConfig.url}/rss.xml`)
      toast.success('成功复制RSS订阅地址')
    } catch {
      toast.danger(`复制失败，请前往${siteConfig.url}/rss.xml 查看`)
    }
  }
  return (
    <Button variant="outline" onPress={copyRSS}>
      <Rss />
      RSS
    </Button>
  )
}

export const ExploreFriend: React.FC<{
  friends: Friend[]
}> = ({ friends }) => {
  const go = () => {
    const randomFriend = friends[Math.floor(Math.random() * friends.length)]
    window.open(randomFriend.link, '_blank')
  }
  return (
    <Button variant="secondary" size="sm" onPress={go}>
      <Shuffle />
      随机访问
    </Button>
  )
}
