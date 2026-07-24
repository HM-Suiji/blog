import { FaGithub } from 'react-icons/fa'

import { Button, Link } from '@heroui/react'

import { siteConfig } from '@/config/site'

export const HeroSection: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex items-center">
        <div className="size-64">头像</div>
        <div className="max-w-md flex flex-col gap-4 grow p-4">
          <h1 className="text-7xl font-bold italic">{siteConfig.author}</h1>
          <h2 className="text-2xl font-semibold text-muted">
            {siteConfig.slogan}
          </h2>
          <p className="underline">{siteConfig.description}</p>
          <div>
            <Button variant="outline" isIconOnly className="rounded-full">
              <Link href={siteConfig.links.github}>
                <FaGithub />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
