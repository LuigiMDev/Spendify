import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com"
      }
    ],
    dangerouslyAllowSVG: true
  }
};

export default nextConfig;
