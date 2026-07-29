import { siteConfig } from '@/config/site'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 h-20 md:h-28 w-full bottom-0 flex items-center justify-center border">
      <div className="flex gap-2 text-muted text-sm md:text-base">
        © {siteConfig.copyright}
      </div>
    </footer>
  )
}
