"use client";

const CATEGORIES = [
  { icon: "🔧", name: "Plumbing", jobs: "240+", x: "8%", y: "12%", delay: "0s" },
  { icon: "⚡", name: "Electrical", jobs: "180+", x: "62%", y: "6%", delay: "0.4s" },
  { icon: "🎨", name: "Painting", jobs: "320+", x: "72%", y: "38%", delay: "0.8s" },
  { icon: "❄️", name: "AC Repair", jobs: "195+", x: "4%", y: "48%", delay: "1.2s" },
  { icon: "🧹", name: "Cleaning", jobs: "410+", x: "38%", y: "62%", delay: "1.6s" },
  { icon: "🪟", name: "Tiling", jobs: "155+", x: "55%", y: "72%", delay: "2s" },
];

export default function ServicesHeroVisual() {
  return (
    <div className="relative w-full max-w-[500px] h-[460px] mx-auto">
      <div className="absolute inset-0 rounded-3xl bg-stone-100/90 shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(199,10,36,0.08)_0%,transparent_55%)]" />

        {/* center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center shadow-md animate-pulse-soft">
          <div className="text-2xl mb-1">🏠</div>
          <div className="text-xs font-bold text-ink text-center leading-tight">
            50+ service
            <br />
            categories
          </div>
        </div>

        {/* orbit line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-dashed border-brand/20 animate-spin-slow" />

        {/* floating category cards */}
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="absolute z-20 animate-float"
            style={{
              left: cat.x,
              top: cat.y,
              animationDelay: cat.delay,
              animationDuration: `${8 + parseFloat(cat.delay) * 2}s`,
            }}
          >
            <div className="bg-white rounded-2xl px-3.5 py-2.5 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default min-w-[110px]">
              <div className="text-xl mb-1">{cat.icon}</div>
              <div className="text-xs font-bold text-ink">{cat.name}</div>
              <div className="text-[10px] text-muted font-medium mt-0.5">{cat.jobs} jobs</div>
            </div>
          </div>
        ))}
      </div>

      {/* side stat */}
      <div
        className="absolute -right-2 top-8 bg-ink text-white rounded-2xl px-4 py-3 shadow-lg animate-scale-in hero-delay-3"
      >
        <div className="text-[10px] text-white/70 font-semibold">Active Providers</div>
        <div className="font-fraunces text-2xl font-bold">840+</div>
      </div>

      <div
        className="absolute -left-2 bottom-12 bg-brand text-white rounded-2xl px-4 py-3 shadow-lg shadow-brand/30 animate-float-slow"
        style={{ animationDelay: "2s" }}
      >
        <div className="text-[10px] font-semibold text-white/90">Avg. Response</div>
        <div className="font-fraunces text-xl font-bold">12 min</div>
      </div>
    </div>
  );
}
