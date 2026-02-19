import type { Metadata, Viewport } from "next";
import "./globals.css";

// ─── Site URL ────────────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_SITE_URL in your .env.local for local/preview environments.
// Falls back to the production domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hybrid.ngxgenesis.com";

// ─── Viewport ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "NGX HYBRID | Salud muscular después de los 30",
    template: "%s | NGX HYBRID",
  },
  description:
    "HYBRID: IA + coach humano + tú para construir salud muscular con progreso medible en 12 semanas. Para profesionales de 30 a 60 años.",

  // ── Canonical ──────────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "NGX HYBRID",
    title: "NGX HYBRID | Salud muscular después de los 30",
    description:
      "HYBRID: IA + coach humano + tú para construir salud muscular con progreso medible en 12 semanas. Para profesionales de 30 a 60 años.",
    images: [
      {
        url: "/images/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NGX HYBRID — Performance & Longevidad",
      },
    ],
  },

  // ── Twitter / X ────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "NGX HYBRID | Salud muscular después de los 30",
    description:
      "HYBRID: IA + coach humano + tú para construir salud muscular con progreso medible en 12 semanas.",
    images: ["/images/og/og-image.jpg"],
    creator: "@ngxgenesis",
    site: "@ngxgenesis",
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── App / icons ────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    "NGX HYBRID",
    "salud muscular",
    "entrenamiento después de los 30",
    "performance y longevidad",
    "coaching inteligente",
    "IA fitness",
    "GENESIS",
    "periodización",
    "masa muscular",
    "composición corporal",
    "Hermosillo",
    "México",
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/*
         * Google Fonts — loaded via <link> (not CSS @import) to avoid
         * render-blocking. preconnect hints warm up the DNS + TLS handshake
         * before the stylesheet request fires.
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
