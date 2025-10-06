
import type { Metadata } from 'next';
import { FreeformJournalClient } from './freeform-journal-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Freeform Journal | Zenith Wellness',
};

export default function FreeformJournalPage() {
  return (
    <PageLayout title="Freeform Journal">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Space to Write</CardTitle>
                <CardDescription>
                    This is your private, open space. Write about your day, explore your feelings, or just get whatever is on your mind out onto the page. When you're done, you can get AI analysis on your entry.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FreeformJournalClient />
            </CardContent>
        </Card>
    </PageLayout>
  );
}

    