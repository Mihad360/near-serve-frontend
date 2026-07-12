import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { mockPayments } from "@/data/customerMock";
import StatusChip from "@/components/customer/StatusChip";
import { formatCurrency, formatDate } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import PageHeader from "@/components/shared/app/PageHeader";

export default function PaymentsPage() {
  const held = mockPayments
    .filter((p) => p.status === "held")
    .reduce((sum, p) => sum + p.amount, 0);
  const released = mockPayments
    .filter((p) => p.status === "released")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Escrow"
        title="Payments"
        description="Money stays protected until you approve completed work."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-8 animate-fade-up hero-delay-1">
        <div className="rounded-2xl bg-ink text-white p-5 md:p-6 relative overflow-hidden shadow-[0_12px_40px_rgba(26,18,8,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_60%)]" />
          <div
            aria-hidden
            className="absolute -right-6 -bottom-8 size-32 rounded-full bg-brand/20 blur-2xl"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="size-3.5" />
              In escrow
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold tabular-nums">
              {formatCurrency(held)}
            </p>
          </div>
        </div>
        <div className="app-surface rounded-2xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-wider text-muted mb-2">
            Released
          </p>
          <p className="font-fraunces text-3xl md:text-4xl font-bold text-ink tabular-nums">
            {formatCurrency(released)}
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {mockPayments.map((pay, i) => (
          <li
            key={pay.id}
            className="app-surface app-surface-hover rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <StatusChip status={pay.status} kind="payment" />
                <span className="text-xs text-muted">{pay.method}</span>
              </div>
              <Link
                href={ROUTES.CUSTOMER_JOB(pay.jobId)}
                className="font-semibold text-ink hover:text-brand transition-colors"
              >
                {pay.jobTitle}
              </Link>
              <p className="text-sm text-muted mt-0.5">
                {pay.providerName} · {formatDate(pay.createdAt)}
                {pay.releasedAt ? ` · Released ${formatDate(pay.releasedAt)}` : ""}
              </p>
            </div>
            <p className="font-fraunces text-2xl font-semibold text-ink shrink-0 tabular-nums">
              {formatCurrency(pay.amount)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
