import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";
import PublicFooter from "@/components/marketing/PublicFooter";
import RevealOnScroll from "@/components/marketing/RevealOnScroll";

// Fuentes guardadas en src/fonts para no depender de descargar Google Fonts al compilar.
const display = localFont({
  src: [
    { path: "../fonts/cormorant-garamond.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/cormorant-garamond-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-display",
});
const sans = localFont({ src: "../fonts/open-sans.woff2", weight: "400 700", variable: "--font-sans" });
const script = localFont({ src: "../fonts/great-vibes.woff2", weight: "400", variable: "--font-script" });

export const metadata: Metadata = {
  title: "R&J Catering House",
  description: "Catering boutique para celebraciones extraordinarias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${sans.variable} ${script.variable} min-h-screen font-sans`}>
        <main className="w-full max-w-none">{children}</main>
        <PublicFooter />
        <RevealOnScroll />
      </body>
    </html>
  );
}
