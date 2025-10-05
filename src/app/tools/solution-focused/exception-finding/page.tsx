
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exception Finding | Rejoyn',
};

export default function ExceptionFindingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">SFBT: Exception-Finding</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Finding What Already Works</CardTitle>
            <CardDescription>
              Exception-finding is the art of searching for times when the problem was less intense, more manageable, or completely absent. These "exceptions" are not flukes; they are evidence of your strengths and resources.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Problems Never Happen 100% of the Time</AlertTitle>
              <AlertDescription>
                There are always moments when the problem has less influence. By exploring these exceptions, we can learn what you are already doing that works and figure out how to do more of it.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Find Exceptions</CardTitle>
                    <CardDescription>Use these questions for journaling or self-reflection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none text-foreground">
                    <div>
                        <h4><strong>1. Look for Recent Examples</strong></h4>
                        <p className="italic">"Tell me about a time in the last week when this problem was a little less of a problem. What was different about that time?"</p>
                    </div>
                     <div>
                        <h4><strong>2. Explore the 'What' and 'How'</strong></h4>
                        <p>Once you find an exception, get curious about the details.</p>
                         <p className="italic">"What exactly were you doing? Who was with you? What were you thinking at that moment? How did you manage to make that happen?"</p>
                    </div>
                    <div>
                        <h4><strong>3. Connect to Your Abilities</strong></h4>
                        <p>Attribute the exception to your own skills and strengths, not just luck.</p>
                         <p className="italic">"What does it say about you that you were able to do that? What personal quality helped you in that moment?"</p>
                    </div>
                     <div>
                        <h4><strong>4. Amplify the Exception</strong></h4>
                        <p>Think about how you could create more of these moments.</p>
                        <p className="italic">"What would it take to have a little more of that happen this week? What's the smallest step you could take to make that more likely?"</p>
                    </div>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
