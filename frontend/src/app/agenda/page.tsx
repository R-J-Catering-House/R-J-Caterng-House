import Image from "next/image";
import AgendaCalendar from "@/components/marketing/AgendaCalendar";
import SiteHeader from "@/components/marketing/SiteHeader";
import { IMAGES } from "@/lib/images";

export default function AgendaPage() {
  return (
    <div className="space-y-0 bg-cream">
      <SiteHeader />
      <section className="relative h-[380px] overflow-hidden rounded-b-3xl md:h-[450px]">
        <Image src={IMAGES.agenda} alt="Pasillo de ceremonia con arreglos florales" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
        <h1 data-reveal className="my-6 text-center font-display text-4xl font-bold text-ink md:text-5xl">Agenda 2026-2027</h1>
        <p data-reveal className="mb-10 text-center text-sm text-ink/60">Elige una fecha disponible para cotizar tu evento. Las fechas en rosa ya están reservadas.</p>
        <AgendaCalendar />
      </section>
    </div>
  );
}
