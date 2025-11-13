import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export
  output: "export",
  // Ensure asset paths are consistent for static hosting
  trailingSlash: false,
  // Disable reactStrictMode to avoid double-invocation in build/export contexts that may trigger chunking edge-cases
  reactStrictMode: false,
};

export default nextConfig;
