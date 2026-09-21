"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import CustomerHeroVisual from "@/components/shared/hero/CustomerHeroVisual";
import { ROUTES } from "@/utils/navigation";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Star,
  Search,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Describe what you need",
    desc: "Tell us what needs fixing in your own simple words — no complicated forms. Our AI automatically understands the task, urgency, and finds the right local category.",
    visual: "search" as const,
  },
  {
    num: "02",
    title: "Verified pros send their best offers",
    desc: "Admin-vetted local specialists near you review your task and submit clear, upfront prices with estimated timelines.",
    visual: "bids" as const,
  },
  {
    num: "03",
    title: "You approve. Payment is protected.",
    desc: "Compare offers by price, trust score, and real reviews. Your payment is held safely until you inspect the work and confirm 100% satisfaction.",
    visual: "payment_safety" as const,
  },
];

const SAFETY_STEPS = [
  {
    icon: Lock,
    label: "Payment Secured",
    sub: "Held safely when you accept a bid",
  },
  {
    icon: Zap,
    label: "Work Gets Done",
    sub: "Provider arrives & completes job",
  },
  {
    icon: CheckCircle2,
    label: "You Inspect & Test",
    sub: "Ensure everything works perfectly",
  },
  {
    icon: ShieldCheck,
    label: "Instant Payout",
    sub: "Funds released upon your approval",
  },
];

const COMPARISON = {
  old: [
    "Calling dozens of unknown contacts",
    "No way to verify real skill or background",
    "Paying advance cash with zero guarantees",
    "Unclear pricing and endless haggling",
  ],
  new: [
    "Describe once in simple everyday words",
    "100% government ID & skill vetted providers",
    "Pay only after inspecting completed work",
    "Transparent competitive bids in minutes",
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
    }, 60);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="bg-stone-100 rounded-3xl p-6 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] font-bold text-[#6b5244] uppercase tracking-wider">
          AI task parser active
        </span>
      </div>
      <div className="bg-white rounded-2xl px-4 py-3.5 text-sm text-[#1a1208] min-h-[48px] shadow-2xs">
        {displayed}
        <span className="inline-block w-0.5 h-4 bg-[#C70A24] ml-0.5 animate-pulse align-middle" />
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {["Tiling & Floor", "Mirpur", "Urgent / This Weekend"].map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-semibold bg-white rounded-full px-3 py-1 text-[#4a3728] shadow-2xs"
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
    <div className="space-y-3">
      {bids.map((bid) => (
        <div
          key={bid.name}
          className={`rounded-2xl px-5 py-4 flex items-center justify-between transition-all duration-300 ${
            bid.highlight
              ? "bg-[#C70A24] text-white shadow-lg scale-102"
              : "bg-stone-100 text-[#1a1208] hover:bg-white shadow-xs"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                bid.highlight ? "bg-white/20 text-white" : "bg-[#1a1208] text-white"
              }`}
            >
              {bid.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="text-sm font-bold">{bid.name}</div>
              <div
                className={`text-xs ${bid.highlight ? "text-white/80" : "text-[#6b5244]"}`}
              >
                Trust {bid.trust} · {bid.time}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-base font-bold font-fraunces">{bid.price}</div>
            {bid.highlight && (
              <div className="text-[10px] text-white/90 font-semibold">Recommended</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PaymentSafetyMock() {
  return (
    <div className="bg-[#1a1208] rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(199,10,36,0.25)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-white/70 uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> Payment Protection
          </span>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 rounded-full px-3 py-1 font-bold">
            100% Protected
          </span>
        </div>
        <div className="text-3xl font-fraunces font-bold mb-1">৳8,500</div>
        <div className="text-xs text-white/70 mb-5">
          Held safely until you inspect & approve
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-[#C70A24] rounded-full animate-pulse" />
        </div>
        <div className="mt-4 flex justify-between text-[11px] font-medium text-white/60">
          <span>Job In Progress</span>
          <span className="text-emerald-400 font-bold">Awaiting Your Approval</span>
        </div>
      </div>
    </div>
  );
}

function StepVisual({ type }: { type: "search" | "bids" | "payment_safety" }) {
  if (type === "search") return <SearchMock />;
  if (type === "bids") return <BidsMock />;
  return <PaymentSafetyMock />;
}

export default function HowItWorksContent() {
  return (
    <div className="bg-[#FAF6EF] min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#C70A24]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-4 py-1.5 text-xs font-semibold text-[#4a3728] mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Simple · Safe · Local
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1a1208] leading-[1.08] tracking-tight">
              How NearServe
              <br />
              <em className="not-italic text-[#C70A24]">Works</em> for you
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#6b5244] max-w-xl leading-relaxed">
              Post a job in plain words. Receive competitive offers from verified local pros. Pick the best bid — your payment is 100% protected until the work is done right.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href={ROUTES.REGISTER}
                className="bg-[#C70A24] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#a50820] transition-all duration-300 hover:-translate-y-0.5 shadow-md flex items-center gap-2"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.FOR_PROVIDERS}
                className="text-sm font-semibold text-[#1a1208] px-6 py-3.5 rounded-full bg-stone-100 hover:bg-white shadow-xs transition-all duration-300"
              >
                Earn as a provider →
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <CustomerHeroVisual />
          </div>
        </div>
      </section>

      {/* Timeline steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C70A24] bg-stone-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            3 Simple Steps
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1208]">
            From Problem to Verified Solution
          </h2>
          <p className="text-[#6b5244] mt-3 text-base sm:text-lg">
            No searching. No guessing. Just fast results.
          </p>
        </ScrollReveal>

        <div className="space-y-16 md:space-y-24">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.num} delay={index * 150}>
              <div
                className={`flex flex-col gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-fraunces text-5xl font-bold text-[#C70A24]/30 leading-none">
                      {step.num}
                    </span>
                    <div className="h-0.5 flex-1 bg-stone-200" />
                  </div>
                  <h3 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#1a1208] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6b5244] leading-relaxed text-base md:text-lg max-w-lg">
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

      {/* Payment Safety Flow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-100/60 my-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 bg-stone-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Zero Upfront Risk
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-[#1a1208]">
              Your Payment is Always Protected
            </h2>
            <p className="text-[#6b5244] mt-2">
              Automatic payment security built into every single job
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAFETY_STEPS.map((item, i) => {
              const IconComp = item.icon;
              return (
                <ScrollReveal key={item.label} delay={i * 120}>
                  <div className="text-center p-6 rounded-3xl bg-white shadow-xs hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4 text-[#C70A24]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-[#1a1208] text-base mb-1">
                      {item.label}
                    </div>
                    <div className="text-xs text-[#6b5244]">{item.sub}</div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: The Old Way vs The NearServe Way */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 bg-stone-100 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6b5244] mb-4">
                The Old Way
              </div>
              <ul className="space-y-3.5">
                {COMPARISON.old.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#6b5244]">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl p-8 bg-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C70A24]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs font-bold uppercase tracking-wider text-[#C70A24] mb-4">
                The NearServe Way
              </div>
              <ul className="space-y-3.5">
                {COMPARISON.new.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[#1a1208] font-semibold"
                  >
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Social Proof Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="bg-[#1a1208] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,10,36,0.25)_0%,transparent_65%)]" />
            <div className="relative z-10 max-w-xl mx-auto">
              <div className="font-fraunces text-5xl md:text-6xl font-bold mb-2">
                4,800+
              </div>
              <div className="text-white/80 text-sm sm:text-base mb-6">
                verified tasks completed safely on NearServe
              </div>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-xs sm:text-sm font-semibold">
                <span className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" /> 4.9 Average Rating
                </span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-400 font-bold">100% Safe Payments</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1208] mb-4">
              Ready to get your task done?
            </h2>
            <p className="text-[#6b5244] mb-8 text-base">
              Post a task in plain words. Local pros start offering bids in minutes. You only pay after you inspect the completed work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.REGISTER}
                className="bg-[#C70A24] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#a50820] transition-all hover:scale-105 shadow-md flex items-center gap-2"
              >
                <span>Get started now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.FOR_PROVIDERS}
                className="text-[#1a1208] font-semibold px-8 py-4 rounded-full bg-stone-100 hover:bg-white transition-all shadow-xs"
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
