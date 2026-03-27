'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className,
}) => {
  const pages = useMemo(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i == 1 || i == totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        className={cn(
          'flex items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm font-medium',
          'transition-colors',
          currentPage === 1 || isLoading
            ? 'cursor-not-allowed bg-slate-50 text-slate-400'
            : 'bg-white text-slate-700 hover:bg-slate-50'
        )}
      >
        <span>←</span>
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className="px-2 text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              disabled={isLoading}
              className={cn(
                'relative h-9 w-9 rounded border px-0 text-sm font-medium transition-colors',
                page === currentPage
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50'
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        className={cn(
          'flex items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm font-medium',
          'transition-colors',
          currentPage === totalPages || isLoading
            ? 'cursor-not-allowed bg-slate-50 text-slate-400'
            : 'bg-white text-slate-700 hover:bg-slate-50'
        )}
      >
        <span>Next</span>
        <span>→</span>
      </button>
    </div>
  );
};

function useMemo<T>(factory: () => T, deps: React.DependencyList): T {
  return React.useMemo(factory, deps);
}

Pagination.displayName = 'Pagination';
