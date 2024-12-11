/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/tron1',
  assetPrefix: '/tron1/',
}

module.exports = nextConfig
