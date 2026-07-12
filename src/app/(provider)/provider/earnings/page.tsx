import { Wallet } from "lucide-react";
import { mockEarnings, PROVIDER_PROFILE } from "@/data/providerMock";
import { EarningStatusChip } from "@/components/provider/ProviderChips";
import { formatCurrency, formatDate } from "@/lib/customer/format";
import PageHeader from "@/components/shared/app/PageHeader";

export default function ProviderEarningsPage() {
  const paid = mockEarnings
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);
  const held = mockEarnings
    .filter((e) => e.status === "held" || e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Payouts"
        title="Earnings"
        description={`Completed jobs and escrow releases. Payouts go to ${PROVIDER_PROFILE.payoutMethod}.`}
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-8 animate-fade-up hero-delay-1">
        <div className="rounded-2xl bg-ink text-white p-5 md:p-6 relative overflow-hidden shadow-[0_12px_40px_rgba(26,18,8,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.3)_0%,transparent_60%)]" />
          <div
            aria-hidden
            className="absolute -right-6 -bottom-8 size-32 rounded-full bg-brand/20 blur-2xl"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-2">
              <Wallet className="size-3.5" />
              Paid out
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold tabular-nums">
              {formatCurrency(paid)}
            </p>
          </div>
        </div>
        <div className="app-surface rounded-2xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-wider text-muted mb-2">
            Pending / in escrow
          </p>
          <p className="font-fraunces text-3xl md:text-4xl font-bold text-ink tabular-nums">
            {formatCurrency(held)}
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {mockEarnings.map((earn, i) => (
          <li
            key={earn.id}
            className="app-surface app-surface-hover rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <EarningStatusChip status={earn.status} />
                <span className="text-xs text-muted">
                  {earn.paidAt
                    ? `Paid ${formatDate(earn.paidAt)}`
                    : `Completed ${formatDate(earn.completedAt)}`}
                </span>
              </div>
              <p className="font-semibold text-ink">{earn.jobTitle}</p>
              <p className="text-sm text-muted mt-0.5">{earn.customerName}</p>
            </div>
            <p className="font-fraunces text-2xl font-semibold text-ink shrink-0 tabular-nums">
              {formatCurrency(earn.amount)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
