"use client";

import { Star } from "lucide-react";
import type { Bid } from "@/types/job";
import { formatCurrency, formatRelativeTime } from "@/lib/customer/format";
import { cn } from "@/lib/utils";
import Avatar from "@/components/shared/app/Avatar";

type BidOfferCardProps = {
  bid: Bid;
  canAccept: boolean;
  isChosen: boolean;
  dimmed?: boolean;
  onAccept: (bidId: string, providerName: string) => void;
  index?: number;
};

export default function BidOfferCard({
  bid,
  canAccept,
  isChosen,
  dimmed,
  onAccept,
  index = 0,
}: BidOfferCardProps) {
  return (
    <li
      className={cn(
        "app-surface rounded-2xl p-5 transition-all duration-300 animate-fade-up",
        isChosen &&
          "border-brand shadow-[0_8px_28px_rgba(199,10,36,0.14)] ring-1 ring-brand/20",
        !isChosen && "app-surface-hover",
        dimmed && "opacity-45",
      )}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <Avatar name={bid.providerName} size="sm" />
          <div className="min-w-0">
            <p className="font-semibold text-ink">{bid.providerName}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
              <span className="inline-flex items-center gap-0.5 text-warm">
                <Star className="size-3 fill-current text-amber-500" />
                {bid.providerRating}
              </span>
              <span>·</span>
              <span>{bid.providerJobsCompleted} jobs done</span>
              <span>·</span>
              <span>Can start: {bid.eta}</span>
              <span className="text-muted/80">
                · {formatRelativeTime(bid.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <p className="font-fraunces text-xl font-semibold text-ink tabular-nums shrink-0">
          {formatCurrency(bid.amount)}
        </p>
      </div>

      <p className="mt-3 text-sm text-muted leading-relaxed">{bid.message}</p>

      {canAccept && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onAccept(bid.id, bid.providerName)}
            className="app-btn rounded-xl px-4 py-2.5 text-sm font-semibold bg-brand text-white hover:bg-brand-dark shadow-[0_4px_14px_rgba(199,10,36,0.2)]"
          >
            Choose this provider
          </button>
          <span className="text-xs text-muted">
            Next you&apos;ll pay to confirm the booking
          </span>
        </div>
      )}

      {isChosen && (
        <p className="mt-3 text-xs font-semibold text-brand">
          Your chosen provider
        </p>
      )}
    </li>
  );
}
