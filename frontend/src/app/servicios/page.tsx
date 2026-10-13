import Link from "next/link";

import SiteHeader from "@/components/marketing/SiteHeader";
import { ServicesPreview, WhyUs } from "@/components/marketing/MarketingSections";

export default function ServicesPage() {
  return (
    <div className="space-y-14">
      <SiteHeader />
      <section className="max-w-3xl">
        <p className="eyebrow">Servicios R&J</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-emerald sm:text-7xl">Tu evento,<br /><span className="text-gold">bien acompañado.</span></h1>
        <p className="mt-5 text-base leading-8 text-ink/60">Diseñamos celebraciones con gastronomía, espacios y atención coordinados para que cada decisión se sienta fácil.</p>
      </section>
      <ServicesPreview />
      <WhyUs />
      <section className="rounded-3xl border border-gold/30 bg-gold/10 p-8 text-center"><h2 className="font-display text-3xl text-emerald">Demos el primer paso</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink/60">Cuéntanos la fecha, el salón y el tipo de celebración. Te ayudamos a construir una propuesta a tu medida.</p><Link href="/cotizador" className="mt-5 inline-flex rounded-xl bg-emerald px-6 py-3 text-sm font-bold text-white">Cotiza con nosotros</Link></section>
    </div>
  );
}
