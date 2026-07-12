"use client";

import { useMemo, useState } from "react";

const DEFAULT_PAGE_SIZE = 8;

/**
 * Client-side pagination for design/mock lists.
 * Swap `items` for API `data` and drive page via query args when wiring RTK.
 */
export function useClientPagination<T>(
  items: T[],
  pageSize: number = DEFAULT_PAGE_SIZE,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const page = Math.min(currentPage, totalPages);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const onPageChange = (next: number) => {
    setCurrentPage(Math.min(Math.max(1, next), totalPages));
  };

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage: page,
    totalPages,
    pageSize,
    pageItems,
    totalItems: items.length,
    onPageChange,
    resetPage,
  };
}
