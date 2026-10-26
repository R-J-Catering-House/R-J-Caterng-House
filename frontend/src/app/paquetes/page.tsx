import Link from "next/link";
import EditorialHero from "@/components/marketing/EditorialHero";
import SiteHeader from "@/components/marketing/SiteHeader";
import { IMAGES } from "@/lib/images";

type PackageCard = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  capacity: string;
  accent: string;
  includes: string[];
  extras: string[];
};

const packages: PackageCard[] = [
  {
    id: "plata",
    name: "Paquete Plata",
    subtitle: "Básico · Hasta 40 personas",
    price: "₡710.000",
    capacity: "Precio total cerrado",
    accent: "#A8A9AD",
    includes: [
      "Alimentación base para 40 invitados",
      "Ingredientes, chef y auxiliares",
      "Transporte/flete base",
      "Montaje y desmontaje",
      "Mobiliario y mantelería",
      "2 meseros dedicados",
      "Servicio de café",
      "Pastel de evento (permite subir foto de referencia)",
    ],
    extras: ["Cócteles de bienvenida", "Mesa de postres", "Barra de bebidas"],
  },
  {
    id: "dorado",
    name: "Paquete Dorado",
    subtitle: "Estándar · Hasta 80 personas",
    price: "₡1.250.000",
    capacity: "Precio total cerrado",
    accent: "#D4AF37",
    includes: [
      "Alimentación base para 80 invitados",
      "Ingredientes, chef y auxiliares",
      "Transporte/flete estándar",
      "Mobiliario y mantelería para 80 personas",
      "4 meseros dedicados",
      "Servicio de café",
      "Pastel de evento",
    ],
    extras: ["Cócteles de bienvenida", "Mesa de postres", "Barra de bebidas", "DJ", "Maestro de ceremonias", "Fotógrafo"],
  },
  {
    id: "esmeralda",
    name: "Paquete VIP Esmeralda",
    subtitle: "Lujo · Hasta 150 personas",
    price: "₡2.380.000",
    capacity: "Precio total cerrado",
    accent: "#6B7B5E",
    includes: [
      "Alimentación VIP para 150 invitados",
      "Experiencia VIP: acceso a instalaciones con área de piscina habilitada y servicio completo de barra de bebidas",
      "Coctelería de bienvenida: Margarita, Gin Tonic o Primavera",
      "Ingredientes, chef y auxiliares",
      "Transporte a zona exclusiva (ej. Uvita)",
      "Mobiliario premium",
      "8 meseros",
      "Servicio de café",
      "Pastel de evento",
    ],
    extras: ["Mesa de postres", "Centros de mesa florales"],
  },
];

export default function PackagesPage() {
  return (
    <div className="space-y-12 pb-10">
      <SiteHeader />
      <EditorialHero
        eyebrow="Paquetes R&J"
        title="Una propuesta para"
        highlight="cada celebración."
        description="Precios totales cerrados con la operación esencial de tu evento incluida. Sin cálculos por persona ni sorpresas."
        image={IMAGES.paquetes}
        imageAlt="Pasillo de ceremonia con arreglos florales"
      />

      <section aria-labelledby="packages-title">
        <div data-reveal className="mb-6">
          <p className="eyebrow">Elige tu experiencia</p>
          <h2 id="packages-title" className="section-title">Un precio claro. Una celebración memorable.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">Cada paquete cubre su capacidad máxima indicada. Invitado extra: ₡15.000.</p>
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((item, index) => (
            <div key={item.id} data-reveal style={{ transitionDelay: `${index * 140}ms` }} className="flex"><article className={`relative flex w-full flex-col rounded-xl border bg-white transition hover:-translate-y-1 ${index === 1 ? "border-2 border-sage-olive" : "border-line"}`}>
              {index === 1 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sage-olive px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream">Recomendado</span>}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-gold">{item.subtitle}</p>
                <h3 className="mt-2 text-center font-display text-3xl text-sage-olive">{item.name}</h3>
                <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45">{item.capacity}</p>
                <p className="mt-1 text-center font-display text-4xl font-semibold text-ink">{item.price}</p>
                <p className="mt-2 text-center text-xs text-ink/55">Invitado extra: ₡15.000</p>

                <div className="mt-6 border-t border-line pt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sage-olive">Qué incluye</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-5 text-ink/75">
                    {item.includes.map((entry) => <li key={entry} className="flex gap-2"><span className="text-sage-olive">✓</span><span>{entry}</span></li>)}
                  </ul>
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sage-olive">Adicionales con costo extra</h4>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{item.extras.join(" · ")}</p>
                </div>

                <Link href={`/cotizador?paquete=${item.id}`} className={`mt-7 w-full rounded-md border border-sage-olive px-5 py-3 text-center text-sm font-semibold transition ${index === 1 ? "bg-sage-olive text-cream hover:bg-sage-olive/85" : "text-sage-olive hover:bg-sage-olive hover:text-cream"}`}>
                  Seleccionar Paquete y Continuar
                </Link>
              </div>
            </article></div>
          ))}
        </div>
      </section>

    </div>
  );
}
