import Image from "next/image";
import type { CSSProperties } from "react";
import SiteHeader from "@/components/marketing/SiteHeader";
import { IMAGES } from "@/lib/images";

export default function MarketingPage() {
  return (
    <div>
      <section className="relative isolate w-full h-screen overflow-hidden bg-sage text-white">
        <Image
          src={IMAGES.portada}
          alt="Montaje de boda con flores y vajilla dorada"
          fill
          priority
          sizes="100vw"
          className="hero-zoom -z-10 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,35,28,0.45)_0%,transparent_65%)]" />
        <SiteHeader overlay />
        <div className="relative z-10 flex min-h-[calc(100vh-7rem)] items-center justify-center px-6 pb-24 pt-16 text-center sm:px-12">
          <div className="max-w-4xl [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
            <p style={{ "--delay": "400ms" } as CSSProperties} className="hero-fade text-xs font-semibold uppercase tracking-[0.35em] text-white md:text-sm">
              Somos una empresa de organización de eventos
            </p>
            <h1 style={{ "--delay": "1100ms" } as CSSProperties} className="hero-fade mt-6 font-script text-6xl leading-[1.05] text-white sm:text-7xl md:text-[7rem]">
              R&amp;J Catering House
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
