import { DashContainer } from '@/components/dashboard/dash-container'

export default function DashboardLayout({
  children,
}: LayoutProps<'/dashboard'>) {
  return <DashContainer>{children}</DashContainer>
}
