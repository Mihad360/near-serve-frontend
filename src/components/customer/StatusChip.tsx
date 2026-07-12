import type { JobStatus, PaymentStatus } from "@/types/job";
import {
  JOB_STATUS_LABELS,
  JOB_STATUS_STYLES,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_STYLES,
} from "@/lib/customer/format";
import { cn } from "@/lib/utils";

type StatusChipProps = {
  status: JobStatus | PaymentStatus;
  kind?: "job" | "payment";
  className?: string;
};

const PULSE_JOB: JobStatus[] = ["bidding", "in_progress"];
const PULSE_PAYMENT: PaymentStatus[] = ["held", "pending"];

export default function StatusChip({
  status,
  kind = "job",
  className,
}: StatusChipProps) {
  const label =
    kind === "payment"
      ? PAYMENT_STATUS_LABELS[status as PaymentStatus]
      : JOB_STATUS_LABELS[status as JobStatus];
  const styles =
    kind === "payment"
      ? PAYMENT_STATUS_STYLES[status as PaymentStatus]
      : JOB_STATUS_STYLES[status as JobStatus];

  const pulse =
    kind === "payment"
      ? PULSE_PAYMENT.includes(status as PaymentStatus)
      : PULSE_JOB.includes(status as JobStatus);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        styles,
        pulse && "animate-status-glow",
        className,
      )}
    >
      {pulse && <span className="status-dot" aria-hidden />}
      {label}
    </span>
  );
}
