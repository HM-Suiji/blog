'use client'

import { Rss } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Avatar, Button, toast } from '@heroui/react'

import { siteConfig } from '@/config/site'
import { Friend } from '@/types/friend'

export const RSSButton: React.FC = () => {
  const copyRSS = async () => {
    try {
      await navigator.clipboard.writeText(`${siteConfig.url}/rss.xml`)
      toast.success('成功复制RSS订阅地址')
    } catch {
      toast.danger(`复制失败，请前往${siteConfig.url}/rss.xml 查看`)
      redirect(`${siteConfig.url}/rss.xml`)
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
  friend: Friend
}> = ({ friend }) => {
  return (
    <Button>
      <Avatar>
        <Avatar.Image src={friend.avatar} alt={friend.name} />
        <Avatar.Fallback></Avatar.Fallback>
      </Avatar>
    </Button>
  )
}
