
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FreeformJournalClient } from './freeform-journal-client';

export const metadata: Metadata = {
  title: 'Freeform Journal | Rejoyn',
};

export default function FreeformJournalPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Freeform Journal</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Space to Write</CardTitle>
                <CardDescription>
                    This is your private, open space. Write about your day, explore your feelings, or just get whatever is on your mind out onto the page. You can choose to get AI analysis on your entry.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FreeformJournalClient />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
