
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicationLogForm } from './medication-log-form';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Medication Log | Zenith',
};

export default function MedicationLogPage() {
  return (
    <PageLayout title="Medication Log">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Track Your Medication</CardTitle>
                <CardDescription>
                    Logging your medication helps ensure adherence and allows you to track any side effects over time.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <MedicationLogForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
