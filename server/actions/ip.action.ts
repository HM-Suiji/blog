'use server'

export const getRegionByIp = async (ip: string) => {
  const { data } = (await fetch(`https://api.huanment.top/api/v1/ip/${ip}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'X-Locale': 'zh-CN' },
  }).then(res => res.json())) as {
    data?: {
      country?: string
      region?: string
      city?: string
    }
  }

  if (!data) {
    return ''
  }

  const { country, region, city } = data

  if (country === '中国') {
    return `${region || ''}${city || ''}`
  } else {
    return country || '未知'
  }
}
