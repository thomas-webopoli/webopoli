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
    deviceSizes: [380, 640, 828], // Réduit pour éco-index
    imageSizes: [16, 32, 48, 64, 96],
  },
  // Optimisations de build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Désactiver le x-powered-by header
  poweredByHeader: false,
  // Headers de cache agressifs + suppression cookies
  async headers() {
    return [
      {
        // Ressources statiques (images, fonts, etc.)
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Set-Cookie',
            value: '', // Supprime les cookies
          },
        ],
      },
      {
        // Fichiers CSS et JS
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Print CSS
        source: '/print.css',
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
