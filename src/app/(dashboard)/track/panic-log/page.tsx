
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PanicLogForm } from './panic-log-form';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Panic Attack Log | Zenith',
};

export default function PanicAttackLogPage() {
  return (
    <PageLayout title="Panic Attack Log">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Log a Panic Attack</CardTitle>
                <CardDescription>
                    Tracking panic attacks can help you and your provider understand their patterns, triggers, and severity over time. Fill this out after an attack has subsided.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PanicLogForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
