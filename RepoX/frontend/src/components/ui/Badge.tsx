import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'magenta';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#E11D74] focus:ring-offset-2',
        {
          'border-transparent bg-[#E11D74] text-white hover:bg-[#BE185D]':
            variant === 'default' || variant === 'magenta',
          'border-transparent bg-pink-50 text-[#BE185D] border-pink-200':
            variant === 'secondary',
          'border-transparent bg-red-600 text-white hover:bg-red-700':
            variant === 'destructive',
          'text-gray-900 border-gray-300 bg-white': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
