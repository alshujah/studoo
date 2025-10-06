
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityLogForm } from './activity-log-form';

export const metadata: Metadata = {
  title: 'Daily Activity Log | Rejoyn',
};

export default function ActivityLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Daily Activity Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Log Your Activities</CardTitle>
                <CardDescription>
                    Tracking your daily activities can help you understand how they affect your mood, energy, and overall well-being.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ActivityLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
