
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, HeartHandshake, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MBSR Week 5 | Rejoyn',
};

export default function MbsrWeek5Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 5</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Acceptance and Willingness</CardTitle>
            <CardDescription>
              This week, we explore the challenging but transformative practice of bringing acceptance to all experiences, including difficult ones. We learn to be with things as they are, rather than as we wish them to be.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Acceptance is Not Resignation</AlertTitle>
              <AlertDescription>
                Acceptance doesn't mean giving up or approving of a difficult situation. It means clearly seeing and acknowledging reality so that you can respond from a place of wisdom instead of resistance. The greatest suffering often comes from fighting reality.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><HeartHandshake className="size-6 text-primary" />Formal Practice: Working with Difficulty</CardTitle>
                <CardDescription>In our sitting meditation, we will practice opening to difficult sensations, emotions, or thoughts with a spirit of kind curiosity.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>When a difficult sensation or emotion arises, instead of pushing it away, see if you can allow it to be there. Investigate it: Where is it in your body? Does it change? What happens when you just let it be, without needing it to go away? This practice builds emotional resilience.</p>
                <Link href="/tools/dbt/radical-acceptance" className="text-primary underline">Explore Radical Acceptance</Link>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><MessageSquare className="size-6 text-primary" />Informal Practice: Mindful Communication</CardTitle>
                <CardDescription>Practice bringing mindfulness into your conversations.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>In your next conversation, try to listen with your full attention. Notice the other person's words, tone, and body language. Also notice your own internal reactions (thoughts, feelings, judgments) without having to act on them. Just listen, fully.</p>
               <p>This is related to the 'Interested' part of the GIVE skill.</p>
                <Link href="/tools/dbt/interpersonal-effectiveness" className="text-primary underline">Learn more about the GIVE skill</Link>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
