export const siteConfig = {
  name: '穗积的宇宙船',
  slogan: '莫笑吾辈好远骛，跬步平川马蹄疾。',
  description:
    '一个普普通通的程序员将与大家在这个宇宙船里分享一些开发经验和生活点滴。',
  author: 'HM-Suiji',
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
} as const

export type SiteConfig = typeof siteConfig
