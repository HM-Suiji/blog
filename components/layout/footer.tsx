import Link from 'next/link'

import { siteConfig } from '@/config/site'

export const Footer: React.FC = () => {
  return (
    <footer className="obs-footer obs-container">
      <div>
        <Link href="/" className="obs-footer-name">
          {siteConfig.name}
        </Link>
        <p>保持好奇，继续探索。</p>
      </div>
      <nav aria-label="社交与订阅" className="obs-footer-links">
        {siteConfig.socials.map(social => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.name} <span aria-hidden="true">↗</span>
          </a>
        ))}
        <a href="/rss.xml">
          RSS <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <span className="obs-copyright">© {siteConfig.copyright}</span>
    </footer>
  )
}
