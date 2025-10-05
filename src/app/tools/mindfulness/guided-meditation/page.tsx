
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Ear } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guided Meditation | Rejoyn',
};

export default function GuidedMeditationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Guided Meditation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">A 5-Minute Breathing Meditation</CardTitle>
            <CardDescription>
              This simple guided meditation can help you calm your mind and anchor yourself in the present moment. Find a quiet place where you won't be disturbed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Ear className="h-4 w-4" />
              <AlertTitle>Find a Comfortable Posture</AlertTitle>
              <AlertDescription>
                Sit in a chair with your feet flat on the floor, or on a cushion on the floor. Keep your back upright but not stiff. Let your hands rest in your lap. You can close your eyes or keep them softly open with a lowered gaze.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Meditation Script</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p><strong>(Start of session)</strong></p>
                    <p>Begin by bringing your attention to your body. Notice the points of contact between your body and the chair or floor. Let yourself feel grounded.</p>
                    <p>Now, bring your awareness to your breath. Notice the sensation of the breath entering your body, and the sensation of the breath leaving your body. Don't try to change your breathing in any way. Just observe it.</p>
                    <p>Notice where you feel the breath most vividly. It might be the coolness of the air in your nostrils, the rising and falling of your chest, or the gentle expansion of your abdomen.</p>
                    <p>Rest your attention on this sensation. Each time you breathe in, be aware that you are breathing in. Each time you breathe out, be aware that you are breathing out.</p>
                    <p>Sooner or later, your mind will wander. It might wander to thoughts, plans, or memories. This is completely normal. It's what minds do. When you notice your mind has wandered, gently and without judgment, guide your attention back to your breath.</p>
                    <p>The moment you realize you've been distracted is a moment of mindfulness. The practice is simply returning, again and again, to the anchor of your breath.</p>
                    <p>Continue this for a few more moments. Just being here, with your breath. Nothing to do, nowhere to go.</p>
                    <p><strong>(End of session)</strong></p>
                    <p>When you're ready, gently widen your awareness to include the sounds around you, the feeling of the air on your skin, and the space your body occupies. Slowly open your eyes if they were closed, and take a moment to notice how you feel.</p>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
