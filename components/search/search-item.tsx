import Link from 'next/link'

import { Card, Chip } from '@heroui/react'

interface Props {
  hit: any
}

export default function SearchItem({ hit }: Props) {
  return (
    <Link href={hit.url}>
      <Card className="border">
        <Card.Title className="font-medium">{hit.title}</Card.Title>
        <Card.Description className="text-sm text-default-500 line-clamp-2">
          {hit.description}
        </Card.Description>
        <Card.Content className="w-full flex flex-row gap-2 flex-wrap">
          {hit.tags?.map((tag: string) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </Card.Content>
      </Card>
    </Link>
  )
}
