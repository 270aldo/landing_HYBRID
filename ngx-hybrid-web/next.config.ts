import type { NextConfig } from "next";

const appRoot = __dirname;

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + UnicornStudio + ElevenLabs widget
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://elevenlabs.io https://api.elevenlabs.io",
      // Fonts + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + Unsplash + placehold.co + Unicorn Studio runtime assets
      "img-src 'self' data: blob: https://images.unsplash.com https://placehold.co https://assets.unicorn.studio",
      // Embedded video/media from same origin
      "media-src 'self'",
      // ElevenLabs widget iframe + UnicornStudio
      "frame-src 'self' https://elevenlabs.io",
      // API calls: n8n webhook + ElevenLabs API
      "connect-src 'self' https: wss:",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: appRoot,
  },

  outputFileTracingRoot: appRoot,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    // Enable modern image formats for better compression
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Cache-Control for static video assets
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache-Control for brand images
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,

  // Power-by header removal
  poweredByHeader: false,
};

export default nextConfig;
