/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/code-crusaders',
  assetPrefix: '/code-crusaders',
  trailingSlash: true,
  images: {
    loader: 'imgix',  // Or you can omit this line entirely if not needed
    path: 'https://jonthebeef.xyz/code-crusaders',
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
}

module.exports = nextConfig;