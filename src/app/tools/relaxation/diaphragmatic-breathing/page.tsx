
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lung } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Diaphragmatic Breathing | Rejoyn',
};

export default function DiaphragmaticBreathingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Diaphragmatic (Belly) Breathing</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Foundation of Relaxation</CardTitle>
            <CardDescription>
              Diaphragmatic breathing, also known as belly breathing, involves fully engaging the stomach, abdominal muscles, and diaphragm when breathing. This deep breathing is a powerful way to calm your nervous system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Lung className="h-4 w-4" />
              <AlertTitle>Counteracting the Stress Response</AlertTitle>
              <AlertDescription>
                Shallow, chest-level breathing is a hallmark of the stress response. Deep belly breathing activates the vagus nerve, sending a signal to your brain that it's okay to relax.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Practice Belly Breathing</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Get Comfortable:</strong> Lie on your back with your knees bent, or sit comfortably in a chair with your back straight.</li>
                        <li><strong>Hand Placement:</strong> Place one hand on your upper chest and the other hand on your belly, just below your rib cage.</li>
                        <li><strong>Breathe In:</strong> Inhale slowly through your nose for a count of four. As you breathe in, focus on letting your belly rise. The hand on your chest should remain as still as possible.</li>
                        <li><strong>Breathe Out:</strong> Exhale slowly through your mouth for a count of six. Feel your belly fall as you gently tighten your stomach muscles. The hand on your belly should move down, while the hand on your chest stays still.</li>
                        <li><strong>Repeat:</strong> Continue this process for 5 to 10 minutes. Focus on the sensation of your belly rising and falling with each breath.</li>
                    </ol>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
