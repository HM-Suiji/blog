import { Html, Body, Container, Text, Heading, Markdown } from 'react-email'

export function CommentEmail({
  username,
  content,
  postTitle,
  isReply = false,
}: {
  username: string
  content: string
  postTitle: string
  isReply?: boolean
}) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>{isReply ? '新的博客回复' : '新的博客评论'}</Heading>

          <Text>
            文章：
            {postTitle}
          </Text>

          <Text>
            用户：
            {username}
          </Text>

          <Text>评论内容：</Text>

          <Markdown>{content}</Markdown>
        </Container>
      </Body>
    </Html>
  )
}
