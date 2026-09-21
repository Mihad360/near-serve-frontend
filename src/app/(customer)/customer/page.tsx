"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Briefcase, 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  Table as TableIcon, 
  LayoutGrid 
} from "lucide-react";
import { mockJobs } from "@/data/customerMock";
import JobCard from "@/components/customer/JobCard";
import type { Job, JobStatus } from "@/types/job";
import { JOB_STATUS_LABELS, formatCurrency, formatRelativeTime } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";
import EmptyState from "@/components/shared/app/EmptyState";
import UseTable from "@/components/ui/UseTable";
import StatusChip from "@/components/customer/StatusChip";
import { useGetMyJobsQuery } from "@/redux/api/jobApi";
import { useGetCustomerAnalyticsQuery } from "@/redux/api/analyticsApi";

const FILTERS: Array<"all" | JobStatus> = [
  "all",
  "open",
  "bidding",
  "booked",
  "in_progress",
  "completed",
  "disputed",
];

const mapBackendJob = (item: any): Job => ({
  id: item._id || item.id,
  title: item.title || "Untitled Job",
  description: item.description || "",
  category: item.category || "service",
  budget: item.budget || 0,
  status: item.status || "open",
  location: {
    address: item.location?.address || "Service Location",
    lat: item.location?.coordinates?.[1] || 37.7649,
    lng: item.location?.coordinates?.[0] || -122.4214,
  },
  photos: item.photos || [],
  createdAt: item.createdAt || new Date().toISOString(),
  updatedAt: item.updatedAt || new Date().toISOString(),
  providerName: item.selectedProvider?.userId?.name || item.providerName,
  providerId: item.selectedProvider?._id || item.selectedProvider,
  acceptedBidId: item.selectedBid?._id || item.selectedBid,
  bidCount: item.bidCount || 0,
});

export default function CustomerJobsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | JobStatus>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const { data: analyticsResponse } = useGetCustomerAnalyticsQuery({});
  const { data: jobsResponse, isLoading } = useGetMyJobsQuery(
    filter !== "all" ? { status: filter } : {}
  );

  const rawJobs = jobsResponse?.data?.result || jobsResponse?.data;
  const jobs: Job[] = Array.isArray(rawJobs)
    ? rawJobs.map(mapBackendJob)
    : mockJobs;

  const filtered =
    filter === "all"
      ? jobs
      : jobs.filter((j) => j.status === filter);

  const customerStats = analyticsResponse?.data;
  const activeCount = customerStats?.activeJobs ?? jobs.filter((j) => j.status === "open" || j.status === "bidding" || j.status === "in_progress").length;
  const inProgressCount = jobs.filter((j) => j.status === "in_progress" || j.status === "booked").length;
  const completedCount = customerStats?.completedJobs ?? jobs.filter((j) => j.status === "completed").length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Customer Workspace"
        title="My jobs"
        description="Monitor provider bids, track active service orders, and manage completions."
        action={
          <Link
            href={ROUTES.CUSTOMER_POST_JOB}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand hover:bg-brand-dark text-white text-sm font-bold px-6 py-3.5 shadow-md shadow-brand/25 transition-all duration-300 hover:scale-105 shrink-0"
          >
            <Plus className="size-4" />
            <span>Post a Job</span>
          </Link>
        }
      />

      {/* Quick Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4 animate-fade-up">
        <div className="bg-stone-100 rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-brand flex items-center justify-center shadow-xs">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted">Active Requests</div>
            <div className="font-fraunces text-2xl font-bold text-ink">{activeCount}</div>
          </div>
        </div>

        <div className="bg-stone-100 rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-xs">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted">In Progress</div>
            <div className="font-fraunces text-2xl font-bold text-ink">{inProgressCount}</div>
          </div>
        </div>

        <div className="bg-stone-100 rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted">Completed Jobs</div>
            <div className="font-fraunces text-2xl font-bold text-ink">{completedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & View Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-fade-up hero-delay-1">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none flex-1">
          {FILTERS.map((f) => {
            const count = f === "all" ? jobs.length : jobs.filter((j) => j.status === f).length;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5",
                  active
                    ? "bg-ink text-white shadow-xs"
                    : "bg-stone-100 text-warm hover:bg-stone-200/80",
                )}
              >
                <span>{f === "all" ? "All Jobs" : JOB_STATUS_LABELS[f]}</span>
                <span className={cn("text-[10px] px-1.5 py-0.2 rounded-full", active ? "bg-white/20 text-white" : "bg-stone-200 text-muted")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex rounded-2xl bg-stone-100 p-1 shrink-0 self-end sm:self-center shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
              viewMode === "table"
                ? "bg-white text-ink shadow-xs"
                : "text-stone-600 hover:text-ink",
            )}
            title="Table View"
          >
            <TableIcon className="size-3.5" />
            <span>Table</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all",
              viewMode === "grid"
                ? "bg-white text-ink shadow-xs"
                : "text-stone-600 hover:text-ink",
            )}
            title="Card View"
          >
            <LayoutGrid className="size-3.5" />
            <span>Cards</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {filtered.length === 0 ? (
        <div className="bg-stone-100 rounded-3xl p-10 text-center animate-fade-up">
          <EmptyState
            icon={<Briefcase className="size-6 text-brand" />}
            title="No jobs found"
            description="You don't have any jobs matching this filter. Post a new request to get competitive bids from local pros."
            action={
              <Link
                href={ROUTES.CUSTOMER_POST_JOB}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand text-white text-sm font-bold px-6 py-3 shadow-sm hover:bg-brand-dark transition-all"
              >
                <Plus className="size-4" />
                Post your first job
              </Link>
            }
          />
        </div>
      ) : viewMode === "table" ? (
        <div className="bg-stone-100 rounded-3xl p-5 md:p-6 shadow-xs animate-fade-up">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs">
            <UseTable<Job>
              data={filtered}
              hover
              striped
              onRowClick={(row) => router.push(ROUTES.CUSTOMER_JOB(row.id))}
              columns={[
                {
                  key: "title",
                  title: "Job Details",
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
                  title: "Location",
                  render: (row) => (
                    <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                      <MapPin className="size-3.5 text-brand shrink-0" />
                      <span className="truncate max-w-[160px]">{row.location.address}</span>
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
                  key: "bids",
                  title: "Bids",
                  render: (row) => (
                    row.bidCount > 0 ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                        <MessageSquare className="size-3 text-emerald-600" />
                        {row.bidCount} bid{row.bidCount === 1 ? "" : "s"}
                      </span>
                    ) : (
                      <span className="text-xs text-muted">Awaiting bids</span>
                    )
                  ),
                },
                {
                  key: "status",
                  title: "Status",
                  render: (row) => <StatusChip status={row.status} />,
                },
                {
                  key: "updatedAt",
                  title: "Activity",
                  align: "right",
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
                      View <ArrowRight className="size-3.5" />
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
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
