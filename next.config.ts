import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 430, 768, 1024, 1280, 1536],
    imageSizes: [200, 280, 350, 400],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
