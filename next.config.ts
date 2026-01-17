import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // REQUIRED for GitHub Pages
  images: {
    unoptimized: true, // REQUIRED for next/image on GitHub Pages
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
