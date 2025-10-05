import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WorryLogForm } from './worry-log-form';

export const metadata: Metadata = {
  title: 'Worry & Rumination Log | Rejoyn',
};

export default function WorryLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Worry & Rumination Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Postpone Your Worries</CardTitle>
                <CardDescription>
                    This tool helps you manage worry by scheduling a specific time to think about them. This can free up your mental space and reduce rumination throughout the day.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <WorryLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
