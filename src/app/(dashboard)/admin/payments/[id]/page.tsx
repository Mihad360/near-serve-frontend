"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminPayment } from "@/data/adminMock";
import StatusChip from "@/components/customer/StatusChip";
import { ROUTES } from "@/utils/navigation";
import { formatCurrency, formatDateTime } from "@/lib/customer/format";

type PageProps = { params: Promise<{ id: string }> };

export default function AdminPaymentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const payment = getAdminPayment(id);

  if (!payment) {
    return (
      <div className="py-16 text-center">
        <p className="font-fraunces text-xl text-ink mb-2">Payment not found</p>
        <Link href={ROUTES.ADMIN_PAYMENTS} className="text-brand text-sm">
          Back to payments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={ROUTES.ADMIN_PAYMENTS}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6"
      >
        <ArrowLeft className="size-4" />
        Payments
      </Link>

      <div className="app-surface rounded-2xl p-6 animate-fade-up">
        <div className="flex items-center gap-2 mb-3">
          <StatusChip status={payment.status} kind="payment" />
        </div>
        <h1 className="font-fraunces text-2xl font-semibold text-ink mb-1">
          {payment.jobTitle}
        </h1>
        <p className="font-fraunces text-3xl font-bold text-ink tabular-nums mb-2">
          {formatCurrency(payment.amount)}
        </p>
        <p className="text-xs text-muted mb-6">
          GET /admin/payments/{payment.id}
        </p>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Customer
            </dt>
            <dd className="font-medium text-ink">{payment.customerName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Provider
            </dt>
            <dd className="font-medium text-ink">{payment.providerName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Method
            </dt>
            <dd className="font-medium text-ink">{payment.method}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Created
            </dt>
            <dd className="font-medium text-ink">
              {formatDateTime(payment.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Job
            </dt>
            <dd>
              <Link
                href={ROUTES.ADMIN_JOB(payment.jobId)}
                className="font-medium text-brand"
              >
                {payment.jobId}
              </Link>
            </dd>
          </div>
        </dl>

        {payment.status === "disputed" && (
          <Link
            href={ROUTES.ADMIN_DISPUTE(payment.jobId)}
            className="inline-block mt-6 text-sm font-semibold text-brand"
          >
            Open related dispute →
          </Link>
        )}
      </div>
    </div>
  );
}
