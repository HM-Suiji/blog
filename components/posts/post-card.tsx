import { ViewTransition } from 'react'

import { ArrowUpRight, Pin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Post } from '@/types/post'

import styles from './archive.module.css'

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Link
      href={`/posts/${post.slug}`}
      prefetch={true}
      transitionTypes={['nav-forward']}
      className={styles.postCard}
    >
      {post.cover && (
        <div className={styles.cover}>
          <Image
            src={post.cover}
            alt=""
            width={960}
            height={640}
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) 48vw, 550px"
          />
        </div>
      )}
      <div className={styles.cardContent}>
        <div className={styles.cardMetadata}>
          <time dateTime={post.publishedAt}>
            {post.publishedAt.replaceAll('-', '.')}
          </time>
          {post.pin && (
            <span>
              <Pin size={12} aria-hidden="true" /> 置顶
            </span>
          )}
        </div>
        <ViewTransition
          name={`post-title-${post.id}`}
          share="text-morph"
          default="none"
        >
          <h2>{post.title}</h2>
        </ViewTransition>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.tags}>
            {post.tags.slice(0, 2).join(' · ')}
          </span>
          <span className={styles.cardArrow} aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  )
}
