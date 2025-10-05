
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Scan } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Body Scan Meditation | Rejoyn',
};

export default function BodyScanPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Body Scan Meditation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">A Journey Through the Body</CardTitle>
            <CardDescription>
              The body scan is a foundational mindfulness practice that involves paying attention to physical sensations in your body in a systematic way. It helps you develop a deeper connection to your body and notice sensations without judging them.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Scan className="h-4 w-4" />
              <AlertTitle>Find a Comfortable Position</AlertTitle>
              <AlertDescription>
                Traditionally, the body scan is done lying down on your back, but you can also do it sitting in a chair. The goal is to be comfortable but to remain awake and aware.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Body Scan Script</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p><strong>(Start of session)</strong></p>
                    <p>Settle into a comfortable position and gently close your eyes. Take a few deep breaths, allowing your body to begin to relax.</p>
                    <p>Bring your awareness to the toes of your left foot. Notice any sensations you find there—tingling, warmth, coolness, or maybe nothing at all. There's no right or wrong way to feel. Just be curious.</p>
                    <p>Now, slowly expand your awareness to include your entire left foot—the sole, the heel, the top of the foot. Hold it in your attention for a few breaths.</p>
                    <p>Gradually, begin to move your awareness up your left leg, to your ankle, your shin, and your calf muscle. Notice any sensations without needing to change them.</p>
                    <p>Continue this journey up your body, moving your focus to your knee, your thigh, and then repeating the entire process for your right leg, starting with the toes of your right foot.</p>
                    <p>Once you've scanned both legs, bring your awareness to your pelvic region, your lower back, and your abdomen. Notice the gentle rise and fall with each breath.</p>
                    <p>Continue upward through your torso, to your chest and your upper back. Then, move your awareness down your arms, to your hands, and all the way to your fingertips.</p>
                    <p>Next, bring your awareness to your neck, your throat, and your shoulders. See if you can release any tension you might be holding here.</p>
                    <p>Finally, move your attention to your head. Notice your jaw, your cheeks, your eyes, your forehead, and the very top of your scalp. Allow your whole face to be soft.</p>
                    <p>For the last few moments, expand your awareness to feel your entire body as one whole field of sensation, breathing in and out.</p>
                    <p><strong>(End of session)</strong></p>
                    <p>When you're ready, begin to wiggle your fingers and toes. Gently bring some movement back into your body and, when you feel ready, slowly open your eyes.</p>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
