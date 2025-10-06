
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GratitudeForm } from './gratitude-form';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Gratitude Journal | Zenith',
};

export default function GratitudeJournalPage() {
  return (
    <PageLayout title="Gratitude Journal">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">What are you grateful for today?</CardTitle>
                <CardDescription>
                    Practicing gratitude can improve mood, increase happiness, and build resilience. Take a moment to list three good things.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <GratitudeForm />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
