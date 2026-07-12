"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet, Landmark } from "lucide-react";
import { mockEarnings, PROVIDER_PROFILE, getStripeAccountStatus } from "@/data/providerMock";
import { EarningStatusChip } from "@/components/provider/ProviderChips";
import UseTable from "@/components/ui/UseTable";
import { formatCurrency, formatDate } from "@/lib/customer/format";
import PageHeader from "@/components/shared/app/PageHeader";
import { ROUTES } from "@/utils/navigation";
import type { Earning } from "@/types/job";

export default function ProviderEarningsPage() {
  const router = useRouter();
  const stripe = getStripeAccountStatus(null);
  const ready = stripe.chargesEnabled && stripe.payoutsEnabled;

  const paid = mockEarnings
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);
  const waiting = mockEarnings
    .filter((e) => e.status === "held" || e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Money in"
        title="Earnings"
        description="See what you’ve earned. Money moves to your bank after the customer approves the job."
        action={
          <Link
            href={ROUTES.PROVIDER_PAYOUTS}
            className="app-btn inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:border-brand shrink-0"
          >
            <Landmark className="size-4 text-brand" />
            Payout setup
          </Link>
        }
      />

      {!ready && (
        <div className="mb-6 rounded-2xl border border-[#f0d9a8] bg-[#fff8eb] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-up">
          <div>
            <p className="font-semibold text-ink text-sm">
              Connect Stripe to receive payouts
            </p>
            <p className="text-xs text-muted mt-0.5">
              Without a Stripe Express account, approved jobs can’t reach your bank.
            </p>
          </div>
          <Link
            href={`${ROUTES.PROVIDER_PAYOUTS}?stripe=setup`}
            className="app-btn rounded-xl bg-brand text-white text-xs font-semibold px-4 py-2.5 hover:bg-brand-dark shrink-0"
          >
            Set up payouts
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-8 animate-fade-up hero-delay-1">
        <div className="rounded-2xl bg-ink text-white p-5 md:p-6 relative overflow-hidden shadow-[0_12px_40px_rgba(26,18,8,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.3)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-2">
              <Wallet className="size-3.5" />
              Paid to your bank
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold tabular-nums">
              {formatCurrency(paid)}
            </p>
            <p className="text-xs text-white/45 mt-2">
              Destination: {PROVIDER_PROFILE.payoutMethod}
            </p>
          </div>
        </div>
        <div className="app-surface rounded-2xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-wider text-muted mb-2">
            Waiting for customer approval
          </p>
          <p className="font-fraunces text-3xl md:text-4xl font-bold text-ink tabular-nums">
            {formatCurrency(waiting)}
          </p>
          <p className="text-xs text-muted mt-2">
            Held safely until the customer says the job is done
          </p>
        </div>
      </div>

      <div className="app-surface rounded-2xl overflow-hidden animate-fade-up hero-delay-2">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-fraunces text-lg font-semibold text-ink">
            Earnings list
          </h2>
        </div>
        <UseTable<Earning>
          data={mockEarnings}
          emptyText="No earnings yet — win a bid and complete a job."
          hover
          striped
          onRowClick={(row) => router.push(ROUTES.PROVIDER_ACTIVE(row.jobId))}
          columns={[
            {
              key: "jobTitle",
              title: "Job",
              render: (row) => (
                <div>
                  <p className="font-medium text-ink">{row.jobTitle}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {row.customerName} · {formatDate(row.completedAt)}
                  </p>
                </div>
              ),
            },
            {
              key: "status",
              title: "Status",
              render: (row) => <EarningStatusChip status={row.status} />,
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
          ]}
        />
      </div>
    </div>
  );
}
