import { Button, Link } from '@heroui/react'

import { siteConfig } from '@/config/site'

export const SocialSection: React.FC = () => {
  return (
    <div className="flex min-h-screen justify-center items-center flex-col py-12">
      <h1 className="text-2xl font-bold tracking-tight mb-2">关注 & 联系</h1>
      <p className="text-muted text-sm mb-8">在这些平台上找到我</p>
      <div className="grid grid-cols-3 gap-2">
        {siteConfig.socials.map(item => (
          <Link
            className="w-full"
            target="_blank"
            key={item.name}
            href={item.href}
          >
            <Button className="grow" variant="ghost">
              {item.icon}
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
