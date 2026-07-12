"use client";

import { use, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Check,
  Clock,
  ArrowRight,
  Gavel,
} from "lucide-react";
import { toast } from "sonner";
import { getFeedJobById, formatDistance } from "@/data/providerMock";
import JobMap from "@/components/customer/JobMap";
import StatusChip from "@/components/customer/StatusChip";
import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
} from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import Avatar from "@/components/shared/app/Avatar";

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default function ProviderJobDetailPage({ params }: PageProps) {
  const { jobId } = use(params);
  const job = getFeedJobById(jobId);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [timeline, setTimeline] = useState("Today, 2–4pm");
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <div className="py-20 text-center animate-fade-up">
        <h1 className="font-fraunces text-2xl text-ink mb-3">Job not found</h1>
        <Link href={ROUTES.PROVIDER_HOME} className="text-brand font-medium text-sm">
          Back to feed
        </Link>
      </div>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Bid placed", {
      description: "You'll be notified if the customer accepts.",
    });
  }

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
          <StatusChip status={job.status} />
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 border border-border px-2.5 py-0.5 text-[11px] font-semibold text-warm shadow-sm">
            <Navigation className="size-3 text-brand" />
            {formatDistance(job.distanceKm)} away
          </span>
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
          <span className="text-muted">
            Posted {formatRelativeTime(job.createdAt)} · {job.customerName}
          </span>
        </div>
      </div>

      {submitted && (
        <section className="rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand/[0.04] p-5 md:p-6 animate-fade-up shadow-[0_8px_32px_rgba(199,10,36,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">
            What&apos;s next
          </p>
          <h2 className="font-fraunces text-xl font-semibold text-ink mb-2">
            Bid is in — wait for accept
          </h2>
          <p className="text-sm text-muted mb-4 leading-relaxed">
            After you bid: wait for the customer to choose you → they pay to
            confirm → chat opens → you set the job in progress.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={ROUTES.PROVIDER_MY_BIDS}
              className="app-btn flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold bg-brand text-white hover:bg-brand-dark"
            >
              <span className="inline-flex items-center gap-2">
                <Gavel className="size-4" />
                Track in My bids
              </span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
            <Link
              href={ROUTES.PROVIDER_HOME}
              className="app-btn flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold bg-ink text-white hover:bg-ink/90"
            >
              <span>Keep browsing feed</span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <section className="animate-fade-up hero-delay-1">
            <h2 className="font-fraunces text-lg font-semibold text-ink mb-3">
              Job location
            </h2>
            <JobMap
              lat={job.location.lat}
              lng={job.location.lng}
              label={job.location.address}
              className="h-[280px]"
            />
          </section>

          <section className="app-surface rounded-2xl p-5 md:p-6 animate-fade-up hero-delay-2">
            <h2 className="font-fraunces text-lg font-semibold text-ink mb-2">
              Details
            </h2>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm mt-4">
              <div className="flex items-center gap-3">
                <Avatar name={job.customerName} size="sm" />
                <div>
                  <dt className="text-muted text-xs uppercase tracking-wider mb-0.5">
                    Customer
                  </dt>
                  <dd className="font-medium text-ink">{job.customerName}</dd>
                </div>
              </div>
              <div>
                <dt className="text-muted text-xs uppercase tracking-wider mb-1">
                  Bids so far
                </dt>
                <dd className="font-medium text-ink">{job.bidCount}</dd>
              </div>
              <div>
                <dt className="text-muted text-xs uppercase tracking-wider mb-1">
                  Posted
                </dt>
                <dd className="font-medium text-ink">
                  {formatDate(job.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-muted text-xs uppercase tracking-wider mb-1">
                  Category
                </dt>
                <dd className="font-medium text-ink">{job.category}</dd>
              </div>
            </dl>
          </section>
        </div>

        <aside className="lg:col-span-2 animate-fade-up hero-delay-2">
          {submitted ? (
            <div className="app-surface rounded-2xl p-6 text-center">
              <div className="relative mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9]/60">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl animate-pulse-ring bg-[#c8e6c9]/50"
                />
                <Check className="relative size-7" />
              </div>
              <h2 className="font-fraunces text-xl font-semibold text-ink mb-2">
                Bid submitted
              </h2>
              <p className="text-sm text-muted mb-1 leading-relaxed">
                {amount
                  ? `${formatCurrency(Number(amount))} · ${timeline}`
                  : "Your offer is pending customer review."}
              </p>
              <p className="text-xs text-muted mb-5">
                Preview only — API will create the bid record.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="app-btn rounded-xl border border-border text-ink font-semibold py-3 px-5 text-sm bg-white/80 w-full"
              >
                Edit bid
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-ink text-white rounded-2xl p-5 md:p-6 relative overflow-hidden shadow-[0_12px_40px_rgba(26,18,8,0.2)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_55%)]" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="size-5 text-brand" />
                  <h2 className="font-fraunces text-lg font-semibold">
                    Submit a bid
                  </h2>
                </div>
                <p className="text-sm text-white/60">
                  Customer budget {formatCurrency(job.budget)}. Competitive bids
                  win more often.
                </p>

                <label className="block">
                  <span className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Your amount ($)
                  </span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={String(Math.round(job.budget * 0.9))}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-brand/50"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Timeline
                  </span>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 [&>option]:text-ink"
                  >
                    <option>Within 1 hour</option>
                    <option>Today, 2–4pm</option>
                    <option>Today, 5–7pm</option>
                    <option>Tomorrow morning</option>
                    <option>This weekend</option>
                  </select>
                </label>

                <label className="block">
                  <span className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Message
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Why you're a great fit…"
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="app-btn w-full rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold py-3.5"
                >
                  Place bid
                </button>
              </div>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
