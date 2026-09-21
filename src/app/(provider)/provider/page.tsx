"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Table as TableIcon, 
  LayoutGrid, 
  Map as MapIcon, 
  MapPin, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Navigation, 
  Users, 
  Clock 
} from "lucide-react";
import {
  isProviderApproved,
  mockActiveJobs,
  mockFeedJobs,
  PROVIDER_PROFILE,
  JOB_CATEGORIES,
  formatDistance,
} from "@/data/providerMock";
import FeedJobCard from "@/components/provider/FeedJobCard";
import FeedMap from "@/components/provider/FeedMap";
import PendingApproval from "@/components/provider/PendingApproval";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";
import EmptyState from "@/components/shared/app/EmptyState";
import UseTable from "@/components/ui/UseTable";
import StatusChip from "@/components/customer/StatusChip";
import { formatCurrency, formatRelativeTime } from "@/lib/customer/format";
import type { FeedJob } from "@/types/job";
import { useGetJobFeedQuery } from "@/redux/api/jobApi";

type ViewMode = "table" | "cards" | "map";

const mapBackendFeedJob = (j: any): FeedJob => ({
  id: j._id || j.id,
  title: j.title || "Service Job",
  description: j.description || "",
  category: j.category || "General",
  budget: j.budget || 0,
  distanceKm: j.distanceKm || 3.2,
  customerName: j.customerId?.name || "Verified Customer",
  status: j.status || "open",
  location: {
    address: j.location?.address || "Nearby Service Area",
    lat: j.location?.coordinates?.[1] || 23.8103,
    lng: j.location?.coordinates?.[0] || 90.4125,
  },
  photos: j.photos || [],
  createdAt: j.createdAt || new Date().toISOString(),
  updatedAt: j.updatedAt || new Date().toISOString(),
  bidCount: j.bidCount || 0,
});

function ProviderFeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const approved = isProviderApproved(searchParams.get("pending"));
  const [view, setView] = useState<ViewMode>("table");
  const [category, setCategory] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: feedResponse } = useGetJobFeedQuery({
    radius: maxDistance,
    category: category !== "all" ? category : undefined,
  });

  const rawFeed = feedResponse?.data?.result || feedResponse?.data;
  const feedJobs: FeedJob[] =
    Array.isArray(rawFeed) && rawFeed.length > 0
      ? rawFeed.map(mapBackendFeedJob)
      : mockFeedJobs;

  const filtered = useMemo(() => {
    return feedJobs
      .filter((j) => (category === "all" ? true : j.category.toLowerCase() === category.toLowerCase()))
      .filter((j) => j.distanceKm <= maxDistance)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [category, maxDistance, feedJobs]);

  if (!approved) {
    return <PendingApproval />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={`Verified Radius · ${PROVIDER_PROFILE.serviceRadiusKm} km coverage`}
        title="Available job feed"
        description="Fresh jobs posted in your service area. Quote quickly to win jobs before competing pros."
        action={
          <div className="flex rounded-2xl bg-stone-100 p-1 shrink-0 shadow-xs">
            <button
              type="button"
              onClick={() => setView("table")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all",
                view === "table"
                  ? "bg-white text-ink shadow-xs"
                  : "text-stone-600 hover:text-ink",
              )}
            >
              <TableIcon className="size-3.5" />
              Table
            </button>
            <button
              type="button"
              onClick={() => setView("cards")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all",
                view === "cards"
                  ? "bg-white text-ink shadow-xs"
                  : "text-stone-600 hover:text-ink",
              )}
            >
              <LayoutGrid className="size-3.5" />
              Cards
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all",
                view === "map"
                  ? "bg-white text-ink shadow-xs"
                  : "text-stone-600 hover:text-ink",
              )}
            >
              <MapIcon className="size-3.5" />
              Map
            </button>
          </div>
        }
      />

      {/* Top Performance & Active Jobs Banner */}
      <div className="grid md:grid-cols-3 gap-4 animate-fade-up">
        <div className="bg-ink text-white rounded-3xl p-6 relative overflow-hidden shadow-lg md:col-span-2 flex flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.45)_0%,transparent_60%)]" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
                <span>Active Work in Progress</span>
              </div>
              <h2 className="font-fraunces text-2xl md:text-3xl font-bold">
                {mockActiveJobs.length} Ongoing Job{mockActiveJobs.length === 1 ? "" : "s"}
              </h2>
              <p className="text-xs text-white/70 mt-1">
                Funds are secured. Complete tasks and request sign-off for instant payouts.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockActiveJobs.map((job) => (
                <Link
                  key={job.id}
                  href={ROUTES.PROVIDER_ACTIVE(job.id)}
                  className="rounded-2xl bg-white/15 hover:bg-white/25 px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>{job.title.length > 22 ? `${job.title.slice(0, 22)}…` : job.title}</span>
                  <ArrowRight className="size-3.5 text-brand" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-stone-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase tracking-wider mb-2">
              <TrendingUp className="size-4 text-emerald-600" />
              <span>Today&apos;s Potential</span>
            </div>
            <div className="font-fraunces text-2xl font-bold text-ink">
              {filtered.length} Jobs Nearby
            </div>
            <p className="text-xs text-muted mt-1">
              Estimated pipeline: ৳{filtered.reduce((acc, j) => acc + j.budget, 0).toLocaleString()}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-stone-700">
            <span>Reputation score</span>
            <span className="text-amber-600 flex items-center gap-1">⭐ 4.9 / 5.0</span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row gap-3 animate-fade-up hero-delay-1">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none flex-1">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-200",
              category === "all"
                ? "bg-ink text-white shadow-xs"
                : "bg-stone-100 text-warm hover:bg-stone-200/80",
            )}
          >
            All Categories ({mockFeedJobs.length})
          </button>
          {JOB_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-200",
                category === c
                  ? "bg-brand text-white shadow-xs"
                  : "bg-stone-100 text-warm hover:bg-stone-200/80",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 shrink-0 text-xs font-bold text-warm bg-stone-100 rounded-2xl px-4 py-2.5 shadow-xs">
          <span className="text-muted whitespace-nowrap">Distance:</span>
          <select
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="bg-transparent font-bold text-ink focus:outline-none cursor-pointer"
          >
            <option value={2}>Within 2 km</option>
            <option value={5}>Within 5 km</option>
            <option value={10}>Within 10 km</option>
            <option value={15}>Within 15 km</option>
          </select>
        </label>
      </div>

      {/* View Content */}
      {view === "map" ? (
        <div className="animate-fade-up hero-delay-2 space-y-4">
          <FeedMap
            jobs={filtered}
            center={{ lat: PROVIDER_PROFILE.lat, lng: PROVIDER_PROFILE.lng }}
            className="h-[440px] rounded-3xl overflow-hidden shadow-xs"
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
        <div className="bg-stone-100 rounded-3xl p-10 text-center animate-fade-up">
          <EmptyState
            icon={<MapPin className="size-6 text-brand" />}
            title="No jobs found within this range"
            description="Try increasing your distance radius or switching categories to discover more jobs."
          />
        </div>
      ) : view === "table" ? (
        <div className="bg-stone-100 rounded-3xl p-5 md:p-6 shadow-xs animate-fade-up">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs">
            <UseTable<FeedJob>
              data={filtered}
              hover
              striped
              onRowClick={(row) => router.push(ROUTES.PROVIDER_JOB(row.id))}
              columns={[
                {
                  key: "title",
                  title: "Job Title",
                  render: (row) => (
                    <div className="py-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm hover:text-brand transition-colors">
                          {row.title}
                        </span>
                        <span className="text-[10px] font-bold text-muted bg-stone-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {row.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1 max-w-md">
                        {row.description}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "location",
                  title: "Location & Distance",
                  render: (row) => (
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                        <MapPin className="size-3 text-brand shrink-0" />
                        <span className="truncate max-w-[140px]">{row.location.address}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500">
                        <Navigation className="size-2.5 text-brand" />
                        {formatDistance(row.distanceKm)} away
                      </span>
                    </div>
                  ),
                },
                {
                  key: "budget",
                  title: "Budget",
                  render: (row) => (
                    <span className="font-fraunces font-bold text-ink text-sm tabular-nums">
                      {formatCurrency(row.budget)}
                    </span>
                  ),
                },
                {
                  key: "bidCount",
                  title: "Competition",
                  render: (row) => (
                    row.bidCount > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-900 font-bold bg-amber-50 px-2.5 py-1 rounded-full">
                        <Users className="size-3 text-amber-700" />
                        {row.bidCount} bid{row.bidCount === 1 ? "" : "s"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                        ⚡ Be 1st
                      </span>
                    )
                  ),
                },
                {
                  key: "posted",
                  title: "Posted",
                  render: (row) => (
                    <span className="text-xs text-muted tabular-nums">
                      {formatRelativeTime(row.updatedAt)}
                    </span>
                  ),
                },
                {
                  key: "action",
                  title: "",
                  align: "right",
                  render: (row) => (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">
                      Submit Bid <ArrowRight className="size-3.5" />
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-5 animate-fade-up">
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
          <div className="h-24 rounded-3xl bg-stone-100" />
          <div className="h-48 rounded-3xl bg-stone-100" />
        </div>
      }
    >
      <ProviderFeedContent />
    </Suspense>
  );
}
