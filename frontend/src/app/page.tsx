import Link from "next/link";

import SiteHeader from "@/components/marketing/SiteHeader";
import { GalleryPreview, ServicesPreview, WhyUs } from "@/components/marketing/MarketingSections";

const salons = [
  { id: "tecal", name: "El Tecal", location: "Uvita", detail: "₡14,000 por persona", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=700&q=85" },
  { id: "asador", name: "El Asador", location: "General Viejo", detail: "₡150,000 alquiler", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=85" },
  { id: "corteza", name: "La Corteza", location: "Palmares · Pérez Zeledón", detail: "₡80,000 alquiler", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=700&q=85" },
];

export default function HomePage() {
  return (
    <div className="space-y-20">
      <SiteHeader />
      <section className="grid min-h-[65vh] items-center gap-10 rounded-[2rem] bg-beige/40 p-5 sm:p-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="luxury-kicker">R&J Catering House · Costa Rica</p>
          <h1 className="mt-5 max-w-3xl font-display text-6xl leading-[0.92] text-emerald sm:text-8xl">Momentos que se sirven<br /><span className="text-gold">con estilo.</span></h1>
          <div className="luxury-divider mx-0 mt-7" />
          <p className="mt-7 max-w-lg text-base leading-8 text-ink/60">Catering boutique para bodas, celebraciones y eventos que merecen una mesa extraordinaria.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-gold/90" href="/cotizador">Cotiza con nosotros</Link><Link className="rounded-xl border border-emerald px-6 py-3 text-sm font-bold text-emerald transition hover:bg-emerald hover:text-white" href="/galeria">Ver nuestra galería</Link></div>
        </div>
        <div className="relative h-[440px] overflow-hidden rounded-[2rem] border-8 border-white shadow-lg"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1100&q=85" alt="Mesa elegante preparada para una celebración" className="h-full w-full object-cover" /><div className="absolute bottom-5 left-5 right-5 rounded-xl border border-gold/50 bg-emerald/90 p-5 text-white backdrop-blur-sm"><p className="font-display text-2xl">Exquisitez en cada detalle.</p><p className="mt-1 text-xs leading-5 text-white/70">Una experiencia gastronómica creada para celebrar lo que importa.</p></div></div>
      </section>
      <section className="space-y-6"><div><p className="eyebrow">Elige tu escenario</p><h2 className="section-title">Tres salones, una celebración a tu medida</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-ink/55">Conoce nuestras locaciones y comienza a cotizar con el espacio que mejor representa tu evento.</p></div><div className="grid gap-4 md:grid-cols-3">{salons.map((salon) => <Link key={salon.id} href={`/cotizador?salon=${salon.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"><img src={salon.image} alt={salon.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-5"><h3 className="font-display text-2xl text-emerald">{salon.name}</h3><p className="text-xs font-bold uppercase tracking-wider text-gold">{salon.location}</p><p className="mt-3 text-sm text-ink/60">{salon.detail}</p><span className="mt-4 inline-block text-xs font-bold text-emerald">Cotizar este salón →</span></div></Link>)}</div></section>
      <GalleryPreview />
      <ServicesPreview />
      <WhyUs />
      <section className="rounded-3xl bg-gold/10 p-8 text-center sm:p-12"><p className="eyebrow">Tu próxima celebración empieza aquí</p><h2 className="mt-2 font-display text-4xl text-emerald">Haz que tu evento se sienta inolvidable.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ink/60">Cuéntanos qué imaginas y te ayudamos a convertirlo en una experiencia deliciosa, elegante y fácil de disfrutar.</p><Link href="/cotizador" className="mt-6 inline-flex rounded-xl bg-emerald px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald/90">Cotiza con nosotros</Link></section>
    </div>
  );
}
