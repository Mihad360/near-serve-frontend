"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProviderHeroVisual from "@/components/shared/hero/ProviderHeroVisual";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { ROUTES } from "@/utils/navigation";

const PROVIDER_STEPS = [
  {
    num: "01",
    title: "Create your profile",
    desc: "List your skills, service area, and experience. Get admin-verified for a trust badge that wins more jobs.",
    icon: "👤",
  },
  {
    num: "02",
    title: "Get matched to nearby jobs",
    desc: "Our AI sends you relevant jobs in your area — no cold outreach, no waiting for the phone to ring.",
    icon: "📍",
  },
  {
    num: "03",
    title: "Submit your best bid",
    desc: "Set your price and timeline. Compete fairly — customers see your trust score, reviews, and offer side by side.",
    icon: "⚡",
  },
  {
    num: "04",
    title: "Do the work. Get paid.",
    desc: "Complete the job, customer approves, escrow releases instantly. No chasing invoices.",
    icon: "💰",
  },
];

const BENEFITS = [
  {
    icon: "📍",
    title: "Jobs near you",
    desc: "Location-based matching — work in your area",
  },
  {
    icon: "💬",
    title: "You set the price",
    desc: "Bid what the job is worth to you",
  },
  {
    icon: "🔒",
    title: "Guaranteed payment",
    desc: "Escrow means no payment chasing",
  },
  {
    icon: "⭐",
    title: "Growing trust score",
    desc: "Real completion data builds your reputation",
  },
  {
    icon: "✅",
    title: "Admin verified",
    desc: "Stand out with a verified provider badge",
  },
  {
    icon: "📈",
    title: "Leaderboard rewards",
    desc: "Top performers get more visibility",
  },
];

const TESTIMONIALS = [
  {
    name: "Tariq H.",
    role: "Electrician · Gulshan",
    text: "I filled my entire week in 2 days. The job feed sends work straight to me — I just bid and go.",
    rating: 5,
  },
  {
    name: "Nadia I.",
    role: "Painter · Mirpur",
    text: "Escrow changed everything. I never chase payment anymore. Customer approves, money hits my account.",
    rating: 5,
  },
];

const REQUIREMENTS = [
  "Valid ID for verification",
  "Skills & service categories",
  "Service area on map",
  "Admin approval within 24–48 hrs",
];

function StatsBar() {
  const { ref, inView } = useInView();
  const jobs = useCountUp(1240, inView);
  const providers = useCountUp(847, inView);
  const earned = useCountUp(48, inView);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4 md:gap-8 mt-12">
      {[
        { value: jobs, suffix: "+", label: "Active jobs this week" },
        { value: providers, suffix: "", label: "Providers online now" },
        { value: earned, suffix: "L+", label: "Avg. monthly earnings (৳)" },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="font-fraunces text-2xl md:text-4xl font-bold text-white">
            {stat.value.toLocaleString()}
            {stat.suffix}
          </div>
          <div className="text-[11px] md:text-xs text-white/60 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function JobFeedMock() {
  const [bidPlaced, setBidPlaced] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-[0_12px_48px_rgba(26,18,8,0.1)] overflow-hidden">
      <div className="bg-cream border-b border-border px-5 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">Job Feed</span>
        <span className="text-[11px] bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5 font-semibold">
          12 new near you
        </span>
      </div>

      <div className="p-5 space-y-3">
        <div className="border-2 border-brand rounded-xl p-4 bg-brand/5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-semibold text-ink text-sm">
                Bathroom tiling
              </div>
              <div className="text-xs text-muted">
                Mirpur · Posted 12 min ago
              </div>
            </div>
            <span className="text-[10px] bg-brand text-white rounded-full px-2 py-0.5 font-semibold">
              3 bids
            </span>
          </div>
          <p className="text-xs text-muted mb-3">
            Need 40 sq ft tiled this weekend. Materials provided.
          </p>
          {!bidPlaced ? (
            <button
              onClick={() => setBidPlaced(true)}
              className="w-full bg-brand text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-brand-dark transition-colors"
            >
              Place your bid →
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-green-700 text-sm font-semibold animate-scale-in">
              <span>✓</span> Bid submitted — ৳8,500 · 2 days
            </div>
          )}
        </div>

        {[
          { title: "AC installation", loc: "Dhanmondi", bids: 5 },
          { title: "Plumbing repair", loc: "Gulshan", bids: 2 },
        ].map((job) => (
          <div
            key={job.title}
            className="border border-border rounded-xl p-4 opacity-60"
          >
            <div className="flex justify-between">
              <div className="font-medium text-sm text-ink">{job.title}</div>
              <span className="text-[10px] text-muted">{job.bids} bids</span>
            </div>
            <div className="text-xs text-muted mt-0.5">{job.loc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ForProvidersContent() {
  return (
    <div className="bg-cream min-h-screen overflow-x-hidden">
      {/* Dark hero */}
      <section className="relative bg-ink text-white pt-28 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_55%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-360 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
              847 providers earning right now
            </div>

            <h1 className="animate-fade-up font-fraunces text-4xl md:text-6xl font-semibold leading-[1.08] tracking-tight hero-delay-1">
              Your skills.
              <br />
              <em className="not-italic text-brand">Local jobs.</em>
              <br />
              Fair pay.
            </h1>

            <p className="animate-fade-up mt-5 text-lg text-white/70 max-w-xl leading-relaxed hero-delay-2">
              Stop waiting for calls. Jobs come to you — bid on what you want,
              win on your terms, and get paid through secure escrow.
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap gap-3 hero-delay-3">
              <Link
                href={ROUTES.PROVIDER_ONBOARDING}
                className="bg-brand text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-brand-dark transition-all duration-500 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(199,10,36,0.45)]"
              >
                Start earning — join free →
              </Link>
              <Link
                href={ROUTES.HOW_IT_WORKS}
                className="text-sm font-medium text-white/80 px-6 py-3.5 rounded-full border border-white/25 hover:bg-white/10 transition-all duration-500"
              >
                Need a service instead?
              </Link>
            </div>

            <div className="hidden md:block">
              <StatsBar />
            </div>
          </div>

          <div className="animate-fade-in hero-delay-4">
            <ProviderHeroVisual />
          </div>
        </div>

        <div className="relative z-10 max-w-360 mx-auto md:hidden mt-10">
          <StatsBar />
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-fraunces text-3xl md:text-5xl font-semibold text-ink">
            Start earning in 4 steps
          </h2>
          <p className="text-muted mt-3 text-lg">
            From signup to first payment
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROVIDER_STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 180}>
              <div className="group bg-white rounded-2xl p-6 border border-border h-full hover:border-brand/40 hover:shadow-[0_12px_40px_rgba(26,18,8,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="font-fraunces text-3xl font-bold text-brand/15 group-hover:text-brand/30 transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-fraunces text-lg font-semibold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Job feed mock + benefits */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-border">
        <div className="max-w-360 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink mb-4">
                Jobs come to you
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Open your feed, see nearby jobs matched to your skills, and
                place bids in seconds. No marketing spend. No cold calls.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {BENEFITS.slice(0, 4).map((b) => (
                  <div
                    key={b.title}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-cream border border-border"
                  >
                    <span className="text-lg shrink-0">{b.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        {b.title}
                      </div>
                      <div className="text-[11px] text-muted mt-0.5">
                        {b.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <JobFeedMock />
          </ScrollReveal>
        </div>
      </section>

      {/* Full benefits grid */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink">
            Why providers choose NearServe
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 150}>
              <div className="p-6 rounded-2xl border border-border bg-white hover:shadow-[0_8px_32px_rgba(26,18,8,0.06)] transition-shadow">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-ink mb-1">{b.title}</h3>
                <p className="text-sm text-muted">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="text-center mb-10">
          <h2 className="font-fraunces text-3xl font-semibold text-ink">
            Providers love it
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 200}>
              <div className="bg-white rounded-2xl p-7 border border-border">
                <div className="text-yellow-400 mb-3 text-sm">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-ink leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-ink">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="rounded-3xl bg-ink text-white p-10 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-fraunces text-2xl md:text-3xl font-semibold mb-3">
                Getting started is easy
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                We verify every provider to keep the platform safe for customers
                and fair for pros like you.
              </p>
            </div>
            <ul className="space-y-3">
              {REQUIREMENTS.map((req) => (
                <li key={req} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-brand/30 border border-brand/50 flex items-center justify-center text-brand text-xs shrink-0">
                    ✓
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink mb-4">
              Ready to grow your business?
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Join free today. Start bidding on jobs near you within 24 hours of
              approval.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.PROVIDER_ONBOARDING}
                className="bg-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-dark transition-all hover:scale-105 shadow-[0_4px_24px_rgba(199,10,36,0.3)]"
              >
                Join as a provider — free →
              </Link>
              <Link
                href={ROUTES.HOW_IT_WORKS}
                className="text-warm font-medium px-8 py-4 rounded-full border border-border-warm hover:bg-white transition-all"
              >
                How it works for customers
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
