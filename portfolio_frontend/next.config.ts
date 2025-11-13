import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export
  output: "export",
  // Ensure asset paths are consistent for static hosting
  // Keep false unless hosting requires all routes to end with a slash.
  trailingSlash: false,
  // Disable reactStrictMode to avoid double-invocation in build/export contexts that may trigger chunking edge-cases
  reactStrictMode: false,
  // Critical: disable Next.js image optimization for static export compatibility
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
