import type { BidStatus, EarningStatus } from "@/types/job";
import { cn } from "@/lib/utils";

export const BID_STATUS_LABELS: Record<BidStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  lost: "Lost",
};

export const BID_STATUS_STYLES: Record<BidStatus, string> = {
  pending: "bg-[#fff3e0] text-[#9a5b00]",
  accepted: "bg-[#e8f5e9] text-[#1b5e20]",
  rejected: "bg-[#f0ebe4] text-warm",
  lost: "bg-[#f0ebe4] text-warm",
};

export const EARNING_STATUS_LABELS: Record<EarningStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  held: "In escrow",
};

export const EARNING_STATUS_STYLES: Record<EarningStatus, string> = {
  pending: "bg-[#fff3e0] text-[#9a5b00]",
  paid: "bg-[#e8f5e9] text-[#1b5e20]",
  held: "bg-[#e8eef8] text-[#1e4a8c]",
};

type BidStatusChipProps = {
  status: BidStatus;
  className?: string;
};

export function BidStatusChip({ status, className }: BidStatusChipProps) {
  const pulse = status === "pending";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        BID_STATUS_STYLES[status],
        pulse && "animate-status-glow",
        className,
      )}
    >
      {pulse && <span className="status-dot" aria-hidden />}
      {BID_STATUS_LABELS[status]}
    </span>
  );
}

type EarningStatusChipProps = {
  status: EarningStatus;
  className?: string;
};

export function EarningStatusChip({
  status,
  className,
}: EarningStatusChipProps) {
  const pulse = status === "pending" || status === "held";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        EARNING_STATUS_STYLES[status],
        pulse && "animate-status-glow",
        className,
      )}
    >
      {pulse && <span className="status-dot" aria-hidden />}
      {EARNING_STATUS_LABELS[status]}
    </span>
  );
}
