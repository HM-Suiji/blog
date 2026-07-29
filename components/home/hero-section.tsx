import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

import { Button, Link } from '@heroui/react'

import { siteConfig } from '@/config/site'

export const HeroSection: React.FC = () => {
  return (
    <div className="flex min-h-screen justify-center items-center py-12">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <Image
          width={160}
          height={160}
          src="/images/avatar.avif"
          alt="穗积"
          preload
          className="w-24 h-24 md:w-40 md:h-40"
        />
        <div className="max-w-md flex flex-col gap-4 grow p-4 text-center md:text-left">
          <h1 className="text-4xl md:text-7xl font-bold italic">
            {siteConfig.author}
          </h1>
          <h1 className="sr-only">程序员{siteConfig.profile.name}</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-muted">
            {siteConfig.slogan}
          </h2>
          <p className="underline text-sm md:text-base">
            {siteConfig.description}
          </p>
          <div className="flex justify-center md:justify-start">
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
