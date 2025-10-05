import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Anchor, HeartPulse, Wind } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Panic Attack Assistance | Rejoyn',
};

export default function PanicAttackAssistancePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Panic Attack Assistance</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Riding the Wave of Panic</CardTitle>
            <CardDescription>
              When a panic attack hits, it can feel overwhelming and terrifying. Remember that these feelings are temporary and will pass. This page guides you through the first few moments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <HeartPulse className="h-4 w-4" />
              <AlertTitle>You Are Not in Danger</AlertTitle>
              <AlertDescription>
                A panic attack is an intense rush of fear that is not proportional to the actual situation. Although the physical sensations are real and frightening, they are not life-threatening.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Immediate Steps to Take</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none text-foreground">
                    <div>
                        <h4 className="font-semibold flex items-center gap-2"><Anchor className="size-5 text-primary" />1. Acknowledge and Anchor</h4>
                        <p>Say to yourself: "I am having a panic attack. I am safe. This feeling will pass." Then, immediately engage your senses with a grounding technique. The goal is to anchor yourself in the present moment, not the fear.</p>
                        <Link href="/tools/ptsd/grounding" className="text-primary underline">Go to Grounding Techniques.</Link>
                    </div>
                     <div>
                        <h4 className="font-semibold flex items-center gap-2"><Wind className="size-5 text-primary" />2. Focus on Your Breath (Carefully)</h4>
                        <p>Panic often involves hyperventilation. The key is to slow your breathing down. Don't take huge deep breaths, as this can make it worse. Focus on making your exhale longer than your inhale.</p>
                        <Link href="/tools/relaxation/box-breathing" className="text-primary underline">Try the Box Breathing tool.</Link>
                    </div>
                     <div>
                        <h4 className="font-semibold flex items-center gap-2"><HeartPulse className="size-5 text-primary" />3. Use an Intense Sensation (TIPP Skill)</h4>
                        <p>Your body is in fight-or-flight mode. A powerful way to interrupt this is with a sudden, intense physical sensation.</p>
                         <p className="italic">Try this: Go to a sink and splash cold water on your face, or hold an ice cube in your hand.</p>
                        <Link href="/tools/dbt/tipp-technique" className="text-primary underline">Learn more about the TIPP skill.</Link>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
