/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // other configurations...
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  basePath: '/code-crusaders',
  assetPrefix: '/code-crusaders/',
}

module.exports = nextConfig