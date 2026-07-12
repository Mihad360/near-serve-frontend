import type { JobStatus, PaymentStatus } from "@/types/job";

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  open: "Open",
  bidding: "Bidding",
  booked: "Booked",
  in_progress: "In progress",
  completed: "Completed",
  disputed: "Disputed",
};

export const JOB_STATUS_STYLES: Record<JobStatus, string> = {
  open: "bg-[#e8f0e6] text-[#2d5a27]",
  bidding: "bg-[#fff3e0] text-[#9a5b00]",
  booked: "bg-[#e8eef8] text-[#1e4a8c]",
  in_progress: "bg-[#fce8ec] text-brand",
  completed: "bg-[#e8f5e9] text-[#1b5e20]",
  disputed: "bg-[#f5e6e6] text-[#8b1a1a]",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  held: "Held safely",
  released: "Paid to provider",
  refunded: "Refunded",
  pending: "Waiting for card",
  disputed: "Under review",
};

export const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  held: "bg-[#fff3e0] text-[#9a5b00]",
  released: "bg-[#e8f5e9] text-[#1b5e20]",
  refunded: "bg-[#e8eef8] text-[#1e4a8c]",
  pending: "bg-[#f0ebe4] text-warm",
  disputed: "bg-[#f5e6e6] text-[#8b1a1a]",
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}
