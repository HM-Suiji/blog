import { HomeContent } from '@/components/home/home-content'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import { PageReveal } from '@/components/motion/page-reveal'
import { findPosts } from '@/server/actions/post.action'

export default async function Home() {
  const posts = await findPosts()
  return (
    <DirectionalTransition>
      <PageReveal>
        <HomeContent posts={posts} />
      </PageReveal>
    </DirectionalTransition>
  )
}
