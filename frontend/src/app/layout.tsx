import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

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
      <body className={`${display.variable} ${sans.variable} min-h-screen font-sans`}>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">{children}</main>
      </body>
    </html>
  );
}
