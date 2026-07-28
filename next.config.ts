import type { NextConfig } from 'next'

import createBundleAnalyzer from '@next/bundle-analyzer'
import createMDX from '@next/mdx'
import { codeInspectorPlugin } from 'code-inspector-plugin'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  turbopack: {
    rules: codeInspectorPlugin({
      bundler: 'turbopack',
    }),
  },
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    viewTransition: true,
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
    mdxRs: true,
  },
  serverExternalPackages: ['pino', 'pino-pretty'],
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withMDX(nextConfig))
