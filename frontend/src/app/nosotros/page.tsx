import SiteHeader from "@/components/marketing/SiteHeader";

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div className="relative h-[28rem] overflow-hidden rounded-3xl shadow-lg sm:h-[36rem]">
          <img src="/images/salon-tecal.png" alt="Rachel y Jimena creando una celebración R&J" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-4">
          <p className="eyebrow">Nuestra historia</p>
          <h1 className="font-display text-4xl font-bold text-gray-900 md:text-5xl">Sobre Nosotras</h1>
          <p className="text-sm leading-7 text-gray-700">Somos Rachel y Jimena, dos mejores amigas que convirtieron su pasión por la gastronomía y los eventos en una visión compartida: <strong className="font-bold text-gray-900">R&amp;J Catering House.</strong></p>
          <p className="text-sm leading-7 text-gray-700">Lo que comenzó como un sueño entre conversaciones y proyectos se transformó en una firma de catering de alta gama. Creemos fielmente que <strong className="font-bold text-gray-900">cada celebración cuenta una historia única</strong>, y nuestro propósito es diseñar experiencias culinarias inolvidables, combinando recetas refinadas, mobiliario elegante y una atención cálida y personalizada.</p>
          <p className="text-sm leading-7 text-gray-700"><strong className="font-bold text-gray-900">Nos encargamos de cada detalle</strong> para que tú y tus invitados solo se preocupen por disfrutar el momento.</p>
        </div>
      </section>
    </div>
  );
}
