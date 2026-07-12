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
  ArrowRight,
  Flag,
} from "lucide-react";
import { toast } from "sonner";
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

const TIMELINE: JobStatus[] = ["booked", "in_progress", "completed"];

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default function ActiveJobPage({ params }: PageProps) {
  const { jobId } = use(params);
  const job = getFeedJobById(jobId);
  const conversation = getProviderConversationForJob(jobId);
  const [status, setStatus] = useState<JobStatus | null>(job?.status ?? null);
  const [sharing, setSharing] = useState(false);

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

  const currentStatus = status ?? job.status;
  const statusIndex = Math.max(
    0,
    TIMELINE.indexOf(currentStatus as (typeof TIMELINE)[number]),
  );

  const chatHref = conversation
    ? ROUTES.PROVIDER_CONVERSATION(conversation.id)
    : ROUTES.PROVIDER_MESSAGES;

  const startJob = () => {
    setStatus("in_progress");
    setSharing(true);
    toast.success("Job marked in progress", {
      description: "Location share is on — customer can follow you on the map.",
    });
  };

  const completeJob = () => {
    setStatus("completed");
    setSharing(false);
    toast.success("Marked complete", {
      description: "Customer will review and release your payment.",
    });
  };

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

      {(currentStatus === "booked" || currentStatus === "in_progress") && (
        <section className="rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand/[0.04] p-5 md:p-6 animate-fade-up shadow-[0_8px_32px_rgba(199,10,36,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">
            What&apos;s next
          </p>
          <h2 className="font-fraunces text-xl font-semibold text-ink mb-4">
            {currentStatus === "booked"
              ? "Customer paid — start when you're en route"
              : "Finish the work, then mark complete"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {currentStatus === "booked" ? (
              <button
                type="button"
                onClick={startJob}
                className="app-btn flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold bg-brand text-white hover:bg-brand-dark text-left"
              >
                <span className="inline-flex items-center gap-2">
                  <Play className="size-4" />
                  Set in progress
                </span>
                <ArrowRight className="size-4 shrink-0" />
              </button>
            ) : (
              <button
                type="button"
                onClick={completeJob}
                className="app-btn flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold bg-brand text-white hover:bg-brand-dark text-left"
              >
                <span className="inline-flex items-center gap-2">
                  <Flag className="size-4" />
                  Mark complete
                </span>
                <ArrowRight className="size-4 shrink-0" />
              </button>
            )}
            <Link
              href={chatHref}
              className="app-btn flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold bg-ink text-white hover:bg-ink/90"
            >
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="size-4" />
                Chat with {job.customerName.split(" ")[0]}
              </span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            After you finish, the customer approves and your payment is released
            to Stripe Express → your bank.
          </p>
        </section>
      )}

      {currentStatus === "completed" && (
        <section className="rounded-2xl border border-[#c8e6c9]/80 bg-[#e8f5e9]/50 p-5 md:p-6 animate-fade-up">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b5e20] mb-2">
            Done
          </p>
          <h2 className="font-fraunces text-xl font-semibold text-ink mb-2">
            Waiting on customer approval
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Once they approve, payment goes to your connected bank account.
            Check Earnings and Payout setup if money hasn’t arrived.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href={ROUTES.PROVIDER_EARNINGS}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
            >
              View earnings <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href={ROUTES.PROVIDER_PAYOUTS}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-warm hover:text-ink"
            >
              Payout setup
            </Link>
          </div>
        </section>
      )}

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

          <Link
            href={chatHref}
            className="app-surface app-surface-hover flex items-center gap-3 rounded-2xl p-4"
          >
            <div className="size-10 rounded-full bg-cream flex items-center justify-center text-brand border border-border">
              <MessageSquare className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">
                Chat with {conversation?.participantName ?? job.customerName}
              </p>
              <p className="text-xs text-muted truncate">
                {conversation?.lastMessage ??
                  "Coordinate arrival and job details."}
              </p>
            </div>
          </Link>

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
