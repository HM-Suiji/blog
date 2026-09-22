import type { CSSProperties } from 'react'

import { Card } from '@heroui/react'

import { aboutSkills } from '@/config/about'

import styles from './about.module.css'

export function SkillsCard() {
  return (
    <Card
      className={`group min-w-0 gap-0 overflow-hidden p-0 ${styles.skillsCard}`}
      role="region"
      aria-labelledby="skills-title"
      tabIndex={0}
    >
      <Card.Header className="flex flex-row items-start justify-between gap-3 p-6 pb-0 sm:p-8 sm:pb-0">
        <div>
          <p className="mb-2 text-sm text-muted">技能</p>
          <h2
            id="skills-title"
            className="text-3xl font-semibold tracking-tight"
          >
            开启创造力
          </h2>
        </div>
      </Card.Header>
      <Card.Content className={styles.skillsContent}>
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            {[0, 1].map(copy => (
              <div className={styles.iconGroup} key={copy}>
                {aboutSkills.map(({ name, icon: Icon, background, color }) => (
                  <div
                    key={name}
                    className={styles.iconTile}
                    style={{ background, color }}
                  >
                    <Icon aria-hidden="true" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <ul id="skills-list" className={styles.skillList}>
          {aboutSkills.map(({ name, icon: Icon, background, color }, index) => (
            <li
              key={name}
              className={styles.skillItem}
              style={{ '--skill-order': index } as CSSProperties}
            >
              <span className={styles.skillIcon} style={{ background, color }}>
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <span className="text-sm font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </Card.Content>
      <Card.Footer className="mt-auto px-6 pb-6 text-sm text-muted sm:px-8">
        从想法到作品，让热爱有迹可循。
      </Card.Footer>
    </Card>
  )
}
