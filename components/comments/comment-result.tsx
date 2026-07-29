'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowUp } from 'lucide-react'
import {
  FaAndroid,
  FaApple,
  FaChrome,
  FaEdge,
  FaFirefox,
  FaLinux,
  FaSafari,
  FaWindows,
} from 'react-icons/fa6'
import Markdown from 'react-markdown'
import { UAParser } from 'ua-parser-js'

import { Avatar } from '@heroui/react'

import { findComments } from '@/server/actions/comment.action'

export const CommentResult: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => findComments(postId),
  })

  if (isLoading) return <div className="text-muted py-4">加载中...</div>

  return (
    <div className="flex flex-col gap-2 mt-4">
      {comments?.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

const CommentItem: React.FC<{
  comment: Awaited<ReturnType<typeof findComments>>[number]
}> = ({ comment }) => {
  const { browser, os } = UAParser(comment.userAgent)

  return (
    <div className="p-2 border">
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <Avatar.Image src={comment.userAvatar} />
        </Avatar>
        <span>{comment.userName}</span>
        <span className="text-muted">{comment.createdAt}</span>
        <span className="text-muted flex items-center gap-1">
          {os.name === 'Windows' && <FaWindows />}
          {(os.name === 'Mac OS' || os.name === 'iOS') && <FaApple />}
          {os.name === 'Android' && <FaAndroid />}
          {os.name === 'Linux' && <FaLinux />}
          {os.name}
        </span>
        <span className="text-muted flex items-center gap-1">
          {browser.name === 'Chrome' && <FaChrome />}
          {browser.name === 'Firefox' && <FaFirefox />}
          {browser.name === 'Safari' && <FaSafari />}
          {browser.name === 'Edge' && <FaEdge />}
          {browser.name} {browser.version}
        </span>
      </div>
      <div className="mt-3 mb-2">
        <Markdown>{comment.content}</Markdown>
      </div>
      <div className="flex items-center text-muted">
        <ArrowUp size={20} /> {comment.hot + 1}
      </div>
    </div>
  )
}
