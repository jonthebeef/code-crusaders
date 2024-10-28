/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
  basePath: '/code-crusaders',
  assetPrefix: '/code-crusaders/',
}

module.exports = nextConfig