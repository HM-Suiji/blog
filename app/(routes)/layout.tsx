import { FloatButton } from '@/components/float-button'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import '@/assets/styles/site.css'

export default function RoutesLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="obs site-shell">
      <a className="obs-skip" href="#main-content">
        跳至内容
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="obs-container site-main">
        {children}
      </main>
      <FloatButton />
      <Footer />
    </div>
  )
}
