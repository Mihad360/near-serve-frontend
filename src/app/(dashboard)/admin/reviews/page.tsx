"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { mockAdminReviews, type AdminReviewRow } from "@/data/adminMock";
import AdminDataTable from "@/components/admin/AdminDataTable";
import PageHeader from "@/components/shared/app/PageHeader";
import { useClientPagination } from "@/hooks/useClientPagination";
import { formatDate } from "@/lib/customer/format";

export default function AdminReviewsPage() {
  const [rows, setRows] = useState(mockAdminReviews);
  const pagination = useClientPagination(rows, 8);

  const remove = (review: AdminReviewRow) => {
    setRows((prev) => prev.filter((r) => r.id !== review.id));
    toast.success("Review deleted");
    // useAdminDeleteReviewMutation(review.id)
  };

  return (
    <div>
      <PageHeader
        eyebrow="API · GET /admin/reviews"
        title="Reviews"
        description="Moderate public reviews. Delete spam or abusive content."
      />

      <AdminDataTable<AdminReviewRow>
        title="Review list"
        description="DELETE /admin/reviews/:reviewId"
        data={pagination.pageItems}
        totalItems={pagination.totalItems}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.onPageChange}
        emptyText="No reviews left."
        columns={[
          {
            key: "jobTitle",
            title: "Job",
            render: (row) => (
              <div>
                <p className="font-medium text-ink">{row.jobTitle}</p>
                <p className="text-xs text-muted line-clamp-1">{row.comment}</p>
              </div>
            ),
          },
          {
            key: "reviewerName",
            title: "From",
          },
          {
            key: "revieweeName",
            title: "About",
          },
          {
            key: "rating",
            title: "Rating",
            render: (row) => (
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                {row.rating}
              </span>
            ),
          },
          {
            key: "createdAt",
            title: "Date",
            render: (row) => formatDate(row.createdAt),
          },
          {
            key: "actions",
            title: "",
            align: "right",
            render: (row) => (
              <button
                type="button"
                onClick={() => remove(row)}
                className="rounded-lg border border-border text-xs font-semibold px-2.5 py-1.5 text-[#8b1a1a]"
              >
                Delete
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}
