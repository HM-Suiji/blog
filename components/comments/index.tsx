import { ToggleButton, ToggleButtonGroup } from '@heroui/react'

import { RichEditor } from '../layout/rich-editor'

function getComments(postId: string) {
  // TODO: 获取评论
  return postId
}

export const CommentsContainer: React.FC<{ postId: string }> = ({ postId }) => {
  getComments(postId)
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
        <RichEditor />
      </div>
    </div>
  )
}
