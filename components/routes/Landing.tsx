import { useEffect, useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle, Menu, X, Star, Shield, Award, Users,
  Building2, Sparkles, Wind, Stethoscope, GraduationCap, Layers, Brush,
  CheckCircle2, ChevronLeft, ChevronRight, Leaf, HeadphonesIcon, ClipboardList,
  Share2, Camera, Play, ArrowRight, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import heroImg from "@/src/assets/hero-cleaning.jpg";
import gal1 from "@/src/assets/gallery-1.jpg";
import gal2 from "@/src/assets/gallery-2.jpg";
import gal3 from "@/src/assets/gallery-3.jpg";
import gal4 from "@/src/assets/gallery-4.jpg";

// Business config — easily duplicate this page for other cities
const BIZ = {
  name: "BrightPath Cleaning",
  service: "Commercial Cleaning",
  city: "Berlin",
  phone: "+49 30 1234 5678",
  phoneHref: "+493012345678",
  whatsapp: "493012345678",
  email: "hello@brightpath-cleaning.com",
  address: "Friedrichstraße 120, 10117 Berlin",
  rating: 4.9,
  reviews: 187,
  areas: ["Mitte", "Charlottenburg", "Prenzlauer Berg", "Kreuzberg", "Potsdam", "Spandau"],
};

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
        <Intro />
        <Gallery />
        <Reviews />
        <Services />
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

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
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

          <nav className="hidden lg:flex items-center gap-8">
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
              Get Free Quote
            </Button>
          </div>

          <button className="lg:hidden p-2 text-navy" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
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
            <Button onClick={openQuote} className="w-full bg-[image:var(--gradient-cta)] text-navy font-semibold">Get Free Quote</Button>
          </div>
        )}
      </div>
    </header>
  );
}

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
              Trusted by 200+ businesses in {BIZ.city}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
              {BIZ.service} in {BIZ.city} <span className="text-brand">—</span> Spotless offices, every time.
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Trained, insured cleaners delivering consistently high standards for offices, medical practices, and multi-site facilities across {BIZ.city}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {[
                { icon: Users, label: "Trained Staff" },
                { icon: Shield, label: "Fully Insured" },
                { icon: Award, label: "5-Star Rated" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 backdrop-blur">
                  <b.icon className="h-4 w-4 text-brand" />
                  <span className="text-sm font-medium text-white">{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90 font-semibold h-14 px-8 text-base">
                <a href={`tel:${BIZ.phoneHref}`}><Phone className="mr-2 h-5 w-5" /> Call Now</a>
              </Button>
              <Button onClick={openQuote} size="lg" className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold h-14 px-8 text-base shadow-glow">
                Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant ring-1 ring-white/20">
              <img src={heroImg} alt={`${BIZ.name} cleaning team in ${BIZ.city}`} width={1400} height={1200} className="w-full h-[420px] lg:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-card rounded-2xl shadow-elegant p-5 max-w-[280px] border">
              <div className="flex items-center gap-1 mb-2">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                <span className="ml-2 text-lg font-bold text-navy">{BIZ.rating}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Excellent on Google</p>
              <p className="text-xs text-muted-foreground mt-1">Based on {BIZ.reviews}+ verified reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy">Your local cleaning partner in {BIZ.city}</h2>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>
            {BIZ.name} has been delivering reliable {BIZ.service.toLowerCase()} services across {BIZ.city} for over a decade. Our trained teams keep offices, medical practices, schools, and residential buildings spotless — with the flexibility to work around your business hours.
          </p>
          <p>
            We proudly serve clients throughout {BIZ.city} and surrounding areas including <span className="font-semibold text-navy">{BIZ.areas.slice(0, 3).join(", ")}</span>, and beyond. Whether you need a one-off deep clean or ongoing maintenance, we tailor every contract to fit your building, schedule, and budget.
          </p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: gal1, alt: "Sparkling office reception" },
    { src: gal2, alt: "Professional window cleaning" },
    { src: gal3, alt: "Clean stairwell" },
    { src: gal4, alt: "Uniformed cleaning team" },
  ];
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Our work</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Results speak for themselves</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {imgs.map((img, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square shadow-card hover:shadow-elegant transition-all">
              <img src={img.src} alt={img.alt} loading="lazy" width={800} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Sarah M.", init: "SM", quote: "Reliable, thorough, and always professional. Our office has never looked better since we switched to BrightPath." },
  { name: "Thomas K.", init: "TK", quote: "The team is punctual and detail-oriented. We manage three locations and they handle all of them flawlessly." },
  { name: "Elena R.", init: "ER", quote: "As a medical practice, hygiene is critical. Their staff is trained, discreet, and always meets our standards." },
  { name: "David L.", init: "DL", quote: "Great communication and consistent quality. Our dedicated contact person makes everything effortless." },
  { name: "Anja P.", init: "AP", quote: "We've worked with several cleaning companies. BrightPath is by far the most reliable and transparent." },
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
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Reviews</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Loved by businesses across {BIZ.city}</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="font-bold text-navy">{BIZ.rating}</span>
              <span className="text-muted-foreground">· {BIZ.reviews} reviews</span>
              <a href="#" className="text-brand font-semibold hover:underline">View on Google →</a>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
              className="grid h-11 w-11 place-items-center rounded-full border bg-card hover:bg-secondary disabled:opacity-40 transition">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setIdx(Math.min(max, idx + 1))} disabled={idx === max}
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
                      {[0,1,2,3,4].map(j => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">"{r.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Building2, title: "Office Cleaning", desc: "Daily or weekly cleaning of workspaces, meeting rooms, and common areas — tailored to your business hours." },
  { icon: Sparkles, title: "Maintenance Cleaning", desc: "Consistent, scheduled upkeep that keeps your facility looking its best week after week." },
  { icon: Brush, title: "Deep Cleaning", desc: "Thorough top-to-bottom cleans for turnovers, seasonal resets, or post-construction sites." },
  { icon: Wind, title: "Window Cleaning", desc: "Streak-free interior and exterior window cleaning for offices and commercial buildings." },
  { icon: Layers, title: "Stairwell Cleaning", desc: "Regular maintenance of communal stairwells, entrances, and hallways in commercial or residential buildings." },
  { icon: Stethoscope, title: "Medical Practice Cleaning", desc: "Hygiene-compliant cleaning for clinics, dental offices, and medical practices with trained staff." },
  { icon: GraduationCap, title: "School Cleaning", desc: "Safe, thorough cleaning of classrooms, hallways, and shared facilities — during off-hours." },
  { icon: ClipboardList, title: "Custom Contracts", desc: "Multi-site or specialty needs? We build custom cleaning programs with a dedicated account manager." },
];

function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">Services</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Everything your facility needs</h2>
          <p className="mt-4 text-lg text-muted-foreground">Comprehensive commercial cleaning services delivered by trained, insured professionals.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(s => (
            <div key={s.title} className="group relative rounded-2xl border bg-card p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-cta)] text-navy mb-4 shadow-glow">
                <s.icon className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { icon: Shield, title: "Fully insured", desc: "Every job is covered by comprehensive liability insurance for total peace of mind." },
    { icon: Users, title: "Trained staff", desc: "Our cleaners are vetted, trained, and equipped to meet the highest professional standards." },
    { icon: Clock, title: "Flexible scheduling", desc: "We work around your business hours — evenings, weekends, or early mornings." },
  ];
  return (
    <section id="about" className="py-20 lg:py-28 bg-[image:var(--gradient-navy)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Why choose us</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Reliability you can build a business around</h2>
            <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
              <p>We know that clean facilities aren't optional — they're a reflection of your brand. That's why every {BIZ.name} contract comes with a dedicated account manager, transparent quality checks, and a team you'll actually recognize week after week.</p>
              <p>With over 10 years serving {BIZ.city}'s businesses, we've built our reputation on showing up, doing the work, and communicating honestly when things need adjustment. No surprises. No excuses.</p>
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

function ServiceArea() {
  const areas = [...BIZ.areas, "Wilmersdorf", "Neukölln", "Tempelhof", "Steglitz", "Friedrichshain", "Moabit"];
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Service area</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Serving {BIZ.city} & surrounding areas</h2>
            <p className="mt-4 text-lg text-muted-foreground">Based in {BIZ.city}, we serve businesses across the following districts and neighboring towns:</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {areas.map(a => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-navy border">
                  <MapPin className="h-3.5 w-3.5 text-brand" /> {a}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl bg-surface border overflow-hidden shadow-card">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, oklch(0.9 0.05 220 / 0.5) 0%, transparent 70%), linear-gradient(135deg, oklch(0.97 0.01 240) 0%, oklch(0.93 0.02 220) 100%)",
            }} />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
              <path d="M50,200 Q100,120 180,140 T350,100" stroke="oklch(0.7 0.17 200)" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.5" />
              <path d="M80,250 Q150,180 250,200 T380,180" stroke="oklch(0.7 0.17 200)" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
            </svg>
            {[
              { x: "30%", y: "40%", label: BIZ.areas[0] },
              { x: "55%", y: "30%", label: BIZ.areas[1] },
              { x: "70%", y: "55%", label: BIZ.areas[2] },
              { x: "40%", y: "70%", label: BIZ.areas[3] },
              { x: "20%", y: "60%", label: BIZ.areas[4] },
            ].map((p, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: p.x, top: p.y }}>
                <div className="h-4 w-4 rounded-full bg-brand ring-4 ring-brand/20 animate-pulse" />
                <span className="mt-1 text-xs font-semibold text-navy bg-white/80 px-2 py-0.5 rounded backdrop-blur">{p.label}</span>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-xl px-4 py-2 shadow-card border">
              <p className="text-xs font-semibold text-navy flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand" /> {BIZ.city} & region
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ openQuote }: { openQuote: () => void }) {
  const steps = [
    { n: "01", title: "Free consultation", desc: "Tell us about your building, schedule, and goals over a quick call.", icon: HeadphonesIcon },
    { n: "02", title: "Site visit & custom quote", desc: "We visit on-site to assess needs and deliver a transparent, no-obligation quote.", icon: ClipboardList },
    { n: "03", title: "Ongoing service", desc: "Your dedicated contact manages the team, quality checks, and any adjustments.", icon: CheckCircle2 },
  ];
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">How it works</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Get started in 3 simple steps</h2>
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
            Start with a free consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Pricing({ openQuote }: { openQuote: () => void }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-brand uppercase tracking-wider">Pricing</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Fair, transparent, tailored to you</h2>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          <p>We don't publish a fixed price list — because no two buildings are the same. Your quote depends on square footage, frequency, and scope. What you get is a clear, itemized proposal with no hidden fees.</p>
          <p>Every quote is free, without obligation, and comes with a site visit so you know exactly what you're paying for.</p>
        </div>
        <Button onClick={openQuote} size="lg" className="mt-8 bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold h-13 px-8 shadow-glow">
          Request Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function Differentiator() {
  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-card rounded-3xl p-10 shadow-card border">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 mb-6">
              <Leaf className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy">Eco-friendly cleaning</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We use certified, low-impact cleaning products that are tough on grime but gentle on your staff, clients, and the planet. Better indoor air quality, fewer allergens, and full transparency about every product we bring on-site.
            </p>
          </div>
          <div className="bg-card rounded-3xl p-10 shadow-card border">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-cta)] text-navy mb-6 shadow-glow">
              <HeadphonesIcon className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-navy">Dedicated local contact</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              You'll never be routed through a call center. Every client gets a named account manager based right here in {BIZ.city} — reachable by phone or WhatsApp, and empowered to make things right, fast.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "How often should our office be cleaned?", a: "It depends on foot traffic and industry. Most offices work best with 2–5 cleans per week; medical practices often need daily. We'll advise during your free consultation." },
  { q: "Are your cleaners insured?", a: "Yes. Every cleaner is fully insured under our comprehensive liability policy, and all staff are vetted and trained before working on your site." },
  { q: "Do you offer one-time cleaning jobs?", a: "Absolutely. We handle move-in/move-out cleans, post-construction cleans, and one-off deep cleans in addition to recurring contracts." },
  { q: "Can you clean outside of business hours?", a: "Yes — evenings, early mornings, and weekends are standard for us. We work around your operations, not the other way around." },
  { q: "How fast can you respond to a request?", a: "We typically deliver a quote within 24 hours, and can begin service within a week of contract signing (often sooner for urgent needs)." },
  { q: "What cleaning products do you use?", a: "We use certified, low-impact professional products by default. If your facility requires specific hospital-grade disinfectants or fragrance-free products, we adapt." },
  { q: "Can you handle multi-location contracts?", a: "Yes. We serve businesses with multiple sites across the region under a single point of contact and unified reporting." },
];

function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider">FAQ</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Frequently asked questions</h2>
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

function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[image:var(--gradient-hero)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 30% 50%, oklch(0.7 0.15 200) 0%, transparent 50%)",
      }} />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-5xl font-bold">Contact us for a custom quote</h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Free consultation, no obligation. Speak with a local team member today.</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`tel:${BIZ.phoneHref}`} className="group flex items-center gap-3 rounded-2xl bg-white text-navy px-8 py-5 font-bold text-xl shadow-elegant hover:scale-105 transition-transform">
            <Phone className="h-6 w-6" /> {BIZ.phone}
          </a>
          <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-[image:var(--gradient-cta)] text-navy px-8 py-5 font-bold text-xl shadow-glow hover:scale-105 transition-transform">
            <MessageCircle className="h-6 w-6" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-semibold text-brand uppercase tracking-wider">Contact</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy">Get in touch</h2>
            <p className="mt-4 text-muted-foreground text-lg">Visit us, call, or send an email — we typically respond within a few hours during business days.</p>

            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, label: "Address", value: BIZ.address },
                { icon: Phone, label: "Phone", value: BIZ.phone, href: `tel:${BIZ.phoneHref}` },
                { icon: Mail, label: "Email", value: BIZ.email, href: `mailto:${BIZ.email}` },
                { icon: MessageCircle, label: "WhatsApp", value: `+${BIZ.whatsapp.slice(0,2)} ${BIZ.whatsapp.slice(2)}`, href: `https://wa.me/${BIZ.whatsapp}` },
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

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-surface p-5 border">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-cta)] text-navy font-bold text-lg shrink-0">
                MK
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Your contact person</p>
                <p className="text-navy font-bold">Maria Klein</p>
                <p className="text-sm text-muted-foreground">Head of Client Services</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-card border min-h-[400px]">
            <iframe
              title="Location"
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
            <p className="text-sm">Professional {BIZ.service.toLowerCase()} for businesses across {BIZ.city}.</p>
            <div className="mt-6 flex gap-3">
              {[Share2, Camera, Play].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-brand hover:text-navy transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-white mb-4">Sitemap</p>
            <ul className="space-y-2 text-sm">
              {NAV.map(n => <li key={n.href}><a href={n.href} className="hover:text-brand">{n.label}</a></li>)}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white mb-4">Services</p>
            <ul className="space-y-2 text-sm">
              {SERVICES.slice(0, 6).map(s => <li key={s.title}><a href="#services" className="hover:text-brand">{s.title}</a></li>)}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white mb-4">Contact</p>
            <address className="not-italic text-sm space-y-2">
              <p>{BIZ.name}</p>
              <p>{BIZ.address}</p>
              <p><a href={`tel:${BIZ.phoneHref}`} className="hover:text-brand">{BIZ.phone}</a></p>
              <p><a href={`mailto:${BIZ.email}`} className="hover:text-brand">{BIZ.email}</a></p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} {BIZ.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand">Privacy Policy</a>
            <a href="#" className="hover:text-brand">Imprint</a>
            <a href="#" className="hover:text-brand">Terms</a>
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
      toast.success("Thanks! We'll be in touch within 24 hours.");
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-navy">Get your free quote</DialogTitle>
          <DialogDescription>Tell us a bit about your facility and we'll respond within 24 hours.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="fn">First name</Label><Input id="fn" required className="mt-1" /></div>
            <div><Label htmlFor="ln">Last name</Label><Input id="ln" required className="mt-1" /></div>
          </div>
          <div><Label htmlFor="em">Email</Label><Input id="em" type="email" required className="mt-1" /></div>
          <div><Label htmlFor="ph">Phone</Label><Input id="ph" type="tel" required className="mt-1" /></div>
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div><Label htmlFor="ci">City</Label><Input id="ci" defaultValue={BIZ.city} required className="mt-1" /></div>
            <div><Label htmlFor="zp">ZIP</Label><Input id="zp" required className="mt-1" /></div>
          </div>
          <div>
            <Label htmlFor="ms">Message</Label>
            <Textarea id="ms" placeholder="Tell us about your facility, size, and cleaning needs..." rows={4} className="mt-1" />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="cs" required className="mt-1" />
            <Label htmlFor="cs" className="text-sm font-normal text-muted-foreground leading-snug">
              I agree to the <a href="#" className="text-brand underline">privacy policy</a> and consent to being contacted about my request.
            </Label>
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold h-12 text-base">
            {submitting ? "Sending..." : "Request Free Quote"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FloatingActions() {
  return (
    <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-6 z-30 flex flex-col gap-3">
      <a href={`https://wa.me/${BIZ.whatsapp}`} target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-elegant hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6" />
      </a>
      <a href={`tel:${BIZ.phoneHref}`} aria-label="Call"
        className="grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-elegant hover:scale-110 transition-transform">
        <Phone className="h-5 w-5" />
      </a>
      <a href={`mailto:${BIZ.email}`} aria-label="Email"
        className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy border shadow-elegant hover:scale-110 transition-transform">
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
            <p className="font-semibold">We value your privacy</p>
            <p className="text-sm text-white/70 mt-1">We use cookies to enhance your browsing experience and analyze traffic. You can accept, reject, or manage preferences.</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 hover:text-white">Manage</Button>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 hover:text-white">Reject</Button>
            <Button onClick={onClose} className="bg-[image:var(--gradient-cta)] text-navy hover:opacity-90 font-semibold">Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
