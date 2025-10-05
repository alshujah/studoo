
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HeartPulse } from 'lucide-react';

export const metadata: Metadata = {
  title: '4-7-8 Breathing Technique | Rejoyn',
};

export default function Breathing478Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">4-7-8 Breathing Technique</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">A Natural Tranquilizer for the Nervous System</CardTitle>
            <CardDescription>
              The 4-7-8 breathing technique, developed by Dr. Andrew Weil, is a simple yet powerful rhythmic breathing exercise that promotes deep relaxation. It is often used to help reduce anxiety and fall asleep.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <HeartPulse className="h-4 w-4" />
              <AlertTitle>Practice Makes Perfect</AlertTitle>
              <AlertDescription>
                The speed of the breath is less important than keeping the ratio (4-7-8). Practice this when you're calm so it becomes second nature when you're stressed.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Practice 4-7-8 Breathing</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Get Ready:</strong> Sit or lie in a comfortable position. Place the tip of your tongue against the ridge of tissue just behind your upper front teeth, and keep it there through the entire exercise.</li>
                        <li><strong>Exhale Completely:</strong> Exhale completely through your mouth, making a whoosh sound.</li>
                        <li><strong>Inhale:</strong> Close your mouth and inhale quietly through your nose to a mental count of <strong>four</strong>.</li>
                        <li><strong>Hold:</strong> Hold your breath for a count of <strong>seven</strong>.</li>
                        <li><strong>Exhale:</strong> Exhale completely through your mouth, making a whoosh sound, to a count of <strong>eight</strong>.</li>
                        <li><strong>Repeat:</strong> This is one breath. Now inhale again and repeat the cycle three more times for a total of four breaths.</li>
                    </ol>
                    <p className="font-semibold">Do not do more than four breaths in a row when you are first starting.</p>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
