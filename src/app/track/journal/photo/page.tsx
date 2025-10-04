import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoJournalTool } from './photo-journal-tool';

export const metadata: Metadata = {
  title: 'Photo Journal | Rejoyn',
};

export default function PhotoJournalPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Photo Journal</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
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
      </div>
    </main>
  );
}
