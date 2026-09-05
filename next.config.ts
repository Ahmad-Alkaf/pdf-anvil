import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The complete site is generated during `next build` into `out/`.
  // Cloudflare Workers serves those files as Static Assets; no Node.js server runs.
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: {
    // The root layout sits under a dynamic segment (src/app/[[...path]]), so
    // the 404 page is a full document of its own: src/app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
