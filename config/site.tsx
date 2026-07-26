import { Link } from '@heroui/react'

export const siteConfig = {
  name: '穗积的宇宙船',
  url: process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000',
  slogan: '莫笑吾辈好远骛，跬步平川马蹄疾。',
  description:
    '一个普普通通的程序员将与大家在这个宇宙船里分享一些开发经验和生活点滴。',
  author: 'HM-Suiji',
  copyright: `${new Date().getFullYear()} 穗积`,
  links: {
    github: 'https://github.com/HM-Suiji',
  },
  nav: [
    { label: '博客', href: '/posts' },
    {
      label: '友链',
      href: '/friends',
    },
    {
      label: '关于',
      href: '/about',
      children: [
        {
          label: '留言板',
          href: '/board',
        },
        {
          label: '装备库',
          href: '/equipments',
        },
        {
          label: '项目集',
          href: '/projects',
        },
      ],
    },
  ],
  projects: [
    {
      title: 'Cherry Studio APP',
      stats: '3.6k+ ⭐️',
      image: '/images/projects/cherry-studio.avif',
      avatar: '/images/projects/cherry-studio.avif',
      alt: 'Cherry Studio APP',
      avatarAlt: 'CherryHQ',
      by: (
        <Link href="https://github.com/CherryHQ" target="_blank">
          CherryHQ
          <Link.Icon />
        </Link>
      ),
      external: true,
      tags: ['React Native', 'Expo', 'Agents'],
      link: 'https://github.com/CherryHQ/cherry-studio-app',
    },
    {
      title: '清风卡社小程序',
      stats: '100+ 👤',
      image: '/images/projects/qingfeng-tcg.avif',
      avatar: '/images/avatar.avif',
      alt: '清风TCG',
      avatarAlt: 'HM-Suiji',
      by: (
        <Link href="https://github.com/HM-Suiji" target="_blank">
          HM-Suiji
          <Link.Icon />
        </Link>
      ),
      external: false,
      tags: ['Taro', 'MiniApp', 'WeChat'],
    },
  ],
} as const

export type SiteConfig = typeof siteConfig
