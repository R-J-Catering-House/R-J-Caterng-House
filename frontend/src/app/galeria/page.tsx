import Link from "next/link";

import SiteHeader from "@/components/marketing/SiteHeader";

const images = [
  ["El Tecal · Uvita", "/images/salon-tecal.png"],
  ["El Asador · General Viejo", "/images/salon-asador.png"],
  ["La Corteza · Pérez Zeledón", "/images/salon-corteza.png"],
  ["Detalles de una celebración", "/images/salon-asador.png"],
  ["Celebración R&J", "/images/salon-corteza.png"],
];

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <SiteHeader />
      <section className="relative -mx-4 min-h-[30rem] overflow-hidden bg-olive text-white shadow-xl sm:-mx-8 sm:min-h-[34rem] lg:-mx-12">
        <img src="/images/salon-tecal.png" alt="Montaje de evento en El Tecal" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
        <div className="relative flex min-h-[30rem] max-w-3xl flex-col justify-end px-7 pb-12 sm:min-h-[34rem] sm:px-14 sm:pb-16">
          <p className="eyebrow text-sand">Galería de experiencias</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-7xl">Cada evento tiene<br /><span className="text-sand">su propia historia.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/80">Explora los espacios, montajes y detalles que hacen de R&J Catering House una elección diferente.</p>
        </div>
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map(([title, image]) => <article key={title} className="group relative h-80 overflow-hidden rounded-2xl bg-olive shadow-md"><img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5 text-white"><h2 className="font-display text-2xl">{title}</h2><p className="mt-2 text-xs text-white/70">Una celebración diseñada con intención.</p></div></article>)}
      </section>
    </div>
  );
}
