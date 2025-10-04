import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SafetyPlanForm } from './safety-plan-form';

export const metadata: Metadata = {
  title: 'Safety Plan | Rejoyn',
};

export default function SafetyPlanPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">My Safety Plan</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Create Your Personal Safety Plan</CardTitle>
            <CardDescription>
              A safety plan is a set of steps you can take to help yourself when you are feeling distressed or suicidal. Fill this out when you are feeling calm. You can come back to it at any time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SafetyPlanForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
