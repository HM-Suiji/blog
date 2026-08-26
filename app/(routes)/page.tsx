import { HeroSection } from '@/components/home/hero-section'
import { PostsSection } from '@/components/home/posts-section'
import ProjectSection from '@/components/home/project-section'
import { SocialSection } from '@/components/home/social-section'
import { DirectionalTransition } from '@/components/layout/directional-transition'

export default function Home() {
  return (
    <DirectionalTransition>
      <div className="w-full h-full">
        <HeroSection />
        <ProjectSection />
        <PostsSection />
        <SocialSection />
      </div>
    </DirectionalTransition>
  )
}
