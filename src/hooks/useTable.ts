'use client';

import { useState, useCallback, useMemo } from 'react';

export interface UseTableOptions<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export interface UseTableReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  isFirstPage: boolean;
  isLastPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  totalItems: number;
}

export function useTable<T>({
  data,
  itemsPerPage = 10,
  initialPage = 1,
}: UseTableOptions<T>): UseTableReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return {
    currentPage,
    totalPages,
    paginatedData,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    goToPage,
    nextPage,
    prevPage,
    totalItems: data.length,
  };
}
