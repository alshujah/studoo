
import type { Metadata } from 'next';
import { DashboardClient } from '@/components/dashboard-client';

export const metadata: Metadata = {
  title: 'Dashboard | Rejoyn',
};

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Dashboard</h1>
      </div>
      <DashboardClient />
    </main>
  );
}
