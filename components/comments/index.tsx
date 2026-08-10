'use client'

import { useRef } from 'react'

import { Editor } from '@tiptap/core'

import { Button, toast, ToggleButton, ToggleButtonGroup } from '@heroui/react'

import { SignoutButton } from '@/components/auth/oauth-button'
import { GithubOAuth } from '@/components/auth/oauth-button'
import { RichEditor } from '@/components/layout/rich-editor'
import { publishComment } from '@/server/actions/comment.action'
import { authClient } from '@/utils/auth-client'

import { CommentResult } from './comment-result'

export const CommentsContainer: React.FC<{
  postId: string
  postName: string
}> = ({ postId, postName }) => {
  const { data: session } = authClient.useSession()
  const editorRef = useRef<Editor>(null)

  const handleComment = async () => {
    if (!editorRef.current)
      return toast.warning('评论框初始化异常，请联系管理员或刷新重试。')

    if (!session?.session) return toast.warning('请先登录再进行评论')

    const content = editorRef.current.getMarkdown().trim()

    if (!content) return toast.warning('评论内容不能为空')

    try {
      await publishComment(
        {
          postId,
          userAgent: session.session.userAgent,
          content: content,
          userId: session.user.id,
          ip: session.session.ipAddress,
          status: 'approved',
        },
        { userName: session.user.name, postName: postName }
      )
      editorRef.current.commands.clearContent()
    } catch (e) {
      toast.danger(e instanceof Error ? e.message : '评论发布失败')
    }
  }

  return (
    <div className="w-full p-4 border" id="comment">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span>{0} 条评论</span> · <span>{0} 条回复</span>
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
        <RichEditor editorRef={editorRef} />
        <div className="flex justify-between mt-4">
          <SignoutButton />
          {session?.session ? (
            <Button onPress={handleComment} variant="secondary">
              评论
            </Button>
          ) : (
            <GithubOAuth />
          )}
        </div>
        <CommentResult postId={postId} />
      </div>
    </div>
  )
}
