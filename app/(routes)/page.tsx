import { HomeContent } from '@/components/home/home-content'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import { PageReveal } from '@/components/motion/page-reveal'
import { findPosts } from '@/server/actions/post.action'

export default async function Home() {
  // A temporary content-service outage should not hide the profile and projects.
  const posts = await findPosts().catch(() => null)
  return (
    <DirectionalTransition>
      <PageReveal>
        <HomeContent posts={posts ?? []} postsUnavailable={posts === null} />
      </PageReveal>
    </DirectionalTransition>
  )
}
