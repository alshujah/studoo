
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyLogForm } from './activity-log-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Daily Log | Rejoyn',
};

export default function DailyLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Daily Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">How was your day?</CardTitle>
                <CardDescription>
                    Logging your daily activities, energy, and habits can help you identify patterns that affect your well-being.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Activity className="h-4 w-4" />
                    <AlertTitle>Connect Actions and Feelings</AlertTitle>
                    <AlertDescription>
                       Pay attention to how different parts of your day impact your mood and energy. You don't have to fill everything out—just what feels relevant.
                    </AlertDescription>
                </Alert>
                <DailyLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
