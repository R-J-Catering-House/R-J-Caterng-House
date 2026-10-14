import Link from "next/link";

import SiteHeader from "@/components/marketing/SiteHeader";
import { GalleryPreview, ServicesPreview, WhyUs } from "@/components/marketing/MarketingSections";

type CatalogPackage = {
  id: number;
  name: string;
  description: string;
  price_per_person: number;
};

const salons = [
  { id: "tecal", name: "El Tecal", location: "Uvita", detail: "₡14,000 por persona", image: "/images/salon-tecal.png" },
  { id: "asador", name: "El Asador", location: "General Viejo", detail: "₡150,000 alquiler", image: "/images/salon-asador.png" },
  { id: "corteza", name: "La Corteza", location: "Palmares · Pérez Zeledón", detail: "₡80,000 alquiler", image: "/images/salon-corteza.png" },
];

const fallbackPackages: CatalogPackage[] = [
  { id: 1, name: "Celebración esencial", description: "Una propuesta cálida y completa para compartir sin complicaciones.", price_per_person: 14000 },
  { id: 2, name: "Experiencia signature", description: "Menú especial, montaje cuidado y atención personalizada para un día único.", price_per_person: 18500 },
  { id: 3, name: "Celebración premium", description: "La experiencia R&J completa, diseñada a la medida de tu evento.", price_per_person: 24000 },
];

async function getInitialPackages(): Promise<CatalogPackage[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

  try {
    const response = await fetch(`${baseUrl}/api/v1/catalog`, { next: { revalidate: 300 } });
    if (!response.ok) return fallbackPackages;
    const data = (await response.json()) as { packages?: CatalogPackage[] };
    return data.packages?.length ? data.packages : fallbackPackages;
  } catch {
    return fallbackPackages;
  }
}

export default async function HomePage() {
  const packages = await getInitialPackages();

  return (
    <div className="space-y-20">
      <SiteHeader />
      <section className="grid min-h-[65vh] items-center gap-10 rounded-[2rem] bg-beige/40 p-5 sm:p-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="luxury-kicker">R&J Catering House · Costa Rica</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] text-emerald sm:text-7xl lg:text-8xl">Momentos que se sirven<br /><span className="font-display italic text-gold">con estilo.</span></h1>
          <div className="luxury-divider mx-0 mt-7" />
          <p className="mt-7 max-w-lg text-base leading-8 text-ink/60">Catering boutique para bodas, celebraciones y eventos que merecen una mesa extraordinaria.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-gold/90" href="/cotizador">Cotiza con nosotros</Link><Link className="rounded-xl border border-emerald px-6 py-3 text-sm font-bold text-emerald transition hover:bg-emerald hover:text-white" href="/galeria">Ver nuestra galería</Link></div>
        </div>
        <div className="relative h-[440px] overflow-hidden rounded-[2rem] border-8 border-white shadow-lg"><img src="/images/salon-asador.png" alt="Montaje de celebración en El Asador" className="h-full w-full object-cover object-center" /><div className="absolute bottom-5 left-5 right-5 rounded-xl border border-gold/50 bg-black/75 p-5 text-white backdrop-blur-sm"><p className="font-display text-3xl">Exquisitez en cada detalle.</p><p className="mt-1 text-xs leading-5 text-white/70">Una experiencia gastronómica creada para celebrar lo que importa.</p></div></div>
      </section>
      <section className="space-y-6" id="paquetes">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Servicios iniciales</p>
            <h2 className="section-title">Una propuesta para cada forma de celebrar</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/55">Explora nuestras experiencias base y personalízalas con el equipo R&J.</p>
          </div>
          <Link href="/catalogo" className="text-sm font-bold text-emerald hover:text-gold">Ver catálogo completo →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {packages.slice(0, 3).map((item) => (
            <article key={item.id} className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs font-bold uppercase tracking-wider text-gold">Desde ₡{item.price_per_person.toLocaleString("es-CR")} por persona</p>
              <h3 className="mt-3 font-display text-2xl text-emerald">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/60">{item.description}</p>
              <Link href={`/cotizador?package=${item.id}`} className="mt-5 inline-block text-sm font-bold text-emerald hover:text-gold">Personalizar experiencia →</Link>
            </article>
          ))}
        </div>
      </section>
      <section className="space-y-6"><div><p className="eyebrow">Elige tu escenario</p><h2 className="section-title">Tres salones, una celebración a tu medida</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-ink/55">Conoce nuestras locaciones y comienza a cotizar con el espacio que mejor representa tu evento.</p></div><div className="grid gap-4 md:grid-cols-3">{salons.map((salon) => <Link key={salon.id} href={`/cotizador?salon=${salon.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"><img src={salon.image} alt={salon.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-5"><h3 className="font-display text-2xl text-emerald">{salon.name}</h3><p className="text-xs font-bold uppercase tracking-wider text-gold">{salon.location}</p><p className="mt-3 text-sm text-ink/60">{salon.detail}</p><span className="mt-4 inline-block text-xs font-bold text-emerald">Cotizar este salón →</span></div></Link>)}</div></section>
      <GalleryPreview />
      <ServicesPreview />
      <WhyUs />
      <section className="rounded-3xl bg-gold/10 p-8 text-center sm:p-12"><p className="eyebrow">Tu próxima celebración empieza aquí</p><h2 className="mt-2 font-display text-4xl text-emerald">Haz que tu evento se sienta inolvidable.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ink/60">Cuéntanos qué imaginas y te ayudamos a convertirlo en una experiencia deliciosa, elegante y fácil de disfrutar.</p><Link href="/cotizador" className="mt-6 inline-flex rounded-xl bg-emerald px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald/90">Cotiza con nosotros</Link></section>
    </div>
  );
}
