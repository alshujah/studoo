
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Optimism Training | Rejoyn',
};

export default function OptimismTrainingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Positive Psychology: Optimism Training</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Learned Optimism: The ABCDE Model</CardTitle>
            <CardDescription>
              Optimism isn't just about positive thinking; it's about how you explain events to yourself. This tool, based on Dr. Martin Seligman's work, helps you challenge pessimistic thoughts and cultivate a more optimistic explanatory style.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Changing Your Explanatory Style</AlertTitle>
              <AlertDescription>
                Pessimists tend to see negative events as permanent, personal, and pervasive. Optimists see them as temporary, external, and specific. You can learn to shift your perspective.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Use the ABCDE Model</CardTitle>
                    <CardDescription>Use this framework to analyze a recent setback or challenge.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">A - Adversity</h4>
                        <p className="text-sm text-muted-foreground mt-2">Describe the adverse event objectively. Just the facts.</p>
                        <p className="text-sm mt-4 italic">Example: "I received critical feedback on a project at work."</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">B - Beliefs</h4>
                        <p className="text-sm text-muted-foreground mt-2">What were your immediate beliefs or thoughts about the adversity?</p>
                         <p className="text-sm mt-4 italic">Example: "I'm terrible at my job. I'm going to get fired. I always mess things up."</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">C - Consequences</h4>
                        <p className="text-sm text-muted-foreground mt-2">How did you feel and what did you do as a result of your beliefs?</p>
                        <p className="text-sm mt-4 italic">Example: "I felt ashamed and demotivated. I avoided my boss for the rest of the day."</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">D - Disputation</h4>
                        <p className="text-sm text-muted-foreground mt-2">Challenge your beliefs. Argue with yourself as if you were a lawyer.</p>
                        <ul className="text-sm mt-4 italic list-disc pl-5">
                            <li><strong>Evidence:</strong> "What is the evidence for and against this belief? I've had many successful projects."</li>
                            <li><strong>Alternatives:</strong> "Are there other ways to see this? Maybe the feedback is about this one project, not my whole career."</li>
                            <li><strong>Implications:</strong> "Even if my belief is true, what are the real implications? Is it really a catastrophe? I can learn from this."</li>
                        </ul>
                    </div>
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">E - Energization</h4>
                        <p className="text-sm text-muted-foreground mt-2">What are the feelings and new behaviors that result from successfully disputing your beliefs?</p>
                        <p className="text-sm mt-4 italic">Example: "I feel more hopeful and less ashamed. I'm energized to review the feedback and make a plan to improve the project."</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
