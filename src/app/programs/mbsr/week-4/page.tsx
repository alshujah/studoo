
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, PauseCircle, Ear } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MBSR Week 4 | Rejoyn',
};

export default function MbsrWeek4Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 4</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Power of Presence & Responding to Stress</CardTitle>
            <CardDescription>
              This week focuses on stress reactivity. We explore how mindfulness creates a space between a stressful event and our reaction to it, allowing us to respond with wisdom rather than react on autopilot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Between Stimulus and Response, There is a Space.</AlertTitle>
              <AlertDescription>
                In that space is our power to choose our response. In our response lies our growth and our freedom. By becoming aware of our habitual reactions to stress, we open up the possibility of choosing a different, more skillful path.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Ear className="size-6 text-primary" />Formal Practice: Sitting Meditation with Sounds & Thoughts</CardTitle>
                <CardDescription>We will continue with sitting meditation, expanding our awareness to include sounds and thoughts as objects of attention.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>Instead of treating sounds and thoughts as distractions, we learn to receive them with open awareness. Notice how sounds arise, exist for a moment, and then pass away. Similarly, notice thoughts as mental events, clouds passing in the sky of your mind, without getting caught up in their content.</p>
                <Link href="/tools/mindfulness/mindful-breathing" className="text-primary underline">Go to Mindful Breathing Guide</Link>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><PauseCircle className="size-6 text-primary" />Informal Practice: The Mindful Pause</CardTitle>
                <CardDescription>Practice bringing short moments of mindfulness into stressful situations.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>Throughout your day, especially when you feel a rise in stress, practice the "STOP" skill:</p>
               <ul>
                    <li><strong>S</strong> - Stop what you are doing.</li>
                    <li><strong>T</strong> - Take a breath. Bring your awareness to the sensation of breathing.</li>
                    <li><strong>O</strong> - Observe. Notice your thoughts, feelings, and bodily sensations without judgment.</li>
                    <li><strong>P</strong> - Proceed. Having checked in with yourself, choose how to proceed with more awareness.</li>
               </ul>
                <Link href="/tools/dbt/stop-skill" className="text-primary underline">Learn more about the STOP skill</Link>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
