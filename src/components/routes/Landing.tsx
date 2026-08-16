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
import work1 from "@/src/assets/photo_43.jpg";
import work2 from "@/src/assets/photo_12_2026-08-15_19-51-56.jpg";
import work3 from "@/src/assets/photo_42.jpg";
import work4 from "@/src/assets/photo_16.jpg";
import building1 from "@/src/assets/photo_13_2026-08-15_19-51-56.jpg";
import building2 from "@/src/assets/photo_14_2026-08-15_19-51-56.jpg";
import video1 from "@/src/assets/video_2026-08-15_19-51-56.mp4";
import video2 from "@/src/assets/video_2026-08-15_19-51-56 (2).mp4";
import video3 from "@/src/assets/video_2026-08-15_19-51-56 (3).mp4";

const BIZ = {
  name: "Hoffmann & Jeek",
  fullName: "Hoffmann & Jeek Gebäudereinigung",
  service: "Gebäudereinigung",
  owner: "Nader Jeek",
  city: "Villingen-Schwenningen",
  region: "Baden-Württemberg",
  phone: "+49 7721 9999 000",
  phoneHref: "+497721999900",
  whatsapp: "497721999900",
  email: "Info.hoffmannundjeek@gmail.com",
  address: "Arndtstr 23, 78054 Villingen-Schwenningen",
  rating: 4.9,
  reviews: 143,
  areas: ["Villingen-Schwenningen", "Stuttgart", "Freiburg im Breisgau", "Karlsruhe", "Mannheim", "Heidelberg", "Ulm", "Konstanz", "Rottweil", "Tuttlingen"],
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
        <VideoShowcase />
        <Gallery />
        <Services />
        <WorkPortfolio />
        <WhyUs />
        <HowItWorks openQuote={openQuote} />
        <Reviews />
        <ServiceArea />
        <Pricing openQuote={openQuote} />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
      <FloatingActions />
      {cookieOpen && <CookieBanner onClose={() => { localStorage.setItem("cookie-consent", "1"); setCookieOpen(false); }} />}
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
  const slides = [heroImg, heroImg2, heroImg3];
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
            Hoffmann & Jeek — Ihr zuverlässiger Partner für professionelle Gebäudereinigung in ganz {BIZ.region}. Kostenlose Anfahrt und unverbindliches Angebot inklusive.
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

function VideoShowcase() {
  const videos = [
    { src: video1, label: "Professionelle Reinigung" },
    { src: video2, label: "Bodenaufbereitung" },
    { src: video3, label: "Gebäudeservice" },
  ];
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-brand uppercase tracking-wider">Live-Einblick</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Unsere Arbeit in Aktion</h2>
          <p className="mt-3 text-lg text-muted-foreground">Echte Aufnahmen aus unseren Projekten — keine Stock-Fotos.</p>
        </div>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 items-start">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant bg-navy aspect-video group">
            <video key={active} ref={videoRef} src={videos[active].src} autoPlay loop muted={muted} playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between w-full">
                <span className="text-white font-bold text-lg">{videos[active].label}</span>
                <button onClick={() => setMuted(m => !m)} className="grid h-11 w-11 place-items-center rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition">
                  {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />Video
            </div>
          </div>
          <div className="flex flex-row lg:flex-col gap-4">
            {videos.map((v, i) => (
              <button key={i} onClick={() => { setActive(i); setMuted(true); }}
                className={`relative rounded-2xl overflow-hidden flex-1 lg:flex-none aspect-video border-2 transition-all ${i === active ? "border-brand shadow-glow scale-[1.02]" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <video src={v.src} muted playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-navy/40 flex items-center justify-center">
                  <div className={`grid h-10 w-10 place-items-center rounded-full ${i === active ? "bg-brand" : "bg-white/20"}`}>
                    <Play className={`h-4 w-4 fill-current ${i === active ? "text-navy" : "text-white"}`} />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-semibold bg-navy/60 rounded px-2 py-0.5 backdrop-blur truncate">{v.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: gal1, alt: "Fassadenreinigung mit Hochdruckreiniger", tall: true },
    { src: gal2, alt: "Professionelle Fensterreinigung", tall: false },
    { src: gal3, alt: "Baureinigung nach Baustelle", tall: false },
    { src: heroImg3, alt: "Maschinengestützte Bodenreinigung", tall: false },
    { src: gal5, alt: "Hausmeisterservice & Außenpflege", tall: true },
    { src: gal6, alt: "Winterdienst & Schneeräumung", tall: false },
  ];
  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-bold text-brand uppercase tracking-wider">Unsere Arbeit</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Ergebnisse, die für sich sprechen</h2>
          </div>
          <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white font-semibold self-start sm:self-auto">
            <a href="#contact">Alle Referenzen <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: "200px" }}>
          {imgs.map((img, i) => (
            <div key={i} style={{ gridRow: img.tall ? "span 2" : "span 1" }}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 cursor-pointer">
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Wind, title: "Glasreinigung", desc: "Streifenfreie Innen- und Außenreinigung von Fenstern und Glasfassaden — für Büros, Schaufenster und Gewerbegebäude.", img: gal2 },
  { icon: Brush, title: "Grundreinigung", desc: "Intensive Tiefenreinigung von Böden, Wänden und Oberflächen — ideal nach Baustellen, Renovierungen oder zum saisonalen Reset.", img: gal3 },
  { icon: Building2, title: "Bauendreinigung", desc: "Professionelle Endreinigung nach Bau- und Renovierungsarbeiten — damit Ihr Objekt bezugsfertig und makellos übergeben werden kann.", img: heroImg },
  { icon: Sparkles, title: "Unterhaltsreinigung", desc: "Regelmäßige, vertraglich abgesicherte Reinigung Ihrer Büros, Praxen und Gewerberäume nach Plan.", img: heroImg2 },
  { icon: Layers, title: "Baureinigung", desc: "Baubegleitende Reinigung während laufender Bauprojekte — zuverlässig und auf Ihre Zeitpläne abgestimmt.", img: gal5 },
  { icon: Share2, title: "Fassadenreinigung", desc: "Fachgerechte Reinigung von Außenfassaden inklusive Graffitientfernung, Algensanierung und Hochdruckbehandlung.", img: building1 },
  { icon: Camera, title: "Fenster- & Jalousienenreinigung", desc: "Gründliche Reinigung von Fenstern, Jalousien, Rollos und Sonnenschutzsystemen — innen wie außen.", img: gal6 },
  { icon: ClipboardList, title: "Winterdienst", desc: "Schneeräumung, Streuung und Glättebekämpfung für Gehwege, Parkplätze und Außenanlagen Ihrer Immobilie.", img: work4 },
  { icon: HeadphonesIcon, title: "Hausmeisterdienst", desc: "Umfassende Hausmeisterleistungen: Instandhaltung, Kleinreparaturen, Grünanlagenpflege und Verkehrssicherungspflicht.", img: work2 },
  { icon: GraduationCap, title: "Weitere Reinigungsarbeiten", desc: "Individuelle Sonderreinigungen, Treppenhaus-, Tiefgaragen- und Veranstaltungsreinigungen nach Bedarf.", img: work1 },
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
              <div className="h-40 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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

function WorkPortfolio() {
  const works = [
    { img: work1, title: "Schulreinigung", sub: "Bodenpflege Klassenzimmer", tag: "Bildungseinrichtung" },
    { img: work2, title: "Korridorreinigung", sub: "Hallenboden aufbereitet & versiegelt", tag: "Gewerbegebäude" },
    { img: work3, title: "Grundreinigung", sub: "Polieren & Grundierung Schulboden", tag: "Schule" },
    { img: work4, title: "Unterhaltsreinigung", sub: "Regelmäßige Hallenpflege", tag: "Gewerbe" },
    { img: building1, title: "Glasreinigung", sub: "Hochhausfassaden in Berlin", tag: "Großprojekt" },
    { img: building2, title: "Firmengebäude", sub: "Außenanlage & Eingangsbereich", tag: "Dauerauftrag" },
  ];
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-bold text-brand uppercase tracking-wider">Referenzprojekte</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">Echte Projekte. Echte Ergebnisse.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Ein Blick in unsere abgeschlossenen Aufträge — von Schulen über Praxen bis hin zu Gewerbeimmobilien.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((w, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 bg-card border">
              <div className="relative h-52 overflow-hidden">
                <img src={w.img} alt={w.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="bg-brand text-navy text-xs font-bold px-3 py-1 rounded-full">{w.tag}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy text-lg">{w.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{w.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
              <p>Mit über 30 Jahren Erfahrung in der Gebäudereinigung sind wir Ihr verlässlicher Partner für saubere, gepflegte Gebäude in ganz Baden-Württemberg. Jeder Auftrag wird mit höchster Sorgfalt und professionellem Equipment durchgeführt.</p>
              <p>Inhaber Nader Jeek steht persönlich für Qualität und Kundenzufriedenheit — mit einem Team, das Ihre Anforderungen kennt und übertrifft. Kostenlose Anfahrt und unverbindliches Angebot sind für uns selbstverständlich.</p>
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
              <div className="flex">{[0,1,2,3,4].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}</div>
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
                    <div className="flex">{[0,1,2,3,4].map(j => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
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

function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-bold text-brand uppercase tracking-wider">Kontakt</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy">So erreichen Sie uns</h2>
            <p className="mt-4 text-muted-foreground text-lg">Besuchen Sie uns, rufen Sie an oder schreiben Sie eine E-Mail — wir antworten typischerweise innerhalb weniger Stunden.</p>
            <div className="mt-8 space-y-4">
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
            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-card p-5 border shadow-card">
              <img src={logo} alt="Hoffmann & Jeek" className="h-14 w-14 rounded-xl object-cover" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Ihr Ansprechpartner</p>
                <p className="text-navy font-black">{BIZ.owner}</p>
                <p className="text-sm text-muted-foreground">Inhaber, {BIZ.fullName}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card border min-h-[400px]">
            <iframe
              title="Standort Hoffmann & Jeek Berlin"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BIZ.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              width="100%" height="100%" style={{ border: 0, minHeight: 400 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
            <a href="#" className="hover:text-brand">Datenschutz</a>
            <a href="#" className="hover:text-brand">Impressum</a>
            <a href="#" className="hover:text-brand">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function QuoteModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      toast.success("Vielen Dank! Wir melden uns innerhalb von 24 Stunden.");
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
            <div><Label htmlFor="fn">Vorname</Label><Input id="fn" required className="mt-1" /></div>
            <div><Label htmlFor="ln">Nachname</Label><Input id="ln" required className="mt-1" /></div>
          </div>
          <div><Label htmlFor="em">E-Mail</Label><Input id="em" type="email" required className="mt-1" /></div>
          <div><Label htmlFor="ph">Telefon</Label><Input id="ph" type="tel" required className="mt-1" /></div>
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div><Label htmlFor="ci">Stadt</Label><Input id="ci" defaultValue={BIZ.city} required className="mt-1" /></div>
            <div><Label htmlFor="zp">PLZ</Label><Input id="zp" required className="mt-1" /></div>
          </div>
          <div>
            <Label htmlFor="ms">Nachricht</Label>
            <Textarea id="ms" placeholder="Beschreiben Sie Ihre Einrichtung, Fläche und Reinigungsbedarf..." rows={4} className="mt-1" />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="cs" required className="mt-1" />
            <Label htmlFor="cs" className="text-sm font-normal text-muted-foreground leading-snug">
              Ich stimme der <a href="#" className="text-brand underline">Datenschutzerklärung</a> zu.
            </Label>
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-black h-12 text-base">
            {submitting ? "Wird gesendet..." : "Kostenloses Angebot anfordern"}
          </Button>
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

function CookieBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4">
      <div className="mx-auto max-w-4xl rounded-2xl bg-navy text-white shadow-elegant p-5 sm:p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex-1">
            <p className="font-black">Datenschutz & Cookies</p>
            <p className="text-sm text-white/70 mt-1">Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und den Datenverkehr zu analysieren.</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 hover:text-white">Verwalten</Button>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 hover:text-white">Ablehnen</Button>
            <Button onClick={onClose} className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-bold">Akzeptieren</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
