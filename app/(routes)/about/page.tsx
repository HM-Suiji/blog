import { Metadata } from 'next'

import { Avatar, Card, Chip } from '@heroui/react'

import { CareerCard } from '@/components/about/career-card'
import { SkillsCard } from '@/components/about/skills-card'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import { ProfileJsonLd } from '@/components/seo/profile-json-ld'
import { SubscribeMe } from '@/components/subscribe'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: '关于我',
  description:
    '我——穗积，是一个精通Typescript的全栈工程师，同时是一位天秤座ENFP，喜欢摄影、游戏、PTCG，欢迎来我的博客交流学习。',
}

export default function AboutPage() {
  const { name, constellation, MBTI, hobbies } = siteConfig.profile

  return (
    <DirectionalTransition>
      <div className="min-h-screen flex flex-col items-center">
        <ProfileJsonLd />
        <div className="w-full max-w-6xl flex flex-col pt-12 items-center px-4 sm:px-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold">关于我</h1>
            <h2 className="text-muted text-center">{siteConfig.slogan}</h2>
          </div>
          <Card className="mt-8 w-full rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <Avatar
              className="size-24 shrink-0 rounded-2xl"
              aria-label={siteConfig.author}
            >
              <Avatar.Image alt={siteConfig.author} src={siteConfig.avatar} />
              <Avatar.Fallback className="text-2xl">
                {siteConfig.author}
              </Avatar.Fallback>
            </Avatar>
            <Card.Header className="flex min-w-0 flex-col items-center gap-2 p-0 md:items-start md:flex-1">
              <Card.Title className="text-xl">{name}</Card.Title>
              <Card.Description className="text-center leading-relaxed md:text-left">
                {siteConfig.description}
              </Card.Description>
            </Card.Header>
            <div className="w-full flex flex-col gap-3 md:w-auto md:max-w-64">
              <div className="flex items-center gap-2">
                <span className="text-muted w-16 shrink-0">星座</span>
                <span>{constellation}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted w-16 shrink-0">MBTI</span>
                <Chip size="sm" color="accent" variant="secondary">
                  {MBTI}
                </Chip>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted w-16 shrink-0">爱好</span>
                <div className="flex gap-1 flex-wrap">
                  {hobbies.map(hobby => (
                    <Chip size="sm" key={hobby}>
                      {hobby}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <div className="mt-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
            <SkillsCard />
            <CareerCard />
          </div>
        </div>

        <SubscribeMe />
      </div>
    </DirectionalTransition>
  )
}
