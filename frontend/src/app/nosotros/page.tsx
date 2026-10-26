import Image from "next/image";
import SiteHeader from "@/components/marketing/SiteHeader";
import { IMAGES } from "@/lib/images";

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div data-reveal className="relative h-[28rem] overflow-hidden rounded-3xl sm:h-[36rem]">
          <Image src={IMAGES.sobre} alt="Sillas decoradas con flores para una celebración R&J" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div data-reveal style={{ transitionDelay: "180ms" }} className="space-y-4">
          <p className="eyebrow">Nuestra historia</p>
          <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">Sobre Nosotras</h1>
          <p className="text-sm leading-7 text-ink/70">Somos Rachel y Jimena, dos mejores amigas que convirtieron su pasión por la gastronomía y los eventos en una visión compartida: <strong className="font-bold text-ink">R&amp;J Catering House.</strong></p>
          <p className="text-sm leading-7 text-ink/70">Lo que comenzó como un sueño entre conversaciones y proyectos se transformó en una firma de catering de alta gama. Creemos fielmente que <strong className="font-bold text-ink">cada celebración cuenta una historia única</strong>, y nuestro propósito es diseñar experiencias culinarias inolvidables, combinando recetas refinadas, mobiliario elegante y una atención cálida y personalizada.</p>
          <p className="text-sm leading-7 text-ink/70"><strong className="font-bold text-ink">Nos encargamos de cada detalle</strong> para que tú y tus invitados solo se preocupen por disfrutar el momento.</p>
        </div>
      </section>
    </div>
  );
}
