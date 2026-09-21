"use client";

import { useInView } from "@/hooks/useInView";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const { ref, inView } = useInView(0.1);

  const testimonials = [
    {
      name: "Tanvir Hasan",
      role: "Homeowner",
      location: "Dhanmondi, Dhaka",
      avatar: "TH",
      jobDone: "Kitchen Pipe Replacement · ৳1,800",
      text: "I needed a plumber urgently on a Friday evening. Posted on NearServe, received 3 bids within 6 minutes, and Ahmed arrived within 20 minutes. Not having to pay upfront gave me complete peace of mind.",
      rating: 5,
    },
    {
      name: "Nadia Islam",
      role: "Apartment Resident",
      location: "Mirpur DOHS",
      avatar: "NI",
      jobDone: "Deep Cleaning & Sanitization · ৳4,200",
      text: "The AI understood exactly what I needed without filling out long questionnaires. Karim and his team did a phenomenal job on our 3-bedroom apartment. I only confirmed payment after inspecting every room.",
      rating: 5,
    },
    {
      name: "Rashid Chowdhury",
      role: "Business Owner",
      location: "Gulshan-1",
      avatar: "RC",
      jobDone: "Dual AC Chemical Servicing · ৳3,600",
      text: "Fair pricing with zero haggling. Both technicians were polite, highly skilled, and NID-verified. NearServe has completely changed how we hire local home services in Dhaka.",
      rating: 5,
    },
  ];

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
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700 bg-stone-100 px-3.5 py-1.5 rounded-full mb-4">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          Verified Customer Stories
        </span>
        <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1208] tracking-tight leading-[1.12]">
          Trusted by Dhaka Homeowners & Businesses
        </h2>
        <p className="text-base sm:text-lg text-[#6b5244] mt-4 leading-relaxed">
          Over 4,800 tasks completed with 100% payment protection and zero advance risks.
        </p>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`group bg-stone-100 rounded-3xl p-7 shadow-xs hover:shadow-xl transition-all duration-700 flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Top row: Rating & Safe badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Payment Protected
                </span>
              </div>

              {/* Quote text */}
              <p className="text-sm sm:text-[15px] text-[#1a1208] leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            {/* Bottom row: User Profile & Completed Task */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1208] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {t.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-[#1a1208] flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                  </div>
                  <div className="text-xs text-[#6b5244] truncate">{t.location}</div>
                </div>
              </div>

              <div className="mt-3 text-[11px] font-medium text-[#6b5244] bg-white px-3 py-1.5 rounded-xl shadow-2xs truncate">
                ⚡ {t.jobDone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Proof Rating Ribbon */}
      <div
        className={`mt-12 md:mt-16 text-center transition-all duration-1000 delay-500 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="inline-flex items-center gap-3 bg-[#1a1208] text-white rounded-full px-6 py-3.5 text-xs sm:text-sm font-semibold shadow-xl">
          <span className="flex items-center text-amber-400">
            <Star className="w-4 h-4 fill-amber-400 inline mr-1" /> 4.9 Average Customer Rating
          </span>
          <span className="text-white/30">•</span>
          <span className="text-white/80">4,800+ Verified Jobs</span>
          <span className="text-white/30">•</span>
          <span className="text-emerald-400 font-bold">100% Safe Payments</span>
        </div>
      </div>
    </section>
  );
}
