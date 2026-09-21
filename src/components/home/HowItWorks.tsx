// components/HowItWorks.jsx
"use client";

import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { ROUTES } from "@/utils/navigation";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Bot,
  Gavel,
  Lock,
  Star,
} from "lucide-react";

export default function HowItWorks() {
  const { ref, inView } = useInView(0.1);

  const steps = [
    {
      num: "01",
      tag: "Plain-Words Input",
      title: "Tell us what needs fixing",
      desc: "No confusing dropdown forms. Simply type or voice your task. Our smart system detects urgency, task scope, and your exact location in seconds.",
      icon: Bot,
      color: "bg-white text-brand shadow-xs",
      preview: (
        <div className="bg-white/80 rounded-2xl p-4 text-xs font-mono space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] text-[#6b5244] font-sans pb-1 border-b border-stone-200">
            <span className="font-semibold text-[#1a1208]">Smart Task Reader</span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">Matched in 4s</span>
          </div>
          <div className="text-[#1a1208] italic">
            &quot;Emergency pipe leak under bathroom basin in Dhanmondi...&quot;
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1 font-sans text-[10px]">
            <span className="bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-[#4a3728]">
              📍 Dhanmondi
            </span>
            <span className="bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-[#4a3728]">
              🔧 Plumbing
            </span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
              ⚡ Urgent
            </span>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      tag: "Competitive Prices",
      title: "Verified locals bid their best rate",
      desc: "Nearby vetted service professionals compete for your job with transparent offers. Compare ratings, completed tasks, and clear upfront pricing.",
      icon: Gavel,
      color: "bg-white text-amber-700 shadow-xs",
      preview: (
        <div className="space-y-2">
          <div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1a1208] text-white font-bold text-xs flex items-center justify-center">
                KM
              </div>
              <div>
                <div className="text-xs font-bold text-[#1a1208]">Karim M.</div>
                <div className="text-[10px] text-amber-600 font-semibold flex items-center">
                  <Star className="w-2.5 h-2.5 fill-amber-400 inline mr-0.5" /> 5.0 · 142 jobs
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#1a1208]">৳1,200</div>
              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                Top Rated
              </span>
            </div>
          </div>

          <div className="bg-white/60 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C70A24] text-white font-bold text-xs flex items-center justify-center">
                AK
              </div>
              <div>
                <div className="text-xs font-bold text-[#1a1208]">Ahmed K.</div>
                <div className="text-[10px] text-muted font-medium">★ 4.9 · 128 jobs</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#1a1208]">৳1,150</div>
              <span className="text-[9px] text-muted">Best Price</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: "03",
      tag: "Safe Payment Guarantee",
      title: "Inspect first, pay when satisfied",
      desc: "Your payment is held safely in your balance. The pro gets to work knowing payment is secured, and money is only released after you confirm you are 100% happy.",
      icon: ShieldCheck,
      color: "bg-white text-emerald-700 shadow-xs",
      preview: (
        <div className="bg-emerald-50 rounded-2xl p-4 text-center space-y-2">
          <div className="w-9 h-9 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-950">Payment Protected</div>
            <div className="text-[11px] text-emerald-800">Funds locked safely during task</div>
          </div>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1 bg-white text-emerald-900 font-bold text-[10px] px-3 py-1 rounded-full shadow-2xs">
              <CheckCircle className="w-3 h-3 text-emerald-600" /> Release Only When Satisfied
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header section with staggered reveal */}
      <div
        className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C70A24] bg-stone-100 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          How NearServe Works
        </span>
        <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1208] tracking-tight leading-[1.12]">
          From everyday problem to verified fix in 3 simple steps
        </h2>
        <p className="text-base sm:text-lg text-[#6b5244] mt-4 leading-relaxed">
          No endless phone calls, no price guessing, and zero upfront risk.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.num}
              className={`group bg-stone-100 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-700 flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Background watermark step number */}
              <span className="absolute -top-4 -right-2 font-fraunces font-bold text-7xl text-[#1a1208]/[0.04] select-none pointer-events-none group-hover:text-[#C70A24]/[0.08] transition-colors duration-500">
                {step.num}
              </span>

              <div>
                {/* Top Badge & Step Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-fraunces text-2xl font-bold text-[#1a1208]/30 group-hover:text-[#C70A24] transition-colors duration-300">
                    {step.num}
                  </span>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C70A24] block mb-2">
                  {step.tag}
                </span>

                <h3 className="font-fraunces text-2xl font-semibold text-[#1a1208] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-[#6b5244] leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Step UI Mockup Preview */}
              <div className="pt-2">
                {step.preview}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Link */}
      <div
        className={`mt-12 md:mt-16 text-center transition-all duration-1000 delay-500 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Link
          href={ROUTES.HOW_IT_WORKS}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1a1208] hover:text-[#C70A24] px-6 py-3 rounded-full bg-stone-100 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300"
        >
          <span>See detailed step-by-step guide</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
