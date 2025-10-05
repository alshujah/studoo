
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SleepLogForm } from './sleep-log-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BedDouble } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sleep Quality Tracking | Rejoyn',
};

export default function SleepQualityLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Track Your Sleep</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">How did you sleep?</CardTitle>
                <CardDescription>
                    Tracking your sleep can reveal patterns that affect your mood and energy levels.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <BedDouble className="h-4 w-4" />
                    <AlertTitle>Consistency is Key</AlertTitle>
                    <AlertDescription>
                       Try to log your sleep around the same time each morning to get the most accurate picture of your sleep patterns.
                    </AlertDescription>
                </Alert>
                <SleepLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
