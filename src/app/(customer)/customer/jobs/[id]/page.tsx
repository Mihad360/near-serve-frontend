"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
  Check,
} from "lucide-react";
import {
  getBidsForJob,
  getConversationForJob,
  getJobById,
  getPaymentForJob,
} from "@/data/customerMock";
import JobMap from "@/components/customer/JobMap";
import StatusChip from "@/components/customer/StatusChip";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  JOB_STATUS_LABELS,
} from "@/lib/customer/format";
import type { JobStatus } from "@/types/job";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import Avatar from "@/components/shared/app/Avatar";

const TIMELINE: JobStatus[] = [
  "open",
  "bidding",
  "booked",
  "in_progress",
  "completed",
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function JobDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const job = getJobById(id);
  const bids = getBidsForJob(id);
  const conversation = getConversationForJob(id);
  const payment = getPaymentForJob(id);
  const [acceptedBid, setAcceptedBid] = useState<string | null>(
    job?.acceptedBidId ?? null,
  );

  if (!job) {
    return (
      <div className="py-20 text-center animate-fade-up">
        <h1 className="font-fraunces text-2xl text-ink mb-3">Job not found</h1>
        <Link href={ROUTES.CUSTOMER_HOME} className="text-brand font-medium text-sm">
          Back to my jobs
        </Link>
      </div>
    );
  }

  const statusIndex =
    job.status === "disputed"
      ? TIMELINE.indexOf("in_progress")
      : TIMELINE.indexOf(job.status);

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <Link
          href={ROUTES.CUSTOMER_HOME}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-5 transition-colors"
        >
          <ArrowLeft className="size-4" />
          My jobs
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <StatusChip status={job.status} />
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
                Budget {formatCurrency(job.budget)}
              </span>
              <span className="text-muted">Posted {formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="app-surface rounded-2xl p-5 md:p-6 animate-fade-up hero-delay-1">
        <h2 className="font-fraunces text-lg font-semibold text-ink mb-5">
          Status timeline
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          {TIMELINE.map((step, i) => {
            const done = i <= statusIndex;
            const current = i === statusIndex && job.status !== "disputed";
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
        {job.status === "disputed" && (
          <p className="mt-4 text-sm text-[#8b1a1a] bg-[#f5e6e6] rounded-xl px-4 py-3 border border-[#e8c8c8]/60">
            This job is in dispute. Escrow is frozen until NearServe reviews the case.
          </p>
        )}
      </section>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <section className="animate-fade-up hero-delay-2">
            <h2 className="font-fraunces text-lg font-semibold text-ink mb-3">
              {job.status === "in_progress" ? "Live location" : "Job location"}
            </h2>
            <JobMap
              lat={job.location.lat}
              lng={job.location.lng}
              label={job.location.address}
              className="h-[280px]"
              showProviderEnRoute={job.status === "in_progress"}
            />
          </section>

          {(job.status === "open" ||
            job.status === "bidding" ||
            bids.length > 0) && (
            <section className="animate-fade-up hero-delay-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-fraunces text-lg font-semibold text-ink">
                  Bids
                </h2>
                <span className="text-sm text-muted">
                  {bids.length} offer{bids.length === 1 ? "" : "s"}
                </span>
              </div>

              {bids.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border-warm bg-white/50 px-5 py-10 text-center text-sm text-muted">
                  No bids yet — providers usually respond within an hour.
                </div>
              ) : (
                <ul className="space-y-3">
                  {bids.map((bid, i) => {
                    const isAccepted =
                      acceptedBid === bid.id || bid.status === "accepted";
                    return (
                      <li
                        key={bid.id}
                        className={cn(
                          "app-surface rounded-2xl p-5 transition-all duration-300 animate-fade-up",
                          isAccepted
                            ? "border-brand shadow-[0_8px_28px_rgba(199,10,36,0.14)] ring-1 ring-brand/20"
                            : "app-surface-hover",
                        )}
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Avatar name={bid.providerName} size="sm" />
                            <div>
                              <p className="font-semibold text-ink">
                                {bid.providerName}
                              </p>
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                                <span className="inline-flex items-center gap-0.5 text-warm">
                                  <Star className="size-3 fill-current text-amber-500" />
                                  {bid.providerRating}
                                </span>
                                <span>·</span>
                                <span>{bid.providerJobsCompleted} jobs</span>
                                <span>·</span>
                                <span>{bid.eta}</span>
                              </div>
                            </div>
                          </div>
                          <p className="font-fraunces text-xl font-semibold text-ink tabular-nums">
                            {formatCurrency(bid.amount)}
                          </p>
                        </div>
                        <p className="mt-3 text-sm text-muted leading-relaxed">
                          {bid.message}
                        </p>
                        {(job.status === "bidding" || job.status === "open") && (
                          <div className="mt-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setAcceptedBid(bid.id)}
                              disabled={!!acceptedBid && !isAccepted}
                              className={cn(
                                "app-btn rounded-xl px-4 py-2 text-sm font-semibold",
                                isAccepted
                                  ? "bg-[#e8f5e9] text-[#1b5e20]"
                                  : "bg-brand text-white hover:bg-brand-dark disabled:opacity-40 shadow-[0_4px_14px_rgba(199,10,36,0.2)]",
                              )}
                            >
                              {isAccepted ? "Accepted" : "Accept bid"}
                            </button>
                          </div>
                        )}
                        {isAccepted &&
                          job.status !== "bidding" &&
                          job.status !== "open" && (
                            <p className="mt-3 text-xs font-medium text-brand">
                              Accepted bid
                            </p>
                          )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </div>

        <aside className="lg:col-span-2 space-y-4 animate-fade-up hero-delay-2">
          <div className="bg-ink text-white rounded-2xl p-5 md:p-6 relative overflow-hidden shadow-[0_12px_40px_rgba(26,18,8,0.18)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_55%)]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="size-5 text-brand" />
                <h2 className="font-fraunces text-lg font-semibold">Escrow</h2>
              </div>
              {payment ? (
                <>
                  <p className="font-fraunces text-3xl font-bold mb-1 tabular-nums">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-sm text-white/60 mb-4">
                    {payment.status === "held"
                      ? "Held safely until you approve the work."
                      : payment.status === "disputed"
                        ? "Frozen while dispute is reviewed."
                        : `Status: ${payment.status}`}
                  </p>
                  <StatusChip status={payment.status} kind="payment" />
                  <p className="mt-4 text-xs text-white/40">
                    {payment.method} · {formatDateTime(payment.createdAt)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/70 mb-4">
                    Accept a bid to fund escrow. Money stays protected until
                    you&apos;re happy.
                  </p>
                  <button
                    type="button"
                    className="app-btn w-full rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold py-3"
                  >
                    Pay into escrow
                  </button>
                </>
              )}
            </div>
          </div>

          {conversation && (
            <Link
              href={ROUTES.CUSTOMER_CONVERSATION(conversation.id)}
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

          {job.providerName && (
            <div className="app-surface rounded-2xl p-4 flex items-center gap-3">
              <Avatar name={job.providerName} size="sm" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-0.5">
                  Provider
                </p>
                <p className="font-semibold text-ink">{job.providerName}</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
