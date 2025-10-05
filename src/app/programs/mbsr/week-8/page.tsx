
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Sprout } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MBSR Week 8 | Rejoyn',
};

export default function MbsrWeek8Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 8</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">A Mindful Life: Review and Moving Forward</CardTitle>
            <CardDescription>
              In our final week, we review the journey, celebrate our efforts, and look at how to carry the practice forward into the rest of our lives. Mindfulness is not a destination, but a lifelong path.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: The Beginning</AlertTitle>
              <AlertDescription>
                This is not the end of your practice, but the end of the beginning. You have planted the seeds of mindfulness; now the practice is about tending to them day by day.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Sprout className="size-6 text-primary" />Formal Practice: Weaving it All Together</CardTitle>
                <CardDescription>For your final formal practice, you might choose to do a longer meditation that incorporates elements from the entire course: starting with the body, moving to the breath, opening to sounds and thoughts, and resting in open awareness.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>Let this be a celebration of the awareness you have cultivated. Thank yourself for showing up for this practice over the past eight weeks.</p>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Lightbulb className="size-6 text-primary" />Moving Forward</CardTitle>
                <CardDescription>How to keep the momentum going.</CardDescription>
            </Header>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>Remember your action plan from Week 7. Here are some additional tips:</p>
               <ul>
                    <li><strong>Find a Community:</strong> Consider joining a local or online meditation group to support your practice.</li>
                    <li><strong>Be Realistic:</strong> You may not practice every day. That's okay. The important thing is to always begin again, without judgment.</li>
                    <li><strong>Integrate Informally:</strong> Look for small moments in your day to be mindful—while washing dishes, waiting in line, or walking to your car.</li>
                    <li><strong>Keep Learning:</strong> Continue to explore mindfulness and other well-being tools. Your journey of self-discovery is ongoing.</li>
               </ul>
                <div className="mt-4">
                    <Link href="/tools" className="text-primary underline">Continue exploring all tools</Link>
                </div>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
