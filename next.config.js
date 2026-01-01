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
    deviceSizes: [640, 750, 828, 1080], // Moins de tailles générées
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Optimisé pour thumbnails
  },
  // Optimisations de build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Headers de cache agressifs
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
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
