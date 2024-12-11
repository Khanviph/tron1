/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/tron-multisig',
  assetPrefix: '/tron-multisig/',
}

module.exports = nextConfig
