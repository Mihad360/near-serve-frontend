"use client";

import Link from "next/link";
import {
  HardHat,
  Users,
  Briefcase,
  Scale,
  CreditCard,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
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
import { useGetAdminAnalyticsQuery } from "@/redux/api/analyticsApi";

export default function AdminOverviewPage() {
  const { data: analyticsResponse } = useGetAdminAnalyticsQuery({});
  const liveStats = analyticsResponse?.data;

  const totalUsers =
    (liveStats?.users?.totalCustomers || 0) + (liveStats?.users?.totalProviders || 0) ||
    ADMIN_STATS.users;
  const activeJobsCount =
    liveStats?.jobs?.active ??
    mockAdminJobs.filter(
      (j) =>
        j.status === "bidding" ||
        j.status === "booked" ||
        j.status === "in_progress" ||
        j.status === "open",
    ).length;
  const openDisputesCount = liveStats?.jobs?.disputed ?? mockAdminDisputes.filter((d) => d.status === "open").length;

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
      label: "Registered Users",
      value: totalUsers.toLocaleString(),
      href: ROUTES.ADMIN_USERS,
      icon: Users,
      badge: "+14% this month",
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Pending Approvals",
      value: String(pendingProviders.length),
      href: ROUTES.ADMIN_PROVIDERS,
      icon: HardHat,
      badge: "Action required",
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Active Jobs",
      value: String(activeJobsCount),
      href: ROUTES.ADMIN_JOBS,
      icon: Briefcase,
      badge: "Live marketplace",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Open Disputes",
      value: String(openDisputesCount),
      href: ROUTES.ADMIN_DISPUTES,
      icon: Scale,
      badge: openDisputesCount > 0 ? "Needs review" : "Clear",
      color: "text-rose-600 bg-rose-50",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Super Admin Control"
        title="Operations overview"
        description="Monitor marketplace activity, approve provider credentials, and oversee safe payment releases."
      />

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-up">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group bg-stone-100 hover:bg-white rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${c.color} shadow-xs`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[11px] font-bold text-muted bg-white px-2.5 py-1 rounded-full shadow-xs">
                    {c.badge}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">
                  {c.label}
                </p>
                <p className="font-fraunces text-3xl font-bold text-ink tabular-nums">
                  {c.value}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-brand">
                <span>Manage</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Financial Health Summary */}
      <div className="grid lg:grid-cols-2 gap-4 animate-fade-up hero-delay-1">
        <div className="rounded-3xl bg-ink text-white p-6 relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,10,36,0.45)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
              <CreditCard className="size-4 text-emerald-400" />
              <span>Protected Funds in Safe Hold</span>
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold tabular-nums">
              {formatCurrency(
                heldPay.reduce((s, p) => s + p.amount, 0) ||
                  ADMIN_STATS.heldPayments,
              )}
            </p>
            <p className="text-xs text-white/60 mt-2 font-medium">
              Secured across {heldPay.length} active customer orders waiting for completion approval
            </p>
          </div>
        </div>

        <div className="bg-stone-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted mb-2">
              <TrendingUp className="size-4 text-brand" />
              <span>Marketplace GMV This Month</span>
            </div>
            <p className="font-fraunces text-3xl md:text-4xl font-bold text-ink tabular-nums">
              {formatCurrency(ADMIN_STATS.gmvMonth)}
            </p>
          </div>
          <p className="text-xs text-muted font-medium mt-2">
            Automated platform fee collection rate: 8.5%
          </p>
        </div>
      </div>

      {/* Action Queues */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-stone-100 rounded-3xl p-6 shadow-xs animate-fade-up hero-delay-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="font-fraunces text-xl font-bold text-ink">
                Pending Provider Verifications
              </h2>
              <p className="text-xs text-muted">Review IDs and credentials for approval</p>
            </div>
            <Link
              href={ROUTES.ADMIN_PROVIDERS}
              className="text-xs font-bold text-brand hover:underline"
            >
              View all ({pendingProviders.length})
            </Link>
          </div>

          <div className="space-y-2.5">
            {pendingProviders.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs"
              >
                <div>
                  <p className="font-bold text-ink text-sm">{p.name}</p>
                  <p className="text-xs text-muted mt-0.5 font-medium">
                    {p.categories.join(", ")} · {p.city}
                  </p>
                </div>
                <Link
                  href={ROUTES.ADMIN_PROVIDER(p.id)}
                  className="rounded-xl bg-amber-100 text-amber-900 px-3 py-1 text-xs font-bold hover:bg-amber-200 transition-colors"
                >
                  Review ID →
                </Link>
              </div>
            ))}
            {pendingProviders.length === 0 && (
              <p className="text-sm text-muted text-center py-6">All provider applications processed!</p>
            )}
          </div>
        </section>

        <section className="bg-stone-100 rounded-3xl p-6 shadow-xs animate-fade-up hero-delay-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="font-fraunces text-xl font-bold text-ink">
                Disputes &amp; Mediation
              </h2>
              <p className="text-xs text-muted">Resolve payment and quality inquiries</p>
            </div>
            <Link
              href={ROUTES.ADMIN_DISPUTES}
              className="text-xs font-bold text-brand hover:underline"
            >
              View all ({openDisputes.length})
            </Link>
          </div>

          <div className="space-y-2.5">
            {openDisputes.slice(0, 4).map((d) => (
              <Link
                key={d.id}
                href={ROUTES.ADMIN_DISPUTE(d.jobId)}
                className="group block bg-white rounded-2xl p-4 shadow-xs hover:ring-2 hover:ring-brand/20 transition-all"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-ink text-sm group-hover:text-brand transition-colors">
                    {d.jobTitle}
                  </p>
                  <AdminBadge label="Open" tone="danger" />
                </div>
                <p className="text-xs text-muted line-clamp-1 font-medium">{d.reason}</p>
              </Link>
            ))}
            {openDisputes.length === 0 && (
              <div className="text-center py-6 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Zero open disputes. Platform running smoothly!</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
