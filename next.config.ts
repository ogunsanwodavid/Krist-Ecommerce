import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pnylqmufvrtzwockivuw.supabase.co",
        pathname: "/storage/v1/object/public/**", // Use wildcard for public objects
      },
    ],
  },
};

export default nextConfig;
