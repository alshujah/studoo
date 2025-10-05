
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Unique Outcomes | Rejoyn',
};

export default function UniqueOutcomesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Narrative Therapy: Unique Outcomes</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Finding the Exceptions</CardTitle>
            <CardDescription>
              Unique Outcomes (also called "sparkling moments") are the exceptions to the problem's rule. They are any time, thought, feeling, or action when the problem did not have its usual influence on you. These moments are the building blocks of a new, preferred story.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Problems are never 100% successful.</AlertTitle>
              <AlertDescription>
                Even in the darkest times, there are always moments, however small, when you resisted the problem or it had less of a hold on you. Our job is to find these moments and shine a light on them.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Questions to Discover Unique Outcomes</CardTitle>
                    <CardDescription>Use these prompts for journaling or reflection to uncover times when the problem wasn't in complete control.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>"Can you think of a time when you expected the problem to show up, but it didn't, even for a short while?"</li>
                        <li>"Was there a moment when you managed to take a small step in a different direction than the one the problem was pushing you toward?"</li>
                        <li>"Who in your life would be least surprised to hear that you have been able to stand up to this problem?"</li>
                        <li>"Even if the problem was present, was there a time its influence was slightly less intense than usual? What was different about that time?"</li>
                        <li>"What actions have you taken, no matter how small, that reflect your intentions for your life, rather than the problem's intentions for your life?"</li>
                        <li>"Think about a time you felt a tiny spark of hope or strength in the face of this problem. What was happening at that moment?"</li>
                        <li>"If we were to make a movie about your life, what scenes would show you resisting the problem, even if you didn't 'win'?"</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
