"use client";

import { useEffect, useState } from "react";

const INCOMING_JOBS = [
  { title: "AC installation", loc: "Gulshan", pay: "৳12,000", time: "2m ago" },
  { title: "Bathroom tiling", loc: "Mirpur", pay: "৳8,500", time: "5m ago" },
  { title: "Plumbing repair", loc: "Dhanmondi", pay: "৳3,200", time: "8m ago" },
];

export default function ProviderHeroVisual() {
  const [visibleJobs, setVisibleJobs] = useState(0);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const jobTimers = INCOMING_JOBS.map((_, i) =>
      setTimeout(() => setVisibleJobs(i + 1), 1200 + i * 1400),
    );

    let earned = 0;
    const earnTimer = setInterval(() => {
      earned += 420;
      if (earned >= 24600) {
        setEarnings(24600);
        clearInterval(earnTimer);
      } else {
        setEarnings(earned);
      }
    }, 80);

    return () => {
      jobTimers.forEach(clearTimeout);
      clearInterval(earnTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] h-[500px] mx-auto">
      {/* dashboard panel */}
      <div className="absolute inset-0 bg-white/5 border border-white/15 rounded-3xl backdrop-blur-sm overflow-hidden animate-scale-in">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(199,10,36,0.2)_0%,transparent_50%)]" />

        {/* header */}
        <div className="relative z-10 px-5 pt-5 pb-3 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">
              Provider dashboard
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              Good morning, Tariq 👋
            </div>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-brand/30 border border-brand/50 flex items-center justify-center text-sm">
              🔔
            </div>
            {visibleJobs > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full text-[9px] font-bold flex items-center justify-center text-white animate-pop-in">
                {visibleJobs}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 p-5 space-y-4">
          {/* earnings card */}
          <div className="bg-white/10 border border-white/15 rounded-2xl p-4">
            <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
              This month&apos;s earnings
            </div>
            <div className="font-fraunces text-3xl font-bold text-white">
              ৳{earnings.toLocaleString()}
            </div>
            <div className="mt-3 flex items-end gap-1 h-12">
              {[35, 55, 40, 70, 50, 85, 65, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-brand/60 rounded-sm transition-all duration-700 ease-out"
                  style={{
                    height: `${earnings > 0 ? h : 0}%`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* incoming jobs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/80">
                New jobs near you
              </span>
              <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-soft" />
                Live
              </span>
            </div>
            <div className="space-y-2">
              {INCOMING_JOBS.map((job, i) => (
                <div
                  key={job.title}
                  className={`flex items-center justify-between bg-white/8 border border-white/12 rounded-xl px-3.5 py-2.5 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i < visibleJobs
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {job.title}
                    </div>
                    <div className="text-[10px] text-white/50">
                      {job.loc} · {job.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-brand">{job.pay}</div>
                    <button className="text-[9px] text-white/70 mt-0.5 hover:text-white transition-colors">
                      Bid now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* map ping dots */}
      <div className="absolute -right-3 top-1/3 w-20 h-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-brand rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-brand rounded-full -translate-x-1/2 -translate-y-1/2 animate-[ping-ring_2.5s_ease-out_infinite]" />
        <div
          className="absolute top-3 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse-soft"
          style={{ animationDelay: "0.8s" }}
        />
        <div
          className="absolute bottom-4 left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse-soft"
          style={{ animationDelay: "1.6s" }}
        />
      </div>

      {/* floating badge */}
      <div className="absolute -left-4 bottom-16 bg-brand text-white rounded-2xl px-3.5 py-2.5 shadow-[0_8px_32px_rgba(199,10,36,0.4)] animate-float">
        <div className="text-[10px] font-semibold opacity-80">Jobs won today</div>
        <div className="font-fraunces text-xl font-bold">+4</div>
      </div>
    </div>
  );
}
