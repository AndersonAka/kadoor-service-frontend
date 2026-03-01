const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation pour Vercel
  reactStrictMode: true,
  
  // Configuration SASS
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["mixed-decls", "legacy-js-api", "import"],
  },
  
  // Configuration des images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
    // Optimisation pour Vercel
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Configuration des rewrites pour développement et production
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
  
  // Configuration pour Vercel (optimisations)
  // output: 'standalone' est automatiquement détecté par Vercel
  // Pas besoin de le spécifier explicitement
  
  // Headers de sécurité pour Vercel
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  // Configuration pour Next.js 16
  experimental: {
    // Optimisations pour Vercel
    optimizePackageImports: ['@/components', '@/utils'],
  },
  
  // Compiler optimizations
  compiler: {
    // Supprimer les console.log en production (optionnel)
    // removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withNextIntl(nextConfig);
