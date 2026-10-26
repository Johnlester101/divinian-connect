/**
 * Button.tsx
 * Reusable button component following the Divinian Connect design system.
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const base = 'rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-navy-600 text-white hover:bg-navy-700 focus:ring-navy-500 shadow-soft',
      secondary:
        'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-400',
      ghost:
        'text-gray-600 hover:bg-gray-100 focus:ring-gray-300 hover:text-gray-900',
      outline:
        'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
      danger:
        'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
