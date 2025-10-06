
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SleepQualityForm } from './sleep-quality-form';

export const metadata: Metadata = {
  title: 'Sleep Quality Log | Rejoyn',
};

export default function SleepQualityPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Sleep Quality Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">How did you sleep?</CardTitle>
                <CardDescription>
                    Tracking your sleep helps you understand its impact on your mood and energy levels.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SleepQualityForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
