
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SleepQualityForm } from './sleep-quality-form';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Sleep Quality Log | Zenith',
};

export default function SleepQualityPage() {
  return (
    <PageLayout title="Sleep Quality Log">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">How did you sleep?</CardTitle>
                <CardDescription>
                    Tracking your sleep helps you understand its impact on your mood and energy levels.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SleepQualityForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
