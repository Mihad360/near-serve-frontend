"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import CustomerHeroVisual from "@/components/shared/hero/CustomerHeroVisual";
import { ROUTES } from "@/utils/navigation";

const STEPS = [
  {
    num: "01",
    title: "Describe your job",
    desc: "Tell us what you need in plain words — no long forms. Our AI understands natural language and finds the right category instantly.",
    visual: "search" as const,
  },
  {
    num: "02",
    title: "Providers compete with bids",
    desc: "Verified local pros near you see your job and submit their best offer — price, timeline, and message included.",
    visual: "bids" as const,
  },
  {
    num: "03",
    title: "You pick. We protect.",
    desc: "Compare bids by price, trust score, and reviews. Pay into escrow. Release funds only when you're 100% satisfied.",
    visual: "escrow" as const,
  },
];

const ESCROW_STEPS = [
  { icon: "💳", label: "You fund escrow", sub: "Secure payment held" },
  { icon: "🔒", label: "Work gets done", sub: "Provider completes job" },
  { icon: "✅", label: "You approve", sub: "Inspect the result" },
  { icon: "💰", label: "Provider paid", sub: "Instant release" },
];

const COMPARISON = {
  old: [
    "Scroll endless profiles",
    "Guess who's reliable",
    "Pay upfront, hope for best",
  ],
  new: [
    "Describe once in plain words",
    "Compare real competing bids",
    "Escrow until you're happy",
  ],
};

function SearchMock() {
  const text = "I need my bathroom tiled this weekend in Mirpur...";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 70);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="bg-cream border-[1.5px] border-border rounded-2xl p-4 shadow-[0_8px_32px_rgba(26,18,8,0.08)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
          AI matching active
        </span>
      </div>
      <div className="bg-white border border-border rounded-xl px-4 py-3 text-sm text-ink min-h-[44px]">
        {displayed}
        <span className="inline-block w-0.5 h-4 bg-brand ml-0.5 animate-pulse align-middle" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Tiling", "Mirpur", "This weekend"].map((tag) => (
          <span
            key={tag}
            className="text-[11px] bg-white border border-border rounded-full px-2.5 py-1 text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BidsMock() {
  const bids = [
    {
      name: "Ahmed K.",
      price: "৳8,500",
      time: "2 days",
      trust: 94,
      highlight: true,
    },
    {
      name: "Karim M.",
      price: "৳9,200",
      time: "1 day",
      trust: 97,
      highlight: false,
    },
    {
      name: "Sara R.",
      price: "৳7,800",
      time: "3 days",
      trust: 88,
      highlight: false,
    },
  ];

  return (
    <div className="space-y-2.5">
      {bids.map((bid, i) => (
        <div
          key={bid.name}
          className={`rounded-xl px-4 py-3 border flex items-center justify-between transition-all duration-500 ${
            bid.highlight
              ? "bg-brand text-white border-brand shadow-lg scale-[1.02]"
              : "bg-white border-border"
          }`}
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                bid.highlight ? "bg-white/20" : "bg-brand text-white"
              }`}
            >
              {bid.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="text-sm font-semibold">{bid.name}</div>
              <div
                className={`text-[11px] ${bid.highlight ? "text-white/80" : "text-muted"}`}
              >
                Trust {bid.trust} · {bid.time}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold">{bid.price}</div>
            {bid.highlight && (
              <div className="text-[10px] text-white/80">Best value</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function EscrowMock() {
  return (
    <div className="bg-ink rounded-2xl p-5 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(199,10,36,0.25)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-white/60 uppercase tracking-wider">
            Escrow status
          </span>
          <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2.5 py-0.5 font-semibold">
            Protected
          </span>
        </div>
        <div className="text-2xl font-fraunces font-bold mb-1">৳8,500</div>
        <div className="text-sm text-white/60 mb-5">
          Held safely until you approve
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-brand rounded-full animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%] bg-gradient-to-r from-brand via-red-400 to-brand" />
        </div>
        <div className="mt-4 flex justify-between text-[11px] text-white/50">
          <span>Job started</span>
          <span>Awaiting your approval</span>
        </div>
      </div>
    </div>
  );
}

function StepVisual({ type }: { type: "search" | "bids" | "escrow" }) {
  if (type === "search") return <SearchMock />;
  if (type === "bids") return <BidsMock />;
  return <EscrowMock />;
}

export default function HowItWorksContent() {
  return (
    <div className="bg-cream min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 md:px-12 max-w-360 mx-auto">
        <div className="absolute top-20 right-0 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-brand/8 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 bg-white border border-border rounded-full px-3.5 py-1.5 text-xs font-medium text-warm mb-6">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse-soft" />
              Simple · Safe · Local
            </div>

            <h1 className="animate-fade-up font-fraunces text-4xl md:text-6xl font-semibold text-ink leading-[1.08] tracking-tight hero-delay-1">
              How NearServe
              <br />
              <em className="not-italic text-brand">Works</em> for you
            </h1>

            <p className="animate-fade-up mt-5 text-lg text-muted max-w-xl leading-relaxed hero-delay-2">
              Post a job in plain words. Let verified local providers compete.
              Pick the best bid — your money stays in escrow until you&apos;re
              happy.
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap gap-3 hero-delay-3">
              <Link
                href={ROUTES.REGISTER}
                className="bg-brand text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-brand-dark transition-all duration-500 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(199,10,36,0.3)]"
              >
                Get started →
              </Link>
              <Link
                href={ROUTES.FOR_PROVIDERS}
                className="text-sm font-medium text-warm px-6 py-3.5 rounded-full border-[1.5px] border-border-warm hover:border-ink hover:bg-white transition-all duration-500"
              >
                I&apos;m a provider →
              </Link>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in hero-delay-4">
            <CustomerHeroVisual />
          </div>
        </div>
      </section>

      {/* Timeline steps */}
      <section className="py-16 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-fraunces text-3xl md:text-5xl font-semibold text-ink">
            Three steps. Two minutes.
          </h2>
          <p className="text-muted mt-3 text-lg">
            No searching. No guessing. Just results.
          </p>
        </ScrollReveal>

        <div className="space-y-20 md:space-y-28">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.num} delay={index * 180}>
              <div
                className={`flex flex-col gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-fraunces text-5xl font-bold text-brand/20 leading-none">
                      {step.num}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-fraunces text-2xl md:text-3xl font-semibold text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-base md:text-lg max-w-lg">
                    {step.desc}
                  </p>
                </div>
                <div className="flex-1 w-full max-w-md">
                  <StepVisual type={step.visual} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Escrow flow */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-border">
        <div className="max-w-360 mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink">
              Your money is always protected
            </h2>
            <p className="text-muted mt-3">
              Escrow built into every single job
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {ESCROW_STEPS.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 200}>
                <div className="relative text-center p-6 rounded-2xl bg-cream border border-border hover:shadow-[0_8px_32px_rgba(26,18,8,0.08)] transition-shadow">
                  {i === 1 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand animate-pulse-soft" />
                  )}
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-semibold text-ink text-sm">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted mt-1">{item.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 border border-border bg-white/50">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                The old way
              </div>
              <ul className="space-y-3">
                {COMPARISON.old.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="text-red-400 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl p-8 border-2 border-brand bg-white shadow-[0_8px_40px_rgba(199,10,36,0.1)]">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand mb-4">
                The NearServe way
              </div>
              <ul className="space-y-3">
                {COMPARISON.new.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ink font-medium"
                  >
                    <span className="text-green-500 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Social proof */}
      <section className="py-16 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="bg-ink rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,10,36,0.2)_0%,transparent_65%)]" />
            <div className="relative z-10">
              <div className="font-fraunces text-5xl md:text-6xl font-bold mb-2">
                4,800+
              </div>
              <div className="text-white/70 mb-6">
                jobs completed safely on NearServe
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9 average rating</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink mb-4">
              Ready to get it done?
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Create an account, post a job, and providers start bidding within
              minutes. Escrow keeps payment safe.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.REGISTER}
                className="bg-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-dark transition-all hover:scale-105"
              >
                Get started →
              </Link>
              <Link
                href={ROUTES.FOR_PROVIDERS}
                className="text-warm font-medium px-8 py-4 rounded-full border border-border-warm hover:bg-white transition-all"
              >
                Earn as a provider
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
