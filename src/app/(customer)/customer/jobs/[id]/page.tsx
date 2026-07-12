"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MessageSquare,
  Check,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import {
  getBidsForJob,
  getConversationForJob,
  getJobById,
  getPaymentForJob,
} from "@/data/customerMock";
import JobMap from "@/components/customer/JobMap";
import StatusChip from "@/components/customer/StatusChip";
import JobBidsPanel from "@/components/customer/JobBidsPanel";
import SecurePaymentCard from "@/components/customer/SecurePaymentCard";
import PaymentHowItWorks from "@/components/customer/PaymentHowItWorks";
import {
  formatCurrency,
  formatDate,
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
  const [paymentHeld, setPaymentHeld] = useState(!!payment);
  const [localStatus, setLocalStatus] = useState<JobStatus | null>(null);

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

  const status = localStatus ?? job.status;
  const statusIndex =
    status === "disputed"
      ? TIMELINE.indexOf("in_progress")
      : TIMELINE.indexOf(status);

  const acceptedBidData = bids.find((b) => b.id === acceptedBid);
  const canAccept =
    (status === "bidding" || status === "open") && !acceptedBid;
  const showAfterAccept =
    !!acceptedBid &&
    (status === "booked" ||
      status === "in_progress" ||
      status === "bidding" ||
      status === "open");

  const chatHref =
    conversation?.id != null
      ? ROUTES.CUSTOMER_CONVERSATION(conversation.id)
      : ROUTES.CUSTOMER_MESSAGES;

  const payAmount = acceptedBidData?.amount ?? payment?.amount ?? job.budget;
  const providerFirst =
    acceptedBidData?.providerName.split(" ")[0] ??
    job.providerName?.split(" ")[0];

  const handleAccept = (bidId: string, providerName: string) => {
    setAcceptedBid(bidId);
    setLocalStatus("booked");
    toast.success(`You chose ${providerName}`, {
      description: "Next: pay to confirm the booking.",
    });
  };

  const handlePay = () => {
    setPaymentHeld(true);
    toast.success("Payment held safely", {
      description: "Money stays with NearServe until you approve the work.",
    });
  };

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

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <StatusChip status={status} />
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

      {showAfterAccept && (
        <section className="rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand/[0.04] p-5 md:p-6 animate-fade-up shadow-[0_8px_32px_rgba(199,10,36,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">
            Next steps
          </p>
          <h2 className="font-fraunces text-xl font-semibold text-ink mb-4">
            {paymentHeld
              ? "You’re booked — stay in touch"
              : "Provider chosen — pay to confirm"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handlePay}
              disabled={paymentHeld}
              className={cn(
                "app-btn flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-left transition-all",
                paymentHeld
                  ? "bg-[#e8f5e9] text-[#1b5e20] cursor-default"
                  : "bg-brand text-white hover:bg-brand-dark shadow-[0_4px_16px_rgba(199,10,36,0.25)]",
              )}
            >
              <span>
                {paymentHeld
                  ? "Payment held safely"
                  : `Pay ${formatCurrency(payAmount)} to confirm`}
              </span>
              {!paymentHeld && <ArrowRight className="size-4 shrink-0" />}
            </button>
            <Link
              href={chatHref}
              className="app-btn flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold bg-ink text-white hover:bg-ink/90"
            >
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="size-4" />
                Open chat{providerFirst ? ` with ${providerFirst}` : ""}
              </span>
              <ArrowRight className="size-4 shrink-0" />
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
            const current = i === statusIndex && status !== "disputed";
            return (
              <div key={step} className="flex sm:flex-1 items-center gap-3 sm:gap-0">
                <div className="flex sm:flex-col items-center gap-2 sm:gap-1.5 sm:flex-1">
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0",
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
                      "hidden sm:block h-0.5 flex-1 mx-1 rounded-full",
                      i < statusIndex ? "bg-brand" : "bg-border",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
        {status === "disputed" && (
          <p className="mt-4 text-sm text-[#8b1a1a] bg-[#f5e6e6] rounded-xl px-4 py-3 border border-[#e8c8c8]/60">
            This job is under review. Payment stays held until NearServe
            resolves it.
          </p>
        )}
      </section>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <section className="animate-fade-up hero-delay-2">
            <h2 className="font-fraunces text-lg font-semibold text-ink mb-3">
              {status === "in_progress" ? "Live location" : "Job location"}
            </h2>
            <JobMap
              lat={job.location.lat}
              lng={job.location.lng}
              label={job.location.address}
              className="h-[280px]"
              showProviderEnRoute={status === "in_progress"}
            />
          </section>

          <section className="animate-fade-up hero-delay-3">
            <JobBidsPanel
              bids={bids}
              acceptedBidId={acceptedBid}
              canAccept={canAccept}
              onAccept={handleAccept}
            />
          </section>
        </div>

        <aside className="lg:col-span-2 space-y-4 animate-fade-up hero-delay-2">
          <SecurePaymentCard
            amount={payAmount}
            paid={paymentHeld || !!payment}
            hasChosenProvider={!!acceptedBid}
            providerFirstName={providerFirst}
            onPay={handlePay}
          />

          <PaymentHowItWorks compact />

          {(conversation || acceptedBid) && (
            <Link
              href={chatHref}
              className="app-surface app-surface-hover flex items-center gap-3 rounded-2xl p-4"
            >
              <div className="size-10 rounded-full bg-cream flex items-center justify-center text-brand border border-border">
                <MessageSquare className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">
                  Chat with{" "}
                  {conversation?.participantName ??
                    acceptedBidData?.providerName ??
                    "provider"}
                </p>
                <p className="text-xs text-muted truncate">
                  {conversation?.lastMessage ??
                    "Chat opens after you choose a provider."}
                </p>
              </div>
            </Link>
          )}

          {(job.providerName || acceptedBidData) && (
            <div className="app-surface rounded-2xl p-4 flex items-center gap-3">
              <Avatar
                name={acceptedBidData?.providerName ?? job.providerName ?? "P"}
                size="sm"
              />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted mb-0.5">
                  Provider
                </p>
                <p className="font-semibold text-ink">
                  {acceptedBidData?.providerName ?? job.providerName}
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
