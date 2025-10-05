
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Map, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trauma Timeline Creator | Rejoyn',
};

export default function TraumaTimelinePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Trauma Timeline Creator</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mapping Your Story</CardTitle>
            <CardDescription>
              A trauma timeline is a therapeutic tool used to visually organize significant life events, both positive and negative. It can help you understand the context of your experiences, see patterns, and externalize difficult memories.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Proceed with Caution & Care</AlertTitle>
              <AlertDescription>
                This exercise can be emotionally intense. Please ensure you are in a safe space and have support available. If you feel overwhelmed, it is important to stop and use a grounding technique. This is a tool for personal insight and is best used in conjunction with a therapist.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Map className="size-6 text-primary" />How to Create Your Timeline</CardTitle>
                    <CardDescription>Use a large piece of paper, a digital whiteboard, or a private journal.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Draw Your Lifeline:</strong> Draw a horizontal line across the page. The start of the line is your birth, and the end is the present day.</li>
                        <li><strong>Add Major Life Events (The Anchors):</strong> Before focusing on trauma, mark significant life milestones on the line. These can be neutral or positive, such as starting school, moving to a new city, graduations, or important relationships. This provides context and reminds you that your life is more than just the trauma.</li>
                        <li><strong>Gently Add Difficult Events:</strong> When you feel ready, begin to mark the traumatic or difficult experiences on the timeline. You do not need to add everything at once. Go at your own pace.
                            <ul className="my-2">
                                <li>You decide how much detail to include. It can be a single word (e.g., "The Accident"), a date, or a brief, factual phrase.</li>
                                <li>You don't have to write down details you're not ready to confront. The goal is to organize, not re-live.</li>
                            </ul>
                        </li>
                        <li><strong>Note Periods of Safety & Support:</strong> It is equally important to mark times when you felt safe, supported, or resilient. Who was there for you? What strengths did you use to get through? Add these "islands of safety" to your map.</li>
                        <li><strong>Reflect, Don't Judge:</strong> Once you have some points on your timeline, step back and look at it. The goal is not to judge your past but to observe it. Notice how events are clustered, the spaces in between, and the resources you had.</li>
                    </ol>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
