'use client'

import { useMemo } from 'react'

import { ArrowUp, Reply } from 'lucide-react'
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

import { Avatar, Button } from '@heroui/react'

import { CommentWithAuthor } from '@/types/comment'

type CommentThread = CommentWithAuthor & {
  replies: CommentWithAuthor[]
}

const buildCommentTree = (comments: CommentWithAuthor[]): CommentThread[] => {
  const byId = new Map(comments.map(comment => [comment.id, comment]))
  const roots: CommentWithAuthor[] = []
  const repliesByRoot = new Map<string, CommentWithAuthor[]>()

  const getRootId = (comment: CommentWithAuthor) => {
    let current = comment
    const seen = new Set<string>()

    while (current.replyToId && byId.has(current.replyToId)) {
      if (seen.has(current.id)) return current.id
      seen.add(current.id)
      current = byId.get(current.replyToId)!
    }

    return current.id
  }

  for (const comment of comments) {
    if (!comment.replyToId || !byId.has(comment.replyToId)) {
      roots.push(comment)
    }
  }

  for (const comment of comments) {
    if (!comment.replyToId || !byId.has(comment.replyToId)) continue

    const rootId = getRootId(comment)
    if (rootId === comment.id) continue

    const replies = repliesByRoot.get(rootId)
    if (replies) {
      replies.push(comment)
    } else {
      repliesByRoot.set(rootId, [comment])
    }
  }

  return roots.map(root => ({
    ...root,
    replies: repliesByRoot.get(root.id) ?? [],
  }))
}

export const CommentResult: React.FC<{
  comments: CommentWithAuthor[]
  isLoading: boolean
  onReply: (comment: CommentWithAuthor) => void
}> = ({ comments, isLoading, onReply }) => {
  const threads = useMemo(() => buildCommentTree(comments), [comments])
  const nameById = useMemo(
    () => new Map(comments.map(comment => [comment.id, comment.userName])),
    [comments]
  )

  if (isLoading) return <div className="text-muted py-4">加载中...</div>

  if (comments.length === 0) {
    return <div className="text-muted py-4">暂无评论</div>
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {threads.map(thread => (
        <CommentItem
          key={thread.id}
          comment={thread}
          replies={thread.replies}
          nameById={nameById}
          onReply={onReply}
        />
      ))}
    </div>
  )
}

const CommentItem: React.FC<{
  comment: CommentWithAuthor
  replies?: CommentWithAuthor[]
  nameById: Map<string, string>
  onReply: (comment: CommentWithAuthor) => void
  isReply?: boolean
}> = ({ comment, replies = [], nameById, onReply, isReply = false }) => {
  const { browser, os } = UAParser(comment.userAgent)
  const replyToName = comment.replyToId
    ? nameById.get(comment.replyToId)
    : undefined

  return (
    <div className={isReply ? 'py-2' : 'p-2 border'}>
      <div className="flex md:items-center gap-2 flex-col md:flex-row md:justify-between">
        <div className="flex gap-2 items-center">
          <Avatar size="sm">
            <Avatar.Image src={comment.userAvatar} />
          </Avatar>
          <span>{comment.userName}</span>
          {replyToName && (
            <span className="text-muted text-sm">回复 @{replyToName}</span>
          )}
          <span className="text-muted">{comment.createdAt}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-muted flex items-center gap-1">
            {os.name === 'Windows' && <FaWindows />}
            {(os.name === 'Mac OS' || os.name === 'iOS') && <FaApple />}
            {os.name === 'Android' && <FaAndroid />}
            {os.name === 'Linux' && <FaLinux />}
            {os.name}
          </span>
          <span className="text-muted flex items-center gap-1">
            {browser.name === 'Chrome' && <FaChrome />}
            {(browser.name === 'Firefox' ||
              browser.name === 'Mobile Firefox') && <FaFirefox />}
            {browser.name === 'Safari' && <FaSafari />}
            {browser.name === 'Edge' && <FaEdge />}
            {browser.name} {browser.version}
          </span>
        </div>
      </div>
      <div className="mt-3 mb-2">
        <Markdown>{comment.content}</Markdown>
      </div>
      <div className="flex items-center justify-between text-muted">
        <span className="flex items-center">
          <ArrowUp size={20} /> {comment.hot + 1}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => onReply(comment)}
          aria-label={`回复 ${comment.userName}`}
        >
          <Reply size={16} />
          回复
        </Button>
      </div>
      {replies.length > 0 && (
        <div className="mt-3 ml-4 md:ml-8 flex flex-col gap-2 border-l pl-3 md:pl-4">
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              nameById={nameById}
              onReply={onReply}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  )
}
