import { cn } from '@heroui/react'

export const DashCard: React.FC<{
  title: string
  children?: React.ReactNode
  className?: string
}> = ({ title, children, className }) => {
  return (
    <div className="bg-background-secondary p-4 rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className={cn('mt-2', className)}>{children}</div>
    </div>
  )
}
