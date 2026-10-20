"use client";

import { jsPDF } from "jspdf";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import SiteHeader from "@/components/marketing/SiteHeader";
import decorationCatalog from "@/data/decoration-catalog.json";

type PackageId = "plata" | "dorado" | "esmeralda";
type ZoneId = "central" | "uvita";
type FurnitureId = "standard" | "luxury";
type AddonId = "dessertTable" | "dj" | "mc" | "photoVideo" | "photoBooth" | "magicMirror" | "video360";

type Package = {
  id: PackageId;
  name: string;
  capacity: number;
  price: number;
  image: string;
  included: string[];
};

type Dish = { id: string; name: string; description: string; price: number; image: string };
type Addon = { id: AddonId; label: string; price: number; description: string; image?: string };

const packages: Record<PackageId, Package> = {
  plata: {
    id: "plata", name: "Paquete Plata", capacity: 80, price: 1613000, image: "/images/salon-corteza.png",
    included: ["Menú base ₡11.000 por persona", "Insumos e ingredientes", "Chef principal y cocinero auxiliar", "Montaje y desmontaje", "Flete base", "4 saloneros", "Mobiliario y mantelería base", "Estación de Café y Galletas Artesanales: incluido (₡0 / cortesía de la casa)", "Pastel de evento"],
  },
  dorado: {
    id: "dorado", name: "Paquete Dorado", capacity: 150, price: 2548000, image: "/images/salon-tecal.png",
    included: ["Menú base ₡11.000 por persona", "Costos operativos y de cocina", "Chef y equipo auxiliar", "Montaje y desmontaje", "Flete base", "8 saloneros", "Mobiliario y mantelería base", "Estación de Café y Galletas Artesanales: incluido (₡0 / cortesía de la casa)", "Pastel de evento"],
  },
  esmeralda: {
    id: "esmeralda", name: "Paquete VIP Esmeralda", capacity: 800, price: 13603000, image: "/images/paquetes-vip.png",
    included: ["Menú base ₡11.000 por persona", "Flete premium para zonas como Uvita", "40 saloneros", "Mobiliario de lujo", "Cóctel de bienvenida de cortesía", "Estación de Café y Galletas Artesanales: incluido (₡0 / cortesía de la casa)", "Pastel de evento", "Uso de piscina sujeto a confirmación"],
  },
};

const dishes: Dish[] = [
  { id: "mano", name: "Opción #1 · Mano de piedra", description: "En salsa demiglace y hongos.", price: 11000, image: "/images/menu/menu-mano-piedra.png" },
  { id: "pollo", name: "Opción #2 · Pechuga a la parrilla", description: "En salsa Alfredo de hongos.", price: 12500, image: "/images/menu/menu-pollo-alfredo.png" },
  { id: "cordon", name: "Opción #3 · Cordon Bleu", description: "En salsa Alfredo de hongos.", price: 14000, image: "/images/menu/menu-cordon-bleu.png" },
  { id: "costilla", name: "Opción #4 · Costilla de cerdo", description: "En salsa BBQ de manzana.", price: 12000, image: "/images/menu/menu-costilla-bbq.png" },
  { id: "steak", name: "Opción #5 · NY Steak", description: "300g importado con chimichurri argentino.", price: 16500, image: "/images/menu/menu-ny-steak.png" },
];

const starters = [
  { name: "Sopa Azteca", image: "/images/menu/entrada-sopa-azteca.png" },
  { name: "Crema de ayote y crotones", image: "/images/menu/entrada-crema-ayote.png" },
  { name: "Ensalada verde y salmón ahumado", image: "/images/menu/entrada-salmon.png" },
  { name: "Mini hamburguesa", image: "/images/menu/entrada-mini-hamburguesa.png" },
];
const sides = [
  { name: "Puré de papas", image: "/images/menu/acompanamiento-pure.png" },
  { name: "Papas rostizadas", image: "/images/menu/acompanamiento-papas.png" },
  { name: "Arroz con almendras", image: "/images/menu/acompanamiento-arroz.png" },
  { name: "Ensalada verde", image: "/images/menu/acompanamiento-ensalada.png" },
  { name: "Vegetales a la parrilla", image: "/images/menu/acompanamiento-vegetales.png" },
];
const desserts = [
  { name: "Torta de queso con salsa de moras", image: "/images/menu/postre-cheesecake.png" },
  { name: "Flan horneado", image: "/images/menu/postre-flan.png" },
  { name: "Tiramisú", image: "/images/menu/postre-tiramisu.png" },
];
const centerpieces = ["Arreglos florales altos", "Bases con velas", "Arreglos naturales", "Sin centro de mesa"];
const furniture = [
  { id: "standard" as FurnitureId, name: "Sillas Estándar", description: "Incluidas en el paquete.", image: "/images/salon-corteza.png", price: 0 },
  { id: "luxury" as FurnitureId, name: "Sillas de Lujo", description: "Tiffany / Crossback.", image: "/images/paquetes-vip.png", price: 150000 },
];
const decorStyles = decorationCatalog;
const addons: Addon[] = [
  { id: "dessertTable", label: "Mesa de postres adicional", price: 85000, description: "Una estación dulce para complementar el menú.", image: "/images/extras/extra-mesa-postres.png" },
  { id: "dj", label: "DJ profesional (4 horas)", price: 200000, description: "Música y sonido profesional.", image: "/images/extras/extra-dj.png" },
  { id: "mc", label: "Maestro de ceremonias / Animador", price: 190000, description: "Conducción y energía para tu celebración.", image: "/images/extras/extra-animador.png" },
  { id: "photoVideo", label: "Fotógrafo y cobertura de video", price: 220000, description: "Registro profesional de los momentos clave.", image: "/images/extras/extra-fotografo.png" },
  { id: "photoBooth", label: "Fotocabina abierta", price: 85000, description: "Experiencia interactiva para tus invitados.", image: "/images/extras/extra-fotocabina.png" },
  { id: "magicMirror", label: "Espejo Mágico", price: 120000, description: "Retratos y animación con acabados especiales.", image: "/images/extras/extra-espejo-magico.png" },
  { id: "video360", label: "Plataforma Video 360°", price: 110000, description: "Videos inmersivos para compartir.", image: "/images/extras/extra-video-360.png" },
];
const money = (value: number) => `₡${value.toLocaleString("es-CR")}`;

export default function CotizadorPage() {
  const [step, setStep] = useState(1);
  const [packageId, setPackageId] = useState<PackageId>("dorado");
  const [guests, setGuests] = useState(80);
  const [eventType, setEventType] = useState("Boda");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [pool, setPool] = useState(false);
  const [zone, setZone] = useState<ZoneId>("central");
  const [dishId, setDishId] = useState("mano");
  const [starter, setStarter] = useState("");
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const [dessert, setDessert] = useState(desserts[0].name);
  const [furnitureId, setFurnitureId] = useState<FurnitureId>("standard");
  const [decor, setDecor] = useState<string>(decorStyles[0].name);
  const [centerpiece, setCenterpiece] = useState(centerpieces[0]);
  const [welcomeDrink, setWelcomeDrink] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<AddonId[]>([]);
  const [cakeReference, setCakeReference] = useState("");
  const [decorReference, setDecorReference] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [notice, setNotice] = useState("");
  const [folio, setFolio] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);

  const selectedPackage = packages[packageId];
  const selectedDish = dishes.find((item) => item.id === dishId) ?? dishes[0];
  const includedFreight = packageId === "esmeralda" ? 95000 : 45000;
  const freightDifference = (zone === "uvita" ? 95000 : 45000) - includedFreight;
  const dishDifference = (selectedDish.price - 11000) * guests;
  const starterTotal = starter ? 2000 * guests : 0;
  const foodSubtotal = (selectedDish.price + (starter ? 2000 : 0)) * guests;
  const furnitureTotal = furniture.find((item) => item.id === furnitureId)?.price ?? 0;
  const addonsTotal = selectedAddons.reduce((sum, id) => sum + (addons.find((item) => item.id === id)?.price ?? 0), 0);
  const welcomeDrinkPrice = welcomeDrink === "Margarita · ₡3.000/persona" ? 3000 : welcomeDrink === "Gin Tonic · ₡2.000/persona" ? 2000 : welcomeDrink === "Primavera sin alcohol · ₡1.500/persona" ? 1500 : 0;
  const welcomeDrinkTotal = packageId === "esmeralda" ? 0 : welcomeDrinkPrice * guests;
  const total = selectedPackage.price + dishDifference + starterTotal + freightDifference + furnitureTotal + addonsTotal + welcomeDrinkTotal;

  useEffect(() => {
    const queryPackage = new URLSearchParams(window.location.search).get("paquete");
    if (queryPackage === "plata" || queryPackage === "dorado" || queryPackage === "esmeralda") {
      setPackageId(queryPackage);
      setGuests(Math.min(80, packages[queryPackage].capacity));
    }
  }, []);

  function selectPackage(id: PackageId) {
    setPackageId(id);
    setGuests(Math.min(80, packages[id].capacity));
    if (id !== "esmeralda") {
      setPool(false);
      setWelcomeDrink("");
    }
  }

  function toggleSide(side: string) {
    setSelectedSides((current) => current.includes(side) ? current.filter((item) => item !== side) : current.length < 2 ? [...current, side] : current);
  }

  function toggleAddon(id: AddonId) {
    setSelectedAddons((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function nextStep() {
    setNotice("");
    if (step === 2 && (!date || !timeStart || !timeEnd || timeEnd <= timeStart || guests < 1 || guests > selectedPackage.capacity)) {
      setNotice(`Completa fecha, horario válido y una cantidad entre 1 y ${selectedPackage.capacity} invitados.`);
      return;
    }
    if (step === 3 && selectedSides.length !== 2) {
      setNotice("Selecciona exactamente 2 acompañamientos incluidos.");
      return;
    }
    setStep((current) => Math.min(5, current + 1));
  }

  function createFolio() {
    return `RJ-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  }

  function summaryLines() {
    return [
      `Paquete: ${selectedPackage.name} · ${money(selectedPackage.price)}`,
      `Invitados: ${guests}`,
      `Evento: ${eventType}`,
      `Fecha y horario: ${date || "Pendiente"} · ${timeStart || "--:--"} - ${timeEnd || "--:--"}`,
      `Piscina: ${pool ? "Habilitada" : "No habilitada"}`,
      `Zona/flete: ${zone === "uvita" ? "Uvita" : "Zona Central"} · ${money(zone === "uvita" ? 95000 : 45000)}`,
      `Menú: ${selectedDish.name} · diferencia ${money(dishDifference)}`,
      `Subtotal alimentación: ${money(foodSubtotal)} (${guests} × ${money(selectedDish.price + (starter ? 2000 : 0))})`,
      `Entrada: ${starter || "No seleccionada"}`,
      `Acompañamientos: ${selectedSides.join(", ") || "Pendientes"}`,
      `Postre incluido: ${dessert}`,
      "Estación de Café y Galletas Artesanales: incluido (₡0 / cortesía de la casa)",
      `Mobiliario: ${furniture.find((item) => item.id === furnitureId)?.name}`,
      `Decoración: ${decor} · ${centerpiece}`,
      `Coctelería: ${welcomeDrink || (packageId === "esmeralda" ? "Incluida en VIP" : "No seleccionada")}`,
      `Extras: ${selectedAddons.map((id) => addons.find((item) => item.id === id)?.label).join(", ") || "Ninguno"}`,
      `Referencias: pastel ${cakeReference || "no adjunta"} · decoración ${decorReference || "no adjunta"}`,
      `Total general: ${money(total)}`,
    ];
  }

  function downloadPdf() {
    const pdf = new jsPDF();
    pdf.setFillColor(4, 99, 7);
    pdf.rect(0, 0, 210, 38, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text("R&J Catering House", 18, 17);
    pdf.setFontSize(11);
    pdf.text("Cotización de evento", 18, 27);
    pdf.setTextColor(26, 26, 26);
    pdf.setFontSize(10);
    let y = 52;
    summaryLines().forEach((line) => {
      if (y > 275) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(line, 18, y);
      y += 8;
    });
    pdf.setTextColor(212, 175, 55);
    pdf.setFontSize(9);
    pdf.text("Propuesta sujeta a confirmación de disponibilidad.", 18, Math.min(y + 8, 290));
    pdf.save(`cotizacion-rj-${new Date().getFullYear()}.pdf`);
  }

  function sendWhatsApp() {
    if (!contact.name || !contact.email || !contact.phone) {
      setNotice("Completa nombre, correo electrónico y teléfono para continuar.");
      return;
    }
    const currentFolio = folio || createFolio();
    setFolio(currentFolio);
    window.localStorage.setItem(`rj-cotizacion-${currentFolio}`, JSON.stringify({ folio: currentFolio, contact, packageId, total, summary: summaryLines() }));
    const phone = (process.env.NEXT_PUBLIC_WEDDING_PLANNER_PHONE ?? "50662916883").replace(/\D/g, "");
    const message = `Hola, soy ${contact.name}. Deseo reservar una fecha en R&J Catering House.\nFolio: ${currentFolio}\n${summaryLines().join("\n")}\nContacto: ${contact.email} · ${contact.phone}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (!whatsappWindow) {
      window.location.assign(whatsappUrl);
      return;
    }
    setNotice(`Cotización ${currentFolio} preparada para WhatsApp.`);
  }

  const inputClass = "mt-2 w-full rounded-xl border border-[#1A1A1A]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#046307]";

  return (
    <div className="cotizador-page space-y-8 pb-20">
      <SiteHeader />
      <header className="rounded-3xl bg-[#046307] px-7 py-10 text-white sm:px-14">
        <p className="eyebrow text-[#D4AF37]">Cotizador en tiempo real</p>
        <h1 className="mt-2 font-display text-5xl">Diseña tu celebración.</h1>
        <div className="mt-8 grid grid-cols-5 gap-2" aria-label="Progreso del cotizador">{["Paquete", "Logística", "Menú", "Catálogo", "Reserva"].map((label, index) => <div key={label} className={`border-t-2 pt-2 text-xs font-semibold ${step >= index + 1 ? "border-[#D4AF37] text-white" : "border-white/25 text-white/45"}`}>{index + 1}. {label}</div>)}</div>
      </header>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main>
          {step === 1 && <WizardSection title="1. Selección del paquete base" description="Precios globales precalculados, con costos operativos claros."><div className="grid gap-5 md:grid-cols-3">{Object.values(packages).map((item) => <button type="button" key={item.id} onClick={() => selectPackage(item.id)} className={`group overflow-hidden rounded-3xl border text-left transition ${packageId === item.id ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/30" : "border-[#1A1A1A]/10 hover:border-[#046307]"}`}><img src={item.image} alt="" className="h-40 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-5"><h2 className="font-display text-3xl text-[#046307]">{item.name}</h2><p className="mt-2 text-sm font-bold">{item.capacity} personas</p><p className="mt-4 text-2xl font-bold">{money(item.price)}</p><ul className="mt-4 space-y-1 text-xs leading-5 text-[#1A1A1A]/65">{item.included.slice(0, 4).map((line) => <li key={line}>✦ {line}</li>)}</ul></div></button>)}</div><StepButton onClick={nextStep}>Continuar con logística</StepButton></WizardSection>}

          {step === 2 && <WizardSection title="2. Datos y logística del evento" description="Selecciona fecha, ubicación, horarios y condiciones de tu celebración."><div className="grid gap-5 sm:grid-cols-2"><Field label="Tipo de evento"><select className={inputClass} value={eventType} onChange={(event) => setEventType(event.target.value)}>{["Boda", "Quinceaños", "Evento Corporativo", "Cumpleaños", "Fiesta Privada"].map((item) => <option key={item}>{item}</option>)}</select></Field><Field label={`Cantidad de invitados · máximo ${selectedPackage.capacity}`}><input className={inputClass} type="number" min={1} max={selectedPackage.capacity} value={guests} onChange={(event) => setGuests(Math.max(1, Number(event.target.value) || 1))} /></Field><Field label="Fecha del evento"><input className={inputClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} /></Field><Field label="Hora de inicio"><input className={inputClass} type="time" value={timeStart} onChange={(event) => setTimeStart(event.target.value)} /></Field><Field label="Hora de finalización"><input className={inputClass} type="time" value={timeEnd} onChange={(event) => setTimeEnd(event.target.value)} /></Field><Field label="Ubicación / flete"><select className={inputClass} value={zone} onChange={(event) => setZone(event.target.value as ZoneId)}><option value="central">Zona Central · ₡45.000</option><option value="uvita">Zonas Periféricas / Costa · Uvita · ₡95.000</option></select></Field></div><Toggle label="¿Desea habilitar el uso de la piscina durante el evento?" checked={pool} onChange={() => setPool((current) => !current)} /><p className="mt-3 text-xs text-[#1A1A1A]/55">La habilitación final se confirma según la sede y disponibilidad.</p>{notice && <Notice>{notice}</Notice>}<NavigationButtons onBack={() => setStep(1)} onNext={nextStep} /></WizardSection>}

          {step === 3 && <WizardSection title="3. Menú y alimentación · El Asador" description="El menú base es ₡11.000 por persona; solo se suma la diferencia al elegir una opción superior."><div className="grid gap-4 md:grid-cols-2">{dishes.map((item) => <button type="button" key={item.id} onClick={() => setDishId(item.id)} className={`overflow-hidden rounded-2xl border text-left ${dishId === item.id ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/25" : "border-[#1A1A1A]/10"}`}><img src={item.image} alt={item.name} className="h-32 w-full object-cover" /><div className="p-4"><h3 className="font-bold text-[#046307]">{item.name}</h3><p className="mt-1 text-xs text-[#1A1A1A]/60">{item.description}</p><p className="mt-3 font-bold">{money(item.price)} <span className="text-xs font-normal">/ persona</span></p></div></button>)}</div><div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm"><div className="grid items-center gap-5 sm:grid-cols-[140px_1fr]"><img src="/images/menu/cafe-galletas.png" alt="Taza de café caliente y galletas artesanales" className="h-28 w-full rounded-xl object-cover" /><div><span className="inline-flex rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">Cortesía de la casa</span><p className="mt-3 text-lg font-bold text-[#046307]">El café y las galletas están incluidos en todos nuestros paquetes</p><p className="mt-1 text-xs text-[#1A1A1A]/60">Estación de Café y Galletas Artesanales · ₡0</p></div></div></div><div className="mt-8 grid gap-6 md:grid-cols-2"><div><p className="text-sm font-bold">Entrada opcional · ₡2.000 por persona</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{starters.map((item) => <label key={item.name} className={`overflow-hidden rounded-xl border text-sm ${starter === item.name ? "border-[#046307] ring-1 ring-[#046307]" : "border-[#1A1A1A]/10"}`}><img src={item.image} alt={item.name} className="h-20 w-full object-cover" /><span className="flex gap-3 p-3"><input type="radio" name="starter" checked={starter === item.name} onChange={() => setStarter(item.name)} />{item.name}</span></label>)}</div></div><div><p className="text-sm font-bold">Elige 2 acompañamientos incluidos</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{sides.map((item) => <label key={item.name} className={`overflow-hidden rounded-xl border text-sm ${selectedSides.includes(item.name) ? "border-[#046307] ring-1 ring-[#046307]" : "border-[#1A1A1A]/10"}`}><img src={item.image} alt={item.name} className="h-20 w-full object-cover" /><span className="flex gap-3 p-3"><input type="checkbox" checked={selectedSides.includes(item.name)} onChange={() => toggleSide(item.name)} />{item.name}</span></label>)}</div></div></div><div className="mt-8"><p className="text-sm font-bold">Postre incluido · elige 1</p><div className="mt-3 grid gap-3 sm:grid-cols-3">{desserts.map((item) => <button type="button" key={item.name} onClick={() => setDessert(item.name)} className={`overflow-hidden rounded-xl border text-left text-sm ${dessert === item.name ? "border-[#046307] bg-[#FAF7F2] font-bold text-[#046307] ring-1 ring-[#046307]" : "border-[#1A1A1A]/10 bg-white"}`}><img src={item.image} alt={item.name} className="h-32 w-full object-cover" /><span className="block p-4">{item.name}</span></button>)}</div></div>{notice && <Notice>{notice}</Notice>}<UploadBox title="Pastel de evento" prompt="Sube aquí una foto de referencia del pastel que imaginas" value={cakeReference} onChange={setCakeReference} /><NavigationButtons onBack={() => setStep(2)} onNext={nextStep} /></WizardSection>}

          {step === 4 && <WizardSection title="4. Catálogo visual y servicios extra" description="Selecciona mobiliario, ambientación e inspiración para tu montaje."><h3 className="font-display text-3xl text-[#046307]">Mobiliario</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{furniture.map((item) => <button type="button" key={item.id} onClick={() => setFurnitureId(item.id)} className={`overflow-hidden rounded-2xl border text-left ${furnitureId === item.id ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/25" : "border-[#1A1A1A]/10"}`}><img src={item.image} alt={item.name} className="h-32 w-full object-cover" /><div className="p-4"><b className="text-[#046307]">{item.name}</b><p className="mt-1 text-xs text-[#1A1A1A]/60">{item.description}</p>{item.price > 0 && <p className="mt-2 text-xs font-bold">Recargo: {money(item.price)}</p>}</div></button>)}</div><h3 className="mt-8 font-display text-3xl text-[#046307]">Centros de mesa y ambientación</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{decorStyles.map((item) => <button type="button" key={item.name} onClick={() => setDecor(item.name)} className={`overflow-hidden rounded-2xl border text-left ${decor === item.name ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/25" : "border-[#1A1A1A]/10"}`}><img src={item.image} alt={item.name} className="h-28 w-full object-cover" /><div className="p-4"><b className="text-[#046307]">{item.name}</b><p className="mt-1 text-xs text-[#1A1A1A]/60">{item.description}</p></div></button>)}</div><Field label="Tipo de centro de mesa"><select className={inputClass} value={centerpiece} onChange={(event) => setCenterpiece(event.target.value)}>{centerpieces.map((item) => <option key={item}>{item}</option>)}</select></Field><UploadBox title="Referencia de decoración" prompt="Adjunta una foto de Pinterest o de tu montaje ideal" value={decorReference} onChange={setDecorReference} /><h3 className="mt-8 font-display text-3xl text-[#046307]">Servicios y entretenimiento</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{addons.map((item) => <label key={item.id} className="overflow-hidden rounded-2xl border border-[#1A1A1A]/10 bg-white"><div className="h-44 w-full bg-[#FAF7F2] p-3">{item.image ? <img src={item.image} alt={item.label} className="h-full w-full object-contain" /> : <div className="flex h-full items-center justify-center text-xs uppercase tracking-wider text-[#046307]/60">Servicio personalizado</div>}</div><div className="flex gap-3 p-4"><input type="checkbox" checked={selectedAddons.includes(item.id)} onChange={() => toggleAddon(item.id)} className="mt-1 accent-[#046307]" /><span><b className="text-[#046307]">{item.label}</b><span className="mt-1 block text-xs leading-5 text-[#1A1A1A]/60">{item.description}</span><span className="mt-2 block text-xs font-bold">{money(item.price)}</span></span></div></label>)}</div><div className="mt-4 rounded-2xl border border-[#D4AF37]/50 bg-[#FAF7F2] p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Coctelería de bienvenida</p>{packageId === "esmeralda" ? <p className="mt-2 text-sm">Incluida en el paquete VIP para todos los invitados.</p> : <select className={inputClass} value={welcomeDrink} onChange={(event) => setWelcomeDrink(event.target.value)}><option value="">No seleccionar</option><option value="Margarita · ₡3.000/persona">Margarita · ₡3.000/persona</option><option value="Gin Tonic · ₡2.000/persona">Gin Tonic · ₡2.000/persona</option><option value="Primavera sin alcohol · ₡1.500/persona">Primavera sin alcohol · ₡1.500/persona</option></select>}</div>{notice && <Notice>{notice}</Notice>}<NavigationButtons onBack={() => setStep(3)} onNext={nextStep} /></WizardSection>}

          {step === 5 && <WizardSection title="5. Reserva y confirmación" description="Completa tus datos para generar el PDF o enviar la solicitud por WhatsApp."><div className="grid gap-5 sm:grid-cols-3"><Field label="Nombre completo"><input className={inputClass} value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} /></Field><Field label="Correo electrónico"><input className={inputClass} type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} /></Field><Field label="Teléfono / WhatsApp"><input className={inputClass} type="tel" value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} /></Field></div><div className="mt-8 rounded-3xl bg-[#1A1A1A] p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Total general</p><p className="mt-2 font-display text-5xl">{money(total)}</p><div className="mt-5 grid gap-2 text-xs text-white/70">{summaryLines().slice(0, 8).map((line) => <p key={line}>{line}</p>)}</div></div>{notice && <Notice>{notice}</Notice>}<div className="mt-6 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={downloadPdf} className="rounded-xl border border-[#046307] px-5 py-3 text-sm font-bold text-[#046307]">Generar Resumen PDF</button><button type="button" onClick={sendWhatsApp} className="rounded-xl bg-[#046307] px-5 py-3 text-sm font-bold text-white">Reservar por WhatsApp</button></div><button type="button" onClick={() => setStep(4)} className="mt-4 text-sm font-semibold text-[#046307]">← Revisar catálogo y extras</button></WizardSection>}
        </main>

        <aside className="h-fit xl:sticky xl:top-24"><div className="rounded-3xl bg-[#1A1A1A] p-6 text-white shadow-xl"><p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Resumen en tiempo real</p><h2 className="mt-3 font-display text-3xl">{selectedPackage.name}</h2><div className="mt-5 space-y-3 border-t border-white/15 pt-5 text-sm"><SummaryRow label="Paquete base" value={money(selectedPackage.price)} /><SummaryRow label="Subtotal alimentación" value={money(foodSubtotal)} /><SummaryRow label="Diferencia menú" value={money(dishDifference)} /><SummaryRow label="Entradas" value={money(starterTotal)} /><SummaryRow label="Coctelería" value={money(welcomeDrinkTotal)} /><SummaryRow label="Flete diferencial" value={money(freightDifference)} /><SummaryRow label="Mobiliario / extras" value={money(furnitureTotal + addonsTotal)} /></div><div className="mt-6 border-t border-[#D4AF37]/50 pt-5"><p className="text-xs text-white/60">Total estimado</p><p className="mt-1 text-4xl font-bold text-[#D4AF37]">{money(total)}</p></div></div><div className="mt-4 rounded-2xl border border-[#D4AF37]/50 bg-[#FAF7F2] p-5 text-xs leading-5 text-[#1A1A1A]/70"><b className="text-[#046307]">Incluye el paquete:</b><ul className="mt-2 space-y-1">{selectedPackage.included.map((line) => <li key={line}>✦ {line}</li>)}</ul></div></aside>
      </div>

      {paymentOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1A1A1A]/60 p-5" role="dialog" aria-modal="true" aria-labelledby="payment-title"><div className="w-full max-w-md rounded-3xl bg-[#FAF7F2] p-7"><h2 id="payment-title" className="font-display text-4xl text-[#046307]">Confirmar reserva</h2><p className="mt-3 text-sm leading-6 text-[#1A1A1A]/65">Se abrirá WhatsApp con tu resumen completo para coordinar disponibilidad y adelanto.</p><p className="mt-5 rounded-xl bg-white p-4 text-sm font-bold">Total: {money(total)}</p><button type="button" onClick={() => { setPaymentOpen(false); sendWhatsApp(); }} className="mt-6 w-full rounded-xl bg-[#046307] px-5 py-3 text-sm font-bold text-white">Enviar a WhatsApp</button><button type="button" onClick={() => setPaymentOpen(false)} className="mt-3 w-full py-2 text-sm text-[#1A1A1A]/60">Cerrar</button></div></div>}
    </div>
  );
}

function WizardSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-10"><h2 className="font-display text-4xl text-[#046307]">{title}</h2><p className="mt-2 text-sm text-[#1A1A1A]/60">{description}</p><div className="mt-8">{children}</div></section>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60">{label}{children}</label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <div className="mt-7 flex items-center justify-between rounded-xl border border-[#1A1A1A]/10 bg-[#FAF7F2] p-4"><span className="text-sm font-semibold">{label}<small className="mt-1 block font-normal text-[#1A1A1A]/55">{checked ? "Sí" : "No"}</small></span><button type="button" role="switch" aria-checked={checked} onClick={onChange} className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-[#D4AF37]" : "bg-[#1A1A1A]/20"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} /></button></div>;
}

function UploadBox({ title, prompt, value, onChange }: { title: string; prompt: string; value: string; onChange: (value: string) => void }) {
  return <div className="mt-8 rounded-2xl border-2 border-dashed border-[#D4AF37]/60 bg-[#FAF7F2] p-5"><p className="text-sm font-bold text-[#046307]">{title}</p><label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-[#1A1A1A]/10 bg-white p-6 text-center" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onChange(event.dataTransfer.files?.[0]?.name ?? ""); }}><span className="text-sm font-semibold">{prompt}</span><span className="mt-1 text-xs text-[#1A1A1A]/50">JPG, PNG o WEBP · arrastra y suelta</span><input className="sr-only" type="file" accept="image/*" onChange={(event) => onChange(event.target.files?.[0]?.name ?? "")} />{value && <span className="mt-3 text-xs font-bold text-[#046307]">{value}</span>}</label></div>;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-3 text-white/70"><span>{label}</span><span className="font-semibold text-white">{value}</span></div>;
}

function Notice({ children }: { children: ReactNode }) {
  return <p className="mt-5 rounded-xl bg-[#D4AF37]/15 p-4 text-sm font-semibold text-[#1A1A1A]">{children}</p>;
}

function StepButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return <button type="button" onClick={onClick} className="mt-8 rounded-xl bg-[#046307] px-6 py-3 text-sm font-bold text-white">{children}</button>;
}

function NavigationButtons({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return <div className="mt-8 flex gap-3"><button type="button" onClick={onBack} className="rounded-xl border border-[#1A1A1A]/15 px-5 py-3 text-sm font-semibold">Atrás</button><button type="button" onClick={onNext} className="rounded-xl bg-[#046307] px-5 py-3 text-sm font-bold text-white">Continuar</button></div>;
}
