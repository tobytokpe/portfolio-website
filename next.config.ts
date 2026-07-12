import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow importing SVG files as URLs (same as Vite assetsInclude)
  // and handle media files
  webpack(config) {
    // Handle SVG as static asset (url)
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset/resource',
    });
    // Handle mp4 videos as resource
    config.module.rules.push({
      test: /\.mp4$/i,
      type: 'asset/resource',
    });
    return config;
  },
  // Output standalone for Vercel deployment
  reactStrictMode: true,
};

export default nextConfig;
