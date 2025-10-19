import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Enable modern compression (Brotli + Gzip)
  compress: true,

  // ✅ Strong caching for static assets
  async headers() {
    return [
      {
        // Cache static assets (images, fonts, JS, CSS)
        source: "/:all*(png|jpg|jpeg|gif|svg|ico|webp|avif|js|css|json|woff2?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 31536000000).toUTCString(),
          },
        ],
      },
      {
        // Cache Next image optimization output
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Default for HTML routes (no caching)
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  // ✅ Optimize images (smaller bundle + fewer HTTP requests)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  // ✅ Reduce build size (helps with F44)
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;

