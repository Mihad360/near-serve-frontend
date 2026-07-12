"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getAdminJob } from "@/data/adminMock";
import AdminBadge from "@/components/admin/AdminBadge";
import { ROUTES } from "@/utils/navigation";
import {
  formatCurrency,
  formatDate,
  JOB_STATUS_LABELS,
} from "@/lib/customer/format";
import type { JobStatus } from "@/types/job";

type PageProps = { params: Promise<{ id: string }> };

export default function AdminJobDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const base = getAdminJob(id);
  const [status, setStatus] = useState(base?.status);

  if (!base || !status) {
    return (
      <div className="py-16 text-center">
        <p className="font-fraunces text-xl text-ink mb-2">Job not found</p>
        <Link href={ROUTES.ADMIN_JOBS} className="text-brand text-sm">
          Back to jobs
        </Link>
      </div>
    );
  }

  const cancel = () => {
    setStatus("cancelled");
    toast.success("Job cancelled by admin");
  };

  return (
    <div className="max-w-2xl">
      <Link
        href={ROUTES.ADMIN_JOBS}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6"
      >
        <ArrowLeft className="size-4" />
        Jobs
      </Link>

      <div className="app-surface rounded-2xl p-6 animate-fade-up">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <AdminBadge
            label={
              status === "cancelled"
                ? "Cancelled"
                : JOB_STATUS_LABELS[status as JobStatus]
            }
            tone={
              status === "cancelled" || status === "disputed"
                ? "danger"
                : "info"
            }
          />
          <span className="text-xs text-muted">{base.category}</span>
        </div>
        <h1 className="font-fraunces text-2xl font-semibold text-ink mb-1">
          {base.title}
        </h1>
        <p className="text-xs text-muted mb-6">GET /admin/jobs/{base.id}</p>

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
            <dd className="font-medium text-ink">
              {base.providerName ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Budget
            </dt>
            <dd className="font-medium text-ink">
              {formatCurrency(base.budget)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Posted
            </dt>
            <dd className="font-medium text-ink">
              {formatDate(base.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              City
            </dt>
            <dd className="font-medium text-ink">{base.city}</dd>
          </div>
        </dl>

        {status !== "cancelled" && status !== "completed" && (
          <button
            type="button"
            onClick={cancel}
            className="app-btn rounded-xl bg-[#8b1a1a] text-white text-sm font-semibold px-4 py-2.5"
          >
            Cancel job
          </button>
        )}

        {status === "disputed" && (
          <Link
            href={ROUTES.ADMIN_DISPUTE(base.id)}
            className="ml-3 text-sm font-semibold text-brand"
          >
            Open dispute →
          </Link>
        )}
      </div>
    </div>
  );
}
