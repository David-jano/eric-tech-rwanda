/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["googleusercontent.com", "cdnjs.cloudflare.com"],
  },
  eslint: {
    // This will allow production builds even if ESLint errors are present
    ignoreDuringBuilds: true,
  },
  // Optional: also ignore TypeScript errors if needed
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
