import SiteHeader from "@/components/marketing/SiteHeader";
<<<<<<< Updated upstream
import AvailabilityAgenda from "@/components/marketing/AvailabilityAgenda";
import SiteFooter from "@/components/marketing/SiteFooter";
import { AboutUs, ExtraServices, GalleryPreview, PackagesPreview, ServicesPreview } from "@/components/marketing/MarketingSections";

export default function MarketingPage() {
  return (
    <div className="pb-10">
      <SiteHeader />

      <section id="inicio" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-emerald text-center text-white">
        <img
          src="/images/salon-corteza.png"
          alt="Mesa preparada para una celebración R&J Catering House"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-burgundy/45" />
        <div className="relative z-10 max-w-4xl px-6 pt-16">
          <p className="eyebrow text-gold">R&J Catering House</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.9] sm:text-8xl">
            Celebraciones con <span className="text-gold">sabor y estilo.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            Diseñamos experiencias completas con gastronomía, espacios y atención cercana para que tu evento se sienta tan especial como lo imaginaste.
          </p>
          <a href="#reserva" className="mt-8 inline-flex rounded-full bg-pink px-7 py-3 text-sm font-bold text-burgundy transition hover:bg-white">Reservar mi fecha</a>
        </div>
      </section>

      <div className="space-y-20">
        <ServicesPreview />
        <PackagesPreview />
        <ExtraServices />
        <GalleryPreview />
        <AboutUs />
        <AvailabilityAgenda />
      </div>
      <SiteFooter />
=======
export default function MarketingPage() {
  return (
    <div>
      <section className="relative isolate w-full h-screen overflow-hidden bg-emerald text-white">
        <img
          src="/images/hero-boda-jardin.png"
          alt="Montaje de boda al aire libre con flores y sillas doradas"
          className="absolute inset-0 w-full h-full object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <SiteHeader overlay />
        <div className="pointer-events-none relative z-10 flex min-h-[calc(100vh-7rem)] items-center justify-center px-6 pb-24 pt-16 text-center sm:px-12">
          <div className="max-w-4xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-white/90 md:text-sm">
              Somos una empresa de organizacion de eventos
            </p>
            <h1 className="mt-5 font-script text-6xl leading-none text-white drop-shadow-md md:text-8xl">
              R&amp;J Catering House
            </h1>
          </div>
        </div>
      </section>

>>>>>>> Stashed changes
    </div>
  );
}
