'use client'

import { Rss } from 'lucide-react'

import { Button } from '@heroui/react'

export const RSSButton: React.FC = () => {
  return (
    <Button variant="outline">
      <Rss />
      RSS
    </Button>
  )
}
