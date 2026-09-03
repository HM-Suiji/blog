export type JourneyStop = {
  id: string
  city: string
  place: string
  note: string
  dateLabel: string
  startDate?: string
  endDate?: string
  longitude: number
  latitude: number
  status: 'origin' | 'visited' | 'planned'
  transport?: JourneyTransport
  image?: {
    src: string
    alt: string
  }
}

export type JourneyTransport = 'flight' | 'train'

export type JourneyRoute = {
  id: string
  from: JourneyStop['id']
  to: JourneyStop['id']
  transport: JourneyTransport
  curvature: number
  status?: 'planned'
}

// 按时间从旧到新排列。照片放进 public/images/journey 后，补充 image 字段即可。
export const journeyStops: JourneyStop[] = [
  {
    id: 'jingdezhen',
    city: '景德镇',
    place: '江西 · 家乡',
    note: '故事开始的地方。',
    dateLabel: '家乡',
    longitude: 117.1784,
    latitude: 29.2687,
    status: 'origin',
  },
  {
    id: 'shanghai-2023',
    city: '上海',
    place: '上海',
    note: '在上海留下一枚坐标。',
    dateLabel: '2023.01.23',
    startDate: '2023-01-23',
    longitude: 121.4737,
    latitude: 31.2304,
    status: 'visited',
    transport: 'train',
  },
  {
    id: 'wuhan-2023',
    city: '武汉',
    place: '湖北 · 武汉',
    note: '在江城留下一枚坐标。',
    dateLabel: '2023.07.19',
    startDate: '2023-07-19',
    longitude: 114.3054,
    latitude: 30.5931,
    status: 'visited',
    transport: 'train',
  },
  {
    id: 'chongqing-2024',
    city: '重庆',
    place: '重庆',
    note: '在山城短暂停靠。',
    dateLabel: '2024.08.10',
    startDate: '2024-08-10',
    longitude: 106.5516,
    latitude: 29.563,
    status: 'visited',
    transport: 'flight',
  },
  {
    id: 'chengdu-2024',
    city: '成都',
    place: '四川 · 成都',
    note: '从山城继续向西。',
    dateLabel: '2024.08.12',
    startDate: '2024-08-12',
    longitude: 104.0668,
    latitude: 30.5728,
    status: 'visited',
    transport: 'train',
  },
  {
    id: 'guizhou-2026',
    city: '贵州',
    place: '贵州',
    note: '十天，穿行在贵州的山水之间。',
    dateLabel: '2026.08.04 — 08.13',
    startDate: '2026-08-04',
    endDate: '2026-08-13',
    longitude: 106.6302,
    latitude: 26.647,
    status: 'visited',
    transport: 'train',
  },
  {
    id: 'hangzhou-concert-2026',
    city: '杭州',
    place: '浙江 · 杭州',
    note: '宇宙无敌号 2.0 演唱会。',
    dateLabel: '2026.08.29',
    startDate: '2026-08-29',
    longitude: 120.1551,
    latitude: 30.2741,
    status: 'visited',
    transport: 'train',
  },
  {
    id: 'swjtu-2026',
    city: '成都',
    place: '西南交通大学',
    note: '下一站，回到成都。',
    dateLabel: '2026.09.09',
    startDate: '2026-09-09',
    longitude: 103.985,
    latitude: 30.7605,
    status: 'planned',
    transport: 'flight',
  },
]

export const journeyRoutes: JourneyRoute[] = [
  {
    id: 'jingdezhen-shanghai',
    from: 'jingdezhen',
    to: 'shanghai-2023',
    transport: 'train',
    curvature: 0.32,
  },
  {
    id: 'jingdezhen-wuhan',
    from: 'jingdezhen',
    to: 'wuhan-2023',
    transport: 'train',
    curvature: -0.32,
  },
  {
    id: 'jingdezhen-chongqing',
    from: 'jingdezhen',
    to: 'chongqing-2024',
    transport: 'flight',
    curvature: 0.28,
  },
  {
    id: 'chongqing-chengdu',
    from: 'chongqing-2024',
    to: 'chengdu-2024',
    transport: 'train',
    curvature: -0.42,
  },
  {
    id: 'jingdezhen-guizhou',
    from: 'jingdezhen',
    to: 'guizhou-2026',
    transport: 'train',
    curvature: -0.2,
  },
  {
    id: 'jingdezhen-hangzhou',
    from: 'jingdezhen',
    to: 'hangzhou-concert-2026',
    transport: 'train',
    curvature: -0.32,
  },
  {
    id: 'jingdezhen-swjtu',
    from: 'jingdezhen',
    to: 'swjtu-2026',
    transport: 'flight',
    curvature: -0.28,
    status: 'planned',
  },
]
