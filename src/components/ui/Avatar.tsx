/**
 * Avatar.tsx
 * Shows a user's profile picture or their initials as a fallback.
 */

import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  name?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, name, className, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'User'}
        className={cn('rounded-full object-cover', sizes[size], className)}
      />
    );
  }

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div
      className={cn(
        'rounded-full object-cover flex items-center justify-center bg-navy-100 text-navy-700 font-semibold border border-navy-200',
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
