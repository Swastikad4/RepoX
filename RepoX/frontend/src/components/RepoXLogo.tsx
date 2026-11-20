import React from 'react';

interface RepoXLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
  showTagline?: boolean;
  variant?: 'light' | 'dark';
}

export function RepoXLogo({
  className = '',
  size = 'md',
  iconOnly = false,
  showTagline = false,
  variant = 'light',
}: RepoXLogoProps) {
  const sizeMap = {
    sm: { text: 'text-xl', tagline: 'text-[10px]' },
    md: { text: 'text-2xl', tagline: 'text-xs' },
    lg: { text: 'text-3xl', tagline: 'text-sm' },
    xl: { text: 'text-4xl', tagline: 'text-base' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {iconOnly ? (
        <span
          className={`font-black tracking-tight leading-none ${currentSize.text} ${
            isDark ? 'text-white' : 'text-gray-950'
          }`}
        >
          R
          <span className="bg-gradient-to-r from-[#E11D74] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
            X
          </span>
        </span>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className={`font-black tracking-tight leading-none ${currentSize.text} ${
                isDark ? 'text-white' : 'text-gray-950'
              }`}
            >
              Repo
              <span className="bg-gradient-to-r from-[#E11D74] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent">
                X
              </span>
            </span>
          </div>

          {showTagline && (
            <span
              className={`font-medium tracking-normal mt-0.5 ${currentSize.tagline} ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Understand Your Codebase. Visualize Its Architecture.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default RepoXLogo;
