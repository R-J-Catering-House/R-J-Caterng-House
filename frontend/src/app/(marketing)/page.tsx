import Link from "next/link";

import SiteHeader from "@/components/marketing/SiteHeader";
import { GalleryPreview, ServicesPreview, WhyUs } from "@/components/marketing/MarketingSections";

export default function MarketingPage() {
  return (
    <div className="space-y-16 pb-10">
      <SiteHeader />

      <section className="relative overflow-hidden rounded-[2rem] bg-emerald text-white shadow-xl">
        <img
          src="/images/salon-corteza.png"
          alt="Mesa preparada para una celebración R&J Catering House"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative max-w-3xl px-7 py-20 sm:px-14 sm:py-28">
          <p className="eyebrow text-gold">R&J Catering House</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-8xl">
            Celebraciones con <span className="text-gold">sabor y estilo.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Diseñamos experiencias completas con gastronomía, espacios y atención cercana para que tu evento se sienta tan especial como lo imaginaste.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cotizador" className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-white transition hover:bg-gold/90">
              Crear mi reserva
            </Link>
            <Link href="/galeria" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              Ver espacios
            </Link>
          </div>
        </div>
      </section>

      <ServicesPreview />
      <WhyUs />
      <GalleryPreview />

      <section className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-gold/35 bg-gold/10 p-8 sm:flex-row sm:items-center sm:p-10">
        <div>
          <p className="eyebrow">Tu fecha empieza aquí</p>
          <h2 className="mt-2 font-display text-4xl text-emerald">Construyamos tu celebración.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/60">Consulta salones, menú, precios y disponibilidad en nuestro cotizador.</p>
        </div>
        <Link href="/cotizador" className="shrink-0 rounded-xl bg-emerald px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald/90">
          Cotizar ahora
        </Link>
      </section>
    </div>
  );
}
