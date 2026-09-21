"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Check, Lock, ArrowRight, DollarSign } from "lucide-react";
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
    toast.success("Payment Released to Provider", {
      description: `“${title}” — funds have been transferred directly to the provider.`,
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Financial Protection"
        title="Payments & receipts"
        description="Every payment is safely held until you inspect and approve the completed job."
      />

      {/* Summary Cards */}
      <div className="grid lg:grid-cols-3 gap-4 animate-fade-up hero-delay-1">
        <div className="rounded-3xl bg-ink text-white p-6 relative overflow-hidden shadow-lg lg:col-span-1 flex flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.4)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="size-3.5 text-emerald-400" />
              <span>Held in Safe Protection</span>
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold tabular-nums">
              {formatCurrency(held)}
            </p>
            <p className="text-xs text-white/60 mt-2 font-medium">
              Waiting for your approval upon job completion
            </p>
          </div>
        </div>

        <div className="bg-stone-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted mb-3">
              <DollarSign className="size-3.5 text-brand" />
              <span>Completed & Paid Out</span>
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold text-ink tabular-nums">
              {formatCurrency(released)}
            </p>
          </div>
          <p className="text-xs text-muted font-medium mt-2">
            Successfully released to verified providers
          </p>
        </div>

        <div className="bg-stone-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="size-4" />
            <span>100% Satisfaction Guarantee</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            If work doesn&apos;t match the agreed specifications, our team steps in to mediate and protect your payment.
          </p>
          <div className="mt-3 text-xs font-bold text-brand flex items-center gap-1">
            <span>Learn how payments work</span>
            <ArrowRight className="size-3" />
          </div>
        </div>
      </div>

      {/* Transactions Table in Soft Stone Container */}
      <div className="bg-stone-100 rounded-3xl p-6 shadow-xs animate-fade-up hero-delay-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-fraunces text-xl font-bold text-ink">
              Transaction History
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Click any row to view full job details or release pending payments.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xs">
          <UseTable<Payment>
            data={payments}
            emptyText="No payments recorded yet. Post a job to get started."
            hover
            striped
            onRowClick={(row) => router.push(ROUTES.CUSTOMER_JOB(row.jobId))}
            columns={[
              {
                key: "jobTitle",
                title: "Job Details",
                render: (row) => (
                  <div>
                    <p className="font-bold text-ink text-sm">{row.jobTitle}</p>
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
                  <span className="font-fraunces font-bold text-ink text-base tabular-nums">
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
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand text-white text-xs font-bold px-3.5 py-2 hover:bg-brand-dark transition-all shadow-xs"
                    >
                      <Check className="size-3.5" />
                      Approve &amp; Pay
                    </button>
                  ) : row.status === "released" ? (
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                      Paid &amp; Approved
                    </span>
                  ) : (
                    <Link
                      href={ROUTES.CUSTOMER_JOB(row.jobId)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold text-brand"
                    >
                      View Job →
                    </Link>
                  ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
