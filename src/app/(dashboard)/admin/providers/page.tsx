"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  mockAdminProviders,
  type AdminProviderRow,
} from "@/data/adminMock";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminBadge from "@/components/admin/AdminBadge";
import PageHeader from "@/components/shared/app/PageHeader";
import { useClientPagination } from "@/hooks/useClientPagination";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";

type Filter = "all" | "pending" | "approved";

export default function AdminProvidersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [rows, setRows] = useState(mockAdminProviders);

  const filtered = useMemo(() => {
    if (filter === "pending") return rows.filter((p) => !p.isApproved);
    if (filter === "approved") return rows.filter((p) => p.isApproved);
    return rows;
  }, [rows, filter]);

  const { currentPage, totalPages, pageItems, onPageChange, resetPage, totalItems } =
    useClientPagination(filtered, 8);

  const setFilterAndReset = (f: Filter) => {
    setFilter(f);
    resetPage();
  };

  const toggleApproval = (provider: AdminProviderRow, approve: boolean) => {
    setRows((prev) =>
      prev.map((p) =>
        p.id === provider.id ? { ...p, isApproved: approve } : p,
      ),
    );
    toast.success(
      approve ? `${provider.name} approved` : `${provider.name} rejected`,
    );
    // Live: useToggleProviderApprovalMutation({ providerId, isApproved: approve })
  };

  return (
    <div>
      <PageHeader
        eyebrow="API · GET /admin/providers"
        title="Providers"
        description="Approve or reject provider applications. Open a row for full details."
      />

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {(
          [
            ["all", "All"],
            ["pending", "Pending"],
            ["approved", "Approved"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilterAndReset(key)}
            className={cn(
              "app-chip shrink-0 rounded-full px-4 py-2 text-sm font-medium border",
              filter === key
                ? "bg-ink text-cream border-ink"
                : "bg-white/70 text-warm border-border",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <AdminDataTable<AdminProviderRow>
        title="Provider list"
        description="PATCH /admin/providers/:id/approve-reject"
        data={pageItems}
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        emptyText="No providers match this filter."
        onRowClick={(row) => router.push(ROUTES.ADMIN_PROVIDER(row.id))}
        columns={[
          {
            key: "name",
            title: "Provider",
            render: (row) => (
              <div>
                <p className="font-medium text-ink">{row.name}</p>
                <p className="text-xs text-muted">{row.email}</p>
              </div>
            ),
          },
          {
            key: "categories",
            title: "Skills",
            render: (row) => (
              <span className="text-xs text-muted">
                {row.categories.join(", ")}
              </span>
            ),
          },
          {
            key: "city",
            title: "City",
          },
          {
            key: "isApproved",
            title: "Status",
            render: (row) =>
              row.isApproved ? (
                <AdminBadge label="Approved" tone="success" />
              ) : (
                <AdminBadge label="Pending" tone="warning" />
              ),
          },
          {
            key: "rating",
            title: "Rating",
            align: "right",
            render: (row) =>
              row.isApproved ? (
                <span className="tabular-nums">{row.rating.toFixed(1)}</span>
              ) : (
                <span className="text-muted">—</span>
              ),
          },
          {
            key: "actions",
            title: "",
            align: "right",
            render: (row) =>
              !row.isApproved ? (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleApproval(row, true);
                    }}
                    className="rounded-lg bg-brand text-white text-xs font-semibold px-2.5 py-1.5"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleApproval(row, false);
                    }}
                    className="rounded-lg border border-border text-xs font-semibold px-2.5 py-1.5 text-warm"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted">{row.jobsCompleted} jobs</span>
              ),
          },
        ]}
      />
    </div>
  );
}
