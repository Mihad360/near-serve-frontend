"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MessageSquare,
  Navigation,
  Check,
  Play,
} from "lucide-react";
import {
  getFeedJobById,
  getProviderConversationForJob,
  formatDistance,
} from "@/data/providerMock";
import JobMap from "@/components/customer/JobMap";
import StatusChip from "@/components/customer/StatusChip";
import {
  formatCurrency,
  formatDateTime,
  JOB_STATUS_LABELS,
} from "@/lib/customer/format";
import type { JobStatus } from "@/types/job";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import Avatar from "@/components/shared/app/Avatar";

const TIMELINE: JobStatus[] = [
  "booked",
  "in_progress",
  "completed",
];

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default function ActiveJobPage({ params }: PageProps) {
  const { jobId } = use(params);
  const job = getFeedJobById(jobId);
  const conversation = getProviderConversationForJob(jobId);
  const [status, setStatus] = useState<JobStatus | null>(job?.status ?? null);
  const [sharing, setSharing] = useState(false);

  if (!job || (job.status !== "booked" && job.status !== "in_progress" && job.status !== "completed")) {
    if (!job) {
      return (
        <div className="py-20 text-center animate-fade-up">
          <h1 className="font-fraunces text-2xl text-ink mb-3">
            Active job not found
          </h1>
          <Link
            href={ROUTES.PROVIDER_HOME}
            className="text-brand font-medium text-sm"
          >
            Back to feed
          </Link>
        </div>
      );
    }
  }

  const currentStatus = status ?? job.status;
  const statusIndex = Math.max(0, TIMELINE.indexOf(currentStatus as typeof TIMELINE[number]));

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <Link
          href={ROUTES.PROVIDER_HOME}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-5 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Job feed
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <StatusChip status={currentStatus} />
          <span className="text-xs text-muted rounded-full bg-white/70 border border-border px-2.5 py-0.5">
            {job.category}
          </span>
        </div>

        <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink leading-tight max-w-xl tracking-tight">
          {job.title}
        </h1>
        <p className="mt-3 text-muted leading-relaxed max-w-xl">
          {job.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-warm">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand" />
            {job.location.address}
          </span>
          <span className="font-semibold text-ink tabular-nums">
            {formatCurrency(job.budget)}
          </span>
          <span>{job.customerName}</span>
          {"distanceKm" in job && (
            <span className="inline-flex items-center gap-1">
              <Navigation className="size-3.5" />
              {formatDistance(job.distanceKm)}
            </span>
          )}
        </div>
      </div>

      <section className="app-surface rounded-2xl p-5 md:p-6 animate-fade-up hero-delay-1">
        <h2 className="font-fraunces text-lg font-semibold text-ink mb-5">
          Job progress
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          {TIMELINE.map((step, i) => {
            const done = i <= statusIndex;
            const current = i === statusIndex;
            return (
              <div key={step} className="flex sm:flex-1 items-center gap-3 sm:gap-0">
                <div className="flex sm:flex-col items-center gap-2 sm:gap-1.5 sm:flex-1">
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 transition-shadow duration-500",
                      done
                        ? "bg-brand border-brand text-white"
                        : "bg-cream border-border text-muted",
                      current && "ring-4 ring-brand/15 animate-status-glow",
                    )}
                  >
                    {done ? <Check className="size-3.5" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium sm:text-center",
                      done ? "text-ink" : "text-muted",
                    )}
                  >
                    {JOB_STATUS_LABELS[step]}
                  </span>
                </div>
                {i < TIMELINE.length - 1 && (
                  <div
                    className={cn(
                      "hidden sm:block h-0.5 flex-1 mx-1 rounded-full transition-colors duration-500",
                      i < statusIndex ? "bg-brand" : "bg-border",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <section className="animate-fade-up hero-delay-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-fraunces text-lg font-semibold text-ink">
                Location share
              </h2>
              {sharing && (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-brand">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                  Sharing (preview)
                </span>
              )}
            </div>
            <JobMap
              lat={job.location.lat}
              lng={job.location.lng}
              label={job.location.address}
              className="h-[280px]"
              showProviderEnRoute={
                sharing || currentStatus === "in_progress"
              }
            />
            <p className="mt-2 text-xs text-muted">
              Live socket location will plug in here later. Toggle below to
              preview the en-route map state.
            </p>
          </section>
        </div>

        <aside className="lg:col-span-2 space-y-4 animate-fade-up hero-delay-2">
          {currentStatus === "booked" && (
            <button
              type="button"
              onClick={() => {
                setStatus("in_progress");
                setSharing(true);
              }}
              className="app-btn w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold py-3.5 shadow-[0_6px_20px_rgba(199,10,36,0.22)]"
            >
              <Play className="size-4" />
              Set in progress
            </button>
          )}

          {currentStatus === "in_progress" && (
            <button
              type="button"
              onClick={() => setSharing((v) => !v)}
              className={cn(
                "app-btn w-full rounded-xl text-sm font-semibold py-3.5 border",
                sharing
                  ? "bg-[#e8f5e9] text-[#1b5e20] border-transparent"
                  : "bg-white text-ink border-border hover:border-border-warm",
              )}
            >
              {sharing ? "Location sharing on" : "Start location share"}
            </button>
          )}

          {conversation && (
            <Link
              href={ROUTES.PROVIDER_CONVERSATION(conversation.id)}
              className="app-surface app-surface-hover flex items-center gap-3 rounded-2xl p-4"
            >
              <div className="size-10 rounded-full bg-cream flex items-center justify-center text-brand border border-border">
                <MessageSquare className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">
                  Chat with {conversation.participantName}
                </p>
                <p className="text-xs text-muted truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </Link>
          )}

          <div className="app-surface rounded-2xl p-4 flex items-center gap-3">
            <Avatar name={job.customerName} size="sm" />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-0.5">
                Customer
              </p>
              <p className="font-semibold text-ink">{job.customerName}</p>
              <p className="text-xs text-muted mt-1">
                Updated {formatDateTime(job.updatedAt)}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
