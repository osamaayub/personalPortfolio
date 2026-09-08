import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        unoptimized:true,
        remotePatterns: [],
        domains: [],
    },
    output: 'export',
};

export default nextConfig;