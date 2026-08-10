import { Html, Body, Container, Text, Heading, Markdown } from 'react-email'

export function CommentEmail({
  username,
  content,
  postTitle,
}: {
  username: string
  content: string
  postTitle: string
}) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>新的博客评论</Heading>

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
