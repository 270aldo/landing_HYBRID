import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NGX HYBRID | Salud muscular despues de los 30",
  description:
    "HYBRID: IA + coach humano + tu para construir salud muscular con progreso medible en 12 semanas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
