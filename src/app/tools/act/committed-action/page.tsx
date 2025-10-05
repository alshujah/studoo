import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityScheduler } from '@/app/tools/cbt/behavioral-activation/activity-scheduler';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Committed Action | Rejoyn',
};

export default function CommittedActionPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">ACT: Committed Action</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Take Value-Driven Steps</CardTitle>
                <CardDescription>
                    Committed action means taking concrete steps in line with your values, even when it's difficult. Use this tool to schedule small, meaningful actions that move you toward the life you want to live.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Target className="h-4 w-4" />
                    <AlertTitle>Connect to Your Values</AlertTitle>
                    <AlertDescription>
                       As you schedule activities, ask yourself: "Which of my core values does this action serve?" Linking actions to values increases motivation and fulfillment.
                    </AlertDescription>
                </Alert>
                <ActivityScheduler />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
