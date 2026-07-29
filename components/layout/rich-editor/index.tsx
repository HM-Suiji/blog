'use client'

import { RefObject, useState } from 'react'

import { Editor, JSONContent } from '@tiptap/core'
import { Markdown } from '@tiptap/markdown'
import {
  Bold,
  Braces,
  BrushCleaning,
  CodeXml,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  RotateCcw,
  RotateCw,
  StrikethroughIcon,
  Trash,
  Underline,
} from 'lucide-react'

import { RichTextEditor } from '@heroui-pro/react'
import { Separator } from '@heroui/react'

export const RichEditor: React.FC<{ editorRef: RefObject<Editor | null> }> = ({
  editorRef,
}) => {
  const [documentJson, setDocumentJson] = useState<JSONContent>()

  return (
    <RichTextEditor
      placeholder="写评论"
      defaultValue={documentJson}
      onValueChange={(value, details) => {
        setDocumentJson(value)
        if (editorRef) {
          editorRef.current = details.editor
        }
      }}
      maxLength={1000}
      extensions={[Markdown]}
    >
      <RichTextEditor.Shell>
        <DefaultToolbar />
        <RichTextEditor.Content />
        <BubbleToolbar />
        <RichTextEditor.Footer>
          <RichTextEditor.CharacterCount>
            {stats => stats.characters + ' 个字'}
          </RichTextEditor.CharacterCount>
        </RichTextEditor.Footer>
      </RichTextEditor.Shell>
    </RichTextEditor>
  )
}

const DefaultToolbar: React.FC = () => {
  return (
    <RichTextEditor.Toolbar>
      <RichTextEditor.ToolbarGroup>
        <RichTextEditor.ActionButton action="undo" tooltip="撤销">
          <RotateCcw />
        </RichTextEditor.ActionButton>
        <RichTextEditor.ActionButton action="redo" tooltip="恢复">
          <RotateCw />
        </RichTextEditor.ActionButton>
      </RichTextEditor.ToolbarGroup>
      <Separator orientation="vertical" className="h-5 bg-muted" />
      <RichTextEditor.ToolbarGroup>
        <RichTextEditor.ToggleButton command="bold" tooltip="加粗">
          <Bold />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="italic" tooltip="斜体">
          <Italic />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="underline" tooltip="下划线">
          <Underline />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="strike" tooltip="删除线">
          <StrikethroughIcon />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="code" tooltip="行内代码">
          <CodeXml />
        </RichTextEditor.ToggleButton>
      </RichTextEditor.ToolbarGroup>
      <Separator orientation="vertical" className="h-5 bg-muted" />
      <RichTextEditor.ToolbarGroup>
        <RichTextEditor.ToggleButton command="heading-1" tooltip="一级标题">
          <Heading1 />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="heading-2" tooltip="二级标题">
          <Heading2 />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="heading-3" tooltip="三级标题">
          <Heading3 />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="blockquote" tooltip="引用">
          <Quote />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="codeBlock" tooltip="代码块">
          <Braces />
        </RichTextEditor.ToggleButton>
      </RichTextEditor.ToolbarGroup>
      <Separator orientation="vertical" className="h-5 bg-muted" />
      <RichTextEditor.ToolbarGroup>
        <RichTextEditor.ToggleButton command="bulletList" tooltip="无序列表">
          <List />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="orderedList" tooltip="有序列表">
          <ListOrdered />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.LinkPopover>
          <RichTextEditor.LinkPopover.Trigger tooltip="链接">
            <Link />
          </RichTextEditor.LinkPopover.Trigger>
          <RichTextEditor.LinkPopover.Content>
            <RichTextEditor.LinkPopover.Input />
            <RichTextEditor.LinkPopover.Actions>
              <RichTextEditor.LinkPopover.UnsetButton>
                重置
              </RichTextEditor.LinkPopover.UnsetButton>
              <RichTextEditor.LinkPopover.ApplyButton>
                确认
              </RichTextEditor.LinkPopover.ApplyButton>
            </RichTextEditor.LinkPopover.Actions>
          </RichTextEditor.LinkPopover.Content>
        </RichTextEditor.LinkPopover>
      </RichTextEditor.ToolbarGroup>
      <Separator orientation="vertical" className="h-5 bg-muted" />
      <RichTextEditor.ToolbarGroup>
        <RichTextEditor.ActionButton
          action="clearFormatting"
          tooltip="清除样式"
        >
          <BrushCleaning />
        </RichTextEditor.ActionButton>
        <RichTextEditor.ActionButton action="clearContent" tooltip="清空内容">
          <Trash />
        </RichTextEditor.ActionButton>
      </RichTextEditor.ToolbarGroup>
    </RichTextEditor.Toolbar>
  )
}

const BubbleToolbar: React.FC = () => {
  return (
    <RichTextEditor.BubbleMenu>
      <RichTextEditor.ToggleButton command="bold" tooltip="加粗">
        <Bold />
      </RichTextEditor.ToggleButton>
      <RichTextEditor.ToggleButton command="italic" tooltip="斜体">
        <Italic />
      </RichTextEditor.ToggleButton>
      <RichTextEditor.ToggleButton command="underline" tooltip="下划线">
        <Underline />
      </RichTextEditor.ToggleButton>
      <RichTextEditor.ToggleButton command="strike" tooltip="删除线">
        <StrikethroughIcon />
      </RichTextEditor.ToggleButton>
      <RichTextEditor.LinkPopover>
        <RichTextEditor.LinkPopover.Trigger tooltip="链接">
          <Link />
        </RichTextEditor.LinkPopover.Trigger>
        <RichTextEditor.LinkPopover.Content>
          <RichTextEditor.LinkPopover.Input />
          <RichTextEditor.LinkPopover.Actions>
            <RichTextEditor.LinkPopover.UnsetButton>
              重置
            </RichTextEditor.LinkPopover.UnsetButton>
            <RichTextEditor.LinkPopover.ApplyButton>
              确认
            </RichTextEditor.LinkPopover.ApplyButton>
          </RichTextEditor.LinkPopover.Actions>
        </RichTextEditor.LinkPopover.Content>
      </RichTextEditor.LinkPopover>
    </RichTextEditor.BubbleMenu>
  )
}
