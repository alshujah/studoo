
import type { Metadata } from 'next';
import { FreeformJournalClient } from './freeform-journal-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Freeform Journal | Zenith',
};

export default function FreeformJournalPage() {
  return (
    <PageLayout title="Freeform Journal">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">What's on your mind?</CardTitle>
                <CardDescription>
                    This is your space to write freely. Don't worry about grammar or structure. Just let your thoughts flow. When you're done, you can get AI-powered feedback.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FreeformJournalClient />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
