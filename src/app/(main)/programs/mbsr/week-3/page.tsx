
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Wind, Mic, Edit } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 3: Gathering the Scattered Mind | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek3Page() {
  return (
    <PageLayout title="Week 3: Gathering the Scattered Mind">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Introduction to Week 3</CardTitle>
                    <CardDescription>
                        This week, we introduce mindfulness in motion. We'll explore gentle, mindful movement to strengthen the mind-body connection. We also continue to expand our awareness by turning it towards unpleasant or difficult events with the same gentle curiosity we've applied to pleasant ones.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <Wind className="h-4 w-4" />
                        <AlertTitle>Core Theme: Awareness in Motion</AlertTitle>
                        <AlertDescription>
                            Mindfulness isn't just for sitting still. By bringing awareness to the body in movement, we learn to be present in all aspects of life. This week, we also practice gently acknowledging aversive experiences, learning to be with them without being consumed by them.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Formal Practice: Mindful Movement</CardTitle>
                    <CardDescription>
                        The main practice this week is mindful movement. This involves gentle stretching and yoga poses, performed with an attitude of curiosity and kindness toward the body's limits. The goal is awareness, not performance.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Aim to practice Mindful Movement or Sitting Meditation 6 days this week.</p>
                    <Button asChild>
                        <Link href="/tools/mindfulness/guided-meditation?topic=20+minute+gentle+mindful+movement">
                            <Mic className="mr-2" /> Start AI Guided Mindful Movement
                        </Link>
                    </Button>
                     <div className="prose max-w-none text-sm text-muted-foreground pt-4">
                        <h4>How to Practice:</h4>
                        <ol>
                            <li>Find a space where you can move freely. You can use a yoga mat or a soft carpet.</li>
                            <li>Start by standing or sitting, bringing awareness to your breath and the feeling of your body.</li>
                            <li>Slowly and gently begin to move. This could be simple stretches like neck rolls, shoulder shrugs, or a gentle spinal twist.</li>
                            <li>Pay close attention to the sensations in your body as you move. Notice areas of tension, tightness, or ease.</li>
                            <li>There is no goal to achieve. If a movement is uncomfortable, back off or modify it. The practice is in the gentle, curious awareness itself.</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Informal Practice: Unpleasant Events Log</CardTitle>
                    <CardDescription>
                        Just as we noted pleasant events last week, this week we practice acknowledging one unpleasant or difficult event each day. The goal is not to dwell on it, but to simply note the event and the associated feelings and body sensations with non-judgmental awareness.
                    </CardDescription>
                </CardHeader>
                 <CardContent>
                    <Button asChild variant="outline">
                        <Link href="/track/journal/freeform">
                            <Edit className="mr-2" /> Log an Unpleasant Event
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            
            <div className="flex justify-between">
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr/week-2">
                        <ArrowLeft className="mr-2" /> Back to Week 2
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/programs/mbsr/week-4">
                        Proceed to Week 4 <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
