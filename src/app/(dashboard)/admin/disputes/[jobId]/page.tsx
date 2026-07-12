"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getAdminDisputeByJob, type AdminDisputeRow } from "@/data/adminMock";
import AdminBadge from "@/components/admin/AdminBadge";
import { ROUTES } from "@/utils/navigation";
import { formatCurrency, formatDateTime } from "@/lib/customer/format";

type PageProps = { params: Promise<{ jobId: string }> };

export default function AdminDisputeDetailPage({ params }: PageProps) {
  const { jobId } = use(params);
  const base = getAdminDisputeByJob(jobId);
  const [status, setStatus] = useState<AdminDisputeRow["status"] | undefined>(
    base?.status,
  );

  if (!base || !status) {
    return (
      <div className="py-16 text-center">
        <p className="font-fraunces text-xl text-ink mb-2">Dispute not found</p>
        <Link href={ROUTES.ADMIN_DISPUTES} className="text-brand text-sm">
          Back to disputes
        </Link>
      </div>
    );
  }

  const resolve = (next: AdminDisputeRow["status"], label: string) => {
    setStatus(next);
    toast.success(`Dispute resolved — ${label}`);
    // useResolveDisputeMutation({ jobId, resolution: next })
  };

  return (
    <div className="max-w-2xl">
      <Link
        href={ROUTES.ADMIN_DISPUTES}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6"
      >
        <ArrowLeft className="size-4" />
        Disputes
      </Link>

      <div className="app-surface rounded-2xl p-6 animate-fade-up">
        <AdminBadge
          label={status === "open" ? "Open" : "Resolved"}
          tone={status === "open" ? "warning" : "success"}
        />
        <h1 className="font-fraunces text-2xl font-semibold text-ink mt-3 mb-1">
          {base.jobTitle}
        </h1>
        <p className="text-xs text-muted mb-4">
          GET /admin/disputes/{base.jobId}
        </p>

        <p className="text-sm text-muted leading-relaxed mb-6 rounded-xl bg-cream/80 border border-border p-4">
          {base.reason}
        </p>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Customer
            </dt>
            <dd className="font-medium text-ink">{base.customerName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Provider
            </dt>
            <dd className="font-medium text-ink">{base.providerName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Amount held
            </dt>
            <dd className="font-medium text-ink">
              {formatCurrency(base.amount)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Opened
            </dt>
            <dd className="font-medium text-ink">
              {formatDateTime(base.openedAt)}
            </dd>
          </div>
        </dl>

        {status === "open" ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-ink mb-2">Resolve as</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  resolve("resolved_customer", "refund customer")
                }
                className="app-btn rounded-xl bg-brand text-white text-sm font-semibold px-4 py-2.5"
              >
                Refund customer
              </button>
              <button
                type="button"
                onClick={() =>
                  resolve("resolved_provider", "pay provider")
                }
                className="app-btn rounded-xl bg-ink text-white text-sm font-semibold px-4 py-2.5"
              >
                Pay provider
              </button>
              <button
                type="button"
                onClick={() => resolve("resolved_split", "split")}
                className="app-btn rounded-xl border border-border text-sm font-semibold px-4 py-2.5"
              >
                Split
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Resolution recorded: <strong className="text-ink">{status}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
