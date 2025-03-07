import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'dist',
  images: {
    domains: ['cdn.dummyjson.com'],
  },
  trailingSlash: true,
};

export default nextConfig;
