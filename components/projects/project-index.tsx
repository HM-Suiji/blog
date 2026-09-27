import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PageHeading } from '@/components/layout/page-heading'
import { siteConfig } from '@/config/site'

import styles from './project-index.module.css'

export function ProjectIndex() {
  const [cherry, ...otherProjects] = siteConfig.projects

  return (
    <div className={styles.page}>
      <PageHeading
        eyebrow="持续构建，也持续探索"
        title="把想法，做成作品。"
        description="参与过的应用与网站，记录从想法到实现的过程。"
      />

      <article className={styles.featured} data-intro>
        <div className={styles.featuredVisual} aria-hidden="true">
          <span className={styles.projectType}>开源参与 · 移动端</span>
          <div className={styles.logoBackdrop} />
          <div className={styles.logoTile}>
            <Image src={cherry.image} alt="" width={112} height={112} />
          </div>
          <span className={styles.visualCaption}>Cherry Studio / App</span>
        </div>
        <div className={styles.featuredBody}>
          <p className={styles.eyebrow}>精选项目</p>
          <h2>{cherry.title}</h2>
          <p className={styles.description}>
            参与移动端布局与核心功能开发，
            <br className={styles.desktopBreak} />
            和团队一起，把界面与功能落实到实际应用中。
          </p>
          <ul className={styles.tags} aria-label="项目技术栈">
            {cherry.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className={styles.featuredActions}>
            <Link
              href="/projects/cherry-studio"
              className={styles.primaryLink}
              transitionTypes={['nav-forward']}
            >
              查看我的参与 <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href={cherry.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryLink}
            >
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>

      <section
        className={styles.otherProjects}
        aria-labelledby="other-projects"
      >
        <div className={styles.sectionHeading} data-reveal>
          <h2 id="other-projects">还有这些尝试。</h2>
          <p>不同的技术，相同的好奇心。</p>
        </div>
        <div className={styles.grid}>
          {otherProjects.map(project => (
            <article
              key={project.title}
              className={styles.projectCard}
              data-reveal
            >
              <div className={styles.cardHeader}>
                <Image
                  className={styles.projectLogo}
                  src={project.image}
                  alt={project.alt}
                  width={64}
                  height={64}
                />
                <span className={styles.projectKind}>
                  {project.external ? 'Web 应用' : '小程序'}
                </span>
              </div>
              <h3>{project.title}</h3>
              <div className={styles.projectBy}>{project.by}</div>
              <ul className={styles.tags} aria-label="项目技术栈">
                {project.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {'link' in project && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryLink}
                >
                  访问项目 <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
