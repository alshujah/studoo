
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BrainCircuit, Mic, Edit } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 6: Thoughts Are Not Facts | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek6Page() {
  return (
    <PageLayout title="Week 6: Thoughts Are Not Facts">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Introduction to Week 6</CardTitle>
                    <CardDescription>
                        This week, we focus on our relationship with our thoughts. We often treat our thoughts as absolute truths, but mindfulness teaches us that they are simply mental events. We can learn to observe them without automatically believing them or getting caught in their stories.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <BrainCircuit className="h-4 w-4" />
                        <AlertTitle>Core Theme: Relating to Thoughts Differently</AlertTitle>
                        <AlertDescription>
                            You are not your thoughts. By practicing 'decentering,' we can step back and see our thoughts as passing events, like clouds in the sky, rather than being the sky itself. This creates freedom and reduces the power of negative thought patterns.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Formal Practice: Awareness of Thoughts</CardTitle>
                    <CardDescription>
                        We continue with Sitting Meditation, but with a special emphasis on watching thoughts as they arise. The practice is to label them gently (e.g., "thinking," "worrying," "planning") and let them go, returning to the anchor of the breath.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Aim to practice this meditation for 20-30 minutes, 6 days this week.</p>
                    <Button asChild>
                        <Link href="/tools/mindfulness/guided-meditation?topic=meditation+for+observing+thoughts">
                            <Mic className="mr-2 h-4 w-4" /> Start AI Guided Meditation on Thoughts
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Informal Practice: "Is this thought true?"</CardTitle>
                    <CardDescription>
                        When you notice a strong, negative, or self-critical thought this week, pause and ask yourself: "Is this thought 100% true? Is it a fact, or is it a story my mind is telling me?" This simple question can create powerful distance.
                    </CardDescription>
                </CardHeader>
                 <CardContent>
                    <Button asChild variant="outline">
                        <Link href="/tools/thought-record">
                            <Edit className="mr-2 h-4 w-4" /> Use a Thought Record
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            
            <div className="flex justify-between">
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr/week-5">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Week 5
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/programs/mbsr/week-7">
                        Proceed to Week 7 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
