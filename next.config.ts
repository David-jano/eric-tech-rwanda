import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // For older Next.js versions (domains)
    domains: ["googleusercontent.com", "cdnjs.cloudflare.com"],
    // For newer Next.js versions (remotePatterns)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qiskbtoybaxzkmqfjpbk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;