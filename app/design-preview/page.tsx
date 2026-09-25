import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  MapPin,
  Orbit,
  Radio,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ResearchOrbit } from '@/components/design-preview/research-orbit'

const logs = [
  {
    date: '2026.08.13',
    topic: 'AI / Agent',
    title: '从 Prompt 到 Harness：Agent 是如何一步步学会“自我约束”的',
    description: '关于工具、约束，以及更可靠的任务执行。',
    href: '/posts/harness-roading',
  },
  {
    date: '2026.07.25',
    topic: '项目实践',
    title: '探秘穗积宇宙船的核心架构',
    description: '记录这艘宇宙船的构建过程与技术选择。',
    href: '/posts/blog-struct',
  },
] as const

export default function ObservatoryHome() {
  return (
    <>
      <section className="obs-hero" aria-labelledby="intro-title">
        <div className="obs-hero-copy">
          <div className="obs-intro-identity" data-intro>
            <Image
              src="/images/avatar.avif"
              alt="穗积的头像"
              width={40}
              height={40}
              preload
            />
            <span>
              你好，我是穗积{' '}
              <span className="obs-identity-handle">/ HM-Suiji</span>
            </span>
          </div>
          <h1 id="intro-title" data-intro>
            认真构建，
            <br />
            <span>自由探索。</span>
          </h1>
          <p className="obs-intro" data-intro>
            有产品与设计意识的全栈开发者。
          </p>
          <p className="obs-hero-description" data-intro>
            用代码实现想法，用文字记录思考。
            <br />在 Web、AI 和生活之间，保持一点好奇心。
          </p>
          <div className="obs-hero-actions" data-intro>
            <Link className="obs-primary-link" href="#flight-logs">
              开始阅读 <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              className="obs-secondary-link"
              href="https://github.com/HM-Suiji"
              target="_blank"
              rel="noopener noreferrer"
            >
              在 GitHub 找到我 <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="obs-hero-signature" data-intro>
            <span className="obs-signal" aria-hidden="true" /> 正在探索 AI
            与更好的产品体验
          </div>
        </div>
        <ResearchOrbit />
      </section>
      <section
        id="flight-logs"
        className="obs-selected"
        aria-labelledby="selected-title"
      >
        <div className="obs-section-heading" data-reveal>
          <div>
            <p className="obs-section-kicker">最近的思考与创造</p>
            <h2 id="selected-title">
              值得停留的地方<span className="obs-title-dot">.</span>
            </h2>
          </div>
          <Link href="/posts" className="obs-all-link">
            全部文章 <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="obs-feature-grid" data-reveal>
          <Link className="obs-featured-article" href="/design-preview/article">
            <div className="obs-featured-visual" aria-hidden="true">
              <span className="obs-featured-label">Next.js / Engineering</span>
              <div className="obs-render-diagram">
                <span className="obs-render-page">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="obs-render-connector" />
                <span className="obs-render-live">
                  <span />
                  Live
                </span>
              </div>
              <span className="obs-featured-visual-copy">
                Static by nature.
                <br />
                <strong>Dynamic by design.</strong>
              </span>
              <span className="obs-visual-orb" />
            </div>
            <div className="obs-featured-body">
              <div className="obs-log-meta">
                <span className="obs-tag">Web 工程</span>
                <span>精选文章</span>
                <time dateTime="2026-07-30">2026.07.30</time>
              </div>
              <h3>
                探秘 Next.js PPR：
                <br />
                让静态博客拥有动态评论
              </h3>
              <p>在静态与动态之间，找到适合内容的渲染方式。</p>
              <span className="obs-card-action">
                阅读这篇文章 <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </div>
          </Link>
          <article
            id="projects"
            className="obs-project-spotlight"
            aria-labelledby="project-title"
          >
            <div className="obs-project-topline">
              <span className="obs-tag">
                <Code2 size={14} aria-hidden="true" /> 开源参与
              </span>
              <a
                href="https://github.com/CherryHQ/cherry-studio-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="在 GitHub 查看 Cherry Studio App"
              >
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </div>
            <Link
              href="/design-preview/cherry-studio"
              className="obs-project-preview"
              aria-label="查看 Cherry Studio App 项目案例"
            >
              <div className="obs-project-logo-backdrop" />
              <Image
                src="/images/projects/cherry-studio.avif"
                alt="Cherry Studio App 标识"
                width={92}
                height={92}
              />
              <span className="obs-project-platform">React Native · Expo</span>
            </Link>
            <div className="obs-project-body">
              <h3 id="project-title">
                <Link href="/design-preview/cherry-studio">
                  Cherry Studio App
                </Link>
              </h3>
              <p>
                参与移动端布局与功能开发。
                <br />
                在开源协作中，让想法落到界面上。
              </p>
              <Link
                href="/design-preview/cherry-studio"
                className="obs-card-action"
              >
                看看这个项目 <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>
      <section
        className="obs-latest"
        data-reveal
        aria-labelledby="latest-title"
      >
        <div className="obs-latest-heading">
          <BookOpen size={18} aria-hidden="true" />
          <h2 id="latest-title">继续翻阅</h2>
          <span>沿着好奇心，再走远一点。</span>
        </div>
        <div className="obs-log-list">
          {logs.map(log => (
            <Link key={log.href} href={log.href} className="obs-log">
              <div>
                <div className="obs-log-meta">
                  <span>{log.topic}</span>
                  <time dateTime={log.date.replaceAll('.', '-')}>
                    {log.date}
                  </time>
                </div>
                <h3>{log.title}</h3>
                <p>{log.description}</p>
              </div>
              <span className="obs-log-arrow">
                <ArrowUpRight size={21} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section
        className="obs-beyond"
        data-reveal
        aria-labelledby="beyond-title"
      >
        <div>
          <p className="obs-section-kicker">生活也值得被记录</p>
          <h2 id="beyond-title">
            代码之外，
            <br />
            还有更大的世界。
          </h2>
          <p>
            摄影、游戏、PTCG，还有路上的风景。
            <br />
            这些也是我的一部分。
          </p>
        </div>
        <div className="obs-beyond-links">
          <Link href="/journey">
            <span className="obs-destination-icon">
              <MapPin size={21} aria-hidden="true" />
            </span>
            <div>
              <strong>足迹星图</strong>
              <small>去过的地方，留下的片段</small>
            </div>
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          <Link href="/timeline">
            <span className="obs-destination-icon">
              <Orbit size={21} aria-hidden="true" />
            </span>
            <div>
              <strong>我的航程</strong>
              <small>值得留下的时刻</small>
            </div>
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          <Link href="/friends">
            <span className="obs-destination-icon">
              <Radio size={21} aria-hidden="true" />
            </span>
            <div>
              <strong>通讯频道</strong>
              <small>在这里遇见的朋友</small>
            </div>
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
