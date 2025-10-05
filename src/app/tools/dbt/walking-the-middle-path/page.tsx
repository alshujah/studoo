
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Scale, GitMerge, Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Walking the Middle Path | Rejoyn',
};

const dialectics = [
    {
        poleA: "Acceptance",
        poleB: "Change",
        synthesis: "I can accept myself for who I am right now, AND I can work to change my behaviors to build a better life.",
    },
    {
        poleA: "Emotion Mind",
        poleB: "Reasonable Mind",
        synthesis: "Wise Mind: Acknowledging the validity of both my emotions and logical thinking to find a balanced, intuitive path forward.",
    },
    {
        poleA: "Doing",
        poleB: "Being",
        synthesis: "I can be productive and goal-oriented, AND I can also allow myself moments of rest and non-judgmental presence.",
    },
    {
        poleA: "Self-Denial",
        poleB: "Self-Indulgence",
        synthesis: "I can practice discipline and work towards long-term goals, AND I can also allow myself moments of pleasure and joy without guilt.",
    },
];

const thinkingErrors = [
    {
        name: "All-or-Nothing Thinking",
        example: '"If I\'m not a complete success, I\'m a failure."',
        middlePath: '"I can be successful in some areas and still have areas for growth."',
    },
    {
        name: "Emotional Reasoning",
        example: '"I feel anxious, so it must be a dangerous situation."',
        middlePath: '"I feel anxious, AND I can check the facts to see if the situation is truly dangerous."',
    },
]

export default function WalkingTheMiddlePathPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT: Walking the Middle Path</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">What is "Walking the Middle Path"?</CardTitle>
            <CardDescription>
              "Walking the Middle Path" is a core DBT concept that involves finding a synthesis between two seeming opposites. It's about moving away from "black-and-white" or "all-or-nothing" thinking and embracing a more balanced, "both-and" perspective.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <GitMerge className="h-4 w-4" />
              <AlertTitle>The Goal: Synthesis, Not Compromise</AlertTitle>
              <AlertDescription>
                The "middle path" is not about finding a bland compromise. It's about creating a new, more effective path by integrating the valid points from two opposing views.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Examples of Dialectics</CardTitle>
                <CardDescription>Here are some common opposites that DBT helps us to synthesize.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {dialectics.map((dialectic) => (
                    <div key={dialectic.poleA} className="p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-center font-semibold">{dialectic.poleA}</div>
                            <div className="text-primary font-bold">AND</div>
                            <div className="text-center font-semibold">{dialectic.poleB}</div>
                        </div>
                        <div className="mt-4 p-3 bg-muted/50 rounded-md text-center">
                            <h4 className="font-semibold flex items-center justify-center gap-2"><Scale className="size-5 text-primary" /> Synthesis</h4>
                            <p className="text-sm text-muted-foreground mt-2 italic">"{dialectic.synthesis}"</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Challenging Thinking Errors</CardTitle>
                <CardDescription>Use the middle path to challenge black-and-white thinking patterns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {thinkingErrors.map((error) => (
                    <div key={error.name} className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-lg">{error.name}</h4>
                        <div className="mt-2 p-3 bg-destructive/10 rounded-md">
                            <p className="flex items-start gap-2 text-sm"><X className="size-4 mt-0.5 text-destructive shrink-0"/> <span className="font-semibold">Example:</span> {error.example}</p>
                        </div>
                        <div className="mt-2 p-3 bg-green-600/10 rounded-md">
                             <p className="flex items-start gap-2 text-sm"><Check className="size-4 mt-0.5 text-green-600 shrink-0"/> <span className="font-semibold">Middle Path:</span> {error.middlePath}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
