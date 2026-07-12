"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { List, Map as MapIcon, MapPin } from "lucide-react";
import {
  isProviderApproved,
  mockActiveJobs,
  mockFeedJobs,
  PROVIDER_PROFILE,
  JOB_CATEGORIES,
} from "@/data/providerMock";
import FeedJobCard from "@/components/provider/FeedJobCard";
import FeedMap from "@/components/provider/FeedMap";
import PendingApproval from "@/components/provider/PendingApproval";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";
import EmptyState from "@/components/shared/app/EmptyState";

type ViewMode = "list" | "map";

function ProviderFeedContent() {
  const searchParams = useSearchParams();
  const approved = isProviderApproved(searchParams.get("pending"));
  const [view, setView] = useState<ViewMode>("list");
  const [category, setCategory] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return mockFeedJobs
      .filter((j) => (category === "all" ? true : j.category === category))
      .filter((j) => j.distanceKm <= maxDistance)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [category, maxDistance]);

  if (!approved) {
    return <PendingApproval />;
  }

  return (
    <div>
      <PageHeader
        eyebrow={`Near you · ${PROVIDER_PROFILE.serviceRadiusKm} km radius`}
        title="Job feed"
        description="Open jobs nearby. Bid early — customers often pick within the hour."
        action={
          <div className="flex rounded-xl border border-border bg-white/90 p-1 shrink-0 shadow-sm">
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "app-chip inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium",
                view === "list"
                  ? "bg-ink text-cream shadow-sm"
                  : "text-warm hover:text-ink",
              )}
            >
              <List className="size-4" />
              List
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              className={cn(
                "app-chip inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium",
                view === "map"
                  ? "bg-ink text-cream shadow-sm"
                  : "text-warm hover:text-ink",
              )}
            >
              <MapIcon className="size-4" />
              Map
            </button>
          </div>
        }
      />

      {mockActiveJobs.length > 0 && (
        <div className="mb-6 rounded-2xl border border-border bg-ink text-white p-4 md:p-5 relative overflow-hidden animate-fade-up hero-delay-1 shadow-[0_12px_40px_rgba(26,18,8,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_55%)]" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/60 mb-1 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Active work
              </p>
              <p className="font-fraunces text-lg font-semibold">
                {mockActiveJobs.length} job
                {mockActiveJobs.length === 1 ? "" : "s"} in progress
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockActiveJobs.map((job) => (
                <Link
                  key={job.id}
                  href={ROUTES.PROVIDER_ACTIVE(job.id)}
                  className="app-btn rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-2 text-sm font-medium"
                >
                  {job.title.length > 28
                    ? `${job.title.slice(0, 28)}…`
                    : job.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-3 mb-6 animate-fade-up hero-delay-1">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none flex-1">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "app-chip shrink-0 rounded-full px-4 py-2 text-sm font-medium border",
              category === "all"
                ? "bg-ink text-cream border-ink shadow-[0_4px_14px_rgba(26,18,8,0.15)]"
                : "bg-white/70 text-warm border-border hover:border-border-warm hover:bg-white",
            )}
          >
            All
          </button>
          {JOB_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "app-chip shrink-0 rounded-full px-4 py-2 text-sm font-medium border",
                category === c
                  ? "bg-ink text-cream border-ink shadow-[0_4px_14px_rgba(26,18,8,0.15)]"
                  : "bg-white/70 text-warm border-border hover:border-border-warm hover:bg-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 shrink-0 text-sm text-warm bg-white/90 border border-border rounded-xl px-3 py-2 shadow-sm">
          <span className="text-muted whitespace-nowrap">Within</span>
          <select
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="bg-transparent font-medium text-ink focus:outline-none"
          >
            <option value={2}>2 km</option>
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={15}>15 km</option>
          </select>
        </label>
      </div>

      {view === "map" ? (
        <div className="animate-fade-up hero-delay-2 space-y-4">
          <FeedMap
            jobs={filtered}
            center={{ lat: PROVIDER_PROFILE.lat, lng: PROVIDER_PROFILE.lng }}
            className="h-[420px]"
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          {selectedId && (
            <div>
              {filtered
                .filter((j) => j.id === selectedId)
                .map((job) => (
                  <FeedJobCard key={job.id} job={job} />
                ))}
            </div>
          )}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<MapPin className="size-6" />}
          title="No jobs nearby"
          description="Try widening your distance filter or another category — new jobs appear throughout the day."
        />
      ) : (
        <div className="grid gap-4 md:gap-5">
          {filtered.map((job, i) => (
            <FeedJobCard key={job.id} job={job} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProviderFeedPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse space-y-4">
          <div className="h-20 rounded-2xl bg-white/50 border border-border" />
          <div className="h-40 rounded-2xl bg-white/50 border border-border" />
        </div>
      }
    >
      <ProviderFeedContent />
    </Suspense>
  );
}
