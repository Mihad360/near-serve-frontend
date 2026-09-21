"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { ROUTES } from "@/utils/navigation";
import {
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  Droplet,
  AirVent,
  Paintbrush,
  Hammer,
} from "lucide-react";

type ServiceCategory = "all" | "plumbing" | "electrical" | "ac" | "cleaning" | "carpentry";

interface RecentJob {
  id: string;
  category: "plumbing" | "electrical" | "ac" | "cleaning" | "carpentry";
  providerName: string;
  avatar: string;
  service: string;
  location: string;
  amount: number;
  timeAgo: string;
  rating: number;
  trustScore: number;
}

const RECENT_JOBS: RecentJob[] = [
  {
    id: "1",
    category: "plumbing",
    providerName: "Ahmed K.",
    avatar: "AK",
    service: "Fixed master bathroom pipe leak",
    location: "Dhanmondi, Block 8",
    amount: 1450,
    timeAgo: "3 mins ago",
    rating: 5.0,
    trustScore: 94,
  },
  {
    id: "2",
    category: "ac",
    providerName: "Karim M.",
    avatar: "KM",
    service: "Dual 1.5-ton AC gas refill & chemical clean",
    location: "Gulshan-2, Road 45",
    amount: 3800,
    timeAgo: "12 mins ago",
    rating: 5.0,
    trustScore: 97,
  },
  {
    id: "3",
    category: "cleaning",
    providerName: "Sara R.",
    avatar: "SR",
    service: "3-Bedroom apartment deep clean & sanitization",
    location: "Mirpur DOHS",
    amount: 4200,
    timeAgo: "24 mins ago",
    rating: 4.9,
    trustScore: 91,
  },
  {
    id: "4",
    category: "electrical",
    providerName: "Tariq H.",
    avatar: "TH",
    service: "Circuit breaker rewiring & distribution box",
    location: "Uttara Sector 11",
    amount: 2200,
    timeAgo: "41 mins ago",
    rating: 4.8,
    trustScore: 89,
  },
  {
    id: "5",
    category: "carpentry",
    providerName: "Imran S.",
    avatar: "IS",
    service: "Custom kitchen cabinet hinge & drawer fix",
    location: "Banani, Block C",
    amount: 1900,
    timeAgo: "1 hour ago",
    rating: 4.9,
    trustScore: 88,
  },
];

import { useGetPublicAnalyticsQuery } from "@/redux/api/analyticsApi";

export default function LiveActivity() {
  const { ref, inView } = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const [providerCount, setProviderCount] = useState(0);

  const { data: analyticsData } = useGetPublicAnalyticsQuery({});
  const rawAnalytics = analyticsData?.data;
  const targetProviderCount = rawAnalytics?.activeProviders || 847;
  const avgResponseTime = rawAnalytics?.avgResponseTimeMinutes
    ? `${rawAnalytics.avgResponseTimeMinutes} mins`
    : "3.4 mins";
  const satisfactionRate = rawAnalytics?.satisfactionRate
    ? `★ ${(rawAnalytics.satisfactionRate / 20).toFixed(1)}`
    : "★ 4.9";

  // Smooth counter animation upon viewport entry
  useEffect(() => {
    if (!inView) return;
    const target = targetProviderCount;
    let current = 0;
    const duration = 1600;
    const intervalTime = 20;
    const step = Math.max(1, target / (duration / intervalTime));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setProviderCount(target);
        clearInterval(timer);
      } else {
        setProviderCount(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [inView, targetProviderCount]);

  // Combine backend live activity with fallback
  const backendJobs = rawAnalytics?.recentActivity;
  const liveJobs: RecentJob[] =
    Array.isArray(backendJobs) && backendJobs.length > 0
      ? backendJobs.map((j: any, i: number) => ({
          id: j.id || String(i),
          category: (j.category?.toLowerCase() || "plumbing") as any,
          providerName: j.customerName || "Customer",
          avatar: (j.customerName || "C").slice(0, 2).toUpperCase(),
          service: j.title || "Service Request",
          location: j.address || "Dhaka Metro",
          amount: j.budget || 2500,
          timeAgo: "Just now",
          rating: 5.0,
          trustScore: 95,
        }))
      : RECENT_JOBS;

  const filteredJobs =
    activeCategory === "all"
      ? liveJobs
      : liveJobs.filter((j) => j.category === activeCategory);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header section */}
      <div
        className={`flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 bg-stone-100 px-3.5 py-1.5 rounded-full mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            Real-Time Dhaka Network
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a1208] tracking-tight leading-[1.12]">
            Live Activity Near You
          </h2>
          <p className="text-base sm:text-lg text-[#6b5244] mt-2">
            Real jobs completed safely with guaranteed payment protection.
          </p>
        </div>

        {/* Real-time Stat Pills */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-stone-100 rounded-2xl px-5 py-3 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#6b5244] font-bold block">
              Active Pros
            </span>
            <span className="font-fraunces text-xl font-bold text-[#1a1208]">
              {providerCount}+
            </span>
          </div>

          <div className="bg-stone-100 rounded-2xl px-5 py-3 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#6b5244] font-bold block">
              Avg Match Time
            </span>
            <span className="font-fraunces text-xl font-bold text-[#C70A24]">
              {avgResponseTime}
            </span>
          </div>

          <div className="bg-stone-100 rounded-2xl px-5 py-3 shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#6b5244] font-bold block">
              Customer Rating
            </span>
            <span className="font-fraunces text-xl font-bold text-emerald-700">
              {satisfactionRate}
            </span>
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div
        className={`flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none transition-all duration-700 delay-200 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {[
          { id: "all" as ServiceCategory, label: "All Activity", icon: Sparkles },
          { id: "plumbing" as ServiceCategory, label: "Plumbing", icon: Droplet },
          { id: "ac" as ServiceCategory, label: "AC Repair", icon: AirVent },
          { id: "electrical" as ServiceCategory, label: "Electrical", icon: Zap },
          { id: "cleaning" as ServiceCategory, label: "Deep Clean", icon: Paintbrush },
          { id: "carpentry" as ServiceCategory, label: "Carpentry", icon: Hammer },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#1a1208] text-white shadow-md scale-102"
                  : "bg-stone-100 text-[#6b5244] hover:bg-white hover:text-[#1a1208]"
              }`}
            >
              <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-[#6b5244]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Activity Feed Stream */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-1000 delay-300 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="group bg-stone-100 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              {/* Card top bar */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1a1208] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {job.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1a1208] flex items-center gap-1">
                      {job.providerName}
                      <CheckCircle2 className="w-3 h-3 text-blue-600 fill-blue-50" />
                    </div>
                    <span className="text-[10px] text-amber-600 font-semibold">
                      Trust {job.trustScore} · ★ {job.rating}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] text-[#6b5244] bg-white px-2.5 py-1 rounded-full font-medium shadow-2xs">
                  <Clock className="w-2.5 h-2.5 text-[#9b8270]" />
                  {job.timeAgo}
                </span>
              </div>

              {/* Job title & description */}
              <div className="pt-3.5">
                <h4 className="font-semibold text-sm text-[#1a1208] group-hover:text-[#C70A24] transition-colors line-clamp-2">
                  {job.service}
                </h4>
                <div className="flex items-center gap-1 text-xs text-[#6b5244] mt-2">
                  <MapPin className="w-3 h-3 text-[#9b8270] shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom: Verified safe payment status */}
            <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold text-emerald-800">
                  Payment Completed
                </span>
              </div>
              <div className="text-base font-bold text-[#1a1208] font-fraunces">
                ৳{job.amount.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live prompt bar banner */}
      <div
        className={`mt-10 bg-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-1000 delay-500 shadow-xs ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#C70A24] shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-fraunces text-xl font-semibold text-[#1a1208]">
              Need something completed today?
            </h4>
            <p className="text-xs sm:text-sm text-[#6b5244] mt-0.5">
              Over 800+ local specialists are ready to review and bid on your task right now.
            </p>
          </div>
        </div>

        <Link
          href={ROUTES.CUSTOMER_POST_JOB}
          className="bg-[#C70A24] hover:bg-[#a50820] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 shrink-0"
        >
          <span>Post Your Job Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
