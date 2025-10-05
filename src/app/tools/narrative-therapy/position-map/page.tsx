
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Map } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Statement of Position Map | Rejoyn',
};

export default function PositionMapPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Narrative Therapy: Statement of Position Map</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mapping Your Stance</CardTitle>
            <CardDescription>
              The Statement of Position Map is a structured set of questions to help you clarify your relationship with a problem. It moves through four stages: naming the problem, mapping its effects, evaluating its effects, and justifying your evaluation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Map className="h-4 w-4" />
              <AlertTitle>A Four-Step Investigation</AlertTitle>
              <AlertDescription>
                Use these questions as a guide for journaling or self-reflection to get clear on where you stand in relation to the problem.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Step 1: Name and Characterize the Problem</CardTitle>
                        <CardDescription>Use the externalizing technique to give the problem a name that fits your experience.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <p className="font-semibold italic">"The name I give to this problem is..." (e.g., "The Perfectionism Police")</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Step 2: Map the Effects of the Problem</CardTitle>
                        <CardDescription>Trace the problem's influence across different areas of your life.</CardDescription>
                    </CardHeader>
                     <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                            <li>What is the effect of The Perfectionism Police on my energy and motivation?</li>
                            <li>What does it do to my relationships with others?</li>
                            <li>How does it impact my view of myself?</li>
                            <li>What does it make me believe about my future?</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Step 3: Evaluate the Effects of the Problem</CardTitle>
                        <CardDescription>Take a stance on these effects. Are they positive, negative, or a mix?</CardDescription>
                    </CardHeader>
                     <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                            <li>Are you okay with these effects? Yes or No?</li>
                            <li>Do these effects fit with what you want for your life?</li>
                            <li>Should this be allowed to continue, or should something be done about it?</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Step 4: Justify the Evaluation</CardTitle>
                        <CardDescription>Explain why you have taken this position. This connects you to your values and intentions.</CardDescription>
                    </CardHeader>
                     <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                            <li>Why are you not okay with these effects?</li>
                            <li>What hopes, dreams, or values for your life lead you to this evaluation?</li>
                            <li>What do you value or hold dear that is being threatened by this problem?</li>
                        </ul>
                        <p className="mt-4 italic text-muted-foreground">Example: "I'm not okay with these effects because I value connection and creativity, and The Perfectionism Police makes me hide my work and pull away from others."</p>
                    </CardContent>
                </Card>
            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
