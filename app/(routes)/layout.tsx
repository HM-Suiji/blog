import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function RoutesLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      <section className="min-h-full mx-auto w-5xl 2xl:w-6xl max-w-5xl 2xl:max-w-6xl">
        {children}
      </section>
      <Footer />
    </>
  )
}
