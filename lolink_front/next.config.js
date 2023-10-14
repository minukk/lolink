/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com'],
    // deviceSizes: [575, 767, 991, 1279],
    // imageSizes: [320, 640, 750, 1000],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "prod",
  },
}

module.exports = nextConfig
