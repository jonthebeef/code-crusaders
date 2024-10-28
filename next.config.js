/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    path: '/code-crusaders',
  },
  basePath: '/code-crusaders',
  assetPrefix: '/code-crusaders/',
  trailingSlash: true,
}

module.exports = nextConfig