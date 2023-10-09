const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    serverActions: true,
    logging: {
      level: 'verbose',
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
