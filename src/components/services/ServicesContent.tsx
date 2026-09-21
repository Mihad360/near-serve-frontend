"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ServicesHeroVisual from "@/components/shared/hero/ServicesHeroVisual";
import { ROUTES } from "@/utils/navigation";
import { 
  Wrench, 
  Zap, 
  Palette, 
  Wind, 
  Sparkles, 
  Grid3X3, 
  Hammer, 
  Home, 
  Trees, 
  Truck, 
  Tv, 
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const CATEGORIES = [
  {
    icon: Wrench,
    emoji: "🔧",
    name: "Plumbing",
    desc: "Leaks, pipes, fixtures, water heater & installations",
    jobs: 240,
    popular: true,
    color: "from-blue-500/10 to-blue-600/5 text-blue-600",
  },
  {
    icon: Zap,
    emoji: "⚡",
    name: "Electrical",
    desc: "Wiring, switches, fans, circuit breakers & power issues",
    jobs: 180,
    popular: true,
    color: "from-amber-500/10 to-amber-600/5 text-amber-600",
  },
  {
    icon: Palette,
    emoji: "🎨",
    name: "Painting",
    desc: "Interior, exterior, texture & touch-up wall work",
    jobs: 320,
    popular: true,
    color: "from-purple-500/10 to-purple-600/5 text-purple-600",
  },
  {
    icon: Wind,
    emoji: "❄️",
    name: "AC & Cooling",
    desc: "Installation, chemical servicing, compressor & gas refill",
    jobs: 195,
    popular: true,
    color: "from-cyan-500/10 to-cyan-600/5 text-cyan-600",
  },
  {
    icon: Sparkles,
    emoji: "🧹",
    name: "Cleaning",
    desc: "Deep home cleaning, office sanitizing & sofa care",
    jobs: 410,
    popular: true,
    color: "from-emerald-500/10 to-emerald-600/5 text-emerald-600",
  },
  {
    icon: Grid3X3,
    emoji: "🪟",
    name: "Tiling & Flooring",
    desc: "Bathroom, kitchen, marble polishing & tile grout",
    jobs: 155,
    popular: false,
    color: "from-orange-500/10 to-orange-600/5 text-orange-600",
  },
  {
    icon: Hammer,
    emoji: "🪚",
    name: "Carpentry",
    desc: "Custom furniture, doors, kitchen cabinets & woodwork",
    jobs: 130,
    popular: false,
    color: "from-amber-600/10 to-amber-700/5 text-amber-700",
  },
  {
    icon: Home,
    emoji: "🏗️",
    name: "Renovation",
    desc: "Full room makeovers, false ceilings & civil remodeling",
    jobs: 95,
    popular: false,
    color: "from-rose-500/10 to-rose-600/5 text-rose-600",
  },
  {
    icon: Trees,
    emoji: "🌿",
    name: "Gardening",
    desc: "Lawn care, terrace garden, plants & landscaping",
    jobs: 78,
    popular: false,
    color: "from-green-500/10 to-green-600/5 text-green-600",
  },
  {
    icon: Truck,
    emoji: "📦",
    name: "Moving & Delivery",
    desc: "House shifting, heavy furniture moves & local transport",
    jobs: 112,
    popular: false,
    color: "from-indigo-500/10 to-indigo-600/5 text-indigo-600",
  },
  {
    icon: Tv,
    emoji: "🔩",
    name: "Appliance Repair",
    desc: "Refrigerator, washing machine, microwave & ovens",
    jobs: 88,
    popular: false,
    color: "from-teal-500/10 to-teal-600/5 text-teal-600",
  },
  {
    icon: ShieldCheck,
    emoji: "🛡️",
    name: "Security & CCTV",
    desc: "Camera installation, smart locks & burglar alarms",
    jobs: 64,
    popular: false,
    color: "from-sky-500/10 to-sky-600/5 text-sky-600",
  },
];

const POPULAR_SEARCHES = [
  "Fix leaking tap",
  "AC not cooling",
  "Paint my bedroom",
  "Install ceiling fan",
  "Bathroom tiling",
  "Deep home clean",
];

export default function ServicesContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = CATEGORIES.filter((c) => {
    const matchesSearch =
      !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !activeCategory || c.name === activeCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-cream min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 md:px-12 max-w-360 mx-auto">
        <div className="absolute top-24 right-10 w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 bg-stone-100 rounded-full px-4 py-1.5 text-xs font-semibold text-warm mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
              50+ categories · 840+ verified local providers
            </div>

            <h1 className="animate-fade-up font-fraunces text-4xl md:text-6xl font-semibold text-ink leading-[1.08] tracking-tight hero-delay-1">
              Browse
              <br />
              <em className="not-italic text-brand">every service</em>
              <br />
              you need
            </h1>

            <p className="animate-fade-up mt-5 text-lg text-muted max-w-xl leading-relaxed hero-delay-2">
              From plumbing fixes to complete home makeovers — discover verified local pros.
              Post once, receive competitive bids, and pay only when satisfied.
            </p>

            {/* Search */}
            <div className="animate-fade-up mt-8 hero-delay-3">
              <div className="flex items-center gap-3 bg-stone-100 rounded-2xl px-4 py-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/20 transition-all duration-300 shadow-sm">
                <Search className="text-muted shrink-0 w-5 h-5" />
                <input
                  className="border-none outline-none text-sm text-ink bg-transparent flex-1 placeholder:text-muted/70 font-medium"
                  placeholder="Search services... e.g. plumbing, AC repair, painting"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-xs text-muted hover:text-ink font-semibold px-2 py-1 rounded-md bg-stone-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-muted/70 py-1 font-medium">Quick search:</span>
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="text-[12px] bg-stone-100 rounded-full px-3 py-1 text-muted hover:text-brand hover:bg-stone-200 transition-all duration-200 font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in hero-delay-4">
            <ServicesHeroVisual />
          </div>
        </div>
      </section>

      {/* Popular categories filter */}
      <section className="px-6 md:px-12 max-w-360 mx-auto pb-4">
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === null
                  ? "bg-ink text-white shadow-sm"
                  : "bg-stone-100 text-warm hover:bg-stone-200"
              }`}
            >
              All services ({CATEGORIES.length})
            </button>
            {CATEGORIES.filter((c) => c.popular).map((c) => (
              <button
                key={c.name}
                onClick={() =>
                  setActiveCategory(activeCategory === c.name ? null : c.name)
                }
                className={`text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === c.name
                    ? "bg-brand text-white shadow-sm"
                    : "bg-stone-100 text-warm hover:bg-stone-200"
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Category grid */}
      <section className="py-10 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-ink">
              {search || activeCategory ? "Matching Services" : "All Service Categories"}
            </h2>
            <p className="text-muted mt-1 text-sm">
              Showing {filtered.length} service categor{filtered.length === 1 ? "y" : "ies"}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.name} delay={i * 60}>
                <Link
                  href={ROUTES.CUSTOMER_POST_JOB}
                  className="group block bg-stone-100 hover:bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {cat.popular && (
                        <span className="text-[11px] bg-brand/10 text-brand rounded-full px-2.5 py-0.5 font-bold">
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className="font-fraunces text-xl font-semibold text-ink mb-1.5 group-hover:text-brand transition-colors duration-200">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-200/60 text-xs font-semibold">
                    <span className="text-muted/80">{cat.jobs}+ jobs posted</span>
                    <span className="text-brand flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      Post job <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-stone-100 rounded-3xl p-8 max-w-xl mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-fraunces text-xl font-semibold text-ink mb-2">No matching services found</h3>
            <p className="text-muted text-sm mb-6">
              Don&apos;t worry! You can describe what you need in your own words and our smart matching engine will connect you with qualified providers.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setSearch(""); setActiveCategory(null); }}
                className="px-5 py-2.5 bg-stone-200 text-ink rounded-full text-sm font-semibold hover:bg-stone-300 transition-colors"
              >
                Clear filters
              </button>
              <Link
                href={ROUTES.CUSTOMER_POST_JOB}
                className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
              >
                Post custom job →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* How to book - Soft stone cards */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-360 mx-auto">
          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-3.5 py-1 text-xs font-semibold text-warm mb-4">
              Simple & transparent
            </div>
            <h2 className="font-fraunces text-3xl md:text-5xl font-semibold text-ink">
              Book any service in 3 steps
            </h2>
            <p className="text-muted mt-3 text-base max-w-lg mx-auto">
              Get quality work done by verified local pros with complete peace of mind.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Pick your category",
                desc: "Choose the service you need or simply describe your issue in plain language.",
              },
              {
                step: "02",
                title: "Receive competing bids",
                desc: "Verified providers in your area submit detailed quotes and timelines.",
              },
              {
                step: "03",
                title: "Safe payment guarantee",
                desc: "Compare offers, select the top pro, and pay only after you inspect and approve the job.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 150}>
                <div className="p-8 rounded-3xl bg-stone-100 hover:bg-stone-50 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="font-fraunces text-3xl font-bold text-brand mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-fraunces text-xl font-semibold text-ink mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Simple & verified</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300} className="text-center mt-12">
            <Link
              href={ROUTES.HOW_IT_WORKS}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-dark transition-colors duration-300"
            >
              See detailed step-by-step walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="bg-ink rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,10,36,0.25)_0%,transparent_65%)]" />
            <div className="relative z-10">
              <h2 className="font-fraunces text-3xl md:text-4xl font-semibold mb-4">
                Can&apos;t find your exact service?
              </h2>
              <p className="text-white/75 mb-8 max-w-md mx-auto text-base">
                Describe what you need in plain words — our smart matching automatically connects you with the right verified specialists.
              </p>
              <Link
                href={ROUTES.REGISTER}
                className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand/30"
              >
                <span>Get started — post a job</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
