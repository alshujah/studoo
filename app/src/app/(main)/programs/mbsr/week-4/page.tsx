
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Zap, Mic, Edit } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 4: Responding vs. Reacting | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek4Page() {
  return (
    <PageLayout title="Week 4: The Power of Presence">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Introduction to Week 4</CardTitle>
                    <CardDescription>
                        This week, we delve into the nature of stress and explore the crucial difference between reacting automatically and responding mindfully. We expand our awareness to include not just sensations, but thoughts and emotions as well, observing them as passing events in the mind.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <Zap className="h-4 w-4" />
                        <AlertTitle>Core Theme: Responding, Not Reacting</AlertTitle>
                        <AlertDescription>
                            Stressful events are a part of life. While we can't always control the events themselves, we can learn to control our relationship to them. Mindfulness creates a space between a trigger and our response, allowing us to choose how we act.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Formal Practice: Choiceless Awareness</CardTitle>
                    <CardDescription>
                        We continue with Sitting Meditation, but with a slight shift. Instead of keeping the breath as the primary anchor, we open our awareness to whatever comes into our attention—sounds, physical sensations, thoughts, emotions—without judgment and without getting carried away by them.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Aim to practice Sitting Meditation for 20-30 minutes, 6 days this week.</p>
                    <Button asChild>
                        <Link href="/tools/mindfulness/guided-meditation?topic=20+minute+choiceless+awareness+meditation">
                            <Mic className="mr-2" /> Start AI Guided Choiceless Awareness
                        </Link>
                    </Button>
                     <div className="prose max-w-none text-sm text-muted-foreground pt-4">
                        <h4>How to Practice:</h4>
                        <ol>
                            <li>Begin as you would with sitting meditation, anchored in the breath.</li>
                            <li>After a few minutes, intentionally broaden your awareness to include sounds, noticing them arise and pass away.</li>
                            <li>Then, broaden your awareness further to include physical sensations in the body, just as you did in the body scan.</li>
                            <li>Finally, open your awareness to include thoughts and emotions, viewing them as clouds passing in the sky of your mind. They are not you, and they are not permanent.</li>
                            <li>When you find yourself carried away by a thought or emotion, gently acknowledge it and return to this open, choiceless awareness.</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Informal Practice: Stressful Communications</CardTitle>
                    <CardDescription>
                        Pay attention to your internal experience during or after a stressful conversation. Without judging yourself, simply notice: What thoughts arose? What emotions did you feel? What sensations did you notice in your body (e.g., tight chest, clenched jaw)?
                    </CardDescription>
                </CardHeader>
                 <CardContent>
                    <Button asChild variant="outline">
                        <Link href="/track/journal/freeform">
                            <Edit className="mr-2" /> Log a Stressful Communication
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            
            <div className="flex justify-between">
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr/week-3">
                        <ArrowLeft className="mr-2" /> Back to Week 3
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/programs/mbsr/week-5">
                        Proceed to Week 5 <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
