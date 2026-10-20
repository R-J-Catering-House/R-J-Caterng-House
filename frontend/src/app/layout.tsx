import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import PublicFooter from "@/components/marketing/PublicFooter";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const script = Great_Vibes({ subsets: ["latin"], variable: "--font-script", weight: "400" });

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
      </body>
    </html>
  );
}
