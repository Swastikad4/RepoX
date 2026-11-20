'use client';

import Link from 'next/link';
import { RepoXLogo } from '@/components/RepoXLogo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-[#F8F8FA]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-8">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <RepoXLogo size="md" />
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
