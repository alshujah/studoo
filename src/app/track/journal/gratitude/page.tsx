import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GratitudeForm } from './gratitude-form';

export const metadata: Metadata = {
  title: 'Gratitude Journal | Rejoyn',
};

export default function GratitudeJournalPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Gratitude Journal</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Three Good Things</CardTitle>
                <CardDescription>
                    This is a simple but powerful exercise. Take a moment to reflect on three things that went well today and write them down. This helps shift your focus towards the positive aspects of your day.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <GratitudeForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
