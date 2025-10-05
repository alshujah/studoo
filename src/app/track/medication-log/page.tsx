
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicationLogForm } from './medication-log-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Pill } from 'lucide-react';

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
                    Use this tool to log your medication intake, dosages, and any side effects you experience.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Pill className="h-4 w-4" />
                    <AlertTitle>Stay Consistent</AlertTitle>
                    <AlertDescription>
                       Tracking your medication helps you and your doctor understand its effectiveness and manage any side effects.
                    </AlertDescription>
                </Alert>
                <MedicationLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
