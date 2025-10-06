
import type { Metadata } from 'next';
import { FreeformJournalClient } from '../freeform/freeform-journal-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Dream Journal | Zenith',
};

export default function DreamJournalPage() {
  return (
    <PageLayout title="Dream Journal">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Record and Explore Your Dreams</CardTitle>
                <CardDescription>
                    Use this space to write down your dreams upon waking. Capturing details quickly can help you remember them more vividly. You can use the AI analysis to explore possible themes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FreeformJournalClient />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
