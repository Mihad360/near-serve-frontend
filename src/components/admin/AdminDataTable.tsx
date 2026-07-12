"use client";

import type { ReactNode } from "react";
import UseTable from "@/components/ui/UseTable";
import UsePagination from "@/components/ui/UsePagination";

type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (record: T, index: number) => ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminDataTableProps<T extends Record<string, any>> = {
  title: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  toolbar?: ReactNode;
  onRowClick?: (record: T, index: number) => void;
};

export default function AdminDataTable<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
>({
  title,
  description,
  columns,
  data,
  loading,
  emptyText,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  toolbar,
  onRowClick,
}: AdminDataTableProps<T>) {
  return (
    <div className="app-surface rounded-2xl overflow-hidden animate-fade-up">
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-fraunces text-lg font-semibold text-ink">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-muted mt-0.5">{description}</p>
          )}
          {typeof totalItems === "number" && (
            <p className="text-[11px] text-muted mt-1">
              {totalItems} total
            </p>
          )}
        </div>
        {toolbar}
      </div>
      <UseTable
        columns={columns}
        data={data}
        loading={loading}
        emptyText={emptyText}
        hover
        striped
        onRowClick={onRowClick}
      />
      <div className="px-4 pb-4">
        <UsePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showFirstLast
        />
      </div>
    </div>
  );
}
