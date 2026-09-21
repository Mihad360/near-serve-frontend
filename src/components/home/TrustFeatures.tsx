"use client";

import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { ROUTES } from "@/utils/navigation";
import {
  ShieldCheck,
  Lock,
  Scale,
  Sparkles,
  CheckCircle2,
  BadgeCheck,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function TrustFeatures() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header section */}
      <div
        className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C70A24] bg-stone-100 px-3.5 py-1.5 rounded-full mb-4">
          <Shield className="w-3.5 h-3.5" />
          Zero Risk Guarantee
        </span>
        <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1208] tracking-tight leading-[1.12]">
          Built for Total Trust & Everyday Peace of Mind
        </h2>
        <p className="text-base sm:text-lg text-[#6b5244] mt-4 leading-relaxed">
          No advance risks. We hold payment securely until you inspect the work and give your final approval.
        </p>
      </div>

      {/* Bento Grid Features Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* BENTO CARD 1: Safe Payment Protection (7 cols) */}
        <div
          className={`lg:col-span-7 bg-[#1a1208] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Subtle brand glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(199,10,36,0.35)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 mb-6">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe Payment Guarantee</span>
            </div>

            <h3 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-4">
              You never pay upfront. You only pay when you are happy with the work.
            </h3>

            <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl">
              When you accept an offer, your payment is held safely on NearServe. The professional arrives and completes your task knowing their payment is guaranteed, while you keep 100% control until you inspect and approve everything.
            </p>
          </div>

          {/* Payment Flow Diagram Visual */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="bg-white/5 rounded-2xl p-3 sm:p-4 backdrop-blur-sm">
                <span className="text-[10px] text-white/50 uppercase font-semibold block mb-1">Step 1</span>
                <span className="text-xs sm:text-sm font-bold text-white block">Job Accepted</span>
                <span className="text-[10px] text-emerald-400 font-medium">Payment Secured</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-sm relative">
                <span className="text-[10px] text-amber-300 uppercase font-semibold block mb-1">Step 2</span>
                <span className="text-xs sm:text-sm font-bold text-white block">Work Done</span>
                <span className="text-[10px] text-white/80 font-medium">You Inspect</span>
              </div>

              <div className="bg-emerald-500/20 rounded-2xl p-3 sm:p-4 backdrop-blur-sm">
                <span className="text-[10px] text-emerald-300 uppercase font-semibold block mb-1">Step 3</span>
                <span className="text-xs sm:text-sm font-bold text-white block">100% Satisfied</span>
                <span className="text-[10px] text-emerald-300 font-medium">Payment Released</span>
              </div>
            </div>
          </div>
        </div>

        {/* BENTO CARD 2: Admin-Verified Credentials (5 cols) */}
        <div
          className={`lg:col-span-5 bg-stone-100 rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-1000 delay-150 flex flex-col justify-between ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 shadow-xs flex items-center justify-center mb-6">
              <BadgeCheck className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700 block mb-2">
              Identity Checked
            </span>

            <h3 className="font-fraunces text-2xl font-semibold text-[#1a1208] mb-3">
              Admin-Vetted Providers Only
            </h3>

            <p className="text-sm text-[#6b5244] leading-relaxed mb-6">
              Every professional undergoes government National ID verification, skill assessment, and an identity review before taking on jobs.
            </p>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2.5 text-xs text-[#1a1208] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>National ID (NID) & Address Verification</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#1a1208] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Prior Work Quality & Experience Check</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#1a1208] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Zero-Tolerance Safety Policy</span>
            </div>
          </div>
        </div>

        {/* BENTO CARD 3: Genuine Trust Ratings (6 cols) */}
        <div
          className={`lg:col-span-6 bg-stone-100 rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-1000 delay-300 flex flex-col justify-between ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white text-amber-600 shadow-xs flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700 block mb-2">
              Honest Feedback
            </span>

            <h3 className="font-fraunces text-2xl font-semibold text-[#1a1208] mb-3">
              Trust Score on Every Specialist
            </h3>

            <p className="text-sm text-[#6b5244] leading-relaxed mb-6">
              No fake ratings. Our system calculates real trust scores based on completed work, on-time arrivals, and genuine customer feedback.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="font-fraunces text-3xl font-bold text-[#1a1208]">97<span className="text-xs text-[#6b5244] font-normal">/100</span></div>
              <div className="text-xs text-[#6b5244]">
                <strong className="block text-[#1a1208] font-semibold">Top Rated Specialist</strong>
                142 completed jobs
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              Top 1% in Dhaka
            </span>
          </div>
        </div>

        {/* BENTO CARD 4: Fair Support & 100% Refund (6 cols) */}
        <div
          className={`lg:col-span-6 bg-stone-100 rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-1000 delay-450 flex flex-col justify-between ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 shadow-xs flex items-center justify-center mb-6">
              <Scale className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 block mb-2">
              Customer Support
            </span>

            <h3 className="font-fraunces text-2xl font-semibold text-[#1a1208] mb-3">
              100% Money-Back Safety Guarantee
            </h3>

            <p className="text-sm text-[#6b5244] leading-relaxed mb-6">
              If an issue occurs or work isn&apos;t done to agreement, our support team steps in immediately to resolve it or issue a prompt full refund.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs font-semibold text-[#1a1208]">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4" /> Full Refund on Unresolved Tasks
            </span>
            <Link
              href={ROUTES.HOW_IT_WORKS}
              className="text-[#C70A24] hover:underline flex items-center gap-1 font-bold"
            >
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
