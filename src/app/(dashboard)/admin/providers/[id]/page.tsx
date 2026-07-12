"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getAdminProvider } from "@/data/adminMock";
import AdminBadge from "@/components/admin/AdminBadge";
import { ROUTES } from "@/utils/navigation";
import { formatDate } from "@/lib/customer/format";
import Avatar from "@/components/shared/app/Avatar";

type PageProps = { params: Promise<{ id: string }> };

export default function AdminProviderDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const base = getAdminProvider(id);
  const [approved, setApproved] = useState(base?.isApproved ?? false);

  if (!base) {
    return (
      <div className="py-16 text-center">
        <p className="font-fraunces text-xl text-ink mb-2">Provider not found</p>
        <Link href={ROUTES.ADMIN_PROVIDERS} className="text-brand text-sm">
          Back to providers
        </Link>
      </div>
    );
  }

  const setApproval = (next: boolean) => {
    setApproved(next);
    toast.success(next ? "Provider approved" : "Provider set to pending/rejected");
    // useToggleProviderApprovalMutation / useGetProviderDetailsQuery
  };

  return (
    <div className="max-w-2xl">
      <Link
        href={ROUTES.ADMIN_PROVIDERS}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6"
      >
        <ArrowLeft className="size-4" />
        Providers
      </Link>

      <div className="app-surface rounded-2xl p-6 animate-fade-up">
        <div className="flex items-start gap-4 mb-6">
          <Avatar name={base.name} size="md" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-fraunces text-2xl font-semibold text-ink">
                {base.name}
              </h1>
              {approved ? (
                <AdminBadge label="Approved" tone="success" />
              ) : (
                <AdminBadge label="Pending" tone="warning" />
              )}
            </div>
            <p className="text-sm text-muted">{base.email}</p>
            <p className="text-xs text-muted mt-1">
              GET /admin/providers/{base.id}
            </p>
          </div>
        </div>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Phone
            </dt>
            <dd className="font-medium text-ink">{base.phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              City
            </dt>
            <dd className="font-medium text-ink">{base.city}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Categories
            </dt>
            <dd className="font-medium text-ink">
              {base.categories.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Member since
            </dt>
            <dd className="font-medium text-ink">
              {formatDate(base.memberSince)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Rating
            </dt>
            <dd className="font-medium text-ink">
              {approved ? base.rating.toFixed(1) : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Jobs completed
            </dt>
            <dd className="font-medium text-ink">{base.jobsCompleted}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2">
          {!approved && (
            <button
              type="button"
              onClick={() => setApproval(true)}
              className="app-btn rounded-xl bg-brand text-white text-sm font-semibold px-4 py-2.5"
            >
              Approve provider
            </button>
          )}
          {approved && (
            <button
              type="button"
              onClick={() => setApproval(false)}
              className="app-btn rounded-xl border border-border text-sm font-semibold px-4 py-2.5"
            >
              Revoke approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
