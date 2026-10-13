import Link from "next/link";

import SiteHeader from "@/components/marketing/SiteHeader";

const images = [
  ["El Tecal · Uvita", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85"],
  ["El Asador · General Viejo", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85"],
  ["La Corteza · Pérez Zeledón", "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=85"],
  ["Mesa de bienvenida", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85"],
  ["Detalles florales", "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85"],
  ["Celebración R&J", "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85"],
];

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <SiteHeader />
      <section className="max-w-3xl">
        <p className="eyebrow">Galería de experiencias</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-emerald sm:text-7xl">Cada evento tiene<br /><span className="text-gold">su propia historia.</span></h1>
        <p className="mt-5 text-base leading-8 text-ink/60">Explora los espacios, montajes y detalles que hacen de R&J Catering House una elección diferente.</p>
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map(([title, image]) => <article key={title} className="group overflow-hidden rounded-2xl bg-white shadow-md"><img src={image} alt={title} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" /><div className="p-5"><h2 className="font-display text-2xl text-emerald">{title}</h2><p className="mt-2 text-xs text-ink/50">Una celebración diseñada con intención.</p></div></article>)}
      </section>
      <div className="rounded-3xl bg-emerald p-8 text-center text-white"><p className="font-display text-3xl">¿Listo para crear la tuya?</p><Link href="/cotizador" className="mt-5 inline-flex rounded-xl bg-gold px-6 py-3 text-sm font-bold">Cotiza con nosotros</Link></div>
    </div>
  );
}
