import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server for EC2 (web-shared-1): `node server.js` under systemd.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.theinsuranceprovider.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
