
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Re-authoring Conversations | Rejoyn',
};

export default function ReauthoringPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Narrative Therapy: Re-authoring Conversations</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Rewriting Your Story</CardTitle>
            <CardDescription>
              Re-authoring is about shifting focus from the "problem-saturated story" to alternative stories of strength, resilience, and resistance. It involves linking together "unique outcomes" (times when the problem wasn't in charge) to form a new, preferred narrative.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Newspaper className="h-4 w-4" />
              <AlertTitle>You are the author of your life story.</AlertTitle>
              <AlertDescription>
                While you can't change the past events, you can change the meaning you make of them. Re-authoring helps you shine a light on the stories that have been neglected.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Re-authoring Questions</CardTitle>
                    <CardDescription>Use these prompts to explore an alternative story based on a unique outcome.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Start with a "unique outcome" - a time you resisted the problem. For example, a time "Anxiety" told you to stay home, but you went out anyway.</p>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">1. The Action Landscape</h4>
                        <p className="text-sm text-muted-foreground mt-2">Detail the specific actions you took.</p>
                        <p className="text-sm mt-4 italic">"What was the very first step you took to go out despite the anxiety? What did you do next? Who was there? What did they do?"</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">2. The Identity Landscape</h4>
                        <p className="text-sm text-muted-foreground mt-2">Connect these actions to your personal qualities and values.</p>
                         <p className="text-sm mt-4 italic">"What does it say about you that you were able to do that? What personal strengths did you draw upon? What values were you honoring by taking that step?"</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">3. Linking to History</h4>
                        <p className="text-sm text-muted-foreground mt-2">Find other examples of this quality in your past.</p>
                        <p className="text-sm mt-4 italic">"Can you think of another time in your life when you showed this same kind of courage or determination? How does this connect to the person you've always been?"</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">4. Linking to the Future</h4>
                        <p className="text-sm text-muted-foreground mt-2">Imagine where this new story might go.</p>
                        <p className="text-sm mt-4 italic">"Now that you've rediscovered this 'courageous' part of your story, what might be the next step for it? Where could it take you?"</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
