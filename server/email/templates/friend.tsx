import { Body, Container, Heading, Html, Img, Text } from 'react-email'

import { InsertFriend } from '@/server/db/schema'

export function FriendApplyEmail({
  friend: { name, link, avatar, description },
}: {
  friend: InsertFriend
}) {
  return (
    <Html>
      <Body>
        <Container
          style={{
            border: '1px solid #eee',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          <Heading>新的友链申请</Heading>

          <Img
            src={avatar || ''}
            width="64"
            height="64"
            style={{
              borderRadius: '50%',
            }}
          />

          <Heading>{name}</Heading>

          <Text>{description}</Text>

          <Text>{link}</Text>
        </Container>
      </Body>
    </Html>
  )
}
