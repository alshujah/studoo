
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Compass, Gift, Camera, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meaning and Purpose | Rejoyn',
};

export default function MeaningAndPurposePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Logotherapy: Meaning & Purpose</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Exploring Your "Why"</CardTitle>
            <CardDescription>
              Based on the work of Viktor Frankl, Logotherapy suggests that our primary drive in life is not to gain pleasure or power but to find a sense of meaning. This module guides you through its three core pillars.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Compass className="h-4 w-4" />
              <AlertTitle>Your Inner Compass</AlertTitle>
              <AlertDescription>
                A sense of purpose acts as a compass, guiding your decisions and providing resilience in the face of challenges. Meaning can be found in any circumstance.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Gift className="size-6 text-primary" />Pillar 1: Creative Values</CardTitle>
                <CardDescription>This is about finding meaning through what you create or contribute to the world.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>Use these prompts for journaling:</p>
                <ul>
                    <li>What unique gifts, talents, or skills can I offer to the world?</li>
                    <li>What kind of work (paid or unpaid) makes me feel most alive and engaged?</li>
                    <li>If I were to create something (a project, a piece of art, a garden, a business) that represented my best self, what would it be?</li>
                    <li>What problem in my community or the world do I feel passionate about solving?</li>
                </ul>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Camera className="size-6 text-primary" />Pillar 2: Experiential Values</CardTitle>
                <CardDescription>This involves finding meaning by experiencing something or encountering someone.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>Use these prompts for journaling:</p>
                <ul>
                    <li>Describe a time you were moved by a piece of music, art, or nature. What did that experience feel like?</li>
                    <li>Think of a relationship where you felt a deep sense of connection or love. What was it about that person or interaction that was so meaningful?</li>
                    <li>When was the last time you felt a sense of awe or wonder? What were you doing?</li>
                    <li>What kinds of conversations or interactions leave you feeling energized and fulfilled?</li>
                </ul>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Brain className="size-6 text-primary" />Pillar 3: Attitudinal Values</CardTitle>
                <CardDescription>This is about finding meaning in the attitude you take toward unavoidable suffering or a situation you cannot change.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>Use these prompts for journaling:</p>
                <ul>
                    <li>Think of a difficult or painful situation you have faced. What strengths did you discover in yourself while navigating it?</li>
                    <li>In the face of a challenge you cannot change, what kind of person do you want to be? (e.g., courageous, patient, dignified)</li>
                    <li>What have your hardships taught you that you might not have learned otherwise?</li>
                    <li>How can you use your experiences (good and bad) to help others who are on a similar path?</li>
                </ul>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
