import type { ReactNode } from 'react'

import styles from './page-heading.module.css'

export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <header className={styles.heading}>
      <p className={styles.eyebrow} data-intro>
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h1 className={styles.title} data-intro>
        {title}
      </h1>
      <p className={styles.description} data-intro>
        {description}
      </p>
      {children ? (
        <div className={styles.actions} data-intro>
          {children}
        </div>
      ) : null}
    </header>
  )
}
