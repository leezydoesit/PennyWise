/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  poweredByHeader: false,
}

if (process.env.NODE_ENV === 'production') {
  nextConfig.headers = async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
                                 img-src 'self' https://storage.googleapis.com;
                                 object-src 'none';
                                 frame-ancestors 'self';
                                 base-uri 'self';
                               `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'ai-pennywise.vercel.app',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
