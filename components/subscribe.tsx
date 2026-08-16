import { Check } from 'lucide-react'

import {
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Button,
  cn,
} from '@heroui/react'

import { subscribeNewsletter } from '@/server/actions/newsletter.action'

export const SubscribeMe: React.FC<{
  className?: string
  classNames?: {
    form?: string
    header?: string
  }
}> = ({ className, classNames }) => {
  return (
    <Card
      className={cn(
        'mt-16 w-full max-w-sm md:w-96 p-6 flex flex-col gap-6',
        className
      )}
    >
      <Card.Header className={classNames?.header}>
        <Card.Title>订阅我的博客</Card.Title>
        <Card.Description>在博客更新时获得最新通知</Card.Description>
      </Card.Header>
      <Form
        className={cn('flex flex-col gap-4 w-full', classNames?.form)}
        action={subscribeNewsletter}
      >
        <Card.Content>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
        </Card.Content>

        <Card.Footer className="flex flex-row gap-2">
          <Button type="submit">
            <Check />
            订阅
          </Button>
          <Button type="reset" variant="secondary">
            取消
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
