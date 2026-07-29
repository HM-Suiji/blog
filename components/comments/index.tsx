'use client'

import { useRef, useState } from 'react'

import { Editor } from '@tiptap/core'

import { Markdown } from '@heroui-pro/react'
import { Button, toast, ToggleButton, ToggleButtonGroup } from '@heroui/react'

import { SignoutButton } from '@/components/auth/oauth-button'
import { GithubOAuth } from '@/components/auth/oauth-button'
import { RichEditor } from '@/components/layout/rich-editor'
import { authClient } from '@/utils/auth-client'

function getComments(postId: string) {
  // TODO: 获取评论
  return postId
}

export const CommentsContainer: React.FC<{ postId: string }> = ({ postId }) => {
  getComments(postId)
  const { data: session } = authClient.useSession()
  const editorRef = useRef<Editor>(null)

  const [comments, setComments] = useState<string[]>([])

  const handleComment = () => {
    if (!editorRef.current)
      return toast.warning('评论框初始化异常，请联系管理员或刷新重试。')

    if (!editorRef.current.getMarkdown().trim())
      return toast.warning('评论内容不能为空')

    setComments([...comments, editorRef.current.getMarkdown().trim()])

    editorRef.current.commands.clearContent()
  }

  return (
    <div className="w-full p-4 border">
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
        <div>
          {comments.map((comment, index) => (
            <div key={index} className="p-2 border my-2">
              <Markdown>{comment}</Markdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
