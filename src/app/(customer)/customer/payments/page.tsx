"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";
import { mockPayments } from "@/data/customerMock";
import StatusChip from "@/components/customer/StatusChip";
import PaymentHowItWorks from "@/components/customer/PaymentHowItWorks";
import UseTable from "@/components/ui/UseTable";
import { formatCurrency, formatDate } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import PageHeader from "@/components/shared/app/PageHeader";
import type { Payment, PaymentStatus } from "@/types/job";

export default function PaymentsPage() {
  const router = useRouter();
  const [statuses, setStatuses] = useState<Record<string, PaymentStatus>>(() =>
    Object.fromEntries(mockPayments.map((p) => [p.id, p.status])),
  );

  const payments = useMemo(
    () =>
      mockPayments.map((p) => ({
        ...p,
        status: statuses[p.id] ?? p.status,
      })),
    [statuses],
  );

  const held = payments
    .filter((p) => p.status === "held" || p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const released = payments
    .filter((p) => p.status === "released")
    .reduce((sum, p) => sum + p.amount, 0);

  const releasePayment = (id: string, title: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "released" }));
    toast.success("Payment released", {
      description: `“${title}” — the provider will receive the money.`,
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Money"
        title="Payments"
        description="Pay to book a job. NearServe holds it safely until you approve the work — then the provider gets paid."
      />

      <div className="grid lg:grid-cols-3 gap-4 mb-8 animate-fade-up hero-delay-1">
        <div className="rounded-2xl bg-ink text-white p-5 md:p-6 relative overflow-hidden shadow-[0_12px_40px_rgba(26,18,8,0.18)] lg:col-span-1">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="size-3.5" />
              Held safely
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold tabular-nums">
              {formatCurrency(held)}
            </p>
            <p className="text-xs text-white/50 mt-2">
              Waiting for you to approve finished jobs
            </p>
          </div>
        </div>
        <div className="app-surface rounded-2xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-wider text-muted mb-2">
            Already paid to providers
          </p>
          <p className="font-fraunces text-3xl md:text-4xl font-bold text-ink tabular-nums">
            {formatCurrency(released)}
          </p>
        </div>
        <PaymentHowItWorks compact />
      </div>

      <div className="app-surface rounded-2xl overflow-hidden animate-fade-up hero-delay-2">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-fraunces text-lg font-semibold text-ink">
            Payment history
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Tap a row to open the job. Approve when the work looks good.
          </p>
        </div>
        <UseTable<Payment>
          data={payments}
          emptyText="No payments yet — choose a bid and pay to confirm."
          hover
          striped
          onRowClick={(row) => router.push(ROUTES.CUSTOMER_JOB(row.jobId))}
          columns={[
            {
              key: "jobTitle",
              title: "Job",
              render: (row) => (
                <div>
                  <p className="font-medium text-ink">{row.jobTitle}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {row.providerName} · {formatDate(row.createdAt)}
                  </p>
                </div>
              ),
            },
            {
              key: "status",
              title: "Status",
              render: (row) => (
                <StatusChip status={row.status} kind="payment" />
              ),
            },
            {
              key: "amount",
              title: "Amount",
              align: "right",
              render: (row) => (
                <span className="font-fraunces font-semibold text-ink tabular-nums">
                  {formatCurrency(row.amount)}
                </span>
              ),
            },
            {
              key: "action",
              title: "",
              align: "right",
              render: (row) =>
                row.status === "held" ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      releasePayment(row.id, row.jobTitle);
                    }}
                    className="app-btn inline-flex items-center gap-1.5 rounded-xl bg-brand text-white text-xs font-semibold px-3 py-2 hover:bg-brand-dark"
                  >
                    <Check className="size-3.5" />
                    Approve &amp; pay provider
                  </button>
                ) : row.status === "released" ? (
                  <span className="text-xs text-muted">Released</span>
                ) : (
                  <Link
                    href={ROUTES.CUSTOMER_JOB(row.jobId)}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold text-brand"
                  >
                    View job
                  </Link>
                ),
            },
          ]}
        />
      </div>
    </div>
  );
}
