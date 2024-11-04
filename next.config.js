/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,  // Use Netlify's image handling directly
    domains: ['codecrusaders.co.uk'], // Add this line for image optimization
  },
  webpack: (config, { isServer }) => {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Other image handling
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      type: 'asset',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    return config;
  },
  // Add this section to handle the favicon route
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/app/favicon.ico',
      },
    ];
  },
}

module.exports = nextConfig;