import { Check } from 'lucide-react'
import { Metadata } from 'next'

import {
  Avatar,
  Button,
  Card,
  Chip,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react'

import { siteConfig } from '@/config/site'
import { subscribeNewsletter } from '@/server/actions/newsletter.action'

export const metadata: Metadata = {
  title: '关于我',
  description:
    '我——穗积，是一个精通Typescript的全栈工程师，同时是一位天秤座ENFP，喜欢摄影、游戏、PTCG，欢迎来我的博客交流学习。',
}

export default function AboutPage() {
  const { name, constellation, MBTI, hobbies } = siteConfig.profile

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col pt-12 items-center px-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold">关于我</h1>
          <h2 className="text-muted text-center">{siteConfig.slogan}</h2>
        </div>
        <Card className="mt-8 w-full max-w-sm md:w-96 p-6 flex flex-col items-center gap-6">
          <Avatar className="size-24" aria-label={siteConfig.author}>
            <Avatar.Image alt={siteConfig.author} src={siteConfig.avatar} />
            <Avatar.Fallback className="text-2xl">
              {siteConfig.author}
            </Avatar.Fallback>
          </Avatar>
          <Card.Header className="flex flex-col items-center gap-1 p-0">
            <Card.Title className="text-xl">{name}</Card.Title>
            <Card.Description className="text-center">
              {siteConfig.description}
            </Card.Description>
          </Card.Header>
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-muted w-16 shrink-0">星座</span>
              <span>{constellation}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted w-16 shrink-0">MBTI</span>
              <Chip size="sm" color="accent" variant="secondary">
                {MBTI}
              </Chip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted w-16 shrink-0">爱好</span>
              <div className="flex gap-1 flex-wrap">
                {hobbies.map(hobby => (
                  <Chip size="sm" key={hobby}>
                    {hobby}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-16 w-full max-w-sm md:w-96 p-6 flex flex-col gap-6">
        <Card.Header>
          <Card.Title>订阅我的博客</Card.Title>
          <Card.Description>在博客更新时获得最新通知</Card.Description>
        </Card.Header>
        <Form
          className="flex flex-col gap-4 w-full"
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
    </div>
  )
}
