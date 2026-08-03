/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sortie autonome pour un conteneur Docker léger (server.js + deps tracées).
  output: 'standalone',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
    ],
  },
}

module.exports = nextConfig
