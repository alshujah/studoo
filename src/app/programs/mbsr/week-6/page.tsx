
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, MessageCircle, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'MBSR Week 6 | Rejoyn',
};

export default function MbsrWeek6Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 6</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Thoughts Are Not Facts</CardTitle>
            <CardDescription>
              This week, we apply mindfulness to our thought processes. We practice relating to our thoughts differently—seeing them as passing mental events rather than as objective truth or commands we must obey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Cognitive Defusion</AlertTitle>
              <AlertDescription>
                You are not your thoughts. You are the observer of your thoughts. By stepping back and watching your thoughts come and go, you can unhook from unhelpful narratives and gain a profound sense of freedom.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><MessageCircle className="size-6 text-primary" />Formal Practice: Open Monitoring</CardTitle>
                <CardDescription>We will practice "choiceless awareness," where the field of attention is wide open. Instead of having a single anchor like the breath, we notice whatever comes into our awareness—sounds, sensations, thoughts—moment by moment.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>This practice cultivates a spacious and non-reactive mind. The instruction is simple: sit and notice what you notice, without getting attached to anything.</p>
                <Button asChild variant="link" className="p-0 h-auto">
                    <Link href="/tools/act/decentering">Learn more about Defusion Techniques</Link>
                </Button>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><HeartHandshake className="size-6 text-primary" />Informal Practice: Self-Compassion</CardTitle>
                <CardDescription>Practice treating yourself with the same kindness you would offer a good friend.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>When you notice your inner critic is active, or when you make a mistake, pause. Place a hand over your heart and offer yourself a few words of kindness. For example: "This is a moment of suffering. Suffering is a part of life. May I be kind to myself in this moment."</p>
               <Button asChild variant="link" className="p-0 h-auto">
                  <Link href="/tools/psychodynamic/cft">Explore Compassion-Focused exercises</Link>
               </Button>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
