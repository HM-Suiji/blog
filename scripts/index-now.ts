import { siteConfig } from '@/config/site'
import { getPosts } from '@/server/db/query/post.query'
import { pingIndexNow } from '@/utils/indexnow'

const posts = await getPosts()

const urls: string[] = []

for (const post of posts) {
  urls.push(`${siteConfig.url}/posts/${post.slug}`)
}

urls.push(siteConfig.url)
urls.push(`${siteConfig.url}/posts`)
urls.push(`${siteConfig.url}/friends`)
urls.push(`${siteConfig.url}/about`)

await pingIndexNow(urls)
