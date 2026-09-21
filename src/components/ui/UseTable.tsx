"use client";

import React from "react";

type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
};

type RmTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  rowClassName?: string | ((record: T, index: number) => string);
  onRowClick?: (record: T, index: number) => void;
  bordered?: boolean;
  striped?: boolean;
  hover?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UseTable = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyText = "No data found",
  rowClassName,
  onRowClick,
  bordered = false,
  striped = true,
  hover = true,
}: RmTableProps<T>) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 w-full">
        <div className="text-stone-400 text-sm font-semibold animate-pulse">
          Loading data...
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center py-16 text-stone-400 text-sm font-medium w-full">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full scrollbar-none">
      <table className={`w-full min-w-full text-left border-collapse table-auto ${bordered ? "border border-stone-200" : ""}`}>
        <thead>
          <tr className="bg-stone-50 border-b border-stone-200/80">
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`px-5 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider ${
                  col.align === "center"
                    ? "text-center"
                    : col.align === "right"
                      ? "text-right"
                      : "text-left"
                } ${col.className || ""}`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const rowClickable = onRowClick ? "cursor-pointer" : "";
            const bgColor =
              striped && rowIndex % 2 === 1 ? "bg-stone-50/40" : "bg-white";
            const hoverClass = hover ? "hover:bg-stone-100/80" : "";
            const customRowClass =
              typeof rowClassName === "function"
                ? rowClassName(row, rowIndex)
                : rowClassName || "";

            return (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={`border-b border-stone-100 last:border-0 transition-colors duration-150 ${bgColor} ${hoverClass} ${rowClickable} ${customRowClass}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className={`px-5 py-4 text-sm text-ink ${
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                          ? "text-right"
                          : "text-left"
                    } ${col.className || ""}`}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UseTable;
