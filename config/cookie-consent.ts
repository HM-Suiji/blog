export const COOKIE_CONSENT_VERSION = 1

export const COOKIE_CONSENT_STORAGE_KEY = 'cookie-consent'

export type CookieConsent = {
  /**
   * 网站正常运行所必需的 Cookie。
   * 永远为 true，用户不能关闭。
   */
  necessary: true

  /**
   * 网站分析、访问统计等。
   */
  analytics: boolean

  /**
   * 广告、营销、个性化追踪等。
   */
  marketing: boolean
}

export type OptionalCookieConsent = Pick<
  CookieConsent,
  'analytics' | 'marketing'
>

export const DEFAULT_COOKIE_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
}
