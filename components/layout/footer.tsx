import { siteConfig } from '@/config/site'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 h-28 w-full bottom-0 flex items-center justify-center border">
      <div className="flex gap-2 text-muted">© {siteConfig.copyright}</div>
    </footer>
  )
}
