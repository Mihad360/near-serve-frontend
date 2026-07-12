"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { ROUTES } from "@/utils/navigation";

// ─── Image URLs (Unsplash) ───────────────────────────────────────────────────
const P1_IMAGE =
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80";
const P2_IMAGE =
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1600&q=80";
const P3_IMAGE =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1600&q=80";
const P3_DETAIL_1 =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80";
const P3_DETAIL_2 =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80";

// ─── Data Constants ──────────────────────────────────────────────────────────
const TOP_PROVIDERS = [
  { rank: 1, name: "Karim M.", service: "Electrician", area: "Gulshan", rating: 5.0, trust: 97, jobs: 142, badge: "🥇" },
  { rank: 2, name: "Ahmed K.", service: "Plumber", area: "Dhanmondi", rating: 4.9, trust: 94, jobs: 128, badge: "🥈" },
  { rank: 3, name: "Sara R.", service: "Painter", area: "Mirpur", rating: 4.9, trust: 91, jobs: 115, badge: "🥉" },
  { rank: 4, name: "Tariq H.", service: "AC Technician", area: "Banani", rating: 4.8, trust: 89, jobs: 98, badge: null },
  { rank: 5, name: "Nadia I.", service: "Cleaner", area: "Uttara", rating: 4.8, trust: 88, jobs: 87, badge: null },
  { rank: 6, name: "Rina A.", service: "Tiler", area: "Mohammadpur", rating: 4.7, trust: 86, jobs: 76, badge: null },
  { rank: 7, name: "Imran S.", service: "Carpenter", area: "Bashundhara", rating: 4.7, trust: 85, jobs: 71, badge: null },
  { rank: 8, name: "Fatima B.", service: "Electrician", area: "Mirpur", rating: 4.6, trust: 83, jobs: 64, badge: null },
];

const P1 = TOP_PROVIDERS[0];
const P2 = TOP_PROVIDERS[1];
const P3 = TOP_PROVIDERS[2];

const p1FeatureBars = [
  `Trust Score ${P1.trust}`,
  `${P1.jobs} Jobs Completed`,
  `★ ${P1.rating} Rating`,
];

const p2Specialties = [
  { name: "Pipe\nRepair", num: "01", active: true },
  { name: "Leak\nFixing", num: "02", active: false },
  { name: "Bathroom\nFit", num: "03", active: false },
  { name: "Water\nHeater", num: null, active: false },
];

type Period = "week" | "month" | "all";

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

function useStaggeredReveal(threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimStyle = useCallback(
    (index: number): React.CSSProperties => ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${index * 200}ms,
                   transform 1.1s cubic-bezier(0.22,1,0.36,1) ${index * 200}ms`,
    }),
    [visible],
  );

  return { containerRef, getAnimStyle };
}

function useMaskPositions(
  containerRef: React.RefObject<HTMLElement | null>,
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
) {
  const [positions, setPositions] = useState<
    { x: number; y: number; sw: number; sh: number }[]
  >([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePositions = () => {
      const rect = container.getBoundingClientRect();
      const newPositions = cardRefs.current.map((card) => {
        if (!card) return { x: 0, y: 0, sw: rect.width, sh: rect.height };
        const cardRect = card.getBoundingClientRect();
        return {
          x: cardRect.left - rect.left,
          y: cardRect.top - rect.top,
          sw: rect.width,
          sh: rect.height,
        };
      });
      setPositions(newPositions);
    };

    updatePositions();

    const ro = new ResizeObserver(() => updatePositions());
    ro.observe(container);
    window.addEventListener("resize", updatePositions);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePositions);
    };
  }, [containerRef, cardRefs]);

  return positions;
}

function useImageWidth(
  imageUrl: string,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const img = new window.Image();
    img.src = imageUrl;

    const compute = () => {
      if (!img.naturalWidth) return;
      const containerHeight = container.getBoundingClientRect().height;
      setWidth(img.naturalWidth * (containerHeight / img.naturalHeight));
    };

    img.onload = compute;

    const ro = new ResizeObserver(compute);
    ro.observe(container);

    return () => ro.disconnect();
  }, [imageUrl, containerRef]);

  return width;
}

function mergeRefs<T>(
  ...refs: (
    | React.Ref<T>
    | React.MutableRefObject<T | null>
    | null
    | undefined
  )[]
) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

// ─── Components ─────────────────────────────────────────────────────────────

function MaskedCard({
  bgImage,
  position,
  imageWidth,
  focalX = 0.5,
  className = "",
  children,
  cardRef,
  style = {},
}: {
  bgImage: string;
  position: { x: number; y: number; sw: number; sh: number };
  imageWidth: number;
  focalX?: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: React.CSSProperties;
}) {
  const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
  const focalOffset = overflow * focalX;
  const ready = imageWidth > 0 && position.sh > 0;

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        backgroundColor: "#78716c",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: ready ? `auto ${position.sh}px` : "cover",
        backgroundPosition: ready
          ? `${-(position.x + focalOffset)}px ${-position.y}px`
          : "center",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function RankBadge({
  rank,
  light = false,
}: {
  rank: number;
  light?: boolean;
}) {
  if (light) {
    return (
      <div className="inline-flex items-center gap-2.5">
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ink text-white text-sm font-bold shadow-md">
          {rank}
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            Rank
          </span>
          <span className="text-xs font-bold text-ink">Top Provider</span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/25 rounded-full pl-1.5 pr-4 py-1.5 shadow-lg">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white text-xs font-bold">
        {rank}
      </span>
      <span className="text-white/90 text-[10px] font-semibold uppercase tracking-[0.12em]">
        Top Provider
      </span>
    </div>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setExiting(true), 400);
        setTimeout(() => onComplete(), 1400);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-ink flex flex-col items-start justify-end transition-opacity duration-1000 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute top-8 left-6 md:left-10">
        <span className="font-fraunces text-xl font-bold text-white">
          Near<span className="text-brand">Serve</span>
        </span>
        <p className="text-white/50 text-xs mt-1">Top providers leaderboard</p>
      </div>
      <div className="text-7xl md:text-9xl font-fraunces font-bold tabular-nums p-6 md:p-10 leading-none text-white">
        {count}
        <span className="text-brand">%</span>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function LeaderboardPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [period, setPeriod] = useState<Period>("week");

  const section1Ref = useRef<HTMLElement | null>(null);
  const section2Ref = useRef<HTMLElement | null>(null);

  const s1CardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const s2CardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const s1Reveal = useStaggeredReveal(0.1);
  const s2Reveal = useStaggeredReveal(0.1);
  const s3Reveal = useStaggeredReveal(0.1);
  const s4Reveal = useStaggeredReveal(0.08);

  const isMobile = useIsMobile();

  const s1Positions = useMaskPositions(section1Ref, s1CardRefs);
  const s2Positions = useMaskPositions(section2Ref, s2CardRefs);

  const s1ImageWidth = useImageWidth(P1_IMAGE, section1Ref);
  const s2ImageWidth = useImageWidth(P2_IMAGE, section2Ref);

  const focalX1 = isMobile ? 0.7 : 0.8;
  const focalX2 = isMobile ? 0.65 : 0.8;

  return (
    <div className="bg-white min-h-screen">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {/* ─── SECTION 1: #1 PROVIDER — KARIM M. ───────────────────────────── */}
      <section
        ref={mergeRefs(section1Ref, s1Reveal.containerRef)}
        className="h-screen w-full overflow-hidden flex flex-col pt-24 md:pt-24 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        {p1FeatureBars.map((text, i) => (
          <MaskedCard
            key={i}
            bgImage={P1_IMAGE}
            position={s1Positions[i] || { x: 0, y: 0, sw: 0, sh: 0 }}
            imageWidth={s1ImageWidth}
            focalX={focalX1}
            className="w-full h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative"
            cardRef={(el) => {
              s1CardRefs.current[i] = el;
            }}
            style={s1Reveal.getAnimStyle(i)}
          >
            <span className="flex items-center justify-center h-full text-black text-lg md:text-3xl font-bold text-center relative z-10">
              {text}
            </span>
          </MaskedCard>
        ))}

        <MaskedCard
          bgImage={P1_IMAGE}
          position={s1Positions[3] || { x: 0, y: 0, sw: 0, sh: 0 }}
          imageWidth={s1ImageWidth}
          focalX={focalX1}
          className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative"
          cardRef={(el) => {
            s1CardRefs.current[3] = el;
          }}
          style={s1Reveal.getAnimStyle(3)}
        >
          <div className="absolute top-4 left-4 md:top-7 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[220px] md:max-w-[300px] z-10 drop-shadow-md">
            {P1.service} · {P1.area}
            <br />
            Admin-verified · Trust {P1.trust}
          </div>

          <div className="absolute top-4 right-4 md:top-7 md:right-7 z-10">
            <RankBadge rank={P1.rank} />
          </div>

          <div className="absolute bottom-5 left-3 md:bottom-8 md:left-4 z-10">
            <span className="block text-white text-xs md:text-sm font-semibold mb-1 md:mb-2 drop-shadow-md">
              Top Rated This Week
            </span>
            <h1 className="text-white text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.85] tracking-tight drop-shadow-lg">
              {P1.name.split(" ")[0]}
              <br />
              {P1.name.split(" ")[1]}
            </h1>
          </div>

          <div className="absolute bottom-6 right-4 md:bottom-10 md:right-8 z-10">
            <Link
              href={ROUTES.CUSTOMER_POST_JOB}
              className="inline-block bg-brand text-white text-xs md:text-sm font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-brand-dark transition-colors duration-300"
            >
              Post a Job — Free
            </Link>
          </div>
        </MaskedCard>
      </section>
      {/* ─── SECTION 2: #2 PROVIDER — AHMED K. ───────────────────────────── */}
      <section
        ref={mergeRefs(section2Ref, s2Reveal.containerRef)}
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
          <MaskedCard
            bgImage={P2_IMAGE}
            position={s2Positions[0] || { x: 0, y: 0, sw: 0, sh: 0 }}
            imageWidth={s2ImageWidth}
            focalX={focalX2}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
            cardRef={(el) => {
              s2CardRefs.current[0] = el;
            }}
            style={s2Reveal.getAnimStyle(0)}
          >
            <div className="absolute top-4 left-5 md:top-6 md:left-7 z-10">
              <RankBadge rank={P2.rank} />
            </div>
            <div className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white text-xs md:text-sm font-semibold z-10 drop-shadow-md">
              {P2.name} · {P2.service}
            </div>
          </MaskedCard>

          <MaskedCard
            bgImage={P2_IMAGE}
            position={s2Positions[1] || { x: 0, y: 0, sw: 0, sh: 0 }}
            imageWidth={s2ImageWidth}
            focalX={focalX2}
            className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
            cardRef={(el) => {
              s2CardRefs.current[1] = el;
            }}
            style={s2Reveal.getAnimStyle(1)}
          >
            <div className="absolute bottom-16 left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10 drop-shadow-md">
              Trust {P2.trust} · {P2.jobs} jobs done
              <br />
              {P2.area} · ★ {P2.rating}
            </div>
            <Link
              href={ROUTES.SERVICES}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold z-10 hover:scale-105 transition-transform duration-500"
            >
              Hire {P2.name.split(" ")[0]}
            </Link>
          </MaskedCard>

          <MaskedCard
            bgImage={P2_IMAGE}
            position={s2Positions[2] || { x: 0, y: 0, sw: 0, sh: 0 }}
            imageWidth={s2ImageWidth}
            focalX={focalX2}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
            cardRef={(el) => {
              s2CardRefs.current[2] = el;
            }}
            style={s2Reveal.getAnimStyle(2)}
          >
            <div className="absolute top-4 left-5 md:top-6 md:left-7 text-white text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] z-10 drop-shadow-md">
              Ahmed
              <br />
              K.
            </div>
          </MaskedCard>

          <MaskedCard
            bgImage={P2_IMAGE}
            position={s2Positions[3] || { x: 0, y: 0, sw: 0, sh: 0 }}
            imageWidth={s2ImageWidth}
            focalX={focalX2}
            className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
            cardRef={(el) => {
              s2CardRefs.current[3] = el;
            }}
            style={s2Reveal.getAnimStyle(3)}
          >
            <div className="absolute inset-0 z-10 flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 p-2 md:p-3">
              {p2Specialties.map((svc) => (
                <div
                  key={svc.num || svc.name}
                  className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${
                    svc.active
                      ? "bg-white/90 backdrop-blur-md"
                      : "bg-white/20 backdrop-blur-xl"
                  }`}
                >
                  <h3
                    className={`text-xl md:text-4xl font-bold leading-[1.05] whitespace-pre-line ${
                      svc.active ? "text-black" : "text-white"
                    }`}
                  >
                    {svc.name}
                  </h3>
                  {svc.num && (
                    <div
                      className={`self-end w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold ${
                        svc.active
                          ? "border-black text-black"
                          : "border-white text-white"
                      }`}
                    >
                      {svc.num}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </MaskedCard>
        </div>
      </section>
      {/* ─── SECTION 3: #3 PROVIDER — SARA R. ────────────────────────────── */}
      <section
        ref={mergeRefs(s3Reveal.containerRef)}
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div
              className="rounded-xl md:rounded-2xl bg-stone-50 p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[180px] md:min-h-0"
              style={s3Reveal.getAnimStyle(0)}
            >
              <div>
                <RankBadge rank={P3.rank} light />
                <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] text-black mt-4">
                  {P3.name.split(" ")[0]}
                  <br />
                  {P3.name.split(" ")[1]}
                </h2>
              </div>
              <p className="text-xs md:text-sm font-semibold text-black">
                {P3.service} · {P3.area} · Trust {P3.trust}
              </p>
            </div>

            <div
              className="flex gap-1.5 md:gap-2 flex-1 min-h-[140px] md:min-h-0"
              style={s3Reveal.getAnimStyle(1)}
            >
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden relative">
                <Image
                  src={P3_DETAIL_1}
                  alt={`${P3.name} painting work`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
              </div>
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden relative">
                <Image
                  src={P3_DETAIL_2}
                  alt={`${P3.name} completed project`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
              </div>
            </div>

            <div
              className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[160px] md:min-h-0"
              style={s3Reveal.getAnimStyle(2)}
            >
              <div>
                <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">
                  ★ {P3.rating} · {P3.jobs} jobs completed
                </p>
                <h3 className="text-xl md:text-3xl font-bold text-black leading-6 md:leading-8">
                  Hire
                  <br />
                  {P3.name.split(" ")[0]}
                  <br />
                  Today
                </h3>
              </div>
              <Link
                href={ROUTES.CUSTOMER_POST_JOB}
                className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform duration-500"
              >
                Post Job
              </Link>
            </div>
          </div>

          <div
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[350px] md:min-h-0"
            style={s3Reveal.getAnimStyle(3)}
          >
            <Image
              src={P3_IMAGE}
              alt={`${P3.name} painting work`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />

            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-ink text-xs font-semibold px-3 py-1.5 rounded-full border border-white/50 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {P3.service}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2">
              <Link
                href={ROUTES.CUSTOMER_POST_JOB}
                className="flex-1 bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52 hover:scale-[1.02] transition-transform duration-500"
              >
                <h4 className="text-lg md:text-2xl font-bold text-black leading-5 md:leading-7">
                  {P3.jobs}
                  <br />
                  Jobs
                  <br />
                  Done
                </h4>
                <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg]"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                href={ROUTES.FOR_PROVIDERS}
                className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52 hover:bg-white/30 transition-colors duration-500"
              >
                <h4 className="text-lg md:text-2xl font-bold text-white leading-5 md:leading-7">
                  Trust
                  <br />
                  Score
                  <br />
                  {P3.trust}
                </h4>
                <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg]"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: LEADERBOARD RANKINGS ──────────────────────────────── */}
      <section
        ref={mergeRefs(s4Reveal.containerRef)}
        className="min-h-screen w-full bg-cream px-3 md:px-5 py-8 md:py-12"
      >
        <div className="max-w-5xl mx-auto">
          <div style={s4Reveal.getAnimStyle(0)} className="text-center mb-10 md:mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand mb-3">
              Live rankings
            </span>
            <h2 className="font-fraunces text-4xl md:text-6xl font-bold text-ink leading-[0.95]">
              Top Providers
            </h2>
            <p className="text-muted mt-3 text-sm md:text-base max-w-md mx-auto">
              Ranked by trust score, completed jobs, and customer ratings
            </p>

            <div className="mt-6 inline-flex bg-white border border-border rounded-full p-1 gap-1">
              {(
                [
                  { key: "week" as Period, label: "This week" },
                  { key: "month" as Period, label: "This month" },
                  { key: "all" as Period, label: "All time" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPeriod(tab.key)}
                  className={`text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-500 ${
                    period === tab.key
                      ? "bg-ink text-white"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top 3 podium */}
          <div
            className="grid grid-cols-3 gap-2 md:gap-4 mb-8 items-end"
            style={s4Reveal.getAnimStyle(1)}
          >
            {[TOP_PROVIDERS[1], TOP_PROVIDERS[0], TOP_PROVIDERS[2]].map((p) => {
              const isFirst = p.rank === 1;
              return (
                <div
                  key={p.rank}
                  className={`rounded-2xl border text-center p-4 md:p-6 transition-all duration-500 ${
                    isFirst
                      ? "bg-ink text-white border-ink pb-8 md:pb-10 scale-105 shadow-xl"
                      : "bg-white border-border"
                  }`}
                >
                  <div className="text-2xl md:text-3xl mb-2">{p.badge}</div>
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full mx-auto flex items-center justify-center text-sm font-bold mb-2 ${
                      isFirst ? "bg-brand text-white" : "bg-brand/10 text-brand"
                    }`}
                  >
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div
                    className={`font-semibold text-sm md:text-base ${isFirst ? "text-white" : "text-ink"}`}
                  >
                    {p.name}
                  </div>
                  <div
                    className={`text-[10px] md:text-xs mt-0.5 ${isFirst ? "text-white/60" : "text-muted"}`}
                  >
                    {p.service}
                  </div>
                  <div
                    className={`font-fraunces text-xl md:text-2xl font-bold mt-2 ${isFirst ? "text-brand" : "text-ink"}`}
                  >
                    {p.trust}
                  </div>
                  <div
                    className={`text-[10px] ${isFirst ? "text-white/50" : "text-muted"}`}
                  >
                    trust score
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full list */}
          <div className="space-y-2" style={s4Reveal.getAnimStyle(2)}>
            {TOP_PROVIDERS.slice(3).map((p, i) => (
              <div
                key={p.rank}
                className="flex items-center gap-4 bg-white border border-border rounded-2xl px-4 md:px-6 py-4 hover:border-brand/30 hover:shadow-[0_4px_20px_rgba(26,18,8,0.06)] transition-all duration-500"
                style={s4Reveal.getAnimStyle(i + 3)}
              >
                <span className="font-fraunces text-lg md:text-xl font-bold text-muted w-8 text-center">
                  {p.rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-bold shrink-0">
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink text-sm md:text-base truncate">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted">
                    {p.service} · {p.area}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-yellow-500 text-xs">
                  ★ {p.rating}
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-ink text-sm">{p.trust}</div>
                  <div className="text-[10px] text-muted">{p.jobs} jobs</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center" style={s4Reveal.getAnimStyle(10)}>
            <p className="text-sm text-muted mb-4">
              Want to climb the leaderboard?
            </p>
            <Link
              href={ROUTES.FOR_PROVIDERS}
              className="inline-block bg-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-dark transition-colors duration-300"
            >
              Join as a provider →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
