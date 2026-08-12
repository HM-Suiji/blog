'use client'

import { useEffect, useState } from 'react'

import { Button, Description, Modal, Separator, Switch } from '@heroui/react'

import { useCookieConsentStore } from '@/stores/cookie-consent.store'

export function CookieSettings({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const consent = useCookieConsentStore(state => state.consent)

  const saveConsent = useCookieConsentStore(state => state.saveConsent)

  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setAnalytics(consent?.analytics ?? false)
    setMarketing(consent?.marketing ?? false)
  }, [isOpen, consent])

  const handleSave = () => {
    saveConsent({
      analytics,
      marketing,
    })

    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.Header className="flex-col items-start gap-1">
              <Modal.Heading>Cookie 设置</Modal.Heading>

              <p className="text-sm font-normal text-default-500">
                选择你允许网站使用的可选 Cookie。
              </p>
            </Modal.Header>

            <Modal.Body className="flex flex-col pt-4 gap-2">
              <Switch isSelected isDisabled aria-label="必要 Cookie">
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  必要 Cookie
                </Switch.Content>
                <Description>用于登录、安全以及网站基本功能。</Description>
              </Switch>

              <Separator />

              <Switch
                isSelected={analytics}
                onChange={setAnalytics}
                aria-label="分析 Cookie"
              >
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  分析 Cookie
                </Switch.Content>
                <Description>帮助我们了解网站访问情况和使用方式。</Description>
              </Switch>

              <Separator />

              <Switch
                isSelected={marketing}
                onChange={setMarketing}
                aria-label="营销 Cookie"
              >
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  营销 Cookie
                </Switch.Content>
                <Description>
                  用于博客推送、广告、营销和个性化追踪。
                </Description>
              </Switch>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger-soft" onPress={() => setIsOpen(false)}>
                取消
              </Button>

              <Button onPress={handleSave}>保存设置</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
