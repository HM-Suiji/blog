import { Card } from '@heroui/react'

import { GithubOAuth } from '@/components/auth/oauth-button'

export default function LoginPage() {
  return (
    <>
      <Card className="py-12 px-20">
        <Card.Header className="mx-auto">
          <Card.Title className="text-3xl mb-4">欢迎你的登录</Card.Title>
          <Card.Description>登陆以获取更多功能</Card.Description>
        </Card.Header>
        <Card.Content className="mt-4 mx-auto">
          <div className="flex flex-col gap-2">
            <p>使用第三方账号登录</p>
            <GithubOAuth />
          </div>
        </Card.Content>
      </Card>
    </>
  )
}
