'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  GitBranch, 
  Layers, 
  FileCode, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { RepoXLogo } from '@/components/RepoXLogo';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Architecture', href: '/#architecture', icon: Layers },
    { name: 'Dependencies', href: '/#dependencies', icon: GitBranch },
    { name: 'Central Files', href: '/#files', icon: FileCode },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } ${className}`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <Link href="/" className="flex items-center overflow-hidden">
          <RepoXLogo size="md" iconOnly={collapsed} />
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                active
                  ? 'bg-pink-50 text-[#E11D74] font-semibold'
                  : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-950'
              }`}
              title={collapsed ? item.name : undefined}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-[#E11D74]' : 'text-gray-500'}`} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-200 p-4">
        {!collapsed ? (
          <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
            <p className="font-semibold text-gray-700">RepoX v1.0</p>
            <p className="mt-0.5 leading-relaxed">
              Understand Your Codebase. Visualize Its Architecture.
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-[11px] font-semibold text-gray-400">v1.0</span>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
