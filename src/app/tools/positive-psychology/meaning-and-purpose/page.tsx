
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meaning and Purpose | Rejoyn',
};

export default function MeaningAndPurposePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Positive Psychology: Meaning & Purpose</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Exploring Your "Why"</CardTitle>
            <CardDescription>
              Living a life of meaning and purpose is a key component of lasting well-being. This involves using your signature strengths to serve something larger than yourself.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Compass className="h-4 w-4" />
              <AlertTitle>Your Inner Compass</AlertTitle>
              <AlertDescription>
                A sense of purpose acts as a compass, guiding your decisions and providing resilience in the face of challenges.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Reflection Questions for Finding Purpose</CardTitle>
                    <CardDescription>Use these questions for journaling or deep reflection. There are no right or wrong answers.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>What activities make you feel most alive and engaged? When do you lose track of time?</li>
                        <li>What injustice in the world makes you angry or passionate? What problem do you wish you could solve?</li>
                        <li>If you could give one gift to the world, what would it be?</li>
                        <li>Think about a time you felt proud of something you accomplished. What were you doing? What did it mean to you?</li>
                        <li>What do you want your legacy to be? When you look back on your life, what do you want to have stood for?</li>
                        <li>Who do you admire most in the world? What qualities do they have that you want to cultivate in yourself?</li>
                        <li>What were your dreams and passions as a child? Do any of them still hold a spark for you?</li>
                        <li>If you weren't afraid of failure or judgment, what would you do with your life?</li>
                    </ul>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
