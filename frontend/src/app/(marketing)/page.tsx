import SiteHeader from "@/components/marketing/SiteHeader";
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

    </div>
  );
}
