import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [new URL('https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=600'), new URL('https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=600')],
  }
};

export default nextConfig;
