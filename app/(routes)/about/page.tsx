import { Metadata } from 'next'

import { Avatar, Card, Chip } from '@heroui/react'

import { CareerCard } from '@/components/about/career-card'
import { SkillsCard } from '@/components/about/skills-card'
import { DirectionalTransition } from '@/components/layout/directional-transition'
import { PageHeading } from '@/components/layout/page-heading'
import styles from '@/components/layout/page-heading.module.css'
import { PageReveal } from '@/components/motion/page-reveal'
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
      <PageReveal className={styles.page}>
        <div>
          <ProfileJsonLd />
          <PageHeading
            eyebrow="宇宙船的驾驶员"
            title="你好，我是穗积。"
            description="一个关注产品与设计的全栈开发者。写代码，也用摄影、游戏和日常里的小事，记录自己的探索。"
          />
          <div>
            <Card className={`${styles.panel} ${styles.profile}`} data-intro>
              <Avatar
                className="size-24 shrink-0 rounded-2xl"
                aria-label={siteConfig.author}
              >
                <Avatar.Image alt={siteConfig.author} src={siteConfig.avatar} />
                <Avatar.Fallback className="text-2xl">
                  {siteConfig.author}
                </Avatar.Fallback>
              </Avatar>
              <Card.Header className="flex min-w-0 flex-col items-start gap-3 p-0 md:flex-1">
                <Card.Title className="text-2xl tracking-tight">
                  {name}
                </Card.Title>
                <Card.Description className="leading-7">
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
            <div className={styles.detailsGrid}>
              <SkillsCard />
              <CareerCard />
            </div>
          </div>

          <div className={styles.subscription}>
            <SubscribeMe className={styles.panel} />
          </div>
        </div>
      </PageReveal>
    </DirectionalTransition>
  )
}
