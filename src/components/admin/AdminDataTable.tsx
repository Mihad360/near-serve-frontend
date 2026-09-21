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
    <div className="bg-stone-100 rounded-3xl p-6 shadow-xs animate-fade-up space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-ink">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-muted mt-0.5">{description}</p>
          )}
          {typeof totalItems === "number" && (
            <span className="inline-block text-[11px] font-bold text-muted bg-stone-200/70 px-2 py-0.5 rounded-full mt-1.5">
              {totalItems} records found
            </span>
          )}
        </div>
        {toolbar}
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-xs">
        <UseTable
          columns={columns}
          data={data}
          loading={loading}
          emptyText={emptyText}
          hover
          striped
          onRowClick={onRowClick}
        />
      </div>

      {totalPages > 1 && (
        <div className="pt-2">
          <UsePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showFirstLast
          />
        </div>
      )}
    </div>
  );
}
