
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
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Living in Our Heads</CardTitle>
            <CardDescription>
              This week explores how we often perceive the world through a filter of thoughts and judgments, rather than experiencing it directly. We also begin to notice the brain's tendency to focus on the negative.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Perception vs. Reality</AlertTitle>
              <AlertDescription>
                We don't just see the world; we interpret it. Mindfulness helps us see our interpretations as "mental events" rather than objective truths, giving us more freedom.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Wind className="size-6 text-primary" />Formal Practice: Mindful Breathing</CardTitle>
                <CardDescription>The core formal practice for this week is bringing focused attention to the breath. The breath serves as an anchor to the present moment.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>The instruction is simple: pay attention to the sensation of your breath, wherever you feel it most clearly (nostrils, chest, or belly). When your mind wanders, gently and without judgment, guide it back to the breath. You can find more detailed instructions in our tools section.</p>
                <Link href="/tools/mindfulness/mindful-breathing" className="text-primary underline">Go to Mindful Breathing Guide</Link>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Smile className="size-6 text-primary" />Informal Practice: Pleasant Events Calendar</CardTitle>
                <CardDescription>This practice counteracts the brain's negativity bias by intentionally noticing and recording small moments of pleasantness throughout your day.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>Each day this week, make a note of one pleasant event. It doesn't have to be something big. It could be the taste of your morning coffee, the warmth of the sun, or a nice interaction with a colleague.</p>
               <ul>
                    <li><strong>The Event:</strong> Briefly note what happened. (e.g., "Drank a cup of tea.")</li>
                    <li><strong>Feelings & Sensations:</strong> How did it feel in your body? What emotions came up? (e.g., "Felt warm, calm, a sense of ease.")</li>
                    <li>The goal is to train your attention to notice the good that is already present in your life.</li>
               </ul>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
