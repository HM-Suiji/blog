import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

import { Button, Link } from '@heroui/react'

import { siteConfig } from '@/config/site'

export const HeroSection: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex items-center gap-6">
        <Image width={160} height={160} src="/images/avatar.avif" alt="穗积" />
        <div className="max-w-md flex flex-col gap-4 grow p-4">
          <h1 className="text-7xl font-bold italic">{siteConfig.author}</h1>
          <h2 className="text-2xl font-semibold text-muted">
            {siteConfig.slogan}
          </h2>
          <p className="underline">{siteConfig.description}</p>
          <div>
            <Button variant="outline" isIconOnly className="rounded-full">
              <Link target="_blank" href={siteConfig.links.github}>
                <FaGithub />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
