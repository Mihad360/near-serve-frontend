"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { mockAdminPayments, type AdminPaymentRow } from "@/data/adminMock";
import AdminDataTable from "@/components/admin/AdminDataTable";
import StatusChip from "@/components/customer/StatusChip";
import PageHeader from "@/components/shared/app/PageHeader";
import { useClientPagination } from "@/hooks/useClientPagination";
import { formatCurrency, formatDate } from "@/lib/customer/format";
import { ROUTES } from "@/utils/navigation";
import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/types/job";

type Filter = "all" | PaymentStatus;

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return mockAdminPayments;
    return mockAdminPayments.filter((p) => p.status === filter);
  }, [filter]);

  const pagination = useClientPagination(filtered, 8);

  return (
    <div>
      <PageHeader
        eyebrow="API · GET /admin/payments"
        title="Payments"
        description="All marketplace payments — held, released, disputed, and refunded."
      />

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {(
          [
            "all",
            "held",
            "pending",
            "released",
            "disputed",
            "refunded",
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
            {key === "all" ? "All" : key}
          </button>
        ))}
      </div>

      <AdminDataTable<AdminPaymentRow>
        title="Payment list"
        description="GET /admin/payments/:paymentId"
        data={pagination.pageItems}
        totalItems={pagination.totalItems}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.onPageChange}
        emptyText="No payments found."
        onRowClick={(row) => router.push(ROUTES.ADMIN_PAYMENT(row.id))}
        columns={[
          {
            key: "jobTitle",
            title: "Job",
            render: (row) => (
              <div>
                <p className="font-medium text-ink">{row.jobTitle}</p>
                <p className="text-xs text-muted">{row.method}</p>
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
              <StatusChip status={row.status} kind="payment" />
            ),
          },
          {
            key: "amount",
            title: "Amount",
            align: "right",
            render: (row) => (
              <span className="font-fraunces font-semibold tabular-nums">
                {formatCurrency(row.amount)}
              </span>
            ),
          },
          {
            key: "createdAt",
            title: "Date",
            render: (row) => formatDate(row.createdAt),
          },
        ]}
      />
    </div>
  );
}
