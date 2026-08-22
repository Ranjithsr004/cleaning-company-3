import { useEffect, useState, useRef } from "react";
import {
  Phone, Mail, MapPin, MessageCircle, Menu, X, Star, Shield, Award, Users,
  Building2, Sparkles, Wind, Stethoscope, GraduationCap, Layers, Brush,
  CheckCircle2, ChevronLeft, ChevronRight, HeadphonesIcon, ClipboardList,
  Share2, Camera, Play, ArrowRight, Clock, ChevronDown, Volume2, VolumeX,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/src/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/src/components/ui/accordion";
import { toast } from "sonner";
import { Toaster } from "@/src/components/ui/sonner";

import logo from "@/src/assets/photo_11_2026-08-15_19-51-56.jpg";
import heroImg from "@/src/assets/photo_4_2026-08-15_19-51-56.jpg";
import heroImg2 from "@/src/assets/photo_1_2026-08-15_19-51-56.jpg";
import heroImg3 from "@/src/assets/photo_2.jpg";
import gal1 from "@/src/assets/photo_6.jpg";
import gal2 from "@/src/assets/photo_7.jpg";
import gal3 from "@/src/assets/photo_3.jpg";
import gal5 from "@/src/assets/photo_9.jpg";
import gal6 from "@/src/assets/photo_8.jpg";
import gal7 from "@/src/assets/photo_5_2026-08-15_19-51-56.jpg";
import work1 from "@/src/assets/photo_43.jpg";
import work2 from "@/src/assets/photo_12_2026-08-15_19-51-56.jpg";
import work3 from "@/src/assets/photo_42.jpg";
import work4 from "@/src/assets/photo_16.jpg";
import building1 from "@/src/assets/photo_13_2026-08-15_19-51-56.jpg";
import building2 from "@/src/assets/photo_14_2026-08-15_19-51-56.jpg";

const BIZ = {
  name: "Hoffmann & Jeek",
  fullName: "Hoffmann & Jeek Gebäudereinigung",
  service: "Gebäudereinigung",
  owner: "Nader Jeek",
  city: "Villingen-Schwenningen",
  region: "Baden-Württemberg",
  phone: "+4917641609894",
  phoneHref: "+4917641609894",
  whatsapp: "4917641609894",
  email: "Info.hoffmannundjeek@gmail.com",
  address: "Arndtstr 23, 78054 Villingen-Schwenningen",
  rating: 4.9,
  reviews: 143,
  areas: ["Schwarwald-Baar-Kreis", "Breisgau Hochschwarzwald", "Waldshut", "Konstanz", "Tuttlingen", "Freiburg", "Donaueschingen"],
};

const NAV = [
  { label: "Start", href: "#home" },
  { label: "Leistungen", href: "#services" },
  { label: "Galerie", href: "#gallery" },
  { label: "Referenzen", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#contact" },
];

export default function Landing() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState<"datenschutz" | "impressum" | "agb" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    if (!localStorage.getItem("cookie-consent")) {
      const t = setTimeout(() => setCookieOpen(true), 1200);
      return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openQuote = () => { setQuoteOpen(true); setMenuOpen(false); };

  return (
    <div className="min-h-screen bg-background">
      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openQuote={openQuote} />
      <main>
        <Hero openQuote={openQuote} />
        <TrustBar />
        <Services />
        <WhyUs />
        <HowItWorks openQuote={openQuote} />
        <Reviews />
        <ServiceArea />
        <Pricing openQuote={openQuote} />
        <FAQ />
        <FinalCTA />
        <Contact onDatenschutz={() => setLegalOpen("datenschutz")} />
      </main>
      <Footer
        onDatenschutz={() => setLegalOpen("datenschutz")}
        onImpressum={() => setLegalOpen("impressum")}
        onAgb={() => setLegalOpen("agb")}
      />
      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} onDatenschutz={() => setLegalOpen("datenschutz")} />
      <LegalModals open={legalOpen} onClose={() => setLegalOpen(null)} />
      <FloatingActions />
      {cookieOpen && (
        <CookieBanner
          onClose={() => { localStorage.setItem("cookie-consent", "1"); setCookieOpen(false); }}
          onDatenschutz={() => setLegalOpen("datenschutz")}
        />
      )}
      <Toaster />
    </div>
  );
}

function Header({ scrolled, menuOpen, setMenuOpen, openQuote }: {
  scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void; openQuote: () => void;
}) {
  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/97 backdrop-blur-md shadow-card" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Hoffmann & Jeek Logo" className="h-12 w-12 rounded-xl object-cover shadow-glow" />
            <div className="hidden sm:block">
              <p className={`font-display text-base font-bold leading-tight ${scrolled ? "text-navy" : "text-white"}`}>{BIZ.name}</p>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>Gebäudereinigung</p>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className={`text-sm font-medium transition-colors hover:text-brand ${scrolled ? "text-foreground/80" : "text-white/90"}`}>{n.label}</a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${BIZ.phoneHref}`} className={`flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand ${scrolled ? "text-navy" : "text-white"}`}>
              <Phone className="h-4 w-4" /> {BIZ.phone}
            </a>
            <Button onClick={openQuote} className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-bold shadow-glow">Angebot anfragen</Button>
          </div>
          <button className={`lg:hidden p-2 ${scrolled ? "text-navy" : "text-white"}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-background border-t py-4 space-y-3 rounded-b-2xl shadow-elegant">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-foreground hover:text-brand">{n.label}</a>
            ))}
            <div className="px-4 pt-2 space-y-2">
              <a href={`tel:${BIZ.phoneHref}`} className="flex items-center gap-2 py-2 font-semibold text-navy"><Phone className="h-4 w-4" /> {BIZ.phone}</a>
              <Button onClick={openQuote} className="w-full bg-[image:var(--gradient-cta)] text-navy font-bold">Angebot anfragen</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero({ openQuote }: { openQuote: () => void }) {
  const slides = [building1, building2];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {slides.map((src, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <img src={src} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-brand" : "w-2 bg-white/40"}`} />
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold text-white/90 backdrop-blur mb-6 uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            Über 30 Jahre Erfahrung — {BIZ.region}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.0] text-white">
            Professionelle<br /><span className="text-brand">Gebäude-</span><br />reinigung
          </h1>
          <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-xl">
            Sauberkeit, Zuverlässigkeit und persönliche Betreuung — seit über 30 Jahren Ihr professioneller Partner für Gebäude, Büros, Praxen und gewerbliche Objekte in ganz {BIZ.region}. Kostenlose Anfahrt und unverbindliches Angebot inklusive.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {[{ icon: Users, label: "Geschultes Personal" }, { icon: Shield, label: "Voll versichert" }, { icon: Award, label: "5-Sterne bewertet" }].map(b => (
              <div key={b.label} className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 backdrop-blur">
                <b.icon className="h-4 w-4 text-brand" /><span className="text-sm font-semibold text-white">{b.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90 font-bold h-14 px-8 text-base shadow-elegant">
              <a href={`tel:${BIZ.phoneHref}`}><Phone className="mr-2 h-5 w-5" /> Jetzt anrufen</a>
            </Button>
            <Button onClick={openQuote} size="lg" className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-bold h-14 px-8 text-base shadow-glow">
              Kostenloses Angebot <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-2">
        <ChevronDown className="h-5 w-5 text-white/60 animate-bounce" />
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { n: "30+", label: "Jahre Erfahrung" },
    { n: "500+", label: "Zufriedene Kunden" },
    { n: "Kostenlos", label: "Anfahrt & Angebot" },
    { n: "100%", label: "Ganz Baden-Württemberg" },
  ];
  return (
    <section className="bg-navy py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.n} className="text-center">
              <p className="text-3xl font-black text-brand">{s.n}</p>
              <p className="mt-1 text-sm font-semibold text-white/70 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES: {
  icon: any;
  title: string;
  desc: string;
  img: string;
  imgPosition?: string;
  imgFit?: "contain" | "cover";
}[] = [
  { icon: Wind, title: "Glasreinigung", desc: "Streifenfreie Innen- und Außenreinigung von Fenstern und Glasfassaden — für Büros, Schaufenster und Gewerbegebäude.", img: heroImg2 },
  { icon: Brush, title: "Grundreinigung", desc: "Intensive Tiefenreinigung von Böden, Wänden und Oberflächen — ideal nach Baustellen, Renovierungen oder zum saisonalen Reset.", img: heroImg3 },
  { icon: Building2, title: "Bauendreinigung", desc: "Professionelle Endreinigung nach Bau- und Renovierungsarbeiten — damit Ihr Objekt bezugsfertig und makellos übergeben werden kann.", img: gal3 },
  { icon: Sparkles, title: "Unterhaltsreinigung", desc: "Regelmäßige, vertraglich abgesicherte Reinigung Ihrer Büros, Praxen und Gewerberäume nach Plan.", img: heroImg },
  { icon: Layers, title: "Baureinigung", desc: "Baubegleitende Reinigung während laufender Bauprojekte — zuverlässig und auf Ihre Zeitpläne abgestimmt.", img: gal7 },
  { icon: Share2, title: "Fassadenreinigung", desc: "Fachgerechte Reinigung von Außenfassaden inklusive Graffitientfernung, Algensanierung und Hochdruckbehandlung.", img: gal1 },
  { icon: Camera, title: "Fenster- & Jalousienenreinigung", desc: "Gründliche Reinigung von Fenstern, Jalousien, Rollos und Sonnenschutzsystemen — innen wie außen.", img: gal2 },
  { icon: ClipboardList, title: "Winterdienst", desc: "Schneeräumung, Streuung und Glättebekämpfung für Gehwege, Parkplätze und Außenanlagen Ihrer Immobilie.", img: gal6 },
  { icon: HeadphonesIcon, title: "Hausmeisterdienst", desc: "Umfassende Hausmeisterleistungen: Instandhaltung, Kleinreparaturen, Grünanlagenpflege und Verkehrssicherungspflicht.", img: gal5 },
  { icon: GraduationCap, title: "Weitere Reinigungsarbeiten", desc: "Individuelle Sonderreinigungen, Treppenhaus-, Tiefgaragen- und Veranstaltungsreinigungen nach Bedarf.", img: work1, imgFit: "contain" },
];

function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-bold text-brand uppercase tracking-wider">Leistungen</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Alles, was Ihr Gebäude braucht</h2>
          <p className="mt-4 text-lg text-muted-foreground">Umfassende gewerbliche Reinigungsdienstleistungen von geschulten, versicherten Fachkräften.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(s => (
            <div key={s.title} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 bg-card border">
              <div className="h-48 overflow-hidden relative bg-slate-900/5 dark:bg-slate-900 flex items-center justify-center">
                {s.imgFit === "contain" && (
                  <img
                    src={s.img}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-30 pointer-events-none"
                  />
                )}
                <img
                  src={s.img}
                  alt={s.title}
                  style={s.imgPosition ? { objectPosition: s.imgPosition } : undefined}
                  className={`w-full h-full ${s.imgFit === "contain" ? "object-contain relative z-10 p-1.5" : "object-cover"} group-hover:scale-105 transition-transform duration-500`}
                />
              </div>
              <div className="p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-cta)] text-navy mb-3 shadow-glow -mt-8 relative z-10">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="text-base font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// function WorkPortfolio() {
//   const works = [
//     { img: work1, title: "Schulreinigung", sub: "Bodenpflege Klassenzimmer", tag: "Bildungseinrichtung" },
//     { img: work2, title: "Korridorreinigung", sub: "Hallenboden aufbereitet & versiegelt", tag: "Gewerbegebäude" },
//     { img: work3, title: "Grundreinigung", sub: "Polieren & Grundierung Schulboden", tag: "Schule" },
//     { img: work4, title: "Unterhaltsreinigung", sub: "Regelmäßige Hallenpflege", tag: "Gewerbe" },
//     { img: building1, title: "Glasreinigung", sub: "Hochhausfassaden", tag: "Großprojekt" },
//     { img: building2, title: "Firmengebäude", sub: "Außenanlage & Eingangsbereich", tag: "Dauerauftrag" },
//   ];
//   return (
//     <section className="py-20 lg:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="max-w-2xl mb-14">
//           <p className="text-sm font-bold text-brand uppercase tracking-wider">Referenzprojekte</p>
//           <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Echte Projekte. Echte Ergebnisse.</h2>
//           <p className="mt-4 text-lg text-muted-foreground">Ein Blick in unsere abgeschlossenen Aufträge — von Schulen über Praxen bis hin zu Gewerbeimmobilien.</p>
//         </div>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {works.map((w, i) => (
//             <div key={i} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 bg-card border">
//               <div className="relative h-52 overflow-hidden">
//                 <img src={w.img} alt={w.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 <div className="absolute top-3 left-3">
//                   <span className="bg-brand text-navy text-xs font-bold px-3 py-1 rounded-full">{w.tag}</span>
//                 </div>
//               </div>
//               <div className="p-5">
//                 <h3 className="font-bold text-navy text-lg">{w.title}</h3>
//                 <p className="text-sm text-muted-foreground mt-1">{w.sub}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function WhyUs() {
  const points = [
    { icon: Award, title: "30+ Jahre Erfahrung", desc: "Seit über drei Jahrzehnten vertrauen Unternehmen in Baden-Württemberg auf unsere Expertise und Zuverlässigkeit." },
    { icon: MapPin, title: "Kostenlose Anfahrt", desc: "Wir kommen zu Ihnen — ohne Anfahrtskosten. Aufträge in ganz Baden-Württemberg." },
    { icon: CheckCircle2, title: "Unverbindliches Angebot", desc: "Wir erstellen Ihnen ein kostenloses, transparentes Angebot — ohne versteckte Kosten oder Verpflichtungen." },
    { icon: Shield, title: "Voll versichert", desc: "Jeder Auftrag ist durch eine umfassende Haftpflichtversicherung abgesichert — Ihr Eigentum ist stets geschützt." },
  ];
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={building2} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/88" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-bold text-brand uppercase tracking-wider">Warum Hoffmann & Jeek</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black">Zuverlässigkeit, auf die Sie bauen können</h2>
            <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
              <p>Bei Hoffmann &amp; Jeek Gebäudereinigung stehen Sauberkeit, Zuverlässigkeit und persönliche Betreuung an erster Stelle. Mit über 30 Jahren Erfahrung kümmern wir uns professionell um die Reinigung und Pflege von Gebäuden, Wohnungen, Büros, Praxen und gewerblichen Objekten.</p>
              <p>Von der regelmäßigen Unterhaltsreinigung über Grund-, Glas- und Fensterreinigung bis hin zu Bauendreinigung, Fassadenreinigung, Hausmeisterservice und Winterdienst – wir bieten Ihnen zuverlässige Lösungen aus einer Hand.</p>
              <p>Ob Privathaushalt, Unternehmen, Praxis, Büro oder öffentliche Einrichtung: Wir stimmen unsere Leistungen individuell auf Ihre Wünsche und Ihr Objekt ab. Dabei legen wir großen Wert auf gründliche Arbeit, flexible Einsatzzeiten und einen persönlichen Ansprechpartner.</p>
              <p>Gerne besichtigen wir Ihr Objekt kostenlos und unverbindlich und erstellen Ihnen anschließend ein passendes Angebot. <strong className="text-brand">Anfahrtskosten fallen nicht an.</strong></p>
            </div>
            <div className="mt-8">
              <img src={logo} alt="Hoffmann & Jeek" className="h-20 w-20 rounded-2xl object-cover border-2 border-brand/50" />
              <p className="mt-3 text-sm text-white/60">Inhaber: Nader Jeek</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {points.map(p => (
              <div key={p.title} className="rounded-2xl bg-white/8 border border-white/15 p-6 backdrop-blur hover:bg-white/12 transition-colors">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-navy mb-4">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base mb-1">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ openQuote }: { openQuote: () => void }) {
  const steps = [
    { n: "01", title: "Kostenlose Beratung", desc: "Erzählen Sie uns von Ihrem Gebäude, Ihren Anforderungen und Wünschen.", icon: HeadphonesIcon },
    { n: "02", title: "Vor-Ort-Besichtigung", desc: "Wir kommen zur Besichtigung und erstellen ein transparentes, unverbindliches Angebot.", icon: ClipboardList },
    { n: "03", title: "Laufender Service", desc: "Ihr fester Ansprechpartner koordiniert das Team und kontrolliert die Qualität laufend.", icon: CheckCircle2 },
  ];
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <p className="text-sm font-bold text-brand uppercase tracking-wider">So funktioniert es</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">In 3 Schritten zum sauberen Gebäude</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="relative bg-card rounded-2xl p-8 shadow-card border group hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-cta)] text-navy shadow-glow">
                  <s.icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <span className="text-6xl font-black text-navy/8">{s.n}</span>
              </div>
              <h3 className="text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-5 h-6 w-6 text-brand z-10" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button onClick={openQuote} size="lg" className="bg-navy text-white hover:bg-navy/90 h-14 px-8 font-bold">
            Jetzt kostenlose Beratung starten <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Sarah M.", init: "SM", quote: "Zuverlässig, gründlich und immer professionell. Unser Büro hat seit dem Wechsel zu Hoffmann & Jeek noch nie so gut ausgesehen." },
  { name: "Thomas K.", init: "TK", quote: "Das Team ist pünktlich und detailorientiert. Wir verwalten drei Standorte und sie meistern alle einwandfrei." },
  { name: "Elena R.", init: "ER", quote: "Als Arztpraxis ist Hygiene entscheidend. Die Mitarbeiter sind geschult, diskret und erfüllen unsere Standards stets." },
  { name: "David L.", init: "DL", quote: "Hervorragende Kommunikation und gleichbleibende Qualität. Unser fester Ansprechpartner macht alles unkompliziert." },
  { name: "Anja P.", init: "AP", quote: "Wir haben mit mehreren Reinigungsunternehmen zusammengearbeitet. Hoffmann & Jeek ist bei weitem das zuverlässigste." },
];

function Reviews() {
  const [idx, setIdx] = useState(0);
  const perView = 3;
  const max = Math.max(0, REVIEWS.length - perView);
  return (
    <section id="reviews" className="py-20 lg:py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={building1} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-bold text-brand uppercase tracking-wider">Kundenstimmen</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black">Geliebt von Unternehmen in {BIZ.region}</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex">{[0, 1, 2, 3, 4].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}</div>
              <span className="font-bold">{BIZ.rating}</span>
              <span className="text-white/60">· {BIZ.reviews} Bewertungen</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 disabled:opacity-30 transition">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setIdx(Math.min(max, idx + 1))} disabled={idx === max} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 disabled:opacity-30 transition">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-6 transition-transform duration-500" style={{ transform: `translateX(calc(-${idx} * (100% / ${perView}) - ${idx} * 1.5rem / ${perView}))` }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] rounded-2xl p-6 bg-white/8 border border-white/15 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-navy font-black text-sm">{r.init}</div>
                  <div>
                    <p className="font-bold">{r.name}</p>
                    <div className="flex">{[0, 1, 2, 3, 4].map(j => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed text-sm">"${r.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  const areas = BIZ.areas;
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-bold text-brand uppercase tracking-wider">Einsatzgebiet</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Ganz {BIZ.region}</h2>
            <p className="mt-4 text-lg text-muted-foreground">Mit Sitz in Villingen-Schwenningen übernehmen wir Aufträge in ganz Baden-Württemberg — mit kostenloser Anfahrt.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {areas.map(a => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-navy border hover:bg-[image:var(--gradient-cta)] hover:border-brand transition-colors cursor-default">
                  <MapPin className="h-3.5 w-3.5 text-brand" /> {a}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Und alle weiteren Städte und Gemeinden in Baden-Württemberg — fragen Sie uns gerne an!</p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img src={building1} alt="Baden-Württemberg — Einsatzgebiet Hoffmann & Jeek" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="bg-card/90 backdrop-blur rounded-2xl px-5 py-3 shadow-card border">
                <p className="text-sm font-bold text-navy flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand" /> Baden-Württemberg
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Kostenlose Anfahrt im gesamten Bundesland</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ openQuote }: { openQuote: () => void }) {
  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold text-brand uppercase tracking-wider">Preise</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Fair, transparent, maßgeschneidert</h2>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          <p>Wir veröffentlichen keine Festpreisliste — weil kein Gebäude wie das andere ist. Ihr Angebot hängt von Fläche, Häufigkeit und Umfang ab. Was Sie erhalten, ist ein klares, detailliertes Angebot ohne versteckte Kosten.</p>
          <p>Jedes Angebot ist kostenlos und unverbindlich — inklusive Besichtigungstermin vor Ort.</p>
        </div>
        <Button onClick={openQuote} size="lg" className="mt-8 bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-bold h-14 px-8 shadow-glow">
          Kostenloses Angebot anfordern <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Ist die Anfahrt wirklich kostenlos?", a: "Ja, absolut. Wir übernehmen Aufträge in ganz Baden-Württemberg — die Anfahrt ist für Sie grundsätzlich kostenlos. Kein versteckter Aufschlag, egal wo in BW Sie sich befinden." },
  { q: "Ist das Angebot wirklich unverbindlich?", a: "Ja. Unser Angebot ist kostenlos und vollkommen unverbindlich. Wir besichtigen Ihr Objekt, erstellen ein transparentes Angebot und Sie entscheiden ohne Druck, ob wir zusammenarbeiten." },
  { q: "Wie viel Erfahrung hat Hoffmann & Jeek?", a: "Wir sind seit über 30 Jahren in der Gebäudereinigung tätig. In dieser Zeit haben wir Hunderte von Kunden in ganz Baden-Württemberg betreut — von kleinen Büros bis hin zu großen Gewerbeimmobilien." },
  { q: "Welche Leistungen bieten Sie an?", a: "Wir bieten Glasreinigung, Grundreinigung, Bauendreinigung, Unterhaltsreinigung, Baureinigung, Fassadenreinigung, Fenster- und Jalousienenreinigung, Winterdienst, Hausmeisterdienst und weitere Sonderreinigungen an." },
  { q: "Können Sie außerhalb der Geschäftszeiten reinigen?", a: "Ja — Abende, frühe Morgenstunden und Wochenenden sind für uns kein Problem. Wir richten uns vollständig nach Ihren Betriebszeiten und Anforderungen." },
  { q: "Wie schnell erhalten wir ein Angebot?", a: "In der Regel erstellen wir Ihr Angebot innerhalb von 24 Stunden nach der Besichtigung. Nach Auftragserteilung können wir meist innerhalb weniger Tage starten." },
  { q: "Sind Ihre Reinigungskräfte versichert?", a: "Ja. Alle unsere Mitarbeiter sind vollständig versichert und geschult. Jeder Auftrag ist durch unsere Haftpflichtversicherung abgesichert — Ihr Eigentum ist bei uns sicher." },
];

function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-brand uppercase tracking-wider">FAQ</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Häufig gestellte Fragen</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl bg-card px-6 shadow-card">
              <AccordionTrigger className="text-left font-bold text-navy hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <img src={logo} alt="Hoffmann & Jeek" className="h-20 w-20 rounded-2xl mx-auto mb-6 object-cover shadow-glow border-2 border-brand/50" />
        <h2 className="text-3xl sm:text-5xl font-black">Kontaktieren Sie uns für ein maßgeschneidertes Angebot</h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Kostenlose Beratung, keine Verpflichtung. Sprechen Sie noch heute mit einem lokalen Teammitglied.</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`tel:${BIZ.phoneHref}`} className="flex items-center gap-3 rounded-2xl bg-white text-navy px-8 py-5 font-black text-xl shadow-elegant hover:scale-105 transition-transform">
            <Phone className="h-6 w-6" /> {BIZ.phone}
          </a>
          <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-[image:var(--gradient-cta)] text-navy px-8 py-5 font-black text-xl shadow-glow hover:scale-105 transition-transform">
            <MessageCircle className="h-6 w-6" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact({ onDatenschutz }: { onDatenschutz?: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "", privacy: false });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Kontaktanfrage von ${form.name} – ${BIZ.fullName}`);
    const body = encodeURIComponent(
      `Sehr geehrte Damen und Herren,

hiermit möchte ich Kontakt aufnehmen.

Name: ${form.name}
E-Mail: ${form.email}
Telefon: ${form.phone}
Gewünschte Leistung: ${form.service || "Keine Angabe"}

Nachricht:
${form.message}

---
Diese Anfrage wurde über das Kontaktformular auf der Website von ${BIZ.fullName} gesendet.`
    );
    window.location.href = `mailto:${BIZ.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die E-Mail ab.");
      setForm({ name: "", email: "", phone: "", service: "", message: "", privacy: false });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-bold text-brand uppercase tracking-wider">Kontakt</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">So erreichen Sie uns</h2>
          <p className="mt-4 text-muted-foreground text-lg">Schreiben Sie uns oder rufen Sie an — wir antworten typischerweise innerhalb weniger Stunden.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info + Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Adresse", value: BIZ.address },
                { icon: Phone, label: "Telefon", value: BIZ.phone, href: `tel:${BIZ.phoneHref}` },
                { icon: Mail, label: "E-Mail", value: BIZ.email, href: `mailto:${BIZ.email}` },
                { icon: MessageCircle, label: "WhatsApp", value: `+${BIZ.whatsapp.slice(0, 2)} ${BIZ.whatsapp.slice(2)}`, href: `https://wa.me/${BIZ.whatsapp}` },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-navy border">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-navy font-semibold hover:text-brand">{c.value}</a>
                    ) : (
                      <p className="text-navy font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-card p-5 border shadow-card">
              <img src={logo} alt="Hoffmann & Jeek" className="h-14 w-14 rounded-xl object-cover" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Ihr Ansprechpartner</p>
                <p className="text-navy font-black">{BIZ.owner}</p>
                <p className="text-sm text-muted-foreground">Inhaber, {BIZ.fullName}</p>
              </div>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div className="rounded-2xl bg-card border shadow-card p-8">
            <h3 className="text-xl font-black text-navy mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-brand" /> Nachricht senden
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="cf-name">Name *</Label>
                  <Input id="cf-name" required className="mt-1" placeholder="Ihr vollständiger Name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="cf-phone">Telefon *</Label>
                  <Input id="cf-phone" type="tel" required className="mt-1" placeholder="+49 ..."
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label htmlFor="cf-email">E-Mail *</Label>
                <Input id="cf-email" type="email" required className="mt-1" placeholder="ihre@email.de"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="cf-service">Gewünschte Leistung</Label>
                <select id="cf-service" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                  <option value="">Bitte wählen...</option>
                  {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  <option value="Sonstiges">Sonstiges</option>
                </select>
              </div>
              <div>
                <Label htmlFor="cf-message">Nachricht *</Label>
                <Textarea id="cf-message" required rows={4} className="mt-1"
                  placeholder="Beschreiben Sie Ihr Objekt, die gewünschte Leistung und Ihren Reinigungsbedarf ..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="cf-privacy" required className="mt-1"
                  checked={form.privacy} onCheckedChange={v => setForm(f => ({ ...f, privacy: !!v }))} />
                <Label htmlFor="cf-privacy" className="text-sm font-normal text-muted-foreground leading-snug">
                  Ich stimme der{" "}
                  <button type="button" onClick={onDatenschutz} className="text-brand underline cursor-pointer hover:text-brand/80">
                    Datenschutzerklärung
                  </button>{" "}
                  zu.
                </Label>
              </div>
              <Button type="submit" disabled={sending} className="w-full bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-black h-12 text-base shadow-glow">
                {sending ? "Wird vorbereitet..." : <><Mail className="mr-2 h-4 w-4" /> Nachricht senden</>}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Nach dem Klick öffnet sich Ihr E-Mail-Programm mit den ausgefüllten Daten — einfach absenden.
              </p>
            </form>
          </div>
        </div>
        {/* Map */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-card border" style={{ height: 380 }}>
          <iframe
            title="Standort Hoffmann & Jeek"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(BIZ.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Footer({ onDatenschutz, onImpressum, onAgb }: {
  onDatenschutz: () => void; onImpressum: () => void; onAgb: () => void;
}) {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Hoffmann & Jeek" className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <p className="font-black text-white text-base leading-tight">{BIZ.name}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Gebäudereinigung</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">Professionelle Gebäudereinigung für Unternehmen in ganz {BIZ.region}. Kostenlose Anfahrt. Unverbindliches Angebot. Über 30 Jahre Erfahrung.</p>
            <div className="mt-6 flex gap-3">
              {[Share2, Camera, Play].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-brand hover:text-navy transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-black text-white mb-4">Navigation</p>
            <ul className="space-y-2 text-sm">
              {NAV.map(n => <li key={n.href}><a href={n.href} className="hover:text-brand transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="font-black text-white mb-4">Leistungen</p>
            <ul className="space-y-2 text-sm">
              {SERVICES.slice(0, 6).map(s => <li key={s.title}><a href="#services" className="hover:text-brand transition-colors">{s.title}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="font-black text-white mb-4">Kontakt</p>
            <address className="not-italic text-sm space-y-2">
              <p>{BIZ.fullName}</p>
              <p>Inhaber: {BIZ.owner}</p>
              <p>{BIZ.address}</p>
              <p><a href={`tel:${BIZ.phoneHref}`} className="hover:text-brand">{BIZ.phone}</a></p>
              <p><a href={`mailto:${BIZ.email}`} className="hover:text-brand">{BIZ.email}</a></p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} {BIZ.fullName}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <button onClick={onDatenschutz} className="hover:text-brand transition-colors cursor-pointer">Datenschutz</button>
            <button onClick={onImpressum} className="hover:text-brand transition-colors cursor-pointer">Impressum</button>
            <button onClick={onAgb} className="hover:text-brand transition-colors cursor-pointer">AGB</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function QuoteModal({ open, onOpenChange, onDatenschutz }: { open: boolean; onOpenChange: (v: boolean) => void; onDatenschutz?: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [qForm, setQForm] = useState({ fn: "", ln: "", email: "", phone: "", city: BIZ.city, plz: "", service: "", message: "" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fullName = `${qForm.fn} ${qForm.ln}`.trim();
    const subject = encodeURIComponent(`Angebotsanfrage von ${fullName} – ${BIZ.fullName}`);
    const body = encodeURIComponent(
      `Sehr geehrte Damen und Herren,

hiermit bitte ich um ein kostenloses Angebot.

Name: ${fullName}
E-Mail: ${qForm.email}
Telefon: ${qForm.phone}
Stadt: ${qForm.city}${qForm.plz ? ` (PLZ: ${qForm.plz})` : ""}
Gewünschte Leistung: ${qForm.service || "Keine Angabe"}

Nachricht / Beschreibung:
${qForm.message || "Keine weiteren Angaben."}

---
Angebotsanfrage über die Website von ${BIZ.fullName}
${BIZ.address}`
    );
    window.location.href = `mailto:${BIZ.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      toast.success("Ihr E-Mail-Programm wurde geöffnet — bitte senden Sie die E-Mail ab. Wir melden uns innerhalb von 24 Stunden!");
      setQForm({ fn: "", ln: "", email: "", phone: "", city: BIZ.city, plz: "", service: "", message: "" });
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="Hoffmann & Jeek" className="h-10 w-10 rounded-lg object-cover" />
            <DialogTitle className="text-2xl font-black text-navy">Kostenloses Angebot</DialogTitle>
          </div>
          <DialogDescription>Erzählen Sie uns von Ihrem Gebäude und wir antworten innerhalb von 24 Stunden.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="qfn">Vorname *</Label><Input id="qfn" required className="mt-1" value={qForm.fn} onChange={e => setQForm(f => ({ ...f, fn: e.target.value }))} /></div>
            <div><Label htmlFor="qln">Nachname *</Label><Input id="qln" required className="mt-1" value={qForm.ln} onChange={e => setQForm(f => ({ ...f, ln: e.target.value }))} /></div>
          </div>
          <div><Label htmlFor="qem">E-Mail *</Label><Input id="qem" type="email" required className="mt-1" value={qForm.email} onChange={e => setQForm(f => ({ ...f, email: e.target.value }))} /></div>
          <div><Label htmlFor="qph">Telefon *</Label><Input id="qph" type="tel" required className="mt-1" value={qForm.phone} onChange={e => setQForm(f => ({ ...f, phone: e.target.value }))} /></div>
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div><Label htmlFor="qci">Stadt *</Label><Input id="qci" required className="mt-1" value={qForm.city} onChange={e => setQForm(f => ({ ...f, city: e.target.value }))} /></div>
            <div><Label htmlFor="qzp">PLZ</Label><Input id="qzp" className="mt-1" value={qForm.plz} onChange={e => setQForm(f => ({ ...f, plz: e.target.value }))} /></div>
          </div>
          <div>
            <Label htmlFor="qsv">Gewünschte Leistung</Label>
            <select id="qsv" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={qForm.service} onChange={e => setQForm(f => ({ ...f, service: e.target.value }))}>
              <option value="">Bitte wählen...</option>
              {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
              <option value="Sonstiges">Sonstiges</option>
            </select>
          </div>
          <div>
            <Label htmlFor="qms">Nachricht</Label>
            <Textarea id="qms" placeholder="Beschreiben Sie Ihre Einrichtung, Fläche und Reinigungsbedarf..." rows={3} className="mt-1"
              value={qForm.message} onChange={e => setQForm(f => ({ ...f, message: e.target.value }))} />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="qcs" required className="mt-1" />
            <Label htmlFor="qcs" className="text-sm font-normal text-muted-foreground leading-snug">
              Ich stimme der{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onDatenschutz?.();
                }}
                className="text-brand underline cursor-pointer hover:text-brand/80"
              >
                Datenschutzerklärung
              </button>{" "}
              zu.
            </Label>
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-black h-12 text-base shadow-glow">
            {submitting ? "Wird vorbereitet..." : <><Mail className="mr-2 h-4 w-4" /> Angebot per E-Mail anfordern</>}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Nach dem Klick öffnet sich Outlook / Ihr E-Mail-Programm mit allen Daten — einfach absenden.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FloatingActions() {
  return (
    <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-6 z-30 flex flex-col gap-3">
      <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="group grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-elegant hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6" />
      </a>
      <a href={`tel:${BIZ.phoneHref}`} aria-label="Anrufen" className="grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-elegant hover:scale-110 transition-transform">
        <Phone className="h-5 w-5" />
      </a>
      <a href={`mailto:${BIZ.email}`} aria-label="E-Mail" className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy border shadow-elegant hover:scale-110 transition-transform">
        <Mail className="h-5 w-5" />
      </a>
    </div>
  );
}

function CookieBanner({ onClose, onDatenschutz }: { onClose: () => void; onDatenschutz?: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4">
      <div className="mx-auto max-w-4xl rounded-2xl bg-navy text-white shadow-elegant p-5 sm:p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex-1">
            <p className="font-black">Datenschutz &amp; Cookies</p>
            <p className="text-sm text-white/70 mt-1">Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und den Datenverkehr zu analysieren.</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button variant="ghost" onClick={onDatenschutz} className="text-white hover:bg-white/10 hover:text-white">Datenschutz</Button>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 hover:text-white">Ablehnen</Button>
            <Button onClick={onClose} className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-bold">Akzeptieren</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Legal Modals ─────────────────────────────────────────────────────────────

function LegalModals({ open, onClose }: { open: "datenschutz" | "impressum" | "agb" | null; onClose: () => void }) {
  const titles: Record<string, string> = {
    datenschutz: "Datenschutzerklärung",
    impressum: "Impressum",
    agb: "Allgemeine Geschäftsbedingungen (AGB)",
  };
  return (
    <Dialog open={!!open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-navy">
            {open ? titles[open] : ""}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {open ? titles[open] : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4 text-foreground leading-relaxed">
          {open === "impressum" && <ImpressumContent />}
          {open === "datenschutz" && <DatenschutzContent />}
          {open === "agb" && <AgbContent />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ImpressumContent() {
  return (
    <div className="space-y-5 text-sm">
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Angaben gemäß § 5 TMG</h3>
        <p className="text-muted-foreground">
          {BIZ.fullName}<br />
          Inhaber: {BIZ.owner}<br />
          {BIZ.address}<br />
          Deutschland
        </p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Kontakt</h3>
        <p className="text-muted-foreground">
          Telefon: <a href={`tel:${BIZ.phoneHref}`} className="text-brand hover:underline">{BIZ.phone}</a><br />
          E-Mail: <a href={`mailto:${BIZ.email}`} className="text-brand hover:underline">{BIZ.email}</a>
        </p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Berufsbezeichnung und berufsrechtliche Regelungen</h3>
        <p className="text-muted-foreground">
          Berufsbezeichnung: Gebäudereiniger<br />
          Zuständige Kammer: Handwerkskammer Konstanz<br />
          Verliehen in: Deutschland<br />
          Berufsrechtliche Regelungen: Handwerksordnung (HwO), Rahmentarifvertrag des Gebäudereinigerhandwerks
        </p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Umsatzsteuer-ID</h3>
        <p className="text-muted-foreground">Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: Bitte bei uns erfragen.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Streitschlichtung</h3>
        <p className="text-muted-foreground">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
            https://ec.europa.eu/consumers/odr/
          </a>.<br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Haftung für Inhalte</h3>
        <p className="text-muted-foreground">Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Haftung für Links</h3>
        <p className="text-muted-foreground">Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">Urheberrecht</h3>
        <p className="text-muted-foreground">Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
      </section>
      <p className="text-xs text-muted-foreground pt-2 border-t">Stand: {new Date().getFullYear()}</p>
    </div>
  );
}

function DatenschutzContent() {
  return (
    <div className="space-y-5 text-sm">
      <section>
        <h3 className="font-bold text-navy text-base mb-2">1. Datenschutz auf einen Blick</h3>
        <p className="text-muted-foreground">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">2. Verantwortlicher (Art. 4 Nr. 7 DSGVO)</h3>
        <p className="text-muted-foreground">
          {BIZ.fullName}<br />
          Inhaber: {BIZ.owner}<br />
          {BIZ.address}<br />
          Telefon: {BIZ.phone}<br />
          E-Mail: {BIZ.email}
        </p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">3. Erhebung und Speicherung personenbezogener Daten</h3>
        <p className="text-muted-foreground">Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, werden die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Nachricht) zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
        <p className="text-muted-foreground mt-2">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Kundenanfragen).</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">4. Server-Log-Dateien</h3>
        <p className="text-muted-foreground">Der Anbieter der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie IP-Adresse. Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">5. Cookies</h3>
        <p className="text-muted-foreground">Diese Website verwendet technisch notwendige Cookies (z. B. zur Speicherung der Cookie-Einwilligung). Darüber hinaus werden keine weiteren Cookies ohne Ihre Einwilligung gesetzt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO für technisch notwendige Cookies; Art. 6 Abs. 1 lit. a DSGVO für alle anderen Cookies.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">6. Externe Dienste (Google Maps)</h3>
        <p className="text-muted-foreground">Auf dieser Website nutzen wir Google Maps der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Bei der Nutzung von Google Maps können Daten an Google-Server in den USA übertragen werden. Weitere Informationen finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">https://policies.google.com/privacy</a>. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">7. Ihre Rechte (Art. 15–22 DSGVO)</h3>
        <ul className="text-muted-foreground list-disc list-inside space-y-1">
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p className="text-muted-foreground mt-2">Sie haben außerdem das Recht, bei der Aufsichtsbehörde Beschwerde einzulegen. Zuständig für Baden-Württemberg: Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI), Königstraße 10a, 70173 Stuttgart, <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">www.baden-wuerttemberg.datenschutz.de</a>.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">8. Speicherdauer</h3>
        <p className="text-muted-foreground">Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen (handelsrechtlich 6–10 Jahre gemäß §§ 238 ff. HGB).</p>
      </section>
      <p className="text-xs text-muted-foreground pt-2 border-t">Stand: {new Date().getFullYear()}</p>
    </div>
  );
}

function AgbContent() {
  return (
    <div className="space-y-5 text-sm">
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 1 Geltungsbereich</h3>
        <p className="text-muted-foreground">Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen {BIZ.fullName}, Inhaber: {BIZ.owner}, {BIZ.address} (nachfolgend „Auftragnehmer") und unseren Auftraggebern über Gebäudereinigungsleistungen und damit verbundene Dienstleistungen. Abweichende Bedingungen des Auftraggebers werden nur anerkannt, wenn der Auftragnehmer diesen ausdrücklich schriftlich zustimmt.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 2 Vertragsschluss</h3>
        <p className="text-muted-foreground">Anfragen und Angebote sind grundsätzlich unverbindlich. Ein Vertrag kommt erst durch schriftliche Auftragserteilung des Auftraggebers und schriftliche Auftragsbestätigung des Auftragnehmers oder durch tatsächliche Ausführung der Leistung zustande. Mündliche Nebenabreden bedürfen der schriftlichen Bestätigung.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 3 Leistungsumfang</h3>
        <p className="text-muted-foreground">Der Umfang der zu erbringenden Reinigungsleistungen ergibt sich aus dem individuell vereinbarten Leistungsverzeichnis bzw. Angebot. Änderungen und Erweiterungen des Leistungsumfangs bedürfen der schriftlichen Vereinbarung. Zusatzleistungen werden auf Basis der zum Zeitpunkt der Leistungserbringung gültigen Preisliste gesondert abgerechnet.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 4 Vergütung und Zahlungsbedingungen</h3>
        <p className="text-muted-foreground">Die Vergütung richtet sich nach dem individuell vereinbarten Angebot zzgl. der gesetzlichen Mehrwertsteuer. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zahlbar, sofern nichts anderes vereinbart wurde. Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz (§ 288 Abs. 2 BGB) sowie eine Mahngebühr von 5,00 € je Mahnung zu berechnen.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 5 Pflichten des Auftraggebers</h3>
        <p className="text-muted-foreground">Der Auftraggeber ist verpflichtet, dem Auftragnehmer und seinen Mitarbeitern den Zugang zu den zu reinigenden Räumlichkeiten rechtzeitig zu ermöglichen sowie Strom und Wasser unentgeltlich zur Verfügung zu stellen. Mängel oder Schäden, die vor Beginn der Reinigungsarbeiten vorhanden sind, sind vor Auftragsbeginn schriftlich festzuhalten. Der Auftraggeber hat sicherzustellen, dass wertvolle, zerbrechliche oder leicht beschädigbare Gegenstände vor Beginn der Reinigungsarbeiten gesichert oder entfernt werden.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 6 Mängelrüge und Gewährleistung</h3>
        <p className="text-muted-foreground">Erkennbare Mängel sind unverzüglich, spätestens jedoch innerhalb von 24 Stunden nach Leistungserbringung schriftlich beim Auftragnehmer anzuzeigen (§ 377 HGB analog). Der Auftragnehmer hat das Recht zur Nacherfüllung. Schlägt die Nacherfüllung zweimal fehl, kann der Auftraggeber Minderung verlangen oder bei wesentlichen Mängeln vom Vertrag zurücktreten.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 7 Haftung</h3>
        <p className="text-muted-foreground">Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden. Im Übrigen beschränkt sich die Haftung auf vorhersehbare, vertragstypische Schäden. Der Auftragnehmer ist betriebshaftpflichtversichert.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 8 Vertragsdauer und Kündigung</h3>
        <p className="text-muted-foreground">Daueraufträge laufen auf unbestimmte Zeit und können von beiden Seiten mit einer Frist von vier Wochen zum Monatsende schriftlich gekündigt werden, sofern im Einzelvertrag keine abweichende Regelung getroffen wurde. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei Zahlungsverzug von mehr als 30 Tagen oder bei wesentlichen Verstößen gegen diese AGB.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 9 Datenschutz</h3>
        <p className="text-muted-foreground">Die Verarbeitung personenbezogener Daten des Auftraggebers erfolgt ausschließlich zur Vertragserfüllung und nach Maßgabe der geltenden Datenschutzgesetze (DSGVO, BDSG). Einzelheiten entnehmen Sie bitte unserer Datenschutzerklärung.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 10 Gerichtsstand und anwendbares Recht</h3>
        <p className="text-muted-foreground">Es gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist {BIZ.city}, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist. Für Verbraucher gelten die gesetzlichen Gerichtsstandsregelungen.</p>
      </section>
      <section>
        <h3 className="font-bold text-navy text-base mb-2">§ 11 Salvatorische Klausel</h3>
        <p className="text-muted-foreground">Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt die gesetzliche Regelung.</p>
      </section>
      <p className="text-xs text-muted-foreground pt-2 border-t">{BIZ.fullName} · {BIZ.address} · Stand: {new Date().getFullYear()}</p>
    </div>
  );
}
