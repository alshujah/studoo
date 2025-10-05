
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Gauge } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Scaling Questions | Rejoyn',
};

export default function ScalingQuestionsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">SFBT: Scaling Questions</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Measuring What Matters</CardTitle>
            <CardDescription>
              Scaling questions are a core SFBT technique used to assess progress, measure confidence, and make abstract problems more concrete. By using a scale (usually 0 to 10), you can track changes and identify small steps forward.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Gauge className="h-4 w-4" />
              <AlertTitle>Making the Invisible Visible</AlertTitle>
              <AlertDescription>
                Feelings like "hope" or "motivation" can be hard to grasp. A scale makes them tangible. A shift from a 2 to a 3 is a real, meaningful improvement.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Use Scaling Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none text-foreground">
                    <div>
                        <h4><strong>1. Define the Scale</strong></h4>
                        <p>First, define the endpoints of your scale. What does 10 represent? What does 0 represent?</p>
                        <p className="italic">Example: "On a scale of 0 to 10, where 10 is feeling completely confident that you can handle the presentation, and 0 is no confidence at all..."</p>
                    </div>
                     <div>
                        <h4><strong>2. Get the Current Position</strong></h4>
                        <p>Ask yourself where you are on that scale right now.</p>
                         <p className="italic">"...where would you say you are right now?"</p>
                    </div>
                    <div>
                        <h4><strong>3. Explore What's Already Working</strong></h4>
                        <p>This is the most important part. If you're at a 3, what's keeping you from being at a 0? What did you do to get to a 3? This highlights existing strengths.</p>
                         <p className="italic">"Wow, a 3. That's great. What are you already doing that gets you to a 3 instead of a 0?"</p>
                    </div>
                     <div>
                        <h4><strong>4. Identify the Next Small Step</strong></h4>
                        <p>Focus on a small, manageable improvement. What would moving up just one point look like?</p>
                        <p className="italic">"What would need to happen for you to move from a 3 to a 4? What would you be doing differently at a 4?"</p>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Example Scaling Questions</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>On a scale of 0-10, where 10 is the problem is completely solved, where are you today?</li>
                        <li>On a scale of 0-10, how motivated are you to work on this issue? What would move you one point higher?</li>
                        <li>You said you're at a 2. What would a 3 look like in terms of your actions?</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
