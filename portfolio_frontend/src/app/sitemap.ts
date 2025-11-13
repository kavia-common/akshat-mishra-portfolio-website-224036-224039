import type { MetadataRoute } from "next";

// Ensure static generation for export mode
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_FRONTEND_URL
      ? process.env.NEXT_PUBLIC_FRONTEND_URL
      : "https://example.com";
  const now = new Date().toISOString();

  const paths = ["/"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  return paths;
}
