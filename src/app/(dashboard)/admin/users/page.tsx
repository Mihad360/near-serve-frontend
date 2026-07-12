"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mockAdminUsers, type AdminUserRow } from "@/data/adminMock";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminBadge from "@/components/admin/AdminBadge";
import PageHeader from "@/components/shared/app/PageHeader";
import { useClientPagination } from "@/hooks/useClientPagination";
import { ROUTES } from "@/utils/navigation";
import { formatDate } from "@/lib/customer/format";
import { cn } from "@/lib/utils";

type Filter = "all" | "customer" | "provider" | "blocked";

export default function AdminUsersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [rows, setRows] = useState(mockAdminUsers);

  const filtered = useMemo(() => {
    if (filter === "blocked") return rows.filter((u) => u.isBlocked);
    if (filter === "customer" || filter === "provider") {
      return rows.filter((u) => u.role === filter);
    }
    return rows.filter((u) => u.role !== "admin");
  }, [rows, filter]);

  const pagination = useClientPagination(filtered, 8);

  const toggleBlock = (user: AdminUserRow) => {
    setRows((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u,
      ),
    );
    toast.success(
      user.isBlocked ? `${user.name} unblocked` : `${user.name} blocked`,
    );
    // useToggleUserBlockStatusMutation({ userId: user.id })
  };

  return (
    <div>
      <PageHeader
        eyebrow="API · GET /admin/users/:userId"
        title="Users"
        description="Find customers and providers. Block or unblock accounts from the list or detail page."
      />

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {(
          [
            ["all", "All"],
            ["customer", "Customers"],
            ["provider", "Providers"],
            ["blocked", "Blocked"],
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

      <AdminDataTable<AdminUserRow>
        title="User list"
        description="PATCH /admin/users/:userId/block-unblock"
        data={pagination.pageItems}
        totalItems={pagination.totalItems}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.onPageChange}
        emptyText="No users found."
        onRowClick={(row) => router.push(ROUTES.ADMIN_USER(row.id))}
        columns={[
          {
            key: "name",
            title: "User",
            render: (row) => (
              <div>
                <p className="font-medium text-ink">{row.name}</p>
                <p className="text-xs text-muted">{row.email}</p>
              </div>
            ),
          },
          {
            key: "role",
            title: "Role",
            render: (row) => (
              <AdminBadge
                label={row.role}
                tone={row.role === "provider" ? "info" : "muted"}
              />
            ),
          },
          {
            key: "jobsCount",
            title: "Jobs",
            align: "right",
            render: (row) => (
              <span className="tabular-nums">{row.jobsCount}</span>
            ),
          },
          {
            key: "createdAt",
            title: "Joined",
            render: (row) => formatDate(row.createdAt),
          },
          {
            key: "isBlocked",
            title: "Status",
            render: (row) =>
              row.isBlocked ? (
                <AdminBadge label="Blocked" tone="danger" />
              ) : (
                <AdminBadge label="Active" tone="success" />
              ),
          },
          {
            key: "actions",
            title: "",
            align: "right",
            render: (row) =>
              row.role === "admin" ? null : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBlock(row);
                  }}
                  className={cn(
                    "rounded-lg text-xs font-semibold px-2.5 py-1.5 border",
                    row.isBlocked
                      ? "bg-brand text-white border-brand"
                      : "border-border text-[#8b1a1a]",
                  )}
                >
                  {row.isBlocked ? "Unblock" : "Block"}
                </button>
              ),
          },
        ]}
      />
    </div>
  );
}
