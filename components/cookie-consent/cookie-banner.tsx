'use client'

import { useIsClient } from '@uidotdev/usehooks'

import { Button, Card, Separator } from '@heroui/react'

import { useCookieConsentStore } from '@/stores/cookie-consent.store'

type CookieBannerProps = {
  onOpenSettings?: () => void
}

export function CookieBanner({ onOpenSettings }: CookieBannerProps) {
  const consent = useCookieConsentStore(state => state.consent)

  const acceptAll = useCookieConsentStore(state => state.acceptAll)

  const rejectOptional = useCookieConsentStore(state => state.rejectOptional)

  const isClient = useIsClient()

  if (!isClient || consent !== null) {
    return null
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl">
      <Card>
        <Card.Header className="flex-col items-start gap-1">
          <Card.Title>我们使用 Cookie</Card.Title>

          <Card.Description>
            我们使用必要 Cookie 来保证网站正常运行。
            经你同意后，我们还可能使用分析 Cookie 来帮助我们改进网站。
          </Card.Description>
        </Card.Header>

        <Separator />

        <Card.Content className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="danger-soft" onPress={rejectOptional}>
            拒绝可选 Cookie
          </Button>

          <Button variant="secondary" onPress={onOpenSettings}>
            管理 Cookie
          </Button>

          <Button onPress={acceptAll}>接受全部</Button>
        </Card.Content>
      </Card>
    </div>
  )
}
