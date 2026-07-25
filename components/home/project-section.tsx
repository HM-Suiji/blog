import Image from 'next/image'

import { Avatar, Card, Chip } from '@heroui/react'

import { siteConfig } from '@/config/site'

export default function ProjectSection() {
  return (
    <div className="flex h-screen justify-center items-center flex-col gap-8">
      <h1 className="text-4xl">探索那些我做过的项目</h1>
      <div className="grid md:grid-cols-2 gap-4 xl:grid-cols-3">
        {siteConfig.projects.map(project => (
          <Card
            key={project.title}
            className="flex flex-row justify-center items-center w-80 h-64 gap-4 p-6"
          >
            <Image
              width={96}
              height={96}
              alt={project.alt}
              className="pointer-events-none aspect-square w-24 rounded-2xl object-contain select-none"
              loading="lazy"
              src={project.image}
            />
            <div className="flex flex-1 flex-col justify-center gap-1">
              <Card.Header>
                <Card.Title className="text-lg">{project.title}</Card.Title>
                <Card.Description>{project.stats}</Card.Description>
                <Card.Description className="flex gap-1 flex-wrap py-1">
                  {project.tags.map(tag => (
                    <Chip size="sm" key={tag}>
                      {tag}
                    </Chip>
                  ))}
                </Card.Description>
              </Card.Header>
              <Card.Footer className="flex gap-2">
                <Avatar
                  aria-label="Martha's profile picture"
                  className="size-5"
                >
                  <Avatar.Image
                    alt={`${project.avatarAlt}'s avatar`}
                    src={project.avatar}
                  />
                  <Avatar.Fallback className="text-xs">
                    {project.avatarAlt}
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-xs">By {project.by}</span>
              </Card.Footer>
            </div>
          </Card>
        ))}
        <div className="w-80 h-64 border">a</div>
        <div className="w-80 h-64 border">a</div>
        <div className="w-80 h-64 border">a</div>
        <div className="w-80 h-64 border">a</div>
      </div>
    </div>
  )
}
