
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wind } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Mindful Breathing | Rejoyn',
};

export default function MindfulBreathingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Mindful Breathing</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Anchor of Your Breath</CardTitle>
            <CardDescription>
              Mindful breathing is the practice of focusing on your breath as it flows in and out. It's a simple yet powerful technique to anchor you in the present moment, calm your nervous system, and observe your thoughts without getting lost in them.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Wind className="h-4 w-4" />
              <AlertTitle>Your Breath is Always With You</AlertTitle>
              <AlertDescription>
                You don't need any special equipment or place. Your breath is a portable anchor you can use to find calm anytime, anywhere.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Practice Mindful Breathing</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Find a comfortable position.</strong> You can sit in a chair with your feet on the floor, or on a cushion. Keep your back straight but not stiff.</li>
                        <li><strong>Close your eyes gently.</strong> If you prefer, you can keep them open with a soft, downward gaze.</li>
                        <li><strong>Bring your attention to your breath.</strong> Notice the physical sensation of breathing. Feel the air entering your nostrils, filling your lungs, and then leaving your body.</li>
                        <li><strong>Pick an anchor spot.</strong> Choose one spot where you feel the breath most clearly—it could be your nostrils, your chest, or your abdomen. Let your attention rest there.</li>
                        <li><strong>Just observe.</strong> Don't try to control or change your breath. Simply watch it as it is. Notice the rhythm, the depth, the temperature.</li>
                        <li><strong>When your mind wanders, gently return.</strong> Your mind will inevitably wander. That's okay. When you notice it has drifted away, gently and without judgment, acknowledge the thought and then guide your attention back to your breath.</li>
                        <li><strong>Continue for a few minutes.</strong> Start with just 3-5 minutes. The goal is not to have an empty mind, but to practice returning to the present moment each time you get distracted.</li>
                    </ol>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Try a Structured Exercise</CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">For a more guided experience, try the Box Breathing exercise.</p>
                    <Button asChild>
                        <Link href="/tools/relaxation/box-breathing">Go to Box Breathing Tool</Link>
                    </Button>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
