import type { NextConfig } from 'next'

import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig)
