
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Wind, Smile } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MBSR Week 2 | Rejoyn',
};

export default function MbsrWeek2Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 2</h1>
      </div>
      <div className="flex-1 p-4 md-p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mindful Awareness of Pleasant Events</CardTitle>
            <CardDescription>
              This week, we shift our focus to perception. We will practice paying attention to the pleasant moments in our lives, no matter how small, to counteract the brain's natural tendency to focus on negative experiences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Counteracting the Negativity Bias</AlertTitle>
              <AlertDescription>
                Our brains are wired to pay more attention to threats and problems. By intentionally savoring pleasant experiences, we can train our attention to also notice the good that is already present, fostering a more balanced perspective.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Wind className="size-6 text-primary" />Formal Practice: Sitting Meditation with Breath and Body</CardTitle>
                <CardDescription>We will now transition from the Body Scan to a formal sitting meditation, using the breath and bodily sensations as our anchor to the present moment.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>Find a comfortable, upright sitting posture. You can sit in a chair with your feet flat on the floor or on a cushion. The goal is to be alert yet relaxed. Gently close your eyes and bring your attention to the sensation of the breath, wherever you feel it most clearly. When the mind wanders, as it naturally will, gently acknowledge it and guide your attention back to the breath.</p>
                <Link href="/tools/mindfulness/mindful-breathing" className="text-primary underline">Go to Mindful Breathing Guide</Link>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Smile className="size-6 text-primary" />Informal Practice: Logging Pleasant Events</CardTitle>
                <CardDescription>This practice trains your mind to notice and appreciate the small, positive moments that often go unnoticed.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>Each day this week, make a note of one pleasant event. It could be the taste of your morning coffee, the warmth of the sun, or a kind word from a stranger.</p>
               <p>For each event, reflect on the following:</p>
               <ul>
                    <li><strong>The Event:</strong> What exactly happened? (e.g., "I listened to a favorite song.")</li>
                    <li><strong>Feelings & Sensations:</strong> What did you notice in your body and emotions? (e.g., "I felt a sense of joy and my shoulders relaxed.")</li>
                    <li>The goal is not to force happiness, but to simply pay full attention to the pleasantness that is already there.</li>
               </ul>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
