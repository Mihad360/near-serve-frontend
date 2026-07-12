"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Plus } from "lucide-react";
import { mockJobs } from "@/data/customerMock";
import JobCard from "@/components/customer/JobCard";
import type { JobStatus } from "@/types/job";
import { JOB_STATUS_LABELS } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/shared/app/PageHeader";
import EmptyState from "@/components/shared/app/EmptyState";

const FILTERS: Array<"all" | JobStatus> = [
  "all",
  "open",
  "bidding",
  "booked",
  "in_progress",
  "completed",
  "disputed",
];

export default function CustomerJobsPage() {
  const [filter, setFilter] = useState<"all" | JobStatus>("all");

  const filtered =
    filter === "all"
      ? mockJobs
      : mockJobs.filter((j) => j.status === filter);

  return (
    <div>
      <PageHeader
        eyebrow="Your workspace"
        title="My jobs"
        description="Track bids, bookings, and active work — all in one place."
        action={
          <Link
            href={ROUTES.CUSTOMER_POST_JOB}
            className="app-btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-3 shadow-[0_6px_20px_rgba(199,10,36,0.22)] shrink-0"
          >
            <Plus className="size-4" />
            New job
          </Link>
        }
      />

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 scrollbar-none animate-fade-up hero-delay-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "app-chip shrink-0 rounded-full px-4 py-2 text-sm font-medium border",
              filter === f
                ? "bg-ink text-cream border-ink shadow-[0_4px_14px_rgba(26,18,8,0.15)]"
                : "bg-white/70 text-warm border-border hover:border-border-warm hover:bg-white",
            )}
          >
            {f === "all" ? "All" : JOB_STATUS_LABELS[f]}
            {f !== "all" && (
              <span className="ml-1.5 opacity-60">
                {mockJobs.filter((j) => j.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="size-6" />}
          title="No jobs here"
          description="Try another filter, or post something new — local providers are ready to bid."
          action={
            <Link
              href={ROUTES.CUSTOMER_POST_JOB}
              className="app-btn inline-flex items-center gap-2 rounded-xl bg-brand text-white text-sm font-semibold px-5 py-2.5 shadow-[0_4px_16px_rgba(199,10,36,0.2)]"
            >
              <Plus className="size-4" />
              Post a job
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 md:gap-5">
          {filtered.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
