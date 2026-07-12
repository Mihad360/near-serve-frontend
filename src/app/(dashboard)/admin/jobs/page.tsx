"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mockAdminJobs, type AdminJobRow } from "@/data/adminMock";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminBadge from "@/components/admin/AdminBadge";
import PageHeader from "@/components/shared/app/PageHeader";
import { useClientPagination } from "@/hooks/useClientPagination";
import { formatCurrency, formatDate, JOB_STATUS_LABELS } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@/types/job";

type Filter = "all" | JobStatus | "cancelled";

function jobTone(
  status: AdminJobRow["status"],
): "success" | "warning" | "danger" | "info" | "muted" {
  if (status === "completed") return "success";
  if (status === "disputed" || status === "cancelled") return "danger";
  if (status === "in_progress" || status === "bidding") return "warning";
  if (status === "booked") return "info";
  return "muted";
}

export default function AdminJobsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [rows, setRows] = useState(mockAdminJobs);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((j) => j.status === filter);
  }, [rows, filter]);

  const pagination = useClientPagination(filtered, 8);

  const cancelJob = (job: AdminJobRow) => {
    setRows((prev) =>
      prev.map((j) =>
        j.id === job.id ? { ...j, status: "cancelled" as const } : j,
      ),
    );
    toast.success(`Cancelled “${job.title}”`);
    // useAdminCancelJobMutation(job.id)
  };

  return (
    <div>
      <PageHeader
        eyebrow="API · GET /admin/jobs"
        title="Jobs"
        description="Monitor all marketplace jobs. Cancel when needed."
      />

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {(
          [
            "all",
            "open",
            "bidding",
            "booked",
            "in_progress",
            "completed",
            "disputed",
            "cancelled",
          ] as const
        ).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setFilter(key);
              pagination.resetPage();
            }}
            className={cn(
              "app-chip shrink-0 rounded-full px-3.5 py-2 text-sm font-medium border capitalize",
              filter === key
                ? "bg-ink text-cream border-ink"
                : "bg-white/70 text-warm border-border",
            )}
          >
            {key === "all"
              ? "All"
              : key === "cancelled"
                ? "Cancelled"
                : JOB_STATUS_LABELS[key as JobStatus]}
          </button>
        ))}
      </div>

      <AdminDataTable<AdminJobRow>
        title="Job list"
        description="PATCH /admin/jobs/:jobId/cancel"
        data={pagination.pageItems}
        totalItems={pagination.totalItems}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.onPageChange}
        emptyText="No jobs match this filter."
        onRowClick={(row) => router.push(ROUTES.ADMIN_JOB(row.id))}
        columns={[
          {
            key: "title",
            title: "Job",
            render: (row) => (
              <div>
                <p className="font-medium text-ink">{row.title}</p>
                <p className="text-xs text-muted">
                  {row.category} · {row.city}
                </p>
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
            render: (row) => row.providerName ?? "—",
          },
          {
            key: "status",
            title: "Status",
            render: (row) => (
              <AdminBadge
                label={
                  row.status === "cancelled"
                    ? "Cancelled"
                    : JOB_STATUS_LABELS[row.status]
                }
                tone={jobTone(row.status)}
              />
            ),
          },
          {
            key: "budget",
            title: "Budget",
            align: "right",
            render: (row) => (
              <span className="font-medium tabular-nums">
                {formatCurrency(row.budget)}
              </span>
            ),
          },
          {
            key: "createdAt",
            title: "Posted",
            render: (row) => formatDate(row.createdAt),
          },
          {
            key: "actions",
            title: "",
            align: "right",
            render: (row) =>
              row.status !== "cancelled" &&
              row.status !== "completed" ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelJob(row);
                  }}
                  className="rounded-lg border border-border text-xs font-semibold px-2.5 py-1.5 text-[#8b1a1a]"
                >
                  Cancel
                </button>
              ) : null,
          },
        ]}
      />
    </div>
  );
}
