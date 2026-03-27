'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface TableContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
}

export const TableContainer: React.FC<TableContainerProps> = ({
  children,
  title,
  description,
  footer,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white shadow-sm',
        className
      )}
    >
      {(title || description) && (
        <div className="border-b border-slate-200 px-6 py-4">
          {title && (
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          )}
        </div>
      )}

      <div className="overflow-hidden">{children}</div>

      {footer && (
        <div className="border-t border-slate-200 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
};

TableContainer.displayName = 'TableContainer';
