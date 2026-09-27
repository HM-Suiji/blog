import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'

import { CodeBlock } from '@heroui-pro/react/code-block'

import { ExploreFriend } from '@/components/feature-button'
import { FriendCanvas } from '@/components/friend-canvas'
import { FriendForm } from '@/components/friend-form'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import { PageHeading } from '@/components/layout/page-heading'
import styles from '@/components/layout/page-heading.module.css'
import { PageReveal } from '@/components/motion/page-reveal'
import { siteConfig } from '@/config/site'
import { findFriends } from '@/server/actions/friend.action'
import { cacheSelector } from '@/utils/cache'

const code = JSON.stringify(
  {
    name: siteConfig.name,
    description: siteConfig.slogan,
    link: siteConfig.url,
    avatar: siteConfig.avatar,
  },
  null,
  2
)

export const metadata: Metadata = {
  title: '友情链接',
  description:
    '海内存知己，天涯若比邻。博客友链看似渺小，但却是博客间交流的桥梁。欢迎大家与穗积宇宙船交换友链！',
}

export default async function FriendsPage() {
  'use cache: remote'
  cacheTag(cacheSelector.friends)
  cacheLife('weeks')

  const friends = await findFriends()

  return (
    <DirectionalTransition>
      <PageReveal className={styles.page}>
        <PageHeading
          eyebrow="相邻的星球"
          title="在这里，遇见彼此。"
          description="海内存知己，天涯若比邻。沿着这些链接，去朋友们的博客坐坐，发现更多有趣的人和故事。"
        >
          <span>
            已收录 <span className="text-accent">{friends.length}</span> 位朋友
          </span>
          <ExploreFriend friends={friends} />
        </PageHeading>
        <div className={styles.friendConstellation}>
          <FriendCanvas friends={friends} />
        </div>
        <div className={styles.friendForms}>
          <section className={styles.panel} aria-labelledby="friend-link-title">
            <header className={styles.sectionHeading}>
              <h2 id="friend-link-title">我的友链</h2>
              <p>很高兴与你相遇。这是我的博客信息，欢迎交换链接。</p>
            </header>
            <div className="w-full min-w-0 overflow-x-auto">
              <CodeBlock>
                <CodeBlock.Header>
                  <span className="text-muted text-xs">JSON</span>
                  <CodeBlock.CopyButton code={code} />
                </CodeBlock.Header>
                <CodeBlock.Code code={code} language="json" />
              </CodeBlock>
            </div>
          </section>
          <section
            className={styles.panel}
            aria-labelledby="friend-apply-title"
          >
            <header className={styles.sectionHeading}>
              <h2 id="friend-apply-title">成为我的朋友</h2>
              <p>留下你的博客，让我们的宇宙有一次交集。</p>
            </header>
            <FriendForm />
          </section>
        </div>
      </PageReveal>
    </DirectionalTransition>
  )
}
