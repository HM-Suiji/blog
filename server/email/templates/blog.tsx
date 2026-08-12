import { Body, Button, Container, Heading, Html, Text, Img } from 'react-email'

import { siteConfig } from '@/config/site'

export const BlogUpdateEmail: React.FC<{
  title: string
  url: string
  description: string
  cover?: string
}> = ({ title, url, description, cover }) => {
  return (
    <Html>
      <Body>
        <Container>
          {cover && <Img src={cover} />}

          <Heading>{title}</Heading>

          <Text>文章描述：{description}</Text>

          <Button href={url}>阅读全文</Button>

          <Text>
            欢迎访问我的博客-{siteConfig.name}：{siteConfig.url}
          </Text>

          <Text>你收到这封邮件，是因为你订阅了博客更新。</Text>
        </Container>
      </Body>
    </Html>
  )
}
