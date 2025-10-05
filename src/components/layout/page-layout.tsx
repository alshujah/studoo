import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="flex flex-1 flex-col bg-muted/20">
      <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 sm:px-6">
        <h1 className="font-headline text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">{children}</div>
    </main>
  );
}
