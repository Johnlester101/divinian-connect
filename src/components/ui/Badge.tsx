/**
 * Badge.tsx
 * Reusable badge for statuses, categories, roles.
 */

import { cn } from '@/lib/utils';

interface BadgeProps {
  className?: string;
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'info'
    | 'danger'
    | 'navy'
    | 'gold';
  children: React.ReactNode;
}

const variants: Record<string, string> = {
  default: 'bg-gray-100 text-gray-700 border border-gray-200',
  success: 'bg-green-100 text-green-700 border border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  info: 'bg-blue-100 text-blue-700 border border-blue-200',
  danger: 'bg-red-100 text-red-700 border border-red-200',
  navy: 'bg-navy-100 text-navy-800 border border-navy-200',
  gold: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
};

export function Badge({ className, variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
