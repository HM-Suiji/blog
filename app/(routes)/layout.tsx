import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function RoutesLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      <section className="min-h-full mx-auto w-full px-4 md:px-6 max-w-5xl 2xl:max-w-6xl">
        {children}
      </section>
      <Footer />
    </>
  )
}
