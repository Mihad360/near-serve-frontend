"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type { FeedJob } from "@/types/job";

const FeedMapInner = dynamic(() => import("./FeedMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[280px] rounded-2xl bg-[#f0ebe4] animate-pulse flex items-center justify-center">
      <span className="text-sm text-muted">Loading map…</span>
    </div>
  ),
});

type FeedMapProps = {
  jobs: FeedJob[];
  center?: { lat: number; lng: number };
  className?: string;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

export default function FeedMap({
  jobs,
  center,
  className,
  selectedId,
  onSelect,
}: FeedMapProps) {
  return (
    <div
      className={cn(
        "map-chrome relative overflow-hidden rounded-2xl border border-border shadow-[0_8px_32px_rgba(26,18,8,0.07)]",
        className,
      )}
    >
      <FeedMapInner
        jobs={jobs}
        center={center}
        selectedId={selectedId}
        onSelect={onSelect}
      />
      <div className="absolute top-3 left-3 z-[1000] inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm border border-border px-3 py-1.5 text-xs font-medium text-ink shadow-[0_4px_16px_rgba(26,18,8,0.1)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-50 animate-ping" />
          <span className="relative size-2 rounded-full bg-brand" />
        </span>
        {jobs.length} nearby job{jobs.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}
