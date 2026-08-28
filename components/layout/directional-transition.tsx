import { ViewTransition } from 'react'

export function DirectionalTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransition
      enter={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'nav-tab': 'fade-in',
        default: 'none',
      }}
      exit={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'nav-tab': 'fade-out',
        default: 'none',
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
