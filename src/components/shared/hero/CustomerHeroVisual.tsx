"use client";

import { useEffect, useState } from "react";

const BIDS = [
  { name: "Ahmed K.", price: "৳8,500", trust: 94, color: "#C70A24", delay: "0.6s" },
  { name: "Karim M.", price: "৳9,200", trust: 97, color: "#059669", delay: "1.1s" },
  { name: "Sara R.", price: "৳7,800", trust: 88, color: "#7c3aed", delay: "1.6s" },
];

export default function CustomerHeroVisual() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full max-w-[520px] h-[480px] mx-auto select-none">
      {/* glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(199,10,36,0.14)_0%,transparent_70%)] animate-pulse-soft" />

      {/* orbit rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-dashed border-brand/15 animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-dashed border-brand/10 animate-spin-slower" />

      {/* center job card */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-52 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="bg-white border-[1.5px] border-border rounded-2xl p-4 shadow-[0_12px_48px_rgba(26,18,8,0.12)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
              Your job
            </span>
          </div>
          <div className="font-semibold text-sm text-ink leading-snug">
            Bathroom tiling
          </div>
          <div className="text-[11px] text-muted mt-1">Mirpur · This weekend</div>
          <div
            className={`mt-3 text-[10px] font-semibold rounded-full px-2.5 py-1 w-fit transition-all duration-700 ${
              phase >= 2
                ? "bg-brand/10 text-brand"
                : "bg-cream text-muted"
            }`}
          >
            {phase >= 2 ? "3 bids received" : "Matching providers..."}
          </div>
        </div>
      </div>

      {/* bid cards orbiting */}
      {BIDS.map((bid, i) => {
        const angles = [-30, 150, 270];
        const radius = 155;
        const angle = (angles[i] * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isWinner = phase >= 3 && i === 0;

        return (
          <div
            key={bid.name}
            className="absolute top-1/2 left-1/2 z-10 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translate(calc(-50% + ${phase >= 2 ? x : 0}px), calc(-50% + ${phase >= 2 ? y : 0}px))`,
              opacity: phase >= 2 ? 1 : 0,
              transitionDelay: bid.delay,
            }}
          >
            <div
              className={`bg-white border-[1.5px] rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 whitespace-nowrap shadow-[0_6px_24px_rgba(26,18,8,0.1)] transition-all duration-700 ${
                isWinner
                  ? "border-brand scale-105 shadow-[0_8px_32px_rgba(199,10,36,0.25)]"
                  : "border-border"
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ backgroundColor: bid.color }}
              >
                {bid.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="text-xs font-semibold text-ink">{bid.name}</div>
                <div className="text-[10px] text-muted">
                  {bid.price} · Trust {bid.trust}
                </div>
              </div>
              {isWinner && (
                <span className="text-[9px] bg-brand text-white rounded-full px-2 py-0.5 font-bold ml-1 animate-scale-in">
                  Picked
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* escrow badge */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2 bg-ink text-white rounded-full px-4 py-2 text-xs font-semibold shadow-lg">
          <span>🔒</span>
          <span>৳8,500 held in escrow</span>
        </div>
      </div>

      {/* floating tags */}
      <div className="absolute top-8 right-4 bg-white border border-border rounded-full px-3 py-1.5 text-[10px] font-semibold text-muted animate-float shadow-sm">
        AI matched
      </div>
      <div
        className="absolute bottom-20 left-2 bg-white border border-border rounded-full px-3 py-1.5 text-[10px] font-semibold text-brand animate-float-slow shadow-sm"
        style={{ animationDelay: "1.5s" }}
      >
        ✓ Verified only
      </div>
    </div>
  );
}
