/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'jindolog-images.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

const removeImports = require('next-remove-imports')()

module.exports = removeImports({
  // ✅  options...
})

module.exports = {
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: true },
}

module.exports = nextConfig
