"use client";

import type { Bid } from "@/types/job";
import BidOfferCard from "@/components/customer/BidOfferCard";

type JobBidsPanelProps = {
  bids: Bid[];
  acceptedBidId: string | null;
  canAccept: boolean;
  onAccept: (bidId: string, providerName: string) => void;
};

/**
 * Clear split: open offers vs the one you already chose.
 * Matches API: GET /bid/:jobId → accept one → others become not chosen.
 */
export default function JobBidsPanel({
  bids,
  acceptedBidId,
  canAccept,
  onAccept,
}: JobBidsPanelProps) {
  const openOffers = bids.filter(
    (b) =>
      b.status === "pending" && (!acceptedBidId || b.id !== acceptedBidId),
  );
  const chosen =
    bids.find((b) => b.id === acceptedBidId) ??
    bids.find((b) => b.status === "accepted");
  const otherClosed = bids.filter(
    (b) =>
      b.id !== chosen?.id &&
      (b.status === "rejected" || b.status === "lost" || b.status === "accepted"),
  );

  if (bids.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-warm bg-white/50 px-5 py-10 text-center">
        <p className="font-semibold text-ink mb-1">No offers yet</p>
        <p className="text-sm text-muted">
          Nearby providers usually reply within an hour. We&apos;ll list new
          offers here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {chosen && (
        <div>
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <h2 className="font-fraunces text-lg font-semibold text-ink">
              Chosen provider
            </h2>
            <span className="text-xs text-muted">1 selected</span>
          </div>
          <ul className="space-y-3">
            <BidOfferCard
              bid={chosen}
              canAccept={false}
              isChosen
              onAccept={onAccept}
            />
          </ul>
        </div>
      )}

      {(canAccept || openOffers.length > 0) && (
        <div>
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h2 className="font-fraunces text-lg font-semibold text-ink">
              {chosen ? "Other offers" : "New offers"}
            </h2>
            <span className="text-xs text-muted">
              {openOffers.length} open
            </span>
          </div>
          <p className="text-sm text-muted mb-3">
            {chosen
              ? "These were not selected. You already chose a provider above."
              : "Compare price, reviews, and timing — pick one provider to continue."}
          </p>

          {openOffers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white/40 px-5 py-8 text-center text-sm text-muted">
              No open offers right now.
            </div>
          ) : (
            <ul className="space-y-3">
              {openOffers.map((bid, i) => (
                <BidOfferCard
                  key={bid.id}
                  bid={bid}
                  canAccept={canAccept}
                  isChosen={false}
                  dimmed={!!acceptedBidId}
                  onAccept={onAccept}
                  index={i}
                />
              ))}
            </ul>
          )}
        </div>
      )}

      {otherClosed.length > 0 && !canAccept && (
        <div>
          <h2 className="font-fraunces text-base font-semibold text-muted mb-3">
            Not chosen
          </h2>
          <ul className="space-y-2">
            {otherClosed.map((bid) => (
              <li
                key={bid.id}
                className="rounded-xl border border-border/70 bg-white/40 px-4 py-3 flex items-center justify-between gap-3 text-sm opacity-70"
              >
                <span className="text-ink font-medium">{bid.providerName}</span>
                <span className="text-muted tabular-nums">
                  ${bid.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
