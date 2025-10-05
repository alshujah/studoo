
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PanicLogForm } from './panic-log-form';

export const metadata: Metadata = {
  title: 'Panic Attack Log | Rejoyn',
};

export default function PanicAttackLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Panic Attack Log</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Log a Panic Attack</CardTitle>
                <CardDescription>
                    Tracking panic attacks can help you and your provider understand their patterns, triggers, and severity over time. Fill this out after an attack has subsided.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PanicLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
