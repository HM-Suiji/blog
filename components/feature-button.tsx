'use client'

import { Rss } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Button, toast } from '@heroui/react'

import { siteConfig } from '@/config/site'

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
