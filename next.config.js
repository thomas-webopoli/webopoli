/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimisation éco-responsable des images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 an de cache
    deviceSizes: [400, 640, 828], // Réduit pour éco-index (max 400px pour les projets)
    imageSizes: [16, 32, 48, 64, 96], // Optimisé pour thumbnails
  },
  // Optimisations de build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Headers de cache agressifs
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
