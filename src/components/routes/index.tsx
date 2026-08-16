import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle, Menu, X, Star, Shield, Award, Users,
  Building2, Sparkles, Wind, Snowflake, Wrench, Layers, Brush,
  CheckCircle2, ChevronLeft, ChevronRight, Leaf, HeadphonesIcon, ClipboardList,
  Facebook, Instagram, Youtube, ArrowRight, Clock, HardHat, Blinds, Truck, PlusCircle,
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
import heroAsset from "@/assets/photo_2.jpg.asset.json";
import glasAsset from "@/assets/photo_7.jpg.asset.json";
import bauAsset from "@/assets/photo_3.jpg.asset.json";
import fassadeAsset from "@/assets/photo_6.jpg.asset.json";
import winterAsset from "@/assets/photo_8.jpg.asset.json";
import hausmeisterAsset from "@/assets/photo_9.jpg.asset.json";
import flurAsset from "@/assets/photo_16.jpg.asset.json";
import raumAsset from "@/assets/photo_42.jpg.asset.json";
import grundAsset from "@/assets/photo_43.jpg.asset.json";
import videoAsset from "@/assets/intro.mp4.asset.json";

// -----------------------------------------------------------------------------
// Firmendaten — einfach anpassen, um die Seite für weitere Städte zu duplizieren
// -----------------------------------------------------------------------------
const BIZ = {
  name: "HJ Gebäudereinigung",
  service: "Gebäudereinigung",
  city: "Baden-Württemberg",
  phone: "+49 30 1234 5678",
  phoneHref: "+493012345678",
  whatsapp: "493012345678",
  email: "info@hj-gebaeudereinigung.de",
  address: "Friedrichstraße 120, 70173 Stuttgart",
  rating: 4.9,
  reviews: 187,
  areas: ["Stuttgart", "Karlsruhe", "Mannheim", "Heilbronn", "Freiburg", "Ulm", "Pforzheim", "Reutlingen", "Heidelberg", "Tübingen"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BIZ.service} in ${BIZ.city} | ${BIZ.name}` },
      { name: "description", content: `Über 30 Jahre Erfahrung in der ${BIZ.service}: Glas-, Grund-, Bau- und Unterhaltsreinigung, Winterdienst & Hausmeisterdienst. Kostenlose Anfahrt, unverbindliches Angebot.` },
      { property: "og:title", content: `${BIZ.service} in ${BIZ.city} | ${BIZ.name}` },
      { property: "og:description", content: `Aufträge in ganz Baden-Württemberg. Kostenlose Anfahrt und unverbindliches Angebot innerhalb von 24 Stunden.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

// -----------------------------------------------------------------------------
function Landing() {
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
        <UspBar />
        <Intro />
        <VideoSection />
        <Gallery />
        <Reviews />
        <Services openQuote={openQuote} />
        <WhyUs />
        <ServiceArea />
        <HowItWorks openQuote={openQuote} />
        <Pricing openQuote={openQuote} />
        <Differentiator />
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

// -----------------------------------------------------------------------------
const NAV = [
  { label: "Start", href: "#home" },
  { label: "Leistungen", href: "#services" },
  { label: "Referenzen", href: "#gallery" },
  { label: "Bewertungen", href: "#reviews" },
  { label: "Über uns", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#contact" },
];

function Header({ scrolled, menuOpen, setMenuOpen, openQuote }: {
  scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void; openQuote: () => void;
}) {
  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? "bg-background/95 backdrop-blur-md shadow-card" : "bg-background/70 backdrop-blur-sm"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-cta)] shadow-glow">
              <Sparkles className="h-5 w-5 text-navy" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold text-navy">{BIZ.name}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 hover:text-brand transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${BIZ.phoneHref}`} className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-brand">
              <Phone className="h-4 w-4" /> {BIZ.phone}
            </a>
            <Button onClick={openQuote} className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold shadow-glow">
              Angebot anfordern
            </Button>
          </div>

          <button className="lg:hidden p-2 text-navy" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t py-4 space-y-3">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block py-2 text-base font-medium text-foreground hover:text-brand">
                {n.label}
              </a>
            ))}
            <a href={`tel:${BIZ.phoneHref}`} className="flex items-center gap-2 py-2 font-semibold text-navy">
              <Phone className="h-4 w-4" /> {BIZ.phone}
            </a>
            <Button onClick={openQuote} className="w-full bg-[image:var(--gradient-cta)] text-navy font-semibold">Angebot anfordern</Button>
          </div>
        )}
      </div>
    </header>
  );
}

// -----------------------------------------------------------------------------
function Hero({ openQuote }: { openQuote: () => void }) {
  return (
    <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-[image:var(--gradient-hero)]">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.9 0.15 200) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.7 0.15 220) 0%, transparent 40%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="text-navy-foreground">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur mb-6">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              Über 30 Jahre Erfahrung · Aufträge in ganz Baden-Württemberg
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
              {BIZ.service} in {BIZ.city} <span className="text-brand">—</span> gründlich, zuverlässig, termintreu.
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Von der Glas- und Grundreinigung über Bauend- und Fassadenreinigung bis zu Winterdienst und Hausmeisterdienst — alles aus einer Hand, mit geschultem Personal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {[
                { icon: Award, label: "Über 30 Jahre Erfahrung" },
                { icon: Truck, label: "Kostenlose Anfahrt" },
                { icon: ClipboardList, label: "Unverbindliches Angebot" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 backdrop-blur">
                  <b.icon className="h-4 w-4 text-brand" />
                  <span className="text-sm font-medium text-white">{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90 font-semibold h-14 px-8 text-base">
                <a href={`tel:${BIZ.phoneHref}`}><Phone className="mr-2 h-5 w-5" /> Jetzt anrufen</a>
              </Button>
              <Button onClick={openQuote} size="lg" className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold h-14 px-8 text-base shadow-glow">
                Kostenloses Angebot <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant ring-1 ring-white/20">
              <img src={heroAsset.url} alt={`${BIZ.name} Mitarbeiter bei der Bodenreinigung`} width={1400} height={1200} className="w-full h-[420px] lg:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-card rounded-2xl shadow-elegant p-5 max-w-[280px] border">
              <div className="flex items-center gap-1 mb-2">
                {[0, 1, 2, 3, 4].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                <span className="ml-2 text-lg font-bold text-navy">{BIZ.rating}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Top bewertet auf Google</p>
              <p className="text-xs text-muted-foreground mt-1">Basierend auf {BIZ.reviews}+ Bewertungen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function UspBar() {
  const usps = [
    { icon: Award, title: "Über 30 Jahre Erfahrung", desc: "Seit drei Jahrzehnten im Reinigungshandwerk zuhause." },
    { icon: MapPin, title: "Ganz Baden-Württemberg", desc: "Wir übernehmen Aufträge landesweit — auch mehrere Standorte." },
    { icon: Truck, title: "Kostenlose Anfahrt", desc: "Keine versteckten Kosten für Anfahrt oder Besichtigung." },
    { icon: ClipboardList, title: "Unverbindliches Angebot", desc: "Transparentes Festpreisangebot innerhalb von 24 Stunden." },
  ];
  return (
    <section className="bg-surface border-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {usps.map(u => (
          <div key={u.title} className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-cta)] text-navy shadow-glow">
              <u.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-navy">{u.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{u.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function Intro() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy">Ihr Reinigungspartner in ganz Baden-Württemberg</h2>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>
            {BIZ.name} steht seit über 30 Jahren für saubere Ergebnisse: Büros, Schulen, Praxen, Wohnanlagen und Baustellen. Unsere eingespielten Teams arbeiten termintreu und auf Wunsch außerhalb Ihrer Betriebszeiten.
          </p>
          <p>
            Wir übernehmen Aufträge in ganz Baden-Württemberg — die Anfahrt und die Besichtigung vor Ort sind für Sie kostenlos, das Angebot bleibt unverbindlich.
          </p>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function VideoSection() {
  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Einblick</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Unsere Arbeit im Video</h2>
          <p className="mt-4 text-lg text-muted-foreground">Sehen Sie selbst, wie unsere Teams vor Ort arbeiten.</p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-elegant border bg-navy">
          <video
            src={videoAsset.url}
            controls
            playsInline
            preload="metadata"
            poster={grundAsset.url}
            className="w-full max-h-[600px] object-contain bg-navy"
          />
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function Gallery() {
  const imgs = [
    { src: flurAsset.url, alt: "Frisch gereinigter und versiegelter Schulflur" },
    { src: grundAsset.url, alt: "Grundreinigung eines Klassenraums mit Einscheibenmaschine" },
    { src: raumAsset.url, alt: "Gereinigter Unterrichtsraum mit glänzendem Boden" },
    { src: hausmeisterAsset.url, alt: "Hausmeisterdienst an einer Wohnanlage" },
  ];
  return (
    <section id="gallery" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Referenzen</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Ergebnisse, die für sich sprechen</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {imgs.map((img, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square shadow-card hover:shadow-elegant transition-all">
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
const REVIEWS = [
  { name: "Sabine M.", init: "SM", quote: "Absolut zuverlässig und gründlich. Seit dem Wechsel war unser Büro nie sauberer." },
  { name: "Thomas K.", init: "TK", quote: "Pünktlich und sehr genau. Wir betreuen drei Standorte — alle laufen einwandfrei." },
  { name: "Elena R.", init: "ER", quote: "Als Praxis ist Hygiene entscheidend. Das Personal ist geschult, diskret und sorgfältig." },
  { name: "David L.", init: "DL", quote: "Gute Kommunikation und konstante Qualität. Ein fester Ansprechpartner macht alles einfach." },
  { name: "Anja P.", init: "AP", quote: "Wir hatten schon mehrere Firmen. Diese ist mit Abstand die zuverlässigste und transparenteste." },
];

function Reviews() {
  const [idx, setIdx] = useState(0);
  const perView = 3;
  const max = Math.max(0, REVIEWS.length - perView);
  return (
    <section id="reviews" className="py-20 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Bewertungen</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Kunden in ganz {BIZ.city}</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex">
                {[0, 1, 2, 3, 4].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="font-bold text-navy">{BIZ.rating}</span>
              <span className="text-muted-foreground">· {BIZ.reviews} Bewertungen</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} aria-label="Zurück"
              className="grid h-11 w-11 place-items-center rounded-full border bg-card hover:bg-secondary disabled:opacity-40 transition">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setIdx(Math.min(max, idx + 1))} disabled={idx === max} aria-label="Weiter"
              className="grid h-11 w-11 place-items-center rounded-full border bg-card hover:bg-secondary disabled:opacity-40 transition">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${idx} * (100% / ${perView}) - ${idx} * 1.5rem / ${perView}))` }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-card rounded-2xl p-6 shadow-card border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-navy font-bold">{r.init}</div>
                  <div>
                    <p className="font-semibold text-navy">{r.name}</p>
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map(j => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">„{r.quote}“</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
const SERVICES = [
  { icon: Wind, title: "Glasreinigung", img: glasAsset.url, desc: "Streifenfreie Reinigung von Glasflächen, Schaufenstern und Glasfassaden — innen wie außen." },
  { icon: Brush, title: "Grundreinigung", img: grundAsset.url, desc: "Intensive Tiefenreinigung inklusive Beschichtung und Versiegelung von Böden." },
  { icon: HardHat, title: "Bauendreinigung", img: bauAsset.url, desc: "Besenreine bis bezugsfertige Übergabe nach Abschluss der Bauarbeiten." },
  { icon: Sparkles, title: "Unterhaltsreinigung", img: flurAsset.url, desc: "Regelmäßige Pflege von Büros, Fluren, Treppenhäusern und Sanitärbereichen." },
  { icon: Layers, title: "Baureinigung", img: raumAsset.url, desc: "Laufende Reinigung während der Bauphase — Schutt, Staub und Bauschmutz inklusive." },
  { icon: Building2, title: "Fassadenreinigung", img: fassadeAsset.url, desc: "Schonende Hochdruck- und Spezialreinigung von Fassaden aller Materialien." },
  { icon: Blinds, title: "Fenster- & Jalousienreinigung", img: glasAsset.url, desc: "Rahmen, Fensterbänke und Jalousien gründlich gereinigt und gepflegt." },
  { icon: Snowflake, title: "Winterdienst", img: winterAsset.url, desc: "Räum- und Streudienst zuverlässig vor Betriebsbeginn — auch am Wochenende." },
  { icon: Wrench, title: "Hausmeisterdienst", img: hausmeisterAsset.url, desc: "Kleinreparaturen, Grünpflege, Außenanlagen und Objektbetreuung aus einer Hand." },
  { icon: PlusCircle, title: "Weitere Reinigungsarbeiten", img: null, desc: "Sonderreinigungen, Teppich- und Polsterreinigung, Entrümpelung u. v. m. — fragen Sie uns." },
];

function Services({ openQuote }: { openQuote: () => void }) {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Leistungen</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Alles rund um Ihr Gebäude</h2>
          <p className="mt-4 text-lg text-muted-foreground">Zehn Leistungsbereiche, ein Ansprechpartner — mit geschultem Personal und moderner Technik.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all">
              {s.img ? (
                <div className="relative h-44 overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
                </div>
              ) : (
                <div className="relative h-44 bg-[image:var(--gradient-navy)] grid place-items-center">
                  <PlusCircle className="h-12 w-12 text-brand" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-cta)] text-navy shadow-glow">
                    <s.icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                <button onClick={openQuote} className="mt-4 self-start text-sm font-semibold text-brand hover:underline">
                  Angebot anfordern →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function WhyUs() {
  const points = [
    { icon: Award, title: "Über 30 Jahre Erfahrung", desc: "Drei Jahrzehnte Praxis in Objekt-, Bau- und Sonderreinigung." },
    { icon: Shield, title: "Versichert & geprüft", desc: "Vollständiger Versicherungsschutz und geschultes, überprüftes Personal." },
    { icon: Clock, title: "Flexible Einsatzzeiten", desc: "Abends, früh morgens oder am Wochenende — passend zu Ihrem Betrieb." },
    { icon: Users, title: "Feste Teams", desc: "Dieselben Mitarbeiter bei Ihnen vor Ort, mit persönlichem Ansprechpartner." },
  ];
  return (
    <section id="about" className="py-20 lg:py-28 bg-[image:var(--gradient-navy)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Warum wir</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Verlässlichkeit, auf die Sie bauen können</h2>
            <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
              <p>Sauberkeit ist kein Nebenschauplatz — sie ist Teil Ihres Auftritts. Deshalb bekommen Sie bei uns einen festen Ansprechpartner, dokumentierte Qualitätskontrollen und Teams, die Sie wiedererkennen.</p>
              <p>Mit über 30 Jahren Erfahrung und Aufträgen in ganz Baden-Württemberg wissen wir, worauf es ankommt: pünktlich da sein, sauber arbeiten, ehrlich kommunizieren.</p>
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden ring-1 ring-white/15">
              <img src={bauAsset.url} alt="Bauendreinigung durch unser Team" loading="lazy" className="w-full h-64 object-cover" />
            </div>
          </div>
          <div className="grid gap-4">
            {points.map(p => (
              <div key={p.title} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-navy">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{p.title}</h3>
                    <p className="mt-1 text-white/70 text-sm">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function ServiceArea() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Einsatzgebiet</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Aufträge in ganz Baden-Württemberg</h2>
            <p className="mt-4 text-lg text-muted-foreground">Wir sind landesweit im Einsatz — die Anfahrt ist für Sie immer kostenlos:</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BIZ.areas.map(a => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-navy border">
                  <MapPin className="h-3.5 w-3.5 text-brand" /> {a}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card border min-h-[380px]">
            <iframe
              title="Einsatzgebiet Baden-Württemberg"
              src="https://maps.google.com/maps?q=Baden-W%C3%BCrttemberg&t=&z=7&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function HowItWorks({ openQuote }: { openQuote: () => void }) {
  const steps = [
    { n: "01", title: "Kostenloses Erstgespräch", desc: "Sie schildern uns Objekt, Umfang und Wunschtermine — telefonisch oder per WhatsApp.", icon: HeadphonesIcon },
    { n: "02", title: "Besichtigung & Angebot", desc: "Wir kommen kostenlos vorbei und erstellen ein transparentes, unverbindliches Angebot.", icon: ClipboardList },
    { n: "03", title: "Sauberes Ergebnis", desc: "Festes Team, feste Ansprechpartner und regelmäßige Qualitätskontrollen.", icon: CheckCircle2 },
  ];
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Ablauf</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">In 3 Schritten zum sauberen Objekt</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="relative bg-card rounded-2xl p-8 shadow-card border">
              <div className="flex items-start justify-between mb-6">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-cta)] text-navy shadow-glow">
                  <s.icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <span className="text-5xl font-black text-navy/10 font-display">{s.n}</span>
              </div>
              <h3 className="text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 h-6 w-6 text-brand" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button onClick={openQuote} size="lg" className="bg-navy text-white hover:bg-navy/90 h-13 px-8">
            Kostenloses Erstgespräch starten <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function Pricing({ openQuote }: { openQuote: () => void }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-brand uppercase tracking-wider">Preise</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Fair, transparent, auf Ihr Objekt zugeschnitten</h2>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          <p>
            Eine pauschale Preisliste gibt es bei uns nicht — kein Objekt gleicht dem anderen. Ihr Preis richtet sich nach Fläche, Intervall und Leistungsumfang. Sie erhalten ein klar aufgeschlüsseltes Angebot ohne versteckte Kosten.
          </p>
          <p>Anfahrt und Besichtigung sind kostenlos, das Angebot bleibt unverbindlich.</p>
        </div>
        <Button onClick={openQuote} size="lg" className="mt-8 bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold h-13 px-8 shadow-glow">
          Unverbindliches Angebot anfordern <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function Differentiator() {
  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-card rounded-3xl p-10 shadow-card border">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 mb-6">
              <Leaf className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy">Umweltschonende Reinigung</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Wir arbeiten mit zertifizierten, umweltschonenden Profiprodukten — wirksam gegen Schmutz und verträglich für Mitarbeiter, Kunden und Gebäude. Auf Wunsch legen wir alle eingesetzten Mittel offen.
            </p>
          </div>
          <div className="bg-card rounded-3xl p-10 shadow-card border">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-cta)] text-navy mb-6 shadow-glow">
              <HeadphonesIcon className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy">Persönlicher Ansprechpartner</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Kein Callcenter, keine Warteschleife: Sie haben eine feste Kontaktperson, erreichbar per Telefon oder WhatsApp — mit der Befugnis, Dinge sofort zu regeln.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
const FAQS = [
  { q: "Wie schnell erhalte ich ein Angebot?", a: "In der Regel innerhalb von 24 Stunden nach Ihrer Anfrage. Bei größeren Objekten vereinbaren wir vorher eine kostenlose Besichtigung." },
  { q: "Ist die Anfahrt wirklich kostenlos?", a: "Ja. Anfahrt und Besichtigung stellen wir Ihnen nicht in Rechnung — in ganz Baden-Württemberg." },
  { q: "Übernehmen Sie auch einmalige Aufträge?", a: "Selbstverständlich: Grundreinigungen, Bauendreinigungen und Sonderreinigungen führen wir auch einmalig durch." },
  { q: "Arbeiten Sie außerhalb der Betriebszeiten?", a: "Ja — abends, früh morgens und am Wochenende. Wir richten uns nach Ihrem Betriebsablauf." },
  { q: "Ist Ihr Personal versichert?", a: "Alle Mitarbeiter sind angemeldet, geschult und über unsere Betriebshaftpflicht versichert." },
  { q: "Bieten Sie Winterdienst im Abo an?", a: "Ja, mit Bereitschaft über die gesamte Wintersaison inklusive Räum- und Streupflicht-Dokumentation." },
  { q: "Betreuen Sie auch mehrere Standorte?", a: "Ja. Wir übernehmen landesweite Objekte mit einheitlicher Abrechnung und einem Ansprechpartner." },
];

function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">FAQ</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Häufige Fragen</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl bg-card px-6 shadow-card">
              <AccordionTrigger className="text-left font-semibold text-navy hover:no-underline py-5">
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

// -----------------------------------------------------------------------------
function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[image:var(--gradient-hero)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 30% 50%, oklch(0.7 0.15 200) 0%, transparent 50%)",
      }} />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-5xl font-bold">Jetzt unverbindliches Angebot sichern</h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Kostenlose Beratung und Anfahrt — sprechen Sie direkt mit uns.</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`tel:${BIZ.phoneHref}`} className="group flex items-center gap-3 rounded-2xl bg-white text-navy px-8 py-5 font-bold text-xl shadow-elegant hover:scale-105 transition-transform">
            <Phone className="h-6 w-6" /> {BIZ.phone}
          </a>
          <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-[image:var(--gradient-cta)] text-navy px-8 py-5 font-bold text-xl shadow-glow hover:scale-105 transition-transform">
            <MessageCircle className="h-6 w-6" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Kontakt</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Schreiben Sie uns</h2>
            <p className="mt-4 text-muted-foreground text-lg">Rufen Sie an, schreiben Sie per WhatsApp oder E-Mail — werktags antworten wir meist innerhalb weniger Stunden.</p>

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
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-navy font-semibold hover:text-brand">{c.value}</a>
                    ) : (
                      <p className="text-navy font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-card border min-h-[400px]">
            <iframe
              title="Standort"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BIZ.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-cta)]">
                <Sparkles className="h-5 w-5 text-navy" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold text-white">{BIZ.name}</span>
            </div>
            <p className="text-sm">Professionelle {BIZ.service} in ganz {BIZ.city} — seit über 30 Jahren.</p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social Media" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-brand hover:text-navy transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-white mb-4">Navigation</p>
            <ul className="space-y-2 text-sm">
              {NAV.map(n => <li key={n.href}><a href={n.href} className="hover:text-brand">{n.label}</a></li>)}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white mb-4">Leistungen</p>
            <ul className="space-y-2 text-sm">
              {SERVICES.slice(0, 10).map(s => <li key={s.title}><a href="#services" className="hover:text-brand">{s.title}</a></li>)}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white mb-4">Kontakt</p>
            <address className="not-italic text-sm space-y-2">
              <p>{BIZ.name}</p>
              <p>{BIZ.address}</p>
              <p><a href={`tel:${BIZ.phoneHref}`} className="hover:text-brand">{BIZ.phone}</a></p>
              <p><a href={`mailto:${BIZ.email}`} className="hover:text-brand">{BIZ.email}</a></p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} {BIZ.name}. Alle Rechte vorbehalten.</p>
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

// -----------------------------------------------------------------------------
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
          <DialogTitle className="text-2xl font-bold text-navy">Unverbindliches Angebot</DialogTitle>
          <DialogDescription>Kurz Ihr Objekt beschreiben — wir antworten innerhalb von 24 Stunden. Anfahrt kostenlos.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="fn">Vorname</Label><Input id="fn" required className="mt-1" /></div>
            <div><Label htmlFor="ln">Nachname</Label><Input id="ln" required className="mt-1" /></div>
          </div>
          <div><Label htmlFor="em">E-Mail</Label><Input id="em" type="email" required className="mt-1" /></div>
          <div><Label htmlFor="ph">Telefon</Label><Input id="ph" type="tel" required className="mt-1" /></div>
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div><Label htmlFor="ci">Ort</Label><Input id="ci" required className="mt-1" /></div>
            <div><Label htmlFor="zp">PLZ</Label><Input id="zp" required className="mt-1" /></div>
          </div>
          <div>
            <Label htmlFor="ms">Nachricht</Label>
            <Textarea id="ms" placeholder="Art der Reinigung, Objektgröße, gewünschtes Intervall ..." rows={4} className="mt-1" />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="cs" required className="mt-1" />
            <Label htmlFor="cs" className="text-sm font-normal text-muted-foreground leading-snug">
              Ich akzeptiere die <a href="#" className="text-brand underline">Datenschutzerklärung</a> und bin mit der Kontaktaufnahme einverstanden.
            </Label>
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold h-12 text-base">
            {submitting ? "Wird gesendet ..." : "Angebot anfordern"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// -----------------------------------------------------------------------------
function FloatingActions() {
  return (
    <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-6 z-30 flex flex-col gap-3">
      <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-elegant hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6" />
      </a>
      <a href={`tel:${BIZ.phoneHref}`} aria-label="Anrufen"
        className="grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-elegant hover:scale-110 transition-transform">
        <Phone className="h-5 w-5" />
      </a>
      <a href={`mailto:${BIZ.email}`} aria-label="E-Mail"
        className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy border shadow-elegant hover:scale-110 transition-transform">
        <Mail className="h-5 w-5" />
      </a>
    </div>
  );
}

// -----------------------------------------------------------------------------
function CookieBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4 animate-in slide-in-from-bottom-4">
      <div className="mx-auto max-w-4xl rounded-2xl bg-navy text-white shadow-elegant p-5 sm:p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex-1">
            <p className="font-semibold">Datenschutz ist uns wichtig</p>
            <p className="text-sm text-white/70 mt-1">Wir verwenden Cookies, um die Nutzung der Website zu verbessern und Zugriffe zu analysieren.</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 hover:text-white">Einstellungen</Button>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 hover:text-white">Ablehnen</Button>
            <Button onClick={onClose} className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold">Akzeptieren</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
