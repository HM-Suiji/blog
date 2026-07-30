import { HeroSection } from '@/components/home/hero-section'
import ProjectSection from '@/components/home/project-section'
import { SocialSection } from '@/components/home/social-section'

export default function Home() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <ProjectSection />
      <SocialSection />
    </div>
  )
}
