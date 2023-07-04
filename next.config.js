/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
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
