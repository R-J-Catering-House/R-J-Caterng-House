import SiteHeader from "@/components/marketing/SiteHeader";
import { ServicesPreview, WhyUs } from "@/components/marketing/MarketingSections";

export default function ServicesPage() {
  return (
    <div className="space-y-14">
      <SiteHeader />
      <section className="relative -mx-4 min-h-[30rem] overflow-hidden bg-olive text-white shadow-xl sm:-mx-8 sm:min-h-[34rem] lg:-mx-12">
        <img src="/images/salon-asador.png" alt="Celebración atendida por R&J Catering House" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
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
