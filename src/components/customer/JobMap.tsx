"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const JobMapInner = dynamic(() => import("./JobMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#f0ebe4] animate-pulse flex items-center justify-center">
      <span className="text-sm text-muted">Loading map…</span>
    </div>
  ),
});

type JobMapProps = {
  lat: number;
  lng: number;
  label?: string;
  className?: string;
  showProviderEnRoute?: boolean;
  providerOffset?: { lat: number; lng: number };
};

export default function JobMap({
  lat,
  lng,
  label,
  className,
  showProviderEnRoute,
  providerOffset,
}: JobMapProps) {
  return (
    <div
      className={cn(
        "map-chrome relative overflow-hidden rounded-2xl border border-border shadow-[0_8px_32px_rgba(26,18,8,0.07)]",
        className,
      )}
    >
      <JobMapInner
        lat={lat}
        lng={lng}
        label={label}
        showProviderEnRoute={showProviderEnRoute}
        providerOffset={providerOffset}
      />
      {showProviderEnRoute && (
        <div className="absolute top-3 left-3 z-[1000] inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm border border-border px-3 py-1.5 text-xs font-medium text-ink shadow-[0_4px_16px_rgba(26,18,8,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Provider en route
        </div>
      )}
    </div>
  );
}
