'use server'

export const getRegionByIp = async (ip: string) => {
  const { data } = (await fetch(`https://api.huanment.top/api/v1/ip/${ip}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'X-Locale': 'zh-CN' },
  }).then(res => res.json())) as {
    data?: {
      location?: {
        country?: string
        region?: string
        city?: string
      }
    }
  }

  if (!data?.location) {
    return ''
  }

  const { country, region, city } = data.location

  if (country === '中国') {
    return `${region || ''}${city || ''}`
  } else {
    return country || ''
  }
}
