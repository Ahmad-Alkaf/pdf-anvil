import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The complete site is generated during `next build` into `out/`.
  // Cloudflare Workers serves those files as Static Assets; no Node.js server runs.
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
