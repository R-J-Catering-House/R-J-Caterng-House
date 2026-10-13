import Link from "next/link";

const galleryImages = [
  ["Recepción al atardecer", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85"],
  ["Mesa de celebración", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85"],
  ["Detalles que emocionan", "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=85"],
  ["Una experiencia para compartir", "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=85"],
];

const services = [
  ["01", "Catering gastronómico", "Menús servidos a la mesa, ingredientes seleccionados y una propuesta que se adapta al ritmo de tu celebración."],
  ["02", "Diseño de eventos", "Montaje, decoración, mesas y detalles visuales coordinados para que todo se sienta intencional."],
  ["03", "Celebraciones sin estrés", "Un equipo dedicado acompaña la logística para que tú puedas estar presente en cada momento."],
];

export function GalleryPreview() {
  return (
    <section id="galeria" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Galería R&J</p>
          <h2 className="section-title">Momentos que hablan por sí solos</h2>
        </div>
        <Link href="/galeria" className="text-sm font-bold text-emerald hover:text-gold">Ver galería completa →</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map(([title, image]) => (
          <Link key={title} href="/galeria" className="group relative h-64 overflow-hidden rounded-2xl shadow-md">
            <img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-16 text-sm font-bold text-white">{title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section id="servicios" className="rounded-3xl bg-emerald p-7 text-white shadow-lg sm:p-10">
      <div className="max-w-2xl">
        <p className="eyebrow text-gold">Lo que hacemos</p>
        <h2 className="mt-2 font-display text-4xl">Más que un menú: creamos la atmósfera.</h2>
        <p className="mt-4 text-sm leading-7 text-white/70">Desde la primera conversación hasta el último brindis, convertimos la logística en una experiencia cálida, elegante y memorable.</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map(([number, title, description]) => (
          <article key={number} className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <span className="text-xs font-bold text-gold">{number}</span>
            <h3 className="mt-5 font-display text-2xl">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="relative min-h-[360px] overflow-hidden rounded-3xl">
        <img src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85" alt="Celebración elegante organizada por R&J Catering House" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div>
        <p className="eyebrow">Por qué elegirnos</p>
        <h2 className="section-title">La tranquilidad también es parte del lujo.</h2>
        <div className="mt-6 space-y-5">
          {["Propuestas transparentes para decidir con confianza.", "Salones y menús flexibles para cada tipo de celebración.", "Atención cercana de principio a fin.", "Una experiencia cuidada en cada detalle."].map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-ink/65"><span className="mt-1 text-gold">✦</span>{item}</div>
          ))}
        </div>
        <Link href="/cotizador" className="mt-8 inline-flex rounded-xl bg-gold px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-gold/90">Cotiza con nosotros</Link>
      </div>
    </section>
  );
}
