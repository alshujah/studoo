
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Coping Questions | Rejoyn',
};

export default function CopingQuestionsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">SFBT: Coping Questions</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Highlighting Your Resilience</CardTitle>
            <CardDescription>
              Coping questions are designed to help you recognize your own resilience. They are especially useful when you feel overwhelmed and can't see any exceptions or progress. They shift the focus from the problem to how you've managed to survive it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>You Are Stronger Than You Think</AlertTitle>
              <AlertDescription>
                Even on the hardest days, the fact that you are still here, still trying, is a testament to your strength. Coping questions help you see that strength.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Examples of Coping Questions</CardTitle>
                    <CardDescription>Use these questions when you're feeling stuck or hopeless.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none text-foreground">
                    <ul>
                      <li>"This sounds incredibly difficult. How have you managed to get through each day so far?"</li>
                      <li>"What gets you out of bed in the morning, even when it feels impossible?"</li>
                      <li>"Given everything you've been through, what has stopped things from getting even worse?"</li>
                      <li>"What are some of the things you've done to keep going, even on the toughest days?"</li>
                      <li>"Who or what has been most helpful to you in surviving this difficult time?"</li>
                      <li>"How do you keep from giving up?"</li>
                    </ul>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
