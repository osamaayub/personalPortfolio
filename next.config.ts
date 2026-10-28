import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    // Import only the icons/animation helpers actually used.
    optimizePackageImports: ["react-icons", "framer-motion"],
  },
  async redirects() {
    // Crawlers and old browsers still request /favicon.ico; point them at the generated icon.
    return [{ source: "/favicon.ico", destination: "/icon", permanent: false }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Static files in /public are not fingerprinted, so revalidate daily instead of "immutable".
        source: "/:file(.*\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2))",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
