"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, Gavel } from "lucide-react";
import { mockProviderBids } from "@/data/providerMock";
import { BidStatusChip } from "@/components/provider/ProviderChips";
import {
  formatCurrency,
  formatRelativeTime,
} from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import type { BidStatus } from "@/types/job";
import PageHeader from "@/components/shared/app/PageHeader";
import EmptyState from "@/components/shared/app/EmptyState";

const FILTERS: Array<"all" | BidStatus> = [
  "all",
  "pending",
  "accepted",
  "lost",
];

export default function MyBidsPage() {
  const [filter, setFilter] = useState<"all" | BidStatus>("all");

  const filtered =
    filter === "all"
      ? mockProviderBids
      : mockProviderBids.filter((b) => b.status === filter);

  return (
    <div>
      <PageHeader
        eyebrow="Your offers"
        title="My bids"
        description="Track pending, accepted, and lost bids."
      />

      {mockProviderBids.some((b) => b.status === "accepted") && (
        <div className="mb-6 rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand/[0.04] p-4 md:p-5 animate-fade-up">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-1">
            Accepted — next step
          </p>
          <p className="text-sm text-muted mb-3">
            Customer confirmed payment. Open the active job to set in progress
            and chat.
          </p>
          <div className="flex flex-wrap gap-2">
            {mockProviderBids
              .filter((b) => b.status === "accepted")
              .map((b) => (
                <Link
                  key={b.id}
                  href={ROUTES.PROVIDER_ACTIVE(b.jobId)}
                  className="app-btn rounded-xl bg-brand text-white text-xs font-semibold px-3.5 py-2 hover:bg-brand-dark"
                >
                  Start · {b.jobTitle.length > 24 ? `${b.jobTitle.slice(0, 24)}…` : b.jobTitle}
                </Link>
              ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 scrollbar-none animate-fade-up hero-delay-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "app-chip shrink-0 rounded-full px-4 py-2 text-sm font-medium border capitalize",
              filter === f
                ? "bg-ink text-cream border-ink shadow-[0_4px_14px_rgba(26,18,8,0.15)]"
                : "bg-white/70 text-warm border-border hover:border-border-warm hover:bg-white",
            )}
          >
            {f === "all" ? "All" : f}
            {f !== "all" && (
              <span className="ml-1.5 opacity-60">
                {mockProviderBids.filter((b) => b.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Gavel className="size-6" />}
          title="No bids here"
          description="Browse the feed and place your first offer — early bids win more often."
          action={
            <Link
              href={ROUTES.PROVIDER_HOME}
              className="app-btn inline-flex rounded-xl bg-brand text-white text-sm font-semibold px-5 py-2.5 shadow-[0_4px_16px_rgba(199,10,36,0.2)]"
            >
              Open job feed
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((bid, i) => {
            const href =
              bid.status === "accepted"
                ? ROUTES.PROVIDER_ACTIVE(bid.jobId)
                : ROUTES.PROVIDER_JOB(bid.jobId);
            return (
              <li key={bid.id}>
                <Link
                  href={href}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 app-surface app-surface-hover rounded-2xl p-5 animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <BidStatusChip status={bid.status} />
                      <span className="text-xs text-muted tabular-nums">
                        {formatRelativeTime(bid.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-fraunces text-lg font-semibold text-ink group-hover:text-brand transition-colors duration-300">
                      {bid.jobTitle}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-1">
                      {bid.message}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-warm">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" />
                        {bid.jobLocation.address}
                      </span>
                      <span>{bid.customerName}</span>
                      <span>ETA · {bid.eta}</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <p className="font-fraunces text-2xl font-semibold text-ink tabular-nums">
                      {formatCurrency(bid.amount)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                      {bid.status === "accepted" ? "Open job" : "View"}
                      <ChevronRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
