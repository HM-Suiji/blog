import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  GitBranch,
  Smartphone,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './project.module.css'

const repositoryUrl = 'https://github.com/CherryHQ/cherry-studio-app'

export function CherryStudioCase({ preview = false }: { preview?: boolean }) {
  return (
    <article className={styles.page}>
      <Link
        className={styles.backLink}
        href={preview ? '/design-preview#projects' : '/projects'}
        transitionTypes={['nav-back']}
        data-intro
      >
        <ArrowLeft size={15} aria-hidden="true" />
        返回项目
      </Link>

      <header className={styles.header}>
        <div className={styles.heading} data-intro>
          <p className={styles.eyebrow}>开源参与 · 移动端开发</p>
          <h1>
            Cherry Studio
            <br />
            <span>App.</span>
          </h1>
          <p className={styles.intro}>
            让 AI 工具走进日常使用的手机。
            <br />
            参与移动端布局与核心功能开发。
          </p>
          <a
            className={styles.repositoryLink}
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranch size={17} aria-hidden="true" />
            查看 GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.projectMark} data-intro>
          <div className={styles.logoTile}>
            <div className={styles.logo}>
              <Image
                src="/images/projects/cherry-studio.avif"
                alt="Cherry Studio 标志"
                fill
                sizes="112px"
              />
            </div>
          </div>
          <div className={styles.markCaption}>
            <span>Cherry Studio</span>
            <span>为移动端而生</span>
          </div>
        </div>
      </header>

      <dl className={styles.facts} data-reveal>
        <div>
          <dt>项目类型</dt>
          <dd>开源 AI 应用</dd>
        </div>
        <div>
          <dt>我的参与</dt>
          <dd>移动端开发</dd>
        </div>
        <div>
          <dt>项目技术栈</dt>
          <dd>React Native · Expo</dd>
        </div>
        <div>
          <dt>运行平台</dt>
          <dd>iOS · Android</dd>
        </div>
      </dl>

      <section
        className={styles.section}
        aria-labelledby="project-overview"
        data-reveal
      >
        <div className={styles.sectionHeading}>
          <h2 id="project-overview">关于这个项目</h2>
        </div>
        <div className={styles.sectionBody}>
          <p>
            Cherry Studio App 是 Cherry Studio 的移动端应用，将 AI
            对话和相关工具带到 iOS 与
            Android。我在其中参与移动端开发，主要负责页面布局和核心功能的实现。
          </p>
          <a
            className={styles.textLink}
            href={`${repositoryUrl}#readme`}
            target="_blank"
            rel="noopener noreferrer"
          >
            在项目 README 中了解更多
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="project-contributions"
        data-reveal
      >
        <div className={styles.sectionHeading}>
          <h2 id="project-contributions">我做了什么</h2>
          <p>从页面到功能，把想法变成可以使用的体验。</p>
        </div>
        <div className={styles.contributions}>
          <div className={styles.contribution}>
            <span className={styles.contributionIcon}>
              <Smartphone size={22} aria-hidden="true" />
            </span>
            <div>
              <h3>移动端布局实现</h3>
              <p>参与移动端页面的布局与界面实现，将设计落实到实际应用中。</p>
            </div>
          </div>
          <div className={styles.contribution}>
            <span className={styles.contributionIcon}>
              <Code2 size={22} aria-hidden="true" />
            </span>
            <div>
              <h3>核心功能开发</h3>
              <p>参与核心功能的实现，与团队一起推进应用开发。</p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.closing} data-reveal>
        <div>
          <span className={styles.relatedLabel}>继续阅读</span>
          <p>代码之外，也记录过程中的思考。</p>
        </div>
        <Link
          className={styles.nextLink}
          href={
            preview
              ? '/design-preview/article'
              : '/posts/nextjs-partial-prerendering'
          }
          transitionTypes={['nav-forward']}
        >
          探秘 Next.js PPR：让静态博客拥有动态评论
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
