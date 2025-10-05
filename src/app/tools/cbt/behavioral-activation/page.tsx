import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityScheduler } from './activity-scheduler';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Behavioral Activation | Rejoyn',
};

export default function BehavioralActivationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">CBT: Behavioral Activation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Schedule Your Success</CardTitle>
                <CardDescription>
                    Behavioral Activation is a powerful technique to combat depression by scheduling activities that provide a sense of pleasure or mastery. Start small and build momentum.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Target className="h-4 w-4" />
                    <AlertTitle>Start Where You Are</AlertTitle>
                    <AlertDescription>
                       Choose activities that feel manageable, even if they're small. The goal is to get moving and break the cycle of avoidance. Consistency is more important than the size of the task.
                    </AlertDescription>
                </Alert>
                <ActivityScheduler />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
