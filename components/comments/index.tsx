'use client'

import { useRef, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Editor } from '@tiptap/core'

import { Button, toast, ToggleButton, ToggleButtonGroup } from '@heroui/react'

import { SignoutButton } from '@/components/auth/oauth-button'
import { GithubOAuth } from '@/components/auth/oauth-button'
import { RichEditor } from '@/components/layout/rich-editor'
import { findComments, publishComment } from '@/server/actions/comment.action'
import { CommentWithAuthor } from '@/types/comment'
import { authClient } from '@/utils/auth-client'

import { CommentResult } from './comment-result'

export const CommentsContainer: React.FC<{
  postId: string
  postName: string
}> = ({ postId, postName }) => {
  const { data: session } = authClient.useSession()
  const editorRef = useRef<Editor>(null)
  const queryClient = useQueryClient()
  const [replyTo, setReplyTo] = useState<{
    id: string
    userName: string
    content: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => findComments(postId),
  })

  const commentCount = comments.filter(comment => !comment.replyToId).length
  const replyCount = comments.filter(comment => comment.replyToId).length

  const handleReply = (comment: CommentWithAuthor) => {
    if (!session?.session) {
      toast.warning('请先登录再回复')
      document.querySelector('#comment')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      return
    }

    setReplyTo({
      id: comment.id,
      userName: comment.userName,
      content: comment.content,
    })
    document.querySelector('#comment')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleComment = async () => {
    if (!editorRef.current)
      return toast.warning('评论框初始化异常，请联系管理员或刷新重试。')

    if (!session?.session) return toast.warning('请先登录再进行评论')

    const content = editorRef.current.getMarkdown().trim()

    if (!content) return toast.warning('评论内容不能为空')

    setIsSubmitting(true)
    try {
      await publishComment(
        {
          postId,
          userAgent: session.session.userAgent || undefined,
          content: content,
          replyToId: replyTo?.id,
        },
        { postName: postName }
      )
      editorRef.current.commands.clearContent()
      toast.success(replyTo ? '回复发布成功' : '评论发布成功')
      setReplyTo(null)
      await queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    } catch (e) {
      toast.danger(e instanceof Error ? e.message : '评论发布失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full p-4 border" id="comment">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span className="tabular-nums">{commentCount} 条评论</span> ·{' '}
          <span className="tabular-nums">{replyCount} 条回复</span>
        </div>
        <div className="w-1/3">
          <ToggleButtonGroup
            defaultSelectedKeys={['time']}
            fullWidth
            selectionMode="single"
          >
            <ToggleButton aria-label="时间早优先" id="time">
              <ToggleButtonGroup.Separator />
              最早
            </ToggleButton>
            <ToggleButton aria-label="热度高优先" id="hot">
              <ToggleButtonGroup.Separator />
              最热
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="mt-6">
        {replyTo && (
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm text-muted">
              正在回复{' '}
              <span className="text-foreground">{replyTo.userName}</span>
              <br />
              <span className="text-xs text-muted">
                {'>'} {replyTo.content}
              </span>
            </p>
            <Button variant="ghost" size="sm" onPress={() => setReplyTo(null)}>
              取消
            </Button>
          </div>
        )}
        <RichEditor editorRef={editorRef} />
        <div className="flex justify-between mt-4">
          <SignoutButton />
          {session?.session ? (
            <Button
              onPress={handleComment}
              variant="secondary"
              isDisabled={isSubmitting}
            >
              {replyTo ? '回复' : '评论'}
            </Button>
          ) : (
            <GithubOAuth />
          )}
        </div>
        <CommentResult
          comments={comments}
          isLoading={isLoading}
          onReply={handleReply}
        />
      </div>
    </div>
  )
}
