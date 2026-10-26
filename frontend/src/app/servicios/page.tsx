import Image from "next/image";
import SiteHeader from "@/components/marketing/SiteHeader";
import { IMAGES } from "@/lib/images";
import { ServicesPreview, WhyUs } from "@/components/marketing/MarketingSections";

export default function ServicesPage() {
  return (
    <div className="space-y-14">
      <SiteHeader />
      <section className="relative -mx-4 min-h-[30rem] overflow-hidden bg-olive text-white shadow-xl sm:-mx-8 sm:min-h-[34rem] lg:-mx-12">
        <Image src={IMAGES.servicios} alt="Ramo de flores para una celebración R&J" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent" />
        <div className="relative flex min-h-[30rem] max-w-3xl flex-col justify-end px-7 pb-12 sm:min-h-[34rem] sm:px-14 sm:pb-16">
          <p className="eyebrow text-sand">Servicios R&J</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-7xl">Tu evento,<br /><span className="text-sand">bien acompañado.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/80">Diseñamos celebraciones con gastronomía, espacios y atención coordinados para que cada decisión se sienta fácil.</p>
        </div>
      </section>
      <ServicesPreview />
      <WhyUs />
    </div>
  );
}
