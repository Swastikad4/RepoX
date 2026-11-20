'use client';

import Link from 'next/link';
import { RepoXLogo } from '@/components/RepoXLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/70 bg-[#F8F8FA] py-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <RepoXLogo size="sm" />
            </Link>
            <span className="hidden sm:inline text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-500 font-medium">
              Understand Your Codebase. Visualize Its Architecture.
            </span>
          </div>

          <div className="text-xs text-gray-500">
            © {currentYear} RepoX. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
