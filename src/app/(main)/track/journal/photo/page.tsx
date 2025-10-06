
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoJournalTool } from './photo-journal-tool';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Photo Journal | Rejoyn',
};

export default function PhotoJournalPage() {
  return (
    <PageLayout title="Photo Journal">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Capture Your Moment</CardTitle>
                <CardDescription>
                    Sometimes a picture is worth a thousand words. Upload an image that represents your current mood, a recent experience, or something you want to remember. Add a caption to reflect on it.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PhotoJournalTool />
            </CardContent>
        </Card>
    </PageLayout>
  );
}
