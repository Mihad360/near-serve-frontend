"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { mockAdminDisputes, type AdminDisputeRow } from "@/data/adminMock";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminBadge from "@/components/admin/AdminBadge";
import PageHeader from "@/components/shared/app/PageHeader";
import { useClientPagination } from "@/hooks/useClientPagination";
import { formatCurrency, formatDate } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";

type Filter = "all" | "open" | "resolved";

const STATUS_LABEL: Record<AdminDisputeRow["status"], string> = {
  open: "Open",
  resolved_customer: "Refund customer",
  resolved_provider: "Pay provider",
  resolved_split: "Split",
};

function tone(status: AdminDisputeRow["status"]) {
  if (status === "open") return "warning" as const;
  if (status === "resolved_customer") return "danger" as const;
  if (status === "resolved_provider") return "success" as const;
  return "info" as const;
}

export default function AdminDisputesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "open") {
      return mockAdminDisputes.filter((d) => d.status === "open");
    }
    if (filter === "resolved") {
      return mockAdminDisputes.filter((d) => d.status !== "open");
    }
    return mockAdminDisputes;
  }, [filter]);

  const pagination = useClientPagination(filtered, 8);

  return (
    <div>
      <PageHeader
        eyebrow="API · GET /admin/disputes"
        title="Disputes"
        description="Review open cases and resolve in favor of customer, provider, or a split."
      />

      <div className="flex gap-2 mb-4">
        {(
          [
            ["all", "All"],
            ["open", "Open"],
            ["resolved", "Resolved"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setFilter(key);
              pagination.resetPage();
            }}
            className={cn(
              "app-chip rounded-full px-4 py-2 text-sm font-medium border",
              filter === key
                ? "bg-ink text-cream border-ink"
                : "bg-white/70 text-warm border-border",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <AdminDataTable<AdminDisputeRow>
        title="Dispute list"
        description="GET /admin/disputes/:jobId · PATCH …/resolve"
        data={pagination.pageItems}
        totalItems={pagination.totalItems}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.onPageChange}
        emptyText="No disputes found."
        onRowClick={(row) => router.push(ROUTES.ADMIN_DISPUTE(row.jobId))}
        columns={[
          {
            key: "jobTitle",
            title: "Job",
            render: (row) => (
              <div>
                <p className="font-medium text-ink">{row.jobTitle}</p>
                <p className="text-xs text-muted line-clamp-1">{row.reason}</p>
              </div>
            ),
          },
          {
            key: "customerName",
            title: "Customer",
          },
          {
            key: "providerName",
            title: "Provider",
          },
          {
            key: "status",
            title: "Status",
            render: (row) => (
              <AdminBadge label={STATUS_LABEL[row.status]} tone={tone(row.status)} />
            ),
          },
          {
            key: "amount",
            title: "Amount",
            align: "right",
            render: (row) => (
              <span className="font-medium tabular-nums">
                {formatCurrency(row.amount)}
              </span>
            ),
          },
          {
            key: "openedAt",
            title: "Opened",
            render: (row) => formatDate(row.openedAt),
          },
        ]}
      />
    </div>
  );
}
