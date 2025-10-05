import React from 'react';

type PageLayoutProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function PageLayout({ title, action, children }: PageLayoutProps) {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
        <h1 className="font-headline text-xl font-semibold">{title}</h1>
        {action && <div>{action}</div>}
      </div>
      <div className="flex-1 p-4 md:p-6">{children}</div>
    </main>
  );
}
