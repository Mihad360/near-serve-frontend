"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getAdminUser } from "@/data/adminMock";
import AdminBadge from "@/components/admin/AdminBadge";
import { ROUTES } from "@/utils/navigation";
import { formatDate } from "@/lib/customer/format";
import Avatar from "@/components/shared/app/Avatar";

type PageProps = { params: Promise<{ id: string }> };

export default function AdminUserDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const base = getAdminUser(id);
  const [blocked, setBlocked] = useState(base?.isBlocked ?? false);

  if (!base) {
    return (
      <div className="py-16 text-center">
        <p className="font-fraunces text-xl text-ink mb-2">User not found</p>
        <Link href={ROUTES.ADMIN_USERS} className="text-brand text-sm">
          Back to users
        </Link>
      </div>
    );
  }

  const toggle = () => {
    setBlocked((v) => !v);
    toast.success(blocked ? "User unblocked" : "User blocked");
  };

  return (
    <div className="max-w-2xl">
      <Link
        href={ROUTES.ADMIN_USERS}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6"
      >
        <ArrowLeft className="size-4" />
        Users
      </Link>

      <div className="app-surface rounded-2xl p-6 animate-fade-up">
        <div className="flex items-start gap-4 mb-6">
          <Avatar name={base.name} size="md" />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-fraunces text-2xl font-semibold text-ink">
                {base.name}
              </h1>
              <AdminBadge label={base.role} tone="info" />
              {blocked ? (
                <AdminBadge label="Blocked" tone="danger" />
              ) : (
                <AdminBadge label="Active" tone="success" />
              )}
            </div>
            <p className="text-sm text-muted">{base.email}</p>
            <p className="text-xs text-muted mt-1">
              GET /admin/users/{base.id}
            </p>
          </div>
        </div>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Jobs
            </dt>
            <dd className="font-medium text-ink">{base.jobsCount}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted mb-1">
              Joined
            </dt>
            <dd className="font-medium text-ink">
              {formatDate(base.createdAt)}
            </dd>
          </div>
        </dl>

        {base.role !== "admin" && (
          <button
            type="button"
            onClick={toggle}
            className="app-btn rounded-xl bg-ink text-white text-sm font-semibold px-4 py-2.5"
          >
            {blocked ? "Unblock user" : "Block user"}
          </button>
        )}
      </div>
    </div>
  );
}
