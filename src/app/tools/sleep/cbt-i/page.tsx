
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Brain } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CBT for Insomnia | Rejoyn',
};

export default function CbtiPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">CBT for Insomnia (CBT-I)</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Cognitive Behavioral Therapy for Insomnia</CardTitle>
            <CardDescription>
              CBT-I is a structured, evidence-based therapy that is considered the first-line treatment for chronic insomnia. It helps you identify and replace thoughts and behaviors that are causing or worsening your sleep problems.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Professional Guidance Recommended</AlertTitle>
              <AlertDescription>
                CBT-I is most effective when delivered by a trained therapist. This page provides an overview of its core components for educational purposes.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Brain className="size-6 text-primary" />Core Components of CBT-I</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>
                            <strong>Cognitive Restructuring:</strong> Challenging and changing the anxious or unhelpful thoughts you have about sleep. For example, changing "I'll never fall asleep" to "My body knows how to sleep; I will rest, even if I don't sleep." You can practice this with the <Link href="/tools/thought-record">Thought Record</Link>.
                        </li>
                        <li>
                            <strong>Sleep Restriction:</strong> Temporarily limiting the time you spend in bed to more closely match the time you're actually sleeping. This increases the "sleep drive" and makes sleep more consolidated.
                        </li>
                        <li>
                            <strong>Stimulus Control:</strong> Re-associating your bed and bedroom with sleep. This involves going to bed only when sleepy, getting out of bed if you can't sleep after about 20 minutes, and using the bed only for sleep and intimacy.
                        </li>
                         <li>
                            <strong>Relaxation Training:</strong> Learning techniques like <Link href="/tools/mindfulness/progressive-muscle-relaxation">progressive muscle relaxation</Link>, <Link href="/tools/relaxation/diaphragmatic-breathing">diaphragmatic breathing</Link>, and <Link href="/tools/relaxation/safe-place">visualization</Link> to reduce physical and mental arousal.
                        </li>
                         <li>
                            <strong>Sleep Hygiene Education:</strong> Learning and implementing healthy sleep habits related to diet, exercise, and your environment. You can learn more on the <Link href="/tools/sleep/sleep-hygiene">Sleep Hygiene</Link> page.
                        </li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
