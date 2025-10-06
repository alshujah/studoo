
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityLogForm } from './activity-log-form';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Daily Activity Log | Zenith',
};

export default function ActivityLogPage() {
  return (
    <PageLayout title="Daily Activity Log">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Log Your Activities</CardTitle>
                <CardDescription>
                    Tracking your daily activities can help you understand how they affect your mood, energy, and overall well-being.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ActivityLogForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
