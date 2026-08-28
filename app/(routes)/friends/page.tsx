import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'

import { CodeBlock } from '@heroui-pro/react/code-block'

import { ExploreFriend } from '@/components/feature-button'
import { FriendCanvas } from '@/components/friend-canvas'
import { FriendForm } from '@/components/friend-form'
import { DirectionalTransition } from '@/components/layout/directional-transition'
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
      <div className="min-h-screen w-full flex flex-col pt-12 items-center px-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold">友情链接</h1>
          <h3 className="text-muted text-center">海内存知己，天涯若比邻</h3>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              已收录<span className="text-accent">{friends.length}</span>位朋友
            </div>
            <ExploreFriend friends={friends} />
          </div>
        </div>
        <FriendCanvas friends={friends} />
        <div className="mt-20 md:mt-40 justify-center flex flex-col gap-2 w-full">
          <h2 className="mx-auto text-2xl">我的友链</h2>
          <h3 className="mx-auto text-muted text-center">
            很高兴能与你们相遇！
          </h3>
          <div className="w-full overflow-x-auto">
            <CodeBlock>
              <CodeBlock.Header>
                <span className="text-muted text-xs uppercase">json</span>
                <CodeBlock.CopyButton code={code} />
              </CodeBlock.Header>
              <CodeBlock.Code code={code} language="typescript" />
            </CodeBlock>
          </div>
        </div>
        <div className="mt-16 p-4 md:px-8 w-full border rounded-sm">
          <h2 className="flex justify-center text-2xl my-6">成为我的朋友</h2>
          <FriendForm />
        </div>
      </div>
    </DirectionalTransition>
  )
}
