import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
         pathname: '/photo-1483478550801-ceba5fe50e8e',
       },
       {
         protocol: 'https',
         hostname: 'images.unsplash.com',
         port: '',
         pathname: '/photo-1526378722484-bd91ca387e72',
       }
     ],
  }
};

export default nextConfig;
