'use client';

import { Header } from './header';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
      </main>
    </div>
  );
}
