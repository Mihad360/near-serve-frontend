/* eslint-disable react/no-unescaped-entities */
// components/Hero.jsx
"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [searchValue, setSearchValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log("Search:", searchValue);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] overflow-x-hidden">
      {/* HERO */}
      <div className="flex items-center justify-between px-12 pt-5 pb-15 min-h-[calc(100vh-80px)] gap-10 max-w-360 mx-auto">
        {/* LEFT */}
        <div className="flex-1 max-w-130 flex flex-col gap-7 animate-[fadeUp_1s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e8ddd0] rounded-full px-3.5 py-1.5 text-xs font-medium text-[#4a3728] w-fit">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_infinite]"></div>
            847 providers active right now
          </div>

          <h1 className="font-fraunces text-[52px] font-semibold leading-[1.08] tracking-[-1.5px] text-[#1a1208]">
            Real locals.
            <br />
            <em className="not-italic text-[#C70A24]">Competing</em> for
            <br />
            your job.
          </h1>

          <p className="text-base leading-[1.65] text-[#6b5244] max-w-[420px]">
            Describe what you need — our AI finds{" "}
            <strong className="text-[#1a1208] font-semibold">
              verified nearby providers
            </strong>{" "}
            instantly. They bid. You pick the best offer.{" "}
            <strong className="text-[#1a1208] font-semibold">
              Money stays safe in escrow
            </strong>{" "}
            until you're happy.
          </p>

          <div className="flex items-center gap-3.5 flex-wrap">
            <button className="bg-[#C70A24] text-white text-[15px] font-semibold px-7 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#a50820] transition-all hover:-translate-y-px">
              Post a job — it's free
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="bg-transparent text-[#1a1208] text-[15px] font-medium px-6 py-3.5 rounded-full border-[1.5px] border-[#c8b8a8] hover:border-[#1a1208] hover:bg-white transition-all">
              Browse providers
            </button>
          </div>

          {/* AI search */}
          <div className="mt-2">
            <div className="flex items-center gap-3 bg-white border-[1.5px] border-[#e8ddd0] rounded-2xl px-4 py-3.5 focus-within:border-[#C70A24] transition-colors">
              <svg
                className="text-[#9b8270] shrink-0"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="border-none outline-none font-instrument text-sm text-[#1a1208] bg-transparent flex-1 placeholder:text-[#9b8270]"
                placeholder="I need my bathroom tiled this weekend in Mirpur..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="bg-[#C70A24] text-white border-none rounded-xl px-4 py-2 text-[13px] font-semibold cursor-pointer whitespace-nowrap font-instrument hover:bg-[#a50820] transition-colors"
                onClick={handleSearch}
              >
                Find pros →
              </button>
            </div>
            <p className="text-[11px] text-[#9b8270] mt-1.5 pl-1">
              AI understands plain language — just describe what you need
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#6b5244]">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Payment held in escrow
            </div>
            <div className="w-1 h-1 rounded-full bg-[#c8b8a8]"></div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#6b5244]">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4 12 14.01l-3-3" />
              </svg>
              Admin-verified providers
            </div>
            <div className="w-1 h-1 rounded-full bg-[#c8b8a8]"></div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#6b5244]">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              AI trust score on every pro
            </div>
          </div>
        </div>

        {/* RIGHT — ORBITS */}
        <div className="flex-1 max-w-[580px] flex items-center justify-center relative h-[560px] animate-[scaleIn_1.2s_cubic-bezier(0.22,1,0.36,1)_0.3s_both]">
          <div className="relative w-125 h-125 flex items-center justify-center">
            {/* glow */}
            <div className="absolute w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(199,10,36,0.12)_0%,rgba(199,10,36,0)_70%)] animate-[glowPulse_3s_ease-in-out_infinite]"></div>

            {/* orbits */}
            <div className="absolute rounded-full border border-dashed border-[rgba(199,10,36,0.15)] w-50 h-50 animate-[spin_25s_linear_infinite_reverse]"></div>
            <div className="absolute rounded-full border border-dashed border-[rgba(199,10,36,0.15)] w-80 h-80 animate-[spin_35s_linear_infinite]"></div>
            <div className="absolute rounded-full border border-dashed border-[rgba(199,10,36,0.15)] w-[440px] h-[440px] animate-[spin_50s_linear_infinite_reverse]"></div>

            {/* center card */}
            <div className="absolute z-20 bg-white border-[1.5px] border-[#e8ddd0] rounded-2xl px-[22px] py-[18px] flex flex-col items-center gap-1 shadow-[0_8px_32px_rgba(26,18,8,0.1)]">
              <div className="font-fraunces text-[32px] font-bold text-[#1a1208] leading-none">
                4,800+
              </div>
              <div className="text-[11px] font-medium text-[#6b5244] uppercase tracking-[0.5px]">
                Jobs completed
              </div>
              <div className="text-[10px] text-[#9b8270]">
                safely on NearServe
              </div>
            </div>

            {/* orbit 1 — circle cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 animate-[spin_25s_linear_infinite_reverse]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite]">
                <div className="w-[78px] h-[78px] rounded-full bg-white border-[1.5px] border-[#e8ddd0] shadow-[0_6px_20px_rgba(26,18,8,0.1)] flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#C70A24]">
                    AK
                  </div>
                  <div className="text-[10px] font-semibold text-[#1a1208] leading-none">
                    Ahmed
                  </div>
                  <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5">
                    <span className="text-amber-400">★</span> 4.9
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 animate-[spin_25s_linear_infinite]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_25s_linear_infinite_reverse]">
                <div className="w-[78px] h-[78px] rounded-full bg-white border-[1.5px] border-[#e8ddd0] shadow-[0_6px_20px_rgba(26,18,8,0.1)] flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#7c3aed]">
                    SR
                  </div>
                  <div className="text-[10px] font-semibold text-[#1a1208] leading-none">
                    Sara
                  </div>
                  <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5">
                    <span className="text-amber-400">★</span> 4.8
                  </div>
                </div>
              </div>
            </div>

            {/* orbit 2 — circle cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 animate-[spin_35s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_35s_linear_infinite_reverse]">
                <div className="w-[78px] h-[78px] rounded-full bg-white border-[1.5px] border-[#e8ddd0] shadow-[0_6px_20px_rgba(26,18,8,0.1)] flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#059669]">
                    KM
                  </div>
                  <div className="text-[10px] font-semibold text-[#1a1208] leading-none">
                    Karim
                  </div>
                  <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5">
                    <span className="text-amber-400">★</span> 5.0
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 animate-[spin_35s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_35s_linear_infinite]">
                <div className="w-[78px] h-[78px] rounded-full bg-white border-[1.5px] border-[#e8ddd0] shadow-[0_6px_20px_rgba(26,18,8,0.1)] flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#d97706]">
                    NI
                  </div>
                  <div className="text-[10px] font-semibold text-[#1a1208] leading-none">
                    Nadia
                  </div>
                  <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5">
                    <span className="text-amber-400">★</span> 4.7
                  </div>
                </div>
              </div>
            </div>

            {/* orbit 3 — circle cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] animate-[spin_50s_linear_infinite_reverse]">
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]">
                <div className="w-[78px] h-[78px] rounded-full bg-white border-[1.5px] border-[#e8ddd0] shadow-[0_6px_20px_rgba(26,18,8,0.1)] flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#0891b2]">
                    TH
                  </div>
                  <div className="text-[10px] font-semibold text-[#1a1208] leading-none">
                    Tariq
                  </div>
                  <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5">
                    <span className="text-amber-400">★</span> 4.9
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] animate-[spin_50s_linear_infinite]">
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite_reverse]">
                <div className="w-[78px] h-[78px] rounded-full bg-white border-[1.5px] border-[#e8ddd0] shadow-[0_6px_20px_rgba(26,18,8,0.1)] flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform cursor-default">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#be185d]">
                    RA
                  </div>
                  <div className="text-[10px] font-semibold text-[#1a1208] leading-none">
                    Rina
                  </div>
                  <div className="text-[9px] text-[#6b5244] flex items-center gap-0.5">
                    <span className="text-amber-400">★</span> 4.6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.88);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
}
