
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Footprints, Drama } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'MBSR Week 3 | Rejoyn',
};

export default function MbsrWeek3Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 3</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Gathering the Scattered Mind</CardTitle>
            <CardDescription>
              This week, we introduce mindfulness of movement and begin to turn our awareness toward difficult experiences. The aim is not to get rid of difficulty, but to learn to be present with it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Being with What Is</AlertTitle>
              <AlertDescription>
                Mindfulness is not just for pleasant experiences. By gently turning towards difficulty with awareness, we can change our relationship to it and reduce our suffering.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Footprints className="size-6 text-primary" />Formal Practice: Mindful Movement</CardTitle>
                <CardDescription>We will now bring mindfulness to the body in motion. This can be done through gentle yoga or simple stretching.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>The goal of mindful movement is not to achieve a perfect pose, but to pay intimate attention to the sensations of your body as it moves and stretches. Notice the feelings of stretching, strengthening, and releasing. If you feel any pain, ease up. The attitude is one of kindness and curiosity toward your body.</p>
                <Button asChild variant="link" className="p-0 h-auto">
                    <Link href="/tools/mindfulness/walking-meditation">Explore Mindful Movement Guides</Link>
                </Button>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Drama className="size-6 text-primary" />Informal Practice: Logging Difficult Events</CardTitle>
                <CardDescription>As a counterpart to last week's practice, this week we turn our non-judgmental awareness to unpleasant events.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>Each day this week, make a note of one difficult or unpleasant event. This is not to dwell on the negative, but to practice observing your reactions without getting caught up in them.</p>
               <p>For each event, reflect on:</p>
               <ul>
                    <li><strong>The Event:</strong> What actually happened? (e.g., "I received some critical feedback at work.")</li>
                    <li><strong>Feelings & Sensations:</strong> What did you notice in your body and emotions? (e.g., "I felt a tightness in my stomach and a wave of shame.")</li>
                    <li><strong>Thoughts:</strong> What thoughts went through your mind? (e.g., "I'm a failure.")</li>
               </ul>
               <p>The goal is to simply notice these reactions as passing events, just as you noticed the pleasant events last week.</p>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
