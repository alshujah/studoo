
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Heart, Mic, Edit } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 5: Acceptance and Willingness | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek5Page() {
  return (
    <PageLayout title="Week 5: Acceptance and Willingness">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Introduction to Week 5</CardTitle>
                    <CardDescription>
                        This week, we explore the powerful concept of 'acceptance' or 'allowing'. This doesn't mean liking or approving of unpleasant experiences, but rather acknowledging their presence without the added layer of resistance that often creates more suffering. We learn to be with difficulty, both physical and emotional.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <Heart className="h-4 w-4" />
                        <AlertTitle>Core Theme: Allowing Things to Be as They Are</AlertTitle>
                        <AlertDescription>
                            When we fight against reality, we create tension and suffering. By gently allowing difficult thoughts, feelings, and sensations to be present without struggling against them, we can often find more space and ease.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Formal Practice: Meditation on Difficult Sensations</CardTitle>
                    <CardDescription>
                        The formal practice this week is a variation of sitting meditation where we intentionally bring awareness to a difficult or unpleasant physical sensation (or a challenging emotion) and explore it with curious, kind attention.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Aim to practice this or another sitting meditation 6 days this week.</p>
                    <Button asChild>
                        <Link href="/tools/mindfulness/guided-meditation?topic=meditation+for+working+with+difficult+emotions">
                            <Mic className="mr-2" /> Start AI Guided Meditation on Difficulty
                        </Link>
                    </Button>
                     <div className="prose max-w-none text-sm text-muted-foreground pt-4">
                        <h4>How to Practice:</h4>
                        <ol>
                            <li>Begin with a few minutes of anchoring in the breath.</li>
                            <li>Intentionally bring to mind a situation that brings up a mild-to-moderate level of difficulty.</li>
                            <li>Notice where you feel this difficulty in your body. Is it a tightness in the chest? A pit in the stomach?</li>
                            <li>Gently direct your attention to this area. Instead of trying to push it away, see if you can breathe into it.</li>
                            <li>Observe the sensation with curiosity. Does it change? Does it have a size, shape, or temperature?</li>
                            <li>Hold the sensation in kind, spacious awareness. You are not the sensation; you are the one observing it.</li>
                            <li>If it becomes too intense, return your focus to the breath as an anchor.</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Informal Practice: Bringing 'Allowing' into Daily Life</CardTitle>
                    <CardDescription>
                        When you encounter a frustrating or difficult moment this week (e.g., being stuck in traffic, a disagreement), see if you can notice your resistance. Then, for a moment, soften and just 'allow' the situation to be as it is, observing your internal reaction without adding fuel to the fire.
                    </CardDescription>
                </CardHeader>
            </Card>
            
            <div className="flex justify-between">
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr/week-4">
                        <ArrowLeft className="mr-2" /> Back to Week 4
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/programs/mbsr/week-6">
                        Proceed to Week 6 <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
