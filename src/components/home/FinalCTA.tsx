"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthCta } from "@/hooks/useAuthCta";
import { ROUTES } from "@/utils/navigation";
import { useInView } from "@/hooks/useInView";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function FinalCTA() {
  const [jobDesc, setJobDesc] = useState("");
  const { primary, role } = useAuthCta();
  const router = useRouter();
  const { ref, inView } = useInView(0.1);

  const handlePost = () => {
    if (role === "customer") {
      router.push(ROUTES.CUSTOMER_POST_JOB);
      return;
    }
    if (role === "provider") {
      router.push(ROUTES.PROVIDER_HOME);
      return;
    }
    router.push(ROUTES.REGISTER);
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div
        className={`bg-[#1a1208] text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-[0_24px_60px_rgba(26,18,8,0.25)] border border-white/10 transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-98"
        }`}
      >
        {/* Subtle crimson and amber radial light effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(199,10,36,0.3)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(217,119,6,0.2)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-300 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Join 4,800+ Smart Homeowners in Dhaka</span>
          </div>

          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-white mb-6">
            Ready to experience effortless, guaranteed safe services?
          </h2>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            {role === "provider"
              ? "Browse live nearby jobs, submit competitive bids, and receive guaranteed payments as soon as work is approved."
              : role === "customer"
                ? "Post your job in seconds. Verified local professionals bid. You choose the best offer while your payment stays 100% safe."
                : "Post your task in plain words or register as an approved provider. Pay safely only when the job is done."}
          </p>

          {/* Interactive Fast-Post Input */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 shadow-2xl focus-within:border-[#C70A24] focus-within:bg-white/15 transition-all duration-300">
              <input
                type="text"
                placeholder={
                  role === "provider"
                    ? "Explore current job feed..."
                    : "Describe what you need fixed (e.g. Master bathroom tile repair)..."
                }
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePost()}
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-white/50 px-3 py-1.5"
              />
              <button
                type="button"
                onClick={handlePost}
                className="bg-[#C70A24] hover:bg-[#a50820] text-white text-xs sm:text-sm font-semibold px-5 sm:px-7 py-3 rounded-xl whitespace-nowrap transition-all duration-300 hover:shadow-lg hover:scale-102 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>{primary.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-white/80 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              100% Safe Payments
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Admin-Verified Professionals
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Free to Post · Pay After Approval
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
