
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MindfulnessBellTool } from './mindfulness-bell-tool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mindfulness Bell | Rejoyn',
};

export default function MindfulnessBellPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="font-headline text-xl font-semibold">Mindfulness Bell</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">A Gentle Reminder to Be Present</CardTitle>
                <CardDescription>
                    Use this tool to play a gentle bell sound at regular intervals. This can act as a reminder to return to the present moment, check in with your breath, or simply notice your surroundings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert className="mb-8">
                    <Bell className="h-4 w-4" />
                    <AlertTitle>Integrate Mindfulness into Your Day</AlertTitle>
                    <AlertDescription>
                       You can use this bell while you work, read, or do chores. Each time the bell rings, take one conscious breath before returning to your activity.
                    </AlertDescription>
                </Alert>
                <MindfulnessBellTool />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
