
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WorryLogForm } from './worry-log-form';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Worry & Rumination Log | Rejoyn',
};

export default function WorryLogPage() {
  return (
    <PageLayout title="Worry & Rumination Log">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Postpone Your Worries</CardTitle>
                <CardDescription>
                    This tool helps you manage worry by scheduling a specific time to think about them. This can free up your mental space and reduce rumination throughout the day.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <WorryLogForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
