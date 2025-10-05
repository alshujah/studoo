import type { Metadata } from 'next';
import { DashboardClient } from '@/components/dashboard-client';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Dashboard | Rejoyn',
};

export default function DashboardPage() {
  return (
    <PageLayout title="Dashboard">
      <DashboardClient />
    </PageLayout>
  );
}
