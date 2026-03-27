'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-slate-200 bg-slate-50 py-12 px-6',
        className
      )}
    >
      {icon ? (
        <div className="text-slate-300">{icon}</div>
      ) : (
        <svg
          className="h-16 w-16 text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      )}

      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-2 text-slate-600">{description}</p>
        )}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            'mt-4 inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2',
            'text-sm font-medium text-white',
            'transition-colors hover:bg-blue-700'
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
