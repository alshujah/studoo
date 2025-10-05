
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, HandHeart, Wind } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'MBSR Week 7 | Rejoyn',
};

export default function MbsrWeek7Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 7</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">How Can I Best Take Care of Myself?</CardTitle>
            <CardDescription>
              As we approach the end of the program, this week is about integrating mindfulness into your life in a way that feels authentic and sustainable. It's about using your increased awareness to make choices that support your well-being.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Mindfulness in Action</AlertTitle>
              <AlertDescription>
                The true practice of mindfulness happens not just on the meditation cushion, but in how we live our lives, how we interact with others, and how we care for ourselves moment by moment.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Wind className="size-6 text-primary" />Formal Practice: Choosing Your Practice</CardTitle>
                <CardDescription>This week, you are invited to choose the formal practice that resonates most with you. It could be the Body Scan, Sitting Meditation, or Mindful Movement. You can also experiment with unguided practice.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>This autonomy is a key step in making the practice your own. Trust your intuition about what your mind and body need each day.</p>
                <Button asChild variant="link" className="p-0 h-auto">
                    <Link href="/tools/mindfulness">Revisit the Mindfulness Tools</Link>
                </Button>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><HandHeart className="size-6 text-primary" />Informal Practice: Action Plan for Self-Care</CardTitle>
                <CardDescription>Reflect on what you've learned and create a plan for ongoing practice.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>Take some time to journal on these questions:</p>
               <ul>
                    <li>What have been the most important things I've learned about myself during this program?</li>
                    <li>What practices have been most helpful?</li>
                    <li>What are the biggest obstacles to my practice?</li>
                    <li>What is one realistic commitment I can make to continue my mindfulness practice after this program ends? (e.g., "I will meditate for 10 minutes, 3 times a week.")</li>
               </ul>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
