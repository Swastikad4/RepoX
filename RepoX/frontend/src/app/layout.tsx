import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RepoX - Understand Your Codebase. Visualize Its Architecture',
  description: 'Understand Your Codebase. Visualize Its Architecture. AI-powered code analysis, dependency mapping, and interactive architecture diagrams for developers.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'RepoX - Understand Your Codebase. Visualize Its Architecture',
    description: 'AI-powered repository analysis and architecture visualization.',
    siteName: 'RepoX',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
