/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // other configurations...
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  basePath: '/code-crusaders',
  assetPrefix: '/code-crusaders/',
}

module.exports = nextConfig