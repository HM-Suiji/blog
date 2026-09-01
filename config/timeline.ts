export type TimelineEvent = {
  id: string
  day: number
  title: string
  description: string
  category: '生活' | '创作' | '研究' | '建站'
}

export type TimelineMonth = {
  month: number
  isCurrent?: boolean
  events: readonly TimelineEvent[]
}

export type TimelineYear = {
  year: number
  months: readonly TimelineMonth[]
}

// 年、月和日都按从新到旧排列，新增经历时只需要维护这份数据。
export const timelineYears: readonly TimelineYear[] = [
  {
    year: 2026,
    months: [
      {
        month: 9,
        isCurrent: true,
        events: [
          {
            id: 'start-life-timeline',
            day: 1,
            title: '开始整理生活时间线',
            description:
              '把零散的生活活动、项目进展与重要经历，按年份和月份收进宇宙船。',
            category: '生活',
          },
        ],
      },
      {
        month: 8,
        events: [
          {
            id: 'ai-strategy',
            day: 21,
            title: '从策略游戏回看 AI 决策',
            description:
              '从棋盘到牌桌，梳理搜索、不完全信息与博弈论背后的 AI 决策方式。',
            category: '创作',
          },
          {
            id: 'deepseek-harness',
            day: 16,
            title: '拆解 DeepSeek Harness',
            description:
              '从模块化与插件化的角度，重新理解一个大型 Agent 系统如何保持轻量。',
            category: '研究',
          },
          {
            id: 'harness-roading',
            day: 13,
            title: '梳理 Agent 的 Harness 演进',
            description:
              '把 Prompt、工具调用、MCP 与 Skills 串成一条关于可靠执行的演进路径。',
            category: '创作',
          },
        ],
      },
      {
        month: 7,
        events: [
          {
            id: 'dynamic-comments',
            day: 30,
            title: '为静态博客接上动态评论',
            description:
              '借助 Cache Components 与部分预渲染，让文章保持静态速度，也拥有实时互动。',
            category: '建站',
          },
          {
            id: 'content-automation',
            day: 28,
            title: '打通内容自动更新链路',
            description:
              '把 ISR、Webhook 与内容同步串联起来，减少每次发布文章后的重复操作。',
            category: '建站',
          },
          {
            id: 'graph-agent',
            day: 27,
            title: '用状态机重新理解 Graph Agent',
            description:
              '从状态、转移与循环出发，整理 Agent Workflow 背后更稳定的思考框架。',
            category: '研究',
          },
          {
            id: 'blog-architecture',
            day: 25,
            title: '公开宇宙船的核心架构',
            description:
              '记录博客从内容、缓存到数据层的完整结构，也为之后的迭代留下一张地图。',
            category: '创作',
          },
          {
            id: 'choose-nextjs',
            day: 24,
            title: '写下选择 Next.js 的理由',
            description:
              '从个人博客的真实需求出发，整理对框架、内容体验与长期维护的取舍。',
            category: '创作',
          },
          {
            id: 'spaceship-launch',
            day: 23,
            title: '穗积的宇宙船正式启航',
            description:
              '搭好博客的第一版骨架，开始为技术文章和生活片段准备一个长期停靠的地方。',
            category: '建站',
          },
        ],
      },
    ],
  },
]
