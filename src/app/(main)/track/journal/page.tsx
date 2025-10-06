
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FreeformJournalClient } from './freeform/freeform-journal-client';
import GratitudeJournalPage from './gratitude/page';
import ThoughtRecordPage from '../../tools/thought-record/page';
import { useSearchParams } from 'next/navigation';

// Note: Metadata is not used in client components, but kept for potential future server-side rendering.
// export const metadata: Metadata = {
//   title: 'Journal | Zenith Wellness',
// };

export default function JournalPage() {
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get('tab') || 'freeform';

  return (
    <PageLayout title="Journaling Tools">
        <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="freeform">Freeform</TabsTrigger>
                <TabsTrigger value="gratitude">Gratitude</TabsTrigger>
                <TabsTrigger value="thought-record">Thought Record</TabsTrigger>
            </TabsList>
            <TabsContent value="freeform">
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
            </TabsContent>
            <TabsContent value="gratitude">
                <GratitudeJournalPage />
            </TabsContent>
            <TabsContent value="thought-record">
                <ThoughtRecordPage />
            </TabsContent>
        </Tabs>
    </PageLayout>
  );
}

    