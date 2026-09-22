import {
  SiBun,
  SiDrizzle,
  SiExpo,
  SiGit,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si'

import { timelineYears } from '@/config/timeline'

// 技术栈来自本站依赖及已展示的项目；图标随代码加载，不依赖外部图片服务。
export const aboutSkills = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
    background: '#3178c6',
    color: '#ffffff',
  },
  { name: 'React', icon: SiReact, background: '#173c48', color: '#61dafb' },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    background: '#202020',
    color: '#ffffff',
  },
  { name: 'Vue', icon: SiVuedotjs, background: '#e1f3eb', color: '#237b55' },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    background: '#dff5fc',
    color: '#087f9c',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    background: '#e7f2dd',
    color: '#417e38',
  },
  { name: 'NestJS', icon: SiNestjs, background: '#fce5ec', color: '#c71949' },
  { name: 'Expo', icon: SiExpo, background: '#252b43', color: '#ffffff' },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    background: '#deebf6',
    color: '#336791',
  },
  { name: 'Drizzle', icon: SiDrizzle, background: '#25341d', color: '#c5f74f' },
  { name: 'Bun', icon: SiBun, background: '#fbf0df', color: '#382e29' },
  { name: 'Git', icon: SiGit, background: '#fae6e1', color: '#d64024' },
] as const

// 暂用已有时间线中的真实记录。学校、任职经历可在这里补充或替换。
const careerEventIds = [
  'spaceship-launch',
  'deepseek-harness',
  'start-life-timeline',
]

export const aboutCareer = timelineYears
  .flatMap(({ year, months }) =>
    months.flatMap(({ month, events }) =>
      events
        .filter(event => careerEventIds.includes(event.id))
        .map(event => ({
          ...event,
          date: `${year}-${String(month).padStart(2, '0')}-${String(event.day).padStart(2, '0')}`,
          period: `${year}.${String(month).padStart(2, '0')}`,
        }))
    )
  )
  .sort((a, b) => a.date.localeCompare(b.date))
