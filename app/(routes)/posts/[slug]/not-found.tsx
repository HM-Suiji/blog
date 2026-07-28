import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@heroui/react'

export default function PostNotFound() {
  return (
    <div className="flex flex-col h-[80vh] w-full justify-center items-center gap-4">
      <h1 className="text-2xl">未找到当前这条博客，请检查路径是否正确</h1>
      <Link href={'/posts'} className="flex flex-row gap-2 mt-6">
        <Button variant="secondary">
          <ArrowLeft />
          博客列表
        </Button>
      </Link>
    </div>
  )
}
