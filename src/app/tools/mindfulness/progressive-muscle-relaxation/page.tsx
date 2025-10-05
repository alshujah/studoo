
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Stretch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Progressive Muscle Relaxation | Rejoyn',
};

export default function ProgressiveMuscleRelaxationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Progressive Muscle Relaxation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tense and Release</CardTitle>
            <CardDescription>
              Progressive Muscle Relaxation (PMR) is a deep relaxation technique that involves systematically tensing specific muscle groups and then releasing the tension. It helps you become more aware of physical tension and provides a method to let it go.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Stretch className="h-4 w-4" />
              <AlertTitle>Notice the Difference</AlertTitle>
              <AlertDescription>
                The key to PMR is paying close attention to the contrast between the feeling of tension and the feeling of relaxation.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">PMR Script</CardTitle>
                    <CardDescription>Find a quiet place to sit or lie down comfortably.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>For each muscle group, you will tense for about 5 seconds (without straining) and then relax for 10-15 seconds.</p>
                    <ol>
                        <li><strong>Hands:</strong> Clench your fists tightly. Hold. Now, release the tension and notice the difference.</li>
                        <li><strong>Arms:</strong> Tense your biceps, bringing your hands towards your shoulders. Hold. Relax your arms down to your sides.</li>
                        <li><strong>Forehead:</strong> Raise your eyebrows as high as you can. Hold. Let them relax completely.</li>
                        <li><strong>Eyes and Cheeks:</strong> Squeeze your eyes shut tightly. Hold. Relax your face, letting your eyes and cheeks be soft.</li>
                        <li><strong>Mouth and Jaw:</strong> Open your mouth wide, or press your lips together. Hold. Let your jaw hang loose.</li>
                        <li><strong>Shoulders:</strong> Pull your shoulders up towards your ears. Hold. Let them drop completely.</li>
                        <li><strong>Chest and Back:</strong> Arch your back slightly. Hold. Return to a comfortable position, feeling the relaxation spread.</li>
                        <li><strong>Stomach:</strong> Tighten your abdominal muscles. Hold. Let your stomach soften.</li>
                        <li><strong>Legs:</strong> Tense your thighs by pressing them together. Hold. Release the tension.</li>
                        <li><strong>Feet and Toes:</strong> Curl your toes downward tightly. Hold. Let your toes relax and spread out.</li>
                    </ol>
                    <p>After going through all the muscle groups, take a few moments to enjoy the feeling of deep relaxation throughout your body.</p>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
