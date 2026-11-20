import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D74] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            'bg-[#E11D74] text-white hover:bg-[#BE185D] shadow-sm hover:shadow active:scale-[0.98]': variant === 'default',
            'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400': variant === 'outline',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'text-gray-700 hover:text-gray-950 hover:bg-gray-100': variant === 'ghost',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 px-3.5 py-1.5 text-xs': size === 'sm',
            'h-12 px-8 py-3 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
