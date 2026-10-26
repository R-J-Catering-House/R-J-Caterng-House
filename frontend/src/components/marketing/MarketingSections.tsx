import Link from "next/link";

const galleryImages = [
  ["El Asador · General Viejo", "/images/salon-asador.png"],
  ["El Tecal · Uvita", "/images/salon-tecal.png"],
  ["La Corteza · Pérez Zeledón", "/images/salon-corteza.png"],
];

const services = [
  ["01", "Catering gastronómico", "Menús servidos a la mesa, ingredientes seleccionados y una propuesta que se adapta al ritmo de tu celebración."],
  ["02", "Diseño de eventos", "Montaje, decoración, mesas y detalles visuales coordinados para que todo se sienta intencional."],
  ["03", "Celebraciones sin estrés", "Un equipo dedicado acompaña la logística para que tú puedas estar presente en cada momento."],
];

export function GalleryPreview() {
  return (
    <section id="galeria" className="mx-auto max-w-7xl space-y-6 px-5 sm:px-10">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Galería R&J</p>
          <h2 className="section-title">Momentos que hablan por sí solos</h2>
        </div>
        <Link href="/galeria" className="text-sm font-bold text-sage-dark hover:text-gold">Ver galería completa →</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map(([title, image]) => (
          <Link key={title} href="/galeria" className="group relative h-72 overflow-hidden rounded-2xl shadow-md sm:h-80 lg:h-72">
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
    <section id="servicios" className="bg-sage px-5 py-20 text-white shadow-lg sm:px-10">
      <div data-reveal className="max-w-2xl">
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

export function PackagesPreview() {
  const packages = [
    ["Paquete Plata", "Una propuesta elegante y flexible para celebrar a tu manera.", "Precio por evento · Por definir"],
    ["Paquete Dorado", "Una experiencia completa con gastronomía, montaje y atención dedicada.", "Precio por evento · Por definir"],
    ["Paquete Esmeralda VIP", "Cóctel de bienvenida, barra libre de bebidas, ambientación de piscina, mesas de lujo y mesa de postres gourmet.", "₡2,800,000 por evento"],
  ];

  return (
    <section id="paquetes" className="bg-blush px-5 py-20 sm:px-10">
      <div className="mx-auto max-w-7xl"><div data-reveal className="mx-auto max-w-2xl text-center"><p className="eyebrow">Paquetes R&amp;J</p><h2 className="section-title text-5xl">Elige la experiencia para tu evento</h2><p className="mt-4 text-sm leading-7 text-ink/60">Cada propuesta se adapta a la celebración que tienes en mente.</p></div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {packages.map(([name, description, price], index) => <article key={name} data-reveal style={{ transitionDelay: `${index * 120}ms` }} className={`rounded-3xl p-7 ${index === 2 ? "bg-sage-dark text-white" : "border border-rose/20 bg-white/70 text-ink"}`}>
          <span className={`text-xs font-bold ${index === 2 ? "text-gold" : "text-gold"}`}>0{index + 1}</span>
          <h3 className="mt-10 font-display text-4xl">{name}</h3>
          <p className={`mt-4 min-h-20 text-sm leading-6 ${index === 2 ? "text-white/75" : "text-ink/60"}`}>{description}</p>
          <p className={`mt-8 border-t pt-5 text-sm font-bold ${index === 2 ? "border-white/20 text-gold" : "border-rose/20 text-sage-dark"}`}>{price}</p>
        </article>)}
      </div>
      </div>
    </section>
  );
}

export function ExtraServices() {
  const extras = ["Mesa de postres adicional", "Coctelería personalizada", "Garzones VIP", "Cristalería fina"];
  return <section id="servicios-extra" className="bg-blush px-5 py-20 sm:px-10"><div data-reveal className="mx-auto max-w-7xl"><p className="eyebrow">A tu medida</p><h2 className="section-title text-5xl">Servicios Extra</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{extras.map((extra) => <div key={extra} className="rounded-2xl border border-rose/20 bg-white/60 p-5 text-center font-display text-2xl text-sage-dark">{extra}</div>)}</div></div></section>;
}

export function WhyUs() {
  return (
    <section id="nosotros" className="scroll-mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div data-reveal className="relative min-h-[24rem] overflow-hidden rounded-3xl sm:min-h-[32rem]">
        <img src="/images/salon-asador.png" alt="Celebración elegante organizada por R&J Catering House" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div>
        <p className="eyebrow">Por qué elegirnos</p>
        <h2 className="section-title">La tranquilidad también es parte del lujo.</h2>
        <div className="mt-6 space-y-5">
          {["Propuestas transparentes para decidir con confianza.", "Salones y menús flexibles para cada tipo de celebración.", "Atención cercana de principio a fin.", "Una experiencia cuidada en cada detalle."].map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-ink/65"><span className="mt-1 text-rose">✦</span>{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
