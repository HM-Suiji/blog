import { ViewTransition } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@heroui/react'

import { Post } from '@/types/post'

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`} transitionTypes={['nav-forward']}>
      <Card className="h-auto md:h-36 w-full items-stretch flex-col md:flex-row">
        <div className="md:relative my-auto w-full md:w-24 md:h-16 shrink-0 overflow-hidden rounded-2xl md:block">
          <Image
            src={post.cover}
            alt={post.title}
            width={960}
            height={640}
            sizes="(max-width: 768px) 100vw, 96px"
          />
        </div>
        <div className="flex flex-1 flex-col min-w-0 p-2 md:p-0">
          <div>
            <span className="text-xs text-muted">{post.publishedAt}</span>
          </div>
          <Card.Header className="my-auto">
            <ViewTransition name={post.title} share="text-morph" default="none">
              {post.title}
            </ViewTransition>
          </Card.Header>
          <Card.Description className="line-clamp-2 md:line-clamp-3 my-auto">
            {post.description}
          </Card.Description>
        </div>
      </Card>
    </Link>
  )
}
