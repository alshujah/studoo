import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid flex-1 items-start gap-4">
            <h1 className="font-headline text-3xl font-semibold tracking-tight">{title}</h1>
            {children}
        </div>
    </main>
  );
}
