/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: [
    '/dashboard',
    '/dashboard/*',
    '/api/*',
    '/design-preview',
    '/design-preview/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/'],
      },
    ],
  },
}
