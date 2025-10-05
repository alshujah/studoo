
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityLogForm } from './activity-log-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Activity Logging | Rejoyn',
};

export default function ActivityLogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Log an Activity</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">What have you been up to?</CardTitle>
                <CardDescription>
                    Logging your activities and their effect on your mood can help you identify what energizes you and what drains you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Activity className="h-4 w-4" />
                    <AlertTitle>Connect Actions and Feelings</AlertTitle>
                    <AlertDescription>
                       Pay attention to how your mood shifts before and after an activity. This is key to understanding the impact of your actions on your well-being.
                    </AlertDescription>
                </Alert>
                <ActivityLogForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
