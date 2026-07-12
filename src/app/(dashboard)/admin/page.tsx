"use client";

import Link from "next/link";
import {
  HardHat,
  Users,
  Briefcase,
  Scale,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import {
  ADMIN_STATS,
  mockAdminDisputes,
  mockAdminJobs,
  mockAdminPayments,
  mockAdminProviders,
} from "@/data/adminMock";
import { formatCurrency } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import PageHeader from "@/components/shared/app/PageHeader";
import AdminBadge from "@/components/admin/AdminBadge";

export default function AdminOverviewPage() {
  const pendingProviders = mockAdminProviders.filter((p) => !p.isApproved);
  const openDisputes = mockAdminDisputes.filter((d) => d.status === "open");
  const heldPay = mockAdminPayments.filter((p) => p.status === "held");
  const activeJobs = mockAdminJobs.filter(
    (j) =>
      j.status === "bidding" ||
      j.status === "booked" ||
      j.status === "in_progress" ||
      j.status === "open",
  );

  const cards = [
    {
      label: "Users",
      value: ADMIN_STATS.users.toLocaleString(),
      href: ROUTES.ADMIN_USERS,
      icon: Users,
    },
    {
      label: "Providers pending",
      value: String(pendingProviders.length),
      href: ROUTES.ADMIN_PROVIDERS,
      icon: HardHat,
    },
    {
      label: "Active jobs",
      value: String(activeJobs.length),
      href: ROUTES.ADMIN_JOBS,
      icon: Briefcase,
    },
    {
      label: "Open disputes",
      value: String(openDisputes.length),
      href: ROUTES.ADMIN_DISPUTES,
      icon: Scale,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Control center"
        title="Admin overview"
        description="Approve providers, watch jobs and payments, and resolve disputes. Preview data — swap to adminApi hooks when backend is live."
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8 animate-fade-up">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="app-surface app-surface-hover rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <c.icon className="size-4 text-brand" />
              <ArrowRight className="size-3.5 text-muted" />
            </div>
            <p className="text-xs uppercase tracking-wider text-muted mb-1">
              {c.label}
            </p>
            <p className="font-fraunces text-3xl font-bold text-ink tabular-nums">
              {c.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-8 animate-fade-up hero-delay-1">
        <div className="rounded-2xl bg-ink text-white p-5 md:p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.35)_0%,transparent_55%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider mb-2">
              <CreditCard className="size-3.5" />
              Held safely
            </div>
            <p className="font-fraunces text-3xl font-bold tabular-nums">
              {formatCurrency(
                heldPay.reduce((s, p) => s + p.amount, 0) ||
                  ADMIN_STATS.heldPayments,
              )}
            </p>
            <p className="text-xs text-white/45 mt-2">
              Across {heldPay.length} payments waiting for customer approval
            </p>
          </div>
        </div>
        <div className="app-surface rounded-2xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-wider text-muted mb-2">
            GMV this month (mock)
          </p>
          <p className="font-fraunces text-3xl font-bold text-ink tabular-nums">
            {formatCurrency(ADMIN_STATS.gmvMonth)}
          </p>
          <p className="text-xs text-muted mt-2">
            From analytics API when wired:{" "}
            <code className="text-[10px]">/analytics/admin</code>
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="app-surface rounded-2xl p-5 animate-fade-up hero-delay-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-fraunces text-lg font-semibold text-ink">
              Providers to approve
            </h2>
            <Link
              href={ROUTES.ADMIN_PROVIDERS}
              className="text-xs font-semibold text-brand"
            >
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {pendingProviders.slice(0, 4).map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.categories.join(", ")} · {p.city}
                  </p>
                </div>
                <AdminBadge label="Pending" tone="warning" />
              </li>
            ))}
            {pendingProviders.length === 0 && (
              <p className="text-sm text-muted">No pending approvals.</p>
            )}
          </ul>
        </section>

        <section className="app-surface rounded-2xl p-5 animate-fade-up hero-delay-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-fraunces text-lg font-semibold text-ink">
              Open disputes
            </h2>
            <Link
              href={ROUTES.ADMIN_DISPUTES}
              className="text-xs font-semibold text-brand"
            >
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {openDisputes.slice(0, 4).map((d) => (
              <li key={d.id}>
                <Link
                  href={ROUTES.ADMIN_DISPUTE(d.jobId)}
                  className="block text-sm hover:opacity-80"
                >
                  <p className="font-medium text-ink">{d.jobTitle}</p>
                  <p className="text-xs text-muted line-clamp-1">{d.reason}</p>
                </Link>
              </li>
            ))}
            {openDisputes.length === 0 && (
              <p className="text-sm text-muted">No open disputes.</p>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
