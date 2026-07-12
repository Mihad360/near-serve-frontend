"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ServicesHeroVisual from "@/components/shared/hero/ServicesHeroVisual";
import { ROUTES } from "@/utils/navigation";

const CATEGORIES = [
  {
    icon: "🔧",
    name: "Plumbing",
    desc: "Leaks, pipes, fixtures & installations",
    jobs: 240,
    popular: true,
  },
  {
    icon: "⚡",
    name: "Electrical",
    desc: "Wiring, switches, fans & power issues",
    jobs: 180,
    popular: true,
  },
  {
    icon: "🎨",
    name: "Painting",
    desc: "Interior, exterior & touch-up work",
    jobs: 320,
    popular: true,
  },
  {
    icon: "❄️",
    name: "AC & Cooling",
    desc: "Installation, servicing & gas refill",
    jobs: 195,
    popular: true,
  },
  {
    icon: "🧹",
    name: "Cleaning",
    desc: "Home, office & deep cleaning",
    jobs: 410,
    popular: false,
  },
  {
    icon: "🪟",
    name: "Tiling & Flooring",
    desc: "Bathroom, kitchen & floor tiles",
    jobs: 155,
    popular: false,
  },
  {
    icon: "🪚",
    name: "Carpentry",
    desc: "Furniture, doors, cabinets & woodwork",
    jobs: 130,
    popular: false,
  },
  {
    icon: "🏗️",
    name: "Renovation",
    desc: "Full room makeovers & remodeling",
    jobs: 95,
    popular: false,
  },
  {
    icon: "🌿",
    name: "Gardening",
    desc: "Lawn care, plants & outdoor upkeep",
    jobs: 78,
    popular: false,
  },
  {
    icon: "📦",
    name: "Moving & Delivery",
    desc: "Furniture moves & local deliveries",
    jobs: 112,
    popular: false,
  },
  {
    icon: "🔩",
    name: "Appliance Repair",
    desc: "Fridge, washer, oven & more",
    jobs: 88,
    popular: false,
  },
  {
    icon: "🛡️",
    name: "Security & CCTV",
    desc: "Camera setup, locks & alarms",
    jobs: 64,
    popular: false,
  },
];

const POPULAR_SEARCHES = [
  "Fix leaking tap",
  "AC not cooling",
  "Paint my bedroom",
  "Install ceiling fan",
  "Bathroom tiling",
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
        <div className="absolute top-24 right-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 bg-white border border-border rounded-full px-3.5 py-1.5 text-xs font-medium text-warm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
              50+ categories · 847 providers online
            </div>

            <h1 className="animate-fade-up font-fraunces text-4xl md:text-6xl font-semibold text-ink leading-[1.08] tracking-tight hero-delay-1">
              Browse
              <br />
              <em className="not-italic text-brand">every service</em>
              <br />
              you need
            </h1>

            <p className="animate-fade-up mt-5 text-lg text-muted max-w-xl leading-relaxed hero-delay-2">
              From plumbing to painting — find verified local pros for any job.
              Post once, get competing bids, pick the best.
            </p>

            {/* Search */}
            <div className="animate-fade-up mt-8 hero-delay-3">
              <div className="flex items-center gap-3 bg-white border-[1.5px] border-border rounded-2xl px-4 py-3.5 focus-within:border-brand transition-colors duration-500 shadow-[0_4px_20px_rgba(26,18,8,0.06)]">
                <svg
                  className="text-muted shrink-0"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  className="border-none outline-none text-sm text-ink bg-transparent flex-1 placeholder:text-muted"
                  placeholder="Search services... e.g. plumbing, AC repair"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="text-[11px] bg-white border border-border rounded-full px-3 py-1.5 text-muted hover:border-brand hover:text-brand transition-all duration-400"
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
      <section className="px-6 md:px-12 max-w-360 mx-auto pb-6">
        <ScrollReveal>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-500 ${
                activeCategory === null
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-warm border-border hover:border-ink"
              }`}
            >
              All services
            </button>
            {CATEGORIES.filter((c) => c.popular).map((c) => (
              <button
                key={c.name}
                onClick={() =>
                  setActiveCategory(activeCategory === c.name ? null : c.name)
                }
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-all duration-500 ${
                  activeCategory === c.name
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-warm border-border hover:border-brand"
                }`}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Category grid */}
      <section className="py-12 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="mb-10">
          <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-ink">
            {search || activeCategory ? "Search results" : "All service categories"}
          </h2>
          <p className="text-muted mt-2 text-sm">
            {filtered.length} categor{filtered.length === 1 ? "y" : "ies"} available
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 120}>
              <Link
                href={ROUTES.CUSTOMER_POST_JOB}
                className="group block bg-white rounded-2xl p-6 border border-border h-full hover:border-brand/40 hover:shadow-[0_12px_40px_rgba(26,18,8,0.08)] transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-500">
                    {cat.icon}
                  </div>
                  {cat.popular && (
                    <span className="text-[10px] bg-brand/10 text-brand border border-brand/20 rounded-full px-2 py-0.5 font-semibold">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="font-fraunces text-lg font-semibold text-ink mb-1 group-hover:text-brand transition-colors duration-400">
                  {cat.name}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {cat.desc}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{cat.jobs}+ jobs posted</span>
                  <span className="text-brand font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    Post job →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            No services found. Try a different search term.
          </div>
        )}
      </section>

      {/* How to book */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-border">
        <div className="max-w-360 mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink">
              Book any service in 3 steps
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Pick a category",
                desc: "Choose the service you need or describe it in your own words.",
              },
              {
                step: "2",
                title: "Get competing bids",
                desc: "Verified providers near you submit their best offers.",
              },
              {
                step: "3",
                title: "Hire with confidence",
                desc: "Compare bids, pick a pro, pay safely through escrow.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 200}>
                <div className="text-center p-8 rounded-2xl bg-cream border border-border">
                  <div className="w-10 h-10 rounded-full bg-brand text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                    {item.step}
                  </div>
                  <h3 className="font-fraunces text-lg font-semibold text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400} className="text-center mt-10">
            <Link
              href={ROUTES.HOW_IT_WORKS}
              className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors duration-400"
            >
              Learn more about how it works →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="bg-ink rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,10,36,0.2)_0%,transparent_65%)]" />
            <div className="relative z-10">
              <h2 className="font-fraunces text-3xl md:text-4xl font-semibold mb-4">
                Can&apos;t find your service?
              </h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Describe what you need in plain words — our AI will match you
                with the right providers anyway.
              </p>
              <Link
                href={ROUTES.CUSTOMER_POST_JOB}
                className="inline-block bg-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-dark transition-all duration-500 hover:scale-105"
              >
                Post a custom job — free →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
