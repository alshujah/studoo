
import type { Metadata } from 'next';
import { FreeformJournalClient } from '../freeform/freeform-journal-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dream Journal | Rejoyn',
};

export default function DreamJournalPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Dream Journal</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Record and Explore Your Dreams</CardTitle>
                <CardDescription>
                    Use this space to write down your dreams upon waking. Capturing details quickly can help you remember them more vividly and explore their themes later.
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
