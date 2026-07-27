import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react'

import { registerFriend } from '@/server/actions/friend.mutate'
export const FriendForm: React.FC = () => {
  const formAction = async (formData: FormData) => {
    'use server'
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const link = formData.get('link') as string
    const avatar = formData.get('avatar') as string

    await registerFriend({
      name,
      description,
      link,
      avatar,
    })
  }

  return (
    <Form className="gap-2 flex flex-col" action={formAction}>
      <TextField name="name" type="text" isRequired>
        <Label>名称</Label>
        <Input name="name" placeholder="name" />
        <FieldError />
      </TextField>
      <TextField name="description" type="text">
        <Label>描述</Label>
        <Input name="description" placeholder="description" />
        <FieldError />
      </TextField>
      <TextField name="link" type="text" isRequired>
        <Label>链接</Label>
        <Input name="link" placeholder="link" />
        <FieldError />
      </TextField>
      <TextField name="avatar" type="url">
        <Label>头像</Label>
        <Input name="avatar" placeholder="avatar" />
        <FieldError />
      </TextField>
      <Button className="mx-auto" type="submit" variant="primary">
        提交
      </Button>
    </Form>
  )
}
