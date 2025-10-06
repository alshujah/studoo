
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicationLogForm } from './medication-log-form';

export const metadata: Metadata = {
  title: 'Medication Log | Rejoyn',
};

export default function MedicationLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Medication Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Track Your Medication</CardTitle>
                <CardDescription>
                    Logging your medication helps ensure adherence and allows you to track any side effects over time.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <MedicationLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
