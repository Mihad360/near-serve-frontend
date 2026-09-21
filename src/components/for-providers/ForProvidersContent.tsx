"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProviderHeroVisual from "@/components/shared/hero/ProviderHeroVisual";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { ROUTES } from "@/utils/navigation";
import { 
  UserCheck, 
  MapPin, 
  Zap, 
  Wallet, 
  ShieldCheck, 
  Star, 
  Trophy, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  DollarSign
} from "lucide-react";

const PROVIDER_STEPS = [
  {
    num: "01",
    title: "Create your profile",
    desc: "List your skills, service area, and experience. Get verified with a trust badge that wins more client jobs.",
    icon: UserCheck,
    color: "text-blue-600 bg-blue-50",
  },
  {
    num: "02",
    title: "Get matched to nearby jobs",
    desc: "Our smart engine sends you relevant jobs in your neighborhood — no cold calls, no expensive advertising.",
    icon: MapPin,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    num: "03",
    title: "Submit competitive bids",
    desc: "Set your own price and schedule. Clients compare your verified trust score, reviews, and offer side by side.",
    icon: Zap,
    color: "text-amber-600 bg-amber-50",
  },
  {
    num: "04",
    title: "Complete the job. Get paid.",
    desc: "Customer pre-funds the job upfront. Once you finish and they approve, funds transfer immediately to you.",
    icon: Wallet,
    color: "text-rose-600 bg-rose-50",
  },
];

const BENEFITS = [
  {
    icon: MapPin,
    title: "Jobs in your neighborhood",
    desc: "Location-based matching keeps your travel time minimal so you can take more jobs daily.",
  },
  {
    icon: DollarSign,
    title: "You set your own rates",
    desc: "Bid what your time and expertise are worth with complete pricing freedom.",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed payment safety",
    desc: "Jobs are pre-funded before you start work. Zero chasing late invoices or unpaid balances.",
  },
  {
    icon: Star,
    title: "Growing reputation score",
    desc: "Every completed job and verified review increases your rank and leads to higher-paying requests.",
  },
  {
    icon: CheckCircle2,
    title: "Verified pro badge",
    desc: "Stand out from unregistered competition with an official NearServe verification badge.",
  },
  {
    icon: Trophy,
    title: "Leaderboard rewards",
    desc: "Top performers get priority placement, platform badges, and bonus exposure to clients.",
  },
];

const TESTIMONIALS = [
  {
    name: "Tariq H.",
    role: "Master Electrician · Gulshan",
    text: "I filled my entire week in 2 days. The job feed sends requests straight to my phone — I just submit my quote and start working.",
    rating: 5,
    initial: "TH",
  },
  {
    name: "Nadia I.",
    role: "Interior Painter · Mirpur",
    text: "Protected payments changed everything for my business. I never chase money anymore. Customer approves, funds hit my account right away.",
    rating: 5,
    initial: "NI",
  },
];

const REQUIREMENTS = [
  "Valid Government National ID for identity verification",
  "Proven skills & selected service categories",
  "Service coverage area mapped to your neighborhood",
  "Quick admin approval within 24–48 hours",
];

function StatsBar() {
  const { ref, inView } = useInView();
  const jobs = useCountUp(1240, inView);
  const providers = useCountUp(847, inView);
  const earned = useCountUp(48, inView);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-8 border-t border-white/10">
      {[
        { value: jobs, suffix: "+", label: "Active jobs this week" },
        { value: providers, suffix: "", label: "Providers online now" },
        { value: earned, suffix: "k+", label: "Avg. monthly earnings (৳)" },
      ].map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <div className="font-fraunces text-2xl md:text-4xl font-bold text-white tracking-tight">
            {stat.value.toLocaleString()}
            {stat.suffix}
          </div>
          <div className="text-[11px] md:text-xs text-white/60 mt-1 font-medium">
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
    <div className="bg-stone-100 rounded-3xl p-6 shadow-md overflow-hidden">
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between mb-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-soft" />
          <span className="text-sm font-bold text-ink">Live Job Feed</span>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 rounded-full px-3 py-1 font-semibold">
          12 new in your area
        </span>
      </div>

      <div className="space-y-3">
        {/* Active Highlighted Job Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-2 ring-brand/30 transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-bold text-ink text-base">
                Bathroom tiling & fixtures
              </div>
              <div className="text-xs text-muted flex items-center gap-1.5 mt-0.5 font-medium">
                <MapPin className="w-3 h-3 text-brand" />
                Mirpur, Section 10 · Posted 8 min ago
              </div>
            </div>
            <span className="text-xs bg-brand/10 text-brand rounded-full px-2.5 py-1 font-bold">
              3 bids so far
            </span>
          </div>
          
          <p className="text-xs text-muted leading-relaxed mb-4 bg-stone-50 p-2.5 rounded-xl">
            Need 40 sq ft tiled this weekend with fixture replacement. Client supplies the tiles.
          </p>
          
          {!bidPlaced ? (
            <button
              onClick={() => setBidPlaced(true)}
              className="w-full bg-brand text-white text-sm font-bold py-3 rounded-xl hover:bg-brand-dark transition-all duration-300 shadow-sm hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Submit your bid — ৳8,500</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 rounded-xl p-3.5 text-xs font-bold animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bid submitted: ৳8,500 · 2 days</span>
              </div>
              <button
                onClick={() => setBidPlaced(false)}
                className="text-stone-500 hover:text-stone-800 underline text-[11px]"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Other subtle jobs */}
        {[
          { title: "AC chemical servicing", loc: "Dhanmondi · 1.5 km", bids: 5, budget: "৳2,800" },
          { title: "Full apartment electrical wiring", loc: "Gulshan · 3.2 km", bids: 2, budget: "৳15,000" },
        ].map((job) => (
          <div
            key={job.title}
            className="bg-white/80 rounded-xl p-4 flex items-center justify-between hover:bg-white transition-colors duration-200"
          >
            <div>
              <div className="font-semibold text-sm text-ink">{job.title}</div>
              <div className="text-xs text-muted mt-0.5">{job.loc}</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-ink">{job.budget}</span>
              <div className="text-[11px] text-muted">{job.bids} offers</div>
            </div>
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
            <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
              840+ verified providers active & earning
            </div>

            <h1 className="animate-fade-up font-fraunces text-4xl md:text-6xl font-semibold leading-[1.08] tracking-tight hero-delay-1">
              Your skills.
              <br />
              <em className="not-italic text-brand">Local jobs.</em>
              <br />
              Guaranteed pay.
            </h1>

            <p className="animate-fade-up mt-5 text-lg text-white/70 max-w-xl leading-relaxed hero-delay-2">
              Stop waiting around for calls. Real clients send jobs directly to you.
              Quote on your terms, win fairly, and receive direct payments upon completion.
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap gap-3 hero-delay-3">
              <Link
                href={ROUTES.REGISTER}
                className="inline-flex items-center gap-2 bg-brand text-white text-sm font-bold px-7 py-4 rounded-full hover:bg-brand-dark transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand/30"
              >
                <span>Join as a verified provider</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.HOW_IT_WORKS}
                className="text-sm font-semibold text-white/80 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
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

      {/* 4 Steps - Soft stone cards */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-3.5 py-1 text-xs font-semibold text-warm mb-3">
            Fast onboarding
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl font-semibold text-ink">
            Start earning in 4 simple steps
          </h2>
          <p className="text-muted mt-3 text-base max-w-md mx-auto">
            From quick sign-up to your first direct payout
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROVIDER_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.num} delay={i * 120}>
                <div className="group bg-stone-100 hover:bg-white rounded-3xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-fraunces text-3xl font-bold text-stone-300 group-hover:text-brand transition-colors duration-300">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-fraunces text-xl font-semibold text-ink mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-stone-200/60 text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Step verified</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Live Job Feed Mock + Highlighted Benefits */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-360 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div>
              <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-3.5 py-1 text-xs font-semibold text-warm mb-4">
                Active Client Demand
              </div>
              <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink mb-4 leading-tight">
                Jobs come directly to you
              </h2>
              <p className="text-muted leading-relaxed mb-8 text-base">
                Open your feed anytime, view local requests matched to your exact trade skills, and submit competitive bids in seconds. No advertising fees, no cold calling.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {BENEFITS.slice(0, 4).map((b) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.title}
                      className="p-4 rounded-2xl bg-stone-100 flex items-start gap-3 hover:bg-stone-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand shrink-0 shadow-sm mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-ink">
                          {b.title}
                        </div>
                        <div className="text-xs text-muted mt-1 leading-snug">
                          {b.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <JobFeedMock />
          </ScrollReveal>
        </div>
      </section>

      {/* Full Benefits Grid - Soft stone cards */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-3.5 py-1 text-xs font-semibold text-warm mb-3">
            Why Partner With Us
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl font-semibold text-ink">
            Why top professionals choose NearServe
          </h2>
          <p className="text-muted mt-3 text-base max-w-md mx-auto">
            Everything you need to build a consistent, high-earning service business
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <ScrollReveal key={b.title} delay={i * 100}>
                <div className="p-7 rounded-3xl bg-stone-100 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand mb-5 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-fraunces text-xl font-semibold text-ink mb-2">
                      {b.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Testimonials - Soft Stone Cards */}
      <section className="py-16 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-3.5 py-1 text-xs font-semibold text-warm mb-3">
            Provider Stories
          </div>
          <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink">
            Hear from our top earning pros
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 150}>
              <div className="bg-stone-100 hover:bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-ink text-base leading-relaxed mb-6 font-medium">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-stone-200/60">
                  <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-ink">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted font-medium">{t.role}</div>
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
          <div className="rounded-3xl bg-ink text-white p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1 text-xs font-semibold text-white/80 mb-4">
                Verified Quality Standard
              </div>
              <h2 className="font-fraunces text-2xl md:text-4xl font-semibold mb-3 leading-tight">
                Getting approved is fast & straightforward
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                We review each applicant to maintain a trustworthy marketplace for customers and ensure steady, fair earnings for dedicated professionals.
              </p>
            </div>
            <ul className="space-y-3.5 bg-white/5 p-6 rounded-2xl border border-white/10">
              {REQUIREMENTS.map((req) => (
                <li key={req} className="flex items-center gap-3 text-sm font-medium text-white/90">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-12 max-w-360 mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-fraunces text-3xl md:text-5xl font-semibold text-ink mb-4">
              Ready to grow your local service business?
            </h2>
            <p className="text-muted mb-8 text-base leading-relaxed">
              Create your provider profile in 5 minutes. Start receiving and bidding on jobs in your neighborhood within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.REGISTER}
                className="inline-flex items-center gap-2 bg-brand text-white font-bold px-8 py-4 rounded-full hover:bg-brand-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand/30"
              >
                <span>Join as a provider</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.HOW_IT_WORKS}
                className="text-ink font-semibold px-8 py-4 rounded-full bg-stone-100 hover:bg-stone-200 transition-all duration-300"
              >
                How it works for clients
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
