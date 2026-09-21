"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthCta } from "@/hooks/useAuthCta";
import { ROUTES } from "@/utils/navigation";
import { useGetPublicAnalyticsQuery } from "@/redux/api/analyticsApi";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Lock,
  Star,
  Zap,
} from "lucide-react";

const PROMPT_SUGGESTIONS = [
  "I need my bathroom tiled this weekend in Mirpur...",
  "Emergency AC servicing needed in Banani...",
  "Fix kitchen pipe leak & faucet replacement in Dhanmondi...",
  "Deep clean 3-bedroom apartment in Gulshan...",
  "Install 4 ceiling fans & switches in Uttara...",
];

export default function Hero() {
  const [searchValue, setSearchValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const { primary, role } = useAuthCta();
  const router = useRouter();
  const { data: analyticsData } = useGetPublicAnalyticsQuery({});
  const activeProvidersCount =
    analyticsData?.data?.activeProviders || 847;

  // Cycling placeholder text for dynamic plain-language feel
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PROMPT_SUGGESTIONS.length);
        setIsTyping(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
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
    <div className="relative bg-[#FAF6EF] overflow-hidden pt-6 pb-16 md:py-16">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(199,10,36,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(90vh-80px)]">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            
            {/* Live active indicator badge */}
            <div className="inline-flex items-center gap-2.5 bg-stone-100 rounded-full pl-2.5 pr-4 py-1.5 text-xs font-semibold text-[#4a3728] shadow-sm w-fit transition-all duration-300 hover:bg-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="tracking-wide">
                <strong className="text-[#1a1208] font-bold">
                  {Number(activeProvidersCount).toLocaleString()} verified providers
                </strong>{" "}
                active in Dhaka
              </span>
            </div>

            {/* Headline with serif distinction */}
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.08] tracking-[-1.5px] text-[#1a1208]">
              Real locals.{" "}
              <span className="relative inline-block text-[#C70A24] italic font-normal">
                Competing
                <svg
                  className="absolute left-0 -bottom-1 w-full text-[#C70A24]/30"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,0 100,5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              for your job.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg leading-[1.65] text-[#6b5244] max-w-xl">
              Describe what you need in simple words. Nearby verified experts send you their best offers.{" "}
              <strong className="text-[#1a1208] font-semibold">
                You only pay after the job is done and you are 100% happy.
              </strong>
            </p>

            {/* CTA Action Buttons */}
            <div className="flex items-center gap-3.5 flex-wrap pt-1">
              <Link
                href={primary.href}
                className="group bg-[#C70A24] text-white text-[15px] font-semibold px-7 py-3.5 rounded-full flex items-center gap-2.5 hover:bg-[#a50820] shadow-[0_8px_24px_rgba(199,10,36,0.25)] hover:shadow-[0_12px_28px_rgba(199,10,36,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{primary.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={
                  role === "guest"
                    ? ROUTES.SERVICES
                    : role === "customer"
                      ? ROUTES.CUSTOMER_HOME
                      : ROUTES.PROVIDER_HOME
                }
                className="bg-stone-100 text-[#1a1208] text-[15px] font-semibold px-6 py-3.5 rounded-full hover:bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                {role === "guest"
                  ? "Explore services"
                  : role === "customer"
                    ? "My active jobs"
                    : "Job feed"}
              </Link>
            </div>

            {/* Natural Language Search Box */}
            <div className="pt-2 max-w-xl">
              <div className="group bg-stone-100 hover:bg-white focus-within:!bg-white rounded-2xl p-2 sm:p-2.5 shadow-sm focus-within:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 text-[#C70A24] shadow-xs">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-[#1a1208] placeholder:text-[#9b8270]/80 placeholder:transition-opacity placeholder:duration-300"
                    placeholder={
                      isTyping
                        ? PROMPT_SUGGESTIONS[placeholderIndex]
                        : "Describe any home service or repair..."
                    }
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-[#1a1208] hover:bg-[#C70A24] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl whitespace-nowrap transition-colors duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <span>Find Pros</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#9b8270] mt-2 px-2">
                <span>⚡ AI matches local experts in under 4 minutes</span>
                <span className="hidden sm:inline font-medium text-[#6b5244]">100% Free to post</span>
              </div>
            </div>

            {/* Micro Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="flex items-center gap-2 p-2 bg-stone-100/70 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] leading-tight font-medium text-[#4a3728]">
                  <strong className="block text-[#1a1208] font-semibold">Payment Safe</strong>
                  Pay after work
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-stone-100/70 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] leading-tight font-medium text-[#4a3728]">
                  <strong className="block text-[#1a1208] font-semibold">Admin Vetted</strong>
                  ID & skill checked
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-stone-100/70 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] leading-tight font-medium text-[#4a3728]">
                  <strong className="block text-[#1a1208] font-semibold">Trust Ratings</strong>
                  Verified reviews
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Circular Orbit Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[500px] sm:min-h-[560px]">
            <div className="relative w-110 sm:w-125 h-110 sm:h-125 flex items-center justify-center">
              
              {/* Radial glow background */}
              <div className="absolute w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(199,10,36,0.15)_0%,rgba(199,10,36,0)_70%)] animate-[glowPulse_3s_ease-in-out_infinite]" />

              {/* Orbit 1 ring (inner) */}
              <div className="absolute rounded-full border border-dashed border-[rgba(199,10,36,0.2)] w-48 sm:w-52 h-48 sm:h-52 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Orbit 2 ring (middle) */}
              <div className="absolute rounded-full border border-dashed border-[rgba(199,10,36,0.2)] w-76 sm:w-80 h-76 sm:h-80 animate-[spin_35s_linear_infinite]" />

              {/* Orbit 3 ring (outer) */}
              <div className="absolute rounded-full border border-dashed border-[rgba(199,10,36,0.15)] w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] animate-[spin_50s_linear_infinite_reverse]" />

              {/* CENTER CARD */}
              <div className="absolute z-20 bg-stone-100 rounded-3xl px-6 py-5 flex flex-col items-center gap-1 shadow-[0_12px_36px_rgba(26,18,8,0.1)] hover:scale-105 transition-transform duration-500 cursor-default">
                <div className="font-fraunces text-3xl sm:text-4xl font-bold text-[#1a1208] leading-none">
                  4,800+
                </div>
                <div className="text-[11px] font-bold text-[#6b5244] uppercase tracking-[0.5px]">
                  Jobs Completed
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                  100% Protected
                </div>
              </div>

              {/* ORBIT 1: Ahmed K. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-52 h-48 sm:h-52 animate-[spin_25s_linear_infinite_reverse]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite]">
                  <div className="w-[76px] h-[76px] rounded-full bg-stone-100 shadow-[0_8px_24px_rgba(26,18,8,0.12)] flex flex-col items-center justify-center gap-0.5 hover:scale-115 transition-transform duration-300 cursor-default">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#C70A24] shadow-xs">
                      AK
                    </div>
                    <div className="text-[10px] font-bold text-[#1a1208] leading-none">
                      Ahmed
                    </div>
                    <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5 font-semibold">
                      <span className="text-amber-500">★</span> 4.9
                    </div>
                  </div>
                </div>
              </div>

              {/* ORBIT 1: Sara R. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-52 h-48 sm:h-52 animate-[spin_25s_linear_infinite]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_25s_linear_infinite_reverse]">
                  <div className="w-[76px] h-[76px] rounded-full bg-stone-100 shadow-[0_8px_24px_rgba(26,18,8,0.12)] flex flex-col items-center justify-center gap-0.5 hover:scale-115 transition-transform duration-300 cursor-default">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#7c3aed] shadow-xs">
                      SR
                    </div>
                    <div className="text-[10px] font-bold text-[#1a1208] leading-none">
                      Sara
                    </div>
                    <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5 font-semibold">
                      <span className="text-amber-500">★</span> 4.8
                    </div>
                  </div>
                </div>
              </div>

              {/* ORBIT 2: Karim M. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-76 sm:w-80 h-76 sm:h-80 animate-[spin_35s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_35s_linear_infinite_reverse]">
                  <div className="w-[80px] h-[80px] rounded-full bg-stone-100 shadow-[0_8px_24px_rgba(26,18,8,0.12)] flex flex-col items-center justify-center gap-0.5 hover:scale-115 transition-transform duration-300 cursor-default">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#059669] shadow-xs">
                      KM
                    </div>
                    <div className="text-[10px] font-bold text-[#1a1208] leading-none">
                      Karim
                    </div>
                    <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5 font-semibold">
                      <span className="text-amber-500">★</span> 5.0
                    </div>
                  </div>
                </div>
              </div>

              {/* ORBIT 2: Nadia I. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-76 sm:w-80 h-76 sm:h-80 animate-[spin_35s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_35s_linear_infinite]">
                  <div className="w-[80px] h-[80px] rounded-full bg-stone-100 shadow-[0_8px_24px_rgba(26,18,8,0.12)] flex flex-col items-center justify-center gap-0.5 hover:scale-115 transition-transform duration-300 cursor-default">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#d97706] shadow-xs">
                      NI
                    </div>
                    <div className="text-[10px] font-bold text-[#1a1208] leading-none">
                      Nadia
                    </div>
                    <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5 font-semibold">
                      <span className="text-amber-500">★</span> 4.7
                    </div>
                  </div>
                </div>
              </div>

              {/* ORBIT 3: Tariq H. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] animate-[spin_50s_linear_infinite_reverse]">
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]">
                  <div className="w-[80px] h-[80px] rounded-full bg-stone-100 shadow-[0_8px_24px_rgba(26,18,8,0.12)] flex flex-col items-center justify-center gap-0.5 hover:scale-115 transition-transform duration-300 cursor-default">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#0891b2] shadow-xs">
                      TH
                    </div>
                    <div className="text-[10px] font-bold text-[#1a1208] leading-none">
                      Tariq
                    </div>
                    <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5 font-semibold">
                      <span className="text-amber-500">★</span> 4.9
                    </div>
                  </div>
                </div>
              </div>

              {/* ORBIT 3: Rina A. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] animate-[spin_50s_linear_infinite]">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite_reverse]">
                  <div className="w-[80px] h-[80px] rounded-full bg-stone-100 shadow-[0_8px_24px_rgba(26,18,8,0.12)] flex flex-col items-center justify-center gap-0.5 hover:scale-115 transition-transform duration-300 cursor-default">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#be185d] shadow-xs">
                      RA
                    </div>
                    <div className="text-[10px] font-bold text-[#1a1208] leading-none">
                      Rina
                    </div>
                    <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5 font-semibold">
                      <span className="text-amber-500">★</span> 4.6
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
